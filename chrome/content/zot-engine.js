if(!Zotero.zotMod){
    Zotero.zotMod = {};
}
if(!Zotero.zotMod.engine){
    Zotero.zotMod.engine = {};
}
Zotero.zotMod.engine = Object.assign(Zotero.zotMod.engine, {
    init() {
        Zotero.zotMod.logger.log("engine init");
    },
    
    async searchByTitle(title) {
        resp = await Promise.any([
            Zotero.zotMod.common.timeoutPromise(Zotero.Prefs.get('extensions.zotMod.timeout',true)),
            Crossref.searchByTitle(title),
            ResearchRabbit.searchByTitle(title)
        ]);
        return resp;
    }
});

Crossref = {
    createSearchParams(title) {
        return new URLSearchParams({
            "from_ui":"yes",
            "q": title
        });
    },
    async searchByTitle(title) {
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
        myHeaders.append("Accept", "*/*");
        myHeaders.append("Host", "search.crossref.org");
        myHeaders.append("Connection", "keep-alive");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        //    redirect: 'follow'
        };
        resp = await fetch(`https://search.crossref.org/search/works?${this.createSearchParams(title).toString()}`, requestOptions)
        if(resp.status != 200){
            throw new Error({
                status: 404,
                msg: `${title}查询不到doi`
            });
        }
        resp = await resp.text();
        paperInfo = resp.match(/<td class="item-data"[\W\w]*<\/td>/i)
        return {
            status: 200,
            msg: {
                "doi":paperInfo[0].match(/<a[\W\w]+?(10.[\W\w]+?)\"/i)[1].trim(),
                "title":paperInfo[0].match(/<p class=\"lead\">([\W\w]+?)<\/p>/i)[1].trim(),
                "author":paperInfo[0].match(/<p class=\"expand\">([\W\w]+?)<\/p>/i)[1].trim(),
            }
        };
    }
};

ResearchRabbit = {
    createSearchParams(title) {
        return new URLSearchParams({
            "offset": 0,
            "limit": 100,
            "fields": "title,authors,abstract,fieldsOfStudy,referenceCount,citationCount,year,externalIds,url,isOpenAccess,venue",
            "query": title
        });
    },

    async searchByTitle(title) {
        const url = "https://www.researchrabbitapp.com/s2";
        const resp = await fetch(`${url}?${this.createSearchParams(title).toString().replace(/\+/g, "%20")}`);
        if(resp.status != 200){
            throw new Error({
                status: 404,
                msg: `ResearchRabbit ${title}查询不到doi`
            });
        }
        data = await resp.json();
        let doi = "";
        if(typeof(data.data[0].externalIds.DOI) != "undefined"){
            doi = data.data[0].externalIds.DOI;
        }else if(typeof(data.data[0].externalIds.ArXiv) != "undefined"){
            doi = data.data[0].externalIds.ArXiv;
        }
        let author = ""
        for(let a of data.data[0].authors){
            author += a.name + " ";
        }
        return {
            status: resp.status,
            msg: {
                "doi":doi,
                "title":data.data[0].title,
                "author":author,
            }
        };
    }
};

