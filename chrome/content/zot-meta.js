if(!Zotero.zotMod){
    Zotero.zotMod = {};
}
if(!Zotero.zotMod.meta){
    Zotero.zotMod.meta = {};
}
Zotero.zotMod.meta = Object.assign(Zotero.zotMod.meta, {
    init() {
        Zotero.zotMod.logger.log("meta init");
    },

    async updateDOI(item) {
        if (!item) {
            return "item is empty";
        }
        // data = await this.searchPaper(item.getField("title"))
        data = await Zotero.zotMod.engine.searchByTitle(item.getField("title"));
        if(item.itemType == "preprint" || item.getField("DOI") == ""){
            if(data.status == 200){
                let doi = data.msg.doi;
                if(doi != "") {
                    item.setField("DOI",doi);
                    item.saveTx();
                    return {
                        "status": 200,
                        "msg":`${item.getField("title")}的DOI已更新为${doi}`
                    }
                }else{
                    return {
                        "status": 404,
                        "msg":`${item.getField("title")}查询不到doi`
                    }
                }
            }else{
                return {
                    "status": 404,
                    "msg":`${item.getField("title")}查询不到doi`
                }
            }
        }else{
            return {
                "status": 301,
                "msg":`${item.getField("title")}非arXiv且已有DOI`
            }
        }
    },

    async searchPaperByDOI(DOI) {
        if(DOI.match(/arxiv/gi)){
            DOI = DOI.replace(/10.48550\/arXiv\./gi, "");
        }
        const identifier = {
            DOI: DOI,
          };
        try {
            const translate = new Zotero.Translate.Search();
            translate.setIdentifier(identifier);  
            const translators = await translate.getTranslators();
            translate.setTranslator(translators);
            // {libraryID: options} 避免条目保存
            // https://github.com/zotero/translate/blob/05755f5051a77737c56458440c79964c7a8874cf/src/translation/translate.js#L1208-L1210
            // 配置这一项后返回的不再是 Zotero.Item[]，而是一个包含字段信息的 Object[]
            const newItems = await translate.translate({ libraryID: false });
            if(newItems.length == 0){
                data = null;
            }else{
                data = newItems[0];
            }
            return {
                "status": 200,
                "msg":`${DOI}查询成功`,
                "data":data
            }
        }catch(e){
            return {
                "status": 404,
                "msg":`${DOI}查询不到元数据`
            }
        }
    },

    async updateMetaData(item) {
        if(item.getField("DOI") == "" || item.itemType === "preprint"){
            await Promise.any([this.updateDOI(item),Zotero.zotMod.common.timeoutPromise(Zotero.Prefs.get('extensions.zotMod.timeout',true))]);
            if(item.getField("DOI") == ""){
                return {
                    "status": 404,
                    "msg":`${item.getField("title")}无DOI,无法更新元数据`
                };
            }
        }
        doi = item.getField("DOI");
        
        let newItem = await Promise.any([this.searchPaperByDOI(doi),Zotero.zotMod.common.timeoutPromise(Zotero.Prefs.get('extensions.zotMod.timeout',true))])
        if(newItem.status != 200){
            Zotero.zotMod.logger.log(newItem.msg);
            return {
                "status": 404,
                "msg":`${item.getField("title")}查询不到元数据`
            };
        }
        if(newItem.data == null){
            return {
                "status": 501,
                "msg":`${item.getField("title")}查询不到元数据`
            }
        }else{
            this.updateItem(item, newItem.data);
            return {
                "status": 200,
                "msg":`${item.getField("title")}的元数据已更新`
            }
        }
    },

    update(item, key, value) {
        if (key == "itemType") {
            // item.setType(Zotero.ItemTypes.getID(value));
        }else if(key == "creators") {
            item.setCreators(value);
        }else if(key == "DOI"){
            if(item.getField("DOI") == ""){
                item.setField("DOI", value);
            }
        }else{
            if(key in Zotero.zotMod.schema[item.itemType]){
                item.setField(Zotero.zotMod.schema[item.itemType][key], value); // 由于抓取条目key与实际存储的key不一致，所以需要转换
            }
        }
    },

    updateItem(oldItem, newItem) {
        if(oldItem.itemType !== newItem.itemType) {
            if(oldItem.itemType === "preprint") {
                oldItem.setType(Zotero.ItemTypes.getID(newItem.itemType));
                oldItem.saveTx();
            }else {
                return {
                    "status": 404,
                    "msg":`${oldItem.getField("title")}类型不匹配`
                };
            }
        }
        for (let key in newItem) {
            this.update(oldItem, key, newItem[key]);
        }
        if(oldItem.itemType === "conferencePaper"){
            if(oldItem.getField("proceedingsTitle") == ""){
                oldItem.setField("proceedingsTitle", oldItem.getField("conferenceName"));
            }
            if(oldItem.getField("conferenceName") == ""){
                oldItem.setField("conferenceName", oldItem.getField("proceedingsTitle"));
            }
        }
        oldItem.saveTx();
        return {
            "status": 200,
            "msg":`${oldItem.getField("title")}更新成功`
        };
    },
})