if(!Zotero.zotMod){
    Zotero.zotMod = {};
}

if(!Zotero.zotMod.threadpools){
    Zotero.zotMod.threadpools.shutdown();
}

Zotero.zotMod.threadpools = Object.assign(Zotero.zotMod.threadpools, {
    pools: [],
    init() {
        Zotero.zotMod.logger.log("command init");
    },
    addThread(num=1) {
        for(let i=0; i<num; i++) {
            
        }
    },
    wait() {

    }
});