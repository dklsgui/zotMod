var chromeHandle;

if(typeof Zotero == 'undefined') {
    var Zotero;
}
// 插件被安装时调用
function log(msg) {
    Zotero.debug("[zotMod] " + msg);
}

async function registerPrefs(id, rootURI){
    const prefOptions = {
        pluginID: id,
        label: "ZotMod",
        src: rootURI + "chrome/content/preference/preferences.xhtml",
        scripts: [rootURI + 'chrome/content/preference/preferences.js'],
        stylesheets: [rootURI + 'chrome/content/preference/preferences.css'],
        image: rootURI + "chrome/content/icons/96.png",
      };
      Zotero.PreferencePanes.register(prefOptions);
}

async function install(data, reason) {
    log("install");
}

// 插件启动时调用
async function startup({ id, version, rootURI }) {
    Services.scriptloader.loadSubScript(rootURI + 'chrome/content/zot-includes.js',{id, version, rootURI});
    registerPrefs(id, rootURI);
    var aomStartup = Cc["@mozilla.org/addons/addon-manager-startup;1"].getService(Ci.amIAddonManagerStartup);
    var manifestURI = Services.io.newURI(rootURI + "manifest.json");
    chromeHandle = aomStartup.registerChrome(manifestURI, [
        ["content", "zotMod", rootURI + "chrome/content/"],
    ]); 
    // Zotero.zotMod.addItemMenu();
    Zotero.zotMod.addItemMenus();
}

// 插件被禁用时或 Zotero 被关闭时调用
async function shutdown(data, reason) {
    chromeHandle.destruct();
    chromeHandle = null;
    Zotero.zotMod.removeItemMenu();
    if(Zotero.zotMod.tag.zotMod_notifierID !== null){
        Zotero.zotMod.tag.unregisterObserver();
    }
    Zotero.zotMod = null;
    log("shutdown");
}

// 插件被卸载时调用
async function uninstall(data, reason) {
    log("uninstall");
}

// Zotero 主窗口加载完毕时调用
async function onMainWindowLoad({ window }) {}

// Zotero 主窗口被关闭时调用
async function onMainWindowUnload({ window }) {}
