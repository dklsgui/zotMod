if(!Zotero.zotMod) {
    Zotero.zotMod = {};
}
Zotero.zotMod = Object.assign(Zotero.zotMod , {
    id: null,
	version: null,
	rootURI: null,
	initialized: false,
	addedElementIDs: [],
    
    init({ id, version, rootURI }) {
        if (this.initialized) {
            return;
        }
        this.id = id;
        this.version = version;
        this.rootURI = rootURI;
        this.initialized = true;
        this.window = Zotero.getMainWindow();
        this.document = this.window.document; // 获取主窗口的document对象
        Zotero.zotMod.logger.log("zotMod init");
        Zotero.zotMod.ZOTMOD_PATH = Zotero.Prefs.get('dataDir')+"\\zotMod";
        Zotero.File.createDirectoryIfMissing(Zotero.zotMod.ZOTMOD_PATH);
    },
    createItemMenu(itemmenu,menu) {
        let menuitem = this.document.createXULElement('menuitem');
        let hbox = this.document.createXULElement('hbox');
        let icons = this.document.createXULElement('image');
        let label = this.document.createXULElement('label');
        itemmenu.appendChild(menuitem);
        menuitem.insertAdjacentElement('afterbegin', hbox);
        hbox.appendChild(icons);
        node = menuitem.getElementsByTagName("label")
        if(node.length > 0) {
            node[0].insertAdjacentElement('afterend', label);
        }else{
            menuitem.appendChild(label);
        }
        
        // 修改menuitem属性
        menuitem.setAttribute("id",menu.id)
        menuitem.setAttribute("class","menuitem-iconic")
        menuitem.setAttribute('data-l10n-id', menu.label);
        menuitem.setAttribute('style','list-style-image: url("chrome://zotMod/content/icons/16.png");')
        menuitem.addEventListener('command', menu.command);
        
        // 修改hbox属性
        hbox.setAttribute("class","menu-iconic-left");
        hbox.setAttribute("align","center");
        hbox.setAttribute("pack","center");
        hbox.setAttribute("aria-hidden","true");
        
        // 修改icons属性
        icons.setAttribute('class', 'menu-iconic-icon');
        // icons.setAttribute('id',`${menu.id}_icon`);
        icons.setAttribute('src', 'chrome://zotMod/content/icons/16.png');
        
        // 修改label属性
        label.setAttribute('class', "menu-iconic-highlightable-text");
        label.setAttribute('crop','end');
        label.setAttribute('aria-hidden','true');
        
        this.storeAddedElement(menuitem.id);
    },
    addItemMenus() {
        let menus = [
            {
                id: "zotMod-update-doi",
                label: "zotMod-update-doi",
                icon: "chrome://zotMod/content/icons/16.png",
                command: () => {
                    this.updateSelectedItemDOI();
                }
            },{
                id: "zotMod-update-meta-data",
                label: "zotMod-update-meta-data",
                icon: "chrome://zotMod/content/icons/16.png",
                command: () => {
                    this.updateSelectedItemMetaData();
                }
            },{
                id: "zotMod-update-add-tag",
                label: "zotMod-update-add-tag",
                icon: "chrome://zotMod/content/icons/16.png",
                command: () => {
                    let items = this.window.ZoteroPane.getSelectedItems();
                    for(let item of items){
                        Zotero.zotMod.tag.addTag(item);
                    }
                }
            }
        ]
        let itemmenu = this.document.getElementById("zotero-itemmenu");
        if (!itemmenu) {
            return;
        }
        this.window.MozXULElement.insertFTLIfNeeded("update-meta-data.ftl");
        let separator = this.document.createXULElement('menuseparator');
        separator.id = "zotMod-separator";
        itemmenu.appendChild(separator);
        this.storeAddedElement(separator.id);
        for(let menu of menus){
            this.createItemMenu(itemmenu, menu);
        }
    },
    removeItemMenu() {
        var windows = Zotero.getMainWindows();
        for(let window of windows) {
            var document = window.document;
            for (let id of this.addedElementIDs) {
                var element = document.getElementById(id);
                if (element) {
                    element.remove();
                }
            }
        }
    },
    storeAddedElement(elementID) {
        this.addedElementIDs.push(elementID);
    },
    async updateSelectedItemDOI() {
        let items = Zotero.getMainWindow().ZoteroPane.getSelectedItems();
        let count = 0;
        let successCount = 0;
        let failCount = 0;
        let itemscount = items.length;
        let progressHandle = Zotero.zotMod.dialogs.initializeProgress("更新DOI");
        Zotero.zotMod.dialogs.publishProgress(progressHandle, 0, `开始更新DOI`);
        for(let item of items){
            if(Zotero.Prefs.get(`extensions.zotMod.${item.itemType}`,true)){
                await Zotero.zotMod.meta.updateDOI(item)
                        .then((response) => {
                            count++;
                            if(response.status == 200){
                                successCount++;
                                Zotero.zotMod.dialogs.publishSuccess("更新DOI成功", response.msg);
                            }else{
                                failCount++;
                                Zotero.zotMod.dialogs.publishError("更新DOI失败", response.msg);
                            }
                        })
            }else{
                count++;
                failCount++;
            }
            Zotero.zotMod.dialogs.publishProgress(progressHandle, Math.round(count/itemscount*100), `已经更新完成(${count}/${itemscount})篇论文`);
        }
        Zotero.zotMod.dialogs.publishSuccess("更新DOI完成", `${successCount}篇论文更新成功,${failCount}篇论文更新失败`);
    },
    async updateSelectedItemMetaData() {
        let items = Zotero.getMainWindow().ZoteroPane.getSelectedItems();
        let count = 0;
        let successCount = 0;
        let failCount = 0;
        let itemscount = items.length;
        var progressHandle = Zotero.zotMod.dialogs.initializeProgress("更新元数据");
        Zotero.zotMod.dialogs.publishProgress(progressHandle, 0, `已经更新元数据(${count}/${itemscount})篇论文`);
        for(let item of items){
            if(Zotero.Prefs.get(`extensions.zotMod.${item.itemType}`,true)){
                await Zotero.zotMod.meta.updateMetaData(item)
                        .then((response) => {
                            count++;
                            if(response.status == 200){
                                successCount++;
                                Zotero.zotMod.dialogs.publishSuccess("更新元数据成功", response.msg);
                            }else{
                                failCount++;
                                Zotero.zotMod.dialogs.publishError("更新元数据失败", response.msg);
                            }
                        })
            }else{
                count++;
                failCount++;
            }
            Zotero.zotMod.dialogs.publishProgress(progressHandle, Math.round(count/itemscount*100), `已经更新完成(${count}/${itemscount})篇论文`);
        }
        Zotero.zotMod.dialogs.publishSuccess("更新元数据完成", `${successCount}篇论文更新成功,${failCount}篇论文更新失败`);
    },
});