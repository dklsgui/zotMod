const TAGS = ["journalArticle","conferencePaper"];
var tag_index = 0;
var cache_tags = {};

function init() {
    update_table();
    visible_table(false);
}

function save_config() {
    content = JSON.stringify(Zotero.zotMod.tag.config_tags);
    Zotero.File.putContentsAsync(Zotero.zotMod.tag.CONFIG_PATH,content).then(() => {
    }).catch((e) => {
        Zotero.zotMod.logger.log(e);
        Zotero.zotMod.logger.log("Failed to save tag config file")
    })
}

async function tag_config_export() {
    try{
        let filePicker = new FilePicker();
        filePicker.init(window, "tag_config.json", filePicker.modeSave);
        filePicker.defaultString = "tag_config.json";
        filePicker.show().then((value) => {
            if(value == 0){ // 当value为0时表示用户点击了保存按钮，否则表示用户点击了取消按钮
                let data = JSON.stringify(Zotero.zotMod.tag.config_tags);
                Zotero.File.putContentsAsync(filePicker.file,data);
            }
            delete filePicker;
        });
    }catch (e){
        Zotero.zotMod.logger.log(e);
        Zotero.zotMod.logger.log("Failed to export tag config file")
    }
}

async function tag_config_import(obj) {
    let file_path = obj.value;
    try {
        let file = await Zotero.File.getContentsAsync(file_path);
        let data = JSON.parse(file);
        for(let type in data) {
            for(let name in data[type]) {
                for(let tag of data[type][name]) {
                    if(!Zotero.zotMod.tag.config_tags[type]){
                        Zotero.zotMod.tag.config_tags[type] = {};
                    }
                    if(!Zotero.zotMod.tag.config_tags[type][name]){
                        Zotero.zotMod.tag.config_tags[type][name] = [];
                    }
                    if(Zotero.zotMod.tag.config_tags[type][name].indexOf(tag) == -1){
                        Zotero.zotMod.tag.config_tags[type][name].push(tag);
                    }
                }
            }
        }
        document.getElementById("zotMod-preferences-tags-tbody").innerHTML = "";
        save_config();
        update_table();
    }catch (e){
        Zotero.zotMod.logger.log(e);
        Zotero.zotMod.logger.log("Failed to import tag config file")
    }
}

function update_table() {
    Zotero.File.getContentsAsync(Zotero.zotMod.tag.CONFIG_PATH).then((data) => {
        data = JSON.parse(data);
        Zotero.zotMod.tag.config_tags = data;
        document.getElementById("zotMod-preferences-tags-tbody").innerHTML = "";
        for(let type in data) {
            for(let name in data[type]) {
                for(let tag of data[type][name]) {
                    add_tag_setting(type_value=type, name_value=name, tag_value=tag, disabled=true);
                }
            }
        }
    }).catch((e) => {
        Zotero.zotMod.logger.log(e);
        Zotero.zotMod.logger.log("Failed to get tag config file")
    })
}

function save_table(obj) {
    item = obj.parentNode.parentNode;
    type = item.getElementsByTagName("select")[0].selectedIndex;
    type = item.getElementsByTagName("select")[0].options[type].value;
    item_name = item.getElementsByTagName("input")[0].value;
    _tag = item.getElementsByTagName("input")[1].value;

    item.getElementsByTagName("select")[0].disabled = true;
    item.getElementsByTagName("input")[0].disabled = true;
    item.getElementsByTagName("input")[1].disabled = true;

    if(cache_tags[item.id]){
        let [old_type,old_item_name,old_tag] = cache_tags[item.id];
        if(Zotero.zotMod.tag.config_tags[old_type] && Zotero.zotMod.tag.config_tags[old_type][old_item_name] && Zotero.zotMod.tag.config_tags[old_type][old_item_name].indexOf(old_tag) != -1){
            Zotero.zotMod.tag.config_tags[old_type][old_item_name].splice(Zotero.zotMod.tag.config_tags[old_type][old_item_name].indexOf(old_tag),1);
        }
        delete cache_tags[item.id];
    }
    if(!Zotero.zotMod.tag.config_tags[type]){
        Zotero.zotMod.tag.config_tags[type] = {};
    }
    if(!Zotero.zotMod.tag.config_tags[type][item_name]){
        Zotero.zotMod.tag.config_tags[type][item_name] = [];
    }
    if(Zotero.zotMod.tag.config_tags[type][item_name].indexOf(_tag) == -1){
        Zotero.zotMod.tag.config_tags[type][item_name].push(_tag);
    }
    save_config();
}

