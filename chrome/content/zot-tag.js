if(!Zotero.zotMod){
    Zotero.zotMod = {};
}
if(!Zotero.zotMod.tag){
    Zotero.zotMod.tag = {};
}

Zotero.zotMod.tag = Object.assign(Zotero.zotMod.tag, {
    init() {
        Zotero.zotMod.logger.log("tag init");
        Zotero.zotMod.tag.zotMod_notifierID = null;
        Zotero.zotMod.tag.CONFIG_PATH = Zotero.zotMod.ZOTMOD_PATH+"\\config.json";
        Zotero.File.directoryIsEmpty(Zotero.zotMod.ZOTMOD_PATH).then((isEmpty) => {
            if(isEmpty){
                Zotero.File.putContentsAsync(Zotero.zotMod.tag.CONFIG_PATH,"{}").then(() => {
                }).catch((e) => {
                    Zotero.zotMod.logger.log(e);
                    Zotero.zotMod.logger.log("zotMod 配置文件创建失败")
                })
            }
        })
        if(Zotero.Prefs.get("extensions.zotMod.add_tags",true)){
            Zotero.File.getContentsAsync(Zotero.zotMod.tag.CONFIG_PATH).then((data) => {
                data = JSON.parse(data);
                Zotero.zotMod.tag.config_tags = data;
            }).catch((e) => {
                Zotero.zotMod.logger.log(e);
                Zotero.zotMod.logger.log("Failed to get tag config file")
            })
            this.registerObserver();
        }
    },
    addTag(item){
        let itemType = item.itemType;
        let publicationTitle = item.getField(Zotero.zotMod.schema[itemType].publicationTitle);
        let labels = []
        for(let name in Zotero.zotMod.tag.config_tags[itemType]){
            if(publicationTitle.toLowerCase().includes(name.toLowerCase())){
                for(let tag of Zotero.zotMod.tag.config_tags[itemType][name]){
                    item.addTag(tag);
                    labels.push(tag);
                }
            }
        }
        item.saveTx();
        if(labels.length > 0){
            Zotero.zotMod.dialogs.publishSuccess("标签添加成功",`为${item.getField("title")}添加了标签:${labels.join(",")}`);
        }
    },
    registerObserver() {
        if(Zotero.zotMod.tag.zotMod_notifierID === null){
            Zotero.zotMod.tag.zotMod_notifierID = Zotero.Notifier.registerObserver({
                notify: async (event, type, ids, extraData) => {
                    if(event == "add" && type == "item"){
                        let item = Zotero.Items.get(ids)[0];
                        this.addTag(item);
                    }
                }
            },["item"],["add"]);
        }
    },
    unregisterObserver() {
        if(Zotero.zotMod.tag.zotMod_notifierID !== null){
            Zotero.Notifier.unregisterObserver(Zotero.zotMod.tag.zotMod_notifierID);
            Zotero.zotMod.tag.zotMod_notifierID = null;
        }
    }
});