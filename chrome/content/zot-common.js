if(!Zotero.zotMod){
    Zotero.zotMod = {};
}
if(!Zotero.zotMod.common){
    Zotero.zotMod.common = {};
}

Zotero.zotMod.common = Object.assign(Zotero.zotMod.common, {
    init({ id, version, rootURI }) {
        Zotero.zotMod.logger.log("command init");
        Zotero.zotMod.common.id = id;
        Zotero.zotMod.common.version = version;
        Zotero.zotMod.common.rootURI = rootURI;
    },

    async timeoutPromise(timeout) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve({
                    "status": 504,
                    "msg":'Request timed out'
                });
            }, timeout);
        });
    },

    getJSON(url,callback) {
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.send(null);
        request.onload = function() {
            if(request.status == 200) {
                let data = JSON.parse(request.responseText);
                callback(data);
            }else {
                Zotero.zotMod.logger.log("Failed to get JSON data");
            }
        }
    }
});