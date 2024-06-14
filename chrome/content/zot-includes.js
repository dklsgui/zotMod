(function(){
    Services.scriptloader.loadSubScript(rootURI + 'chrome/content/zot-logger.js');
    Zotero.zotMod.logger.init();
    Services.scriptloader.loadSubScript(rootURI + 'chrome/content/zot-dialog.js');
    Zotero.zotMod.dialogs.init();
    Services.scriptloader.loadSubScript(rootURI + 'chrome/content/zot-schema.js');
    Services.scriptloader.loadSubScript(rootURI + 'chrome/content/zot-common.js');
    Zotero.zotMod.common.init({ id, version, rootURI });
    Services.scriptloader.loadSubScript(rootURI + 'chrome/content/zot-engine.js');
    Zotero.zotMod.engine.init();
    Services.scriptloader.loadSubScript(rootURI + 'chrome/content/zot-meta.js');
    Zotero.zotMod.meta.init();
    Services.scriptloader.loadSubScript(rootURI + 'zotMod.js');
    Zotero.zotMod.init({ id, version, rootURI });
    Services.scriptloader.loadSubScript(rootURI + 'chrome/content/zot-tag.js');
    Zotero.zotMod.tag.init();
})();