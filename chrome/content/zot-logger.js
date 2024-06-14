if(!Zotero.zotMod){
    Zotero.zotMod = {};
}
if(!Zotero.zotMod.logger){
    Zotero.zotMod.logger = {};
}
Zotero.zotMod.logger = Object.assign(Zotero.zotMod.logger, {
    init() {
        this.log("logger init");
    },
    log(msg) {
        Zotero.log("[zotMod] " + msg);
    }
});