function edit_tag_setting(obj) {
    let row = obj.parentNode.parentNode;
    row.getElementsByTagName("select")[0].disabled = false;
    row.getElementsByTagName("input")[0].disabled = false;
    row.getElementsByTagName("input")[1].disabled = false;
    
    let type = row.getElementsByTagName("select")[0].selectedIndex;
    type = row.getElementsByTagName("select")[0].options[type].value;
    let item_name = row.getElementsByTagName("input")[0].value;
    let _tag = row.getElementsByTagName("input")[1].value;
    cache_tags[row.id] = [type,item_name,_tag];
}

function visible_table(flag) {
    let table = document.getElementById("zotMod-preferences-tags-setting-function");
    flag = flag ? !Zotero.Prefs.get("extensions.zotMod.add_tags",true) : Zotero.Prefs.get("extensions.zotMod.add_tags",true);
    if (flag){
        table.style.visibility = "visible";
        Zotero.zotMod.tag.registerObserver();
        Zotero.zotMod.document.getElementById("zotMod-update-add-tag").style.display = "";
    }else{
        table.style.visibility = "hidden";
        Zotero.zotMod.tag.unregisterObserver();
        Zotero.zotMod.document.getElementById("zotMod-update-add-tag").style.display = "none";
    }
}

function delete_tag_setting(obj) {
    let row = obj.parentNode.parentNode;
    let type = row.getElementsByTagName("select")[0].selectedIndex;
    type = row.getElementsByTagName("select")[0].options[type].value;
    let item_name = row.getElementsByTagName("input")[0].value;
    let _tag = row.getElementsByTagName("input")[1].value;
    if(Zotero.zotMod.tag.config_tags[type] && Zotero.zotMod.tag.config_tags[type][item_name] && Zotero.zotMod.tag.config_tags[type][item_name].indexOf(_tag) != -1){
        Zotero.zotMod.tag.config_tags[type][item_name].splice(Zotero.zotMod.tag.config_tags[type][item_name].indexOf(_tag),1);
    }
    row.parentNode.removeChild(row);
    save_config();
}

function create_select(options = [], value = "") {
    let select = document.createElement("select");
    for(let item of options){
        let option = document.createElement("option");
        option.setAttribute("label",item);
        option.setAttribute("value",item);
        if(item == value){
            option.setAttribute("selected","selected");
        }
        select.insertAdjacentElement("beforeend",option);
    }
    return select;
}

function add_tag_setting(type_value = "", name_value = "", tag_value = "", disabled = false) {
    let tbody = document.getElementById("zotMod-preferences-tags-tbody")
    let row = tbody.insertRow();
    let type_cell = row.insertCell();
    let name_cell = row.insertCell();
    let tag_cell = row.insertCell();
    let operation_cell = row.insertCell();

    let type = create_select(TAGS,type_value);
    let name = document.createElement("input");
    let tag = document.createElement("input");
    let del_button = document.createElement("button");
    let save_button = document.createElement("button");
    let edit_button = document.createElement("button");

    type.disabled = disabled;
    name.disabled = disabled;
    tag.disabled = disabled;

    row.setAttribute("id",`zotMod_tag_${tag_index++}`);
    name.setAttribute("type","text");
    tag.setAttribute("type","text");
    del_button.setAttribute("data-l10n-id","zotMod-preferences-tag-delete");
    del_button.onclick = function() {delete_tag_setting(this)};
    save_button.setAttribute("data-l10n-id","zotMod-preferences-tag-save");
    save_button.onclick = function() {save_table(this)};
    edit_button.setAttribute("data-l10n-id","zotMod-preferences-tag-edit");
    edit_button.onclick = function() {edit_tag_setting(this)};

    name.value = name_value;
    tag.value = tag_value;

    type_cell.insertAdjacentElement("afterbegin",type);
    name_cell.insertAdjacentElement("afterbegin",name);
    tag_cell.insertAdjacentElement("afterbegin",tag);
    operation_cell.insertAdjacentElement("afterbegin",save_button);
    operation_cell.insertAdjacentElement("afterbegin",edit_button);
    operation_cell.insertAdjacentElement("afterbegin",del_button);
}