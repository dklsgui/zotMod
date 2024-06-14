if(!Zotero.zotMod){
    Zotero.zotMod = {};
}
if(!Zotero.zotMod.schema){
    Zotero.zotMod.schema = {};
}
Zotero.zotMod.schema = Object.assign(Zotero.zotMod.schema, {
    "annotation": {},
    "artwork": {
        "title": "title",
        "abstractNote": "abstractNote",
        "medium": "artworkMedium",
        "artworkSize": "artworkSize",
        "date": "date",
        "language": "language",
        "shortTitle": "shortTitle",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "url": "url",
        "accessDate": "accessDate",
        "rights": "rights",
        "extra": "extra"
    },
    "attachment": {
        "title": "title",
        "accessDate": "accessDate",
        "url": "url"
    },
    "audioRecording": {
        "title": "title",
        "abstractNote": "abstractNote",
        "medium": "audioRecordingFormat",
        "seriesTitle": "seriesTitle",
        "volume": "volume",
        "numberOfVolumes": "numberOfVolumes",
        "place": "place",
        "publisher": "label",
        "date": "date",
        "runningTime": "runningTime",
        "language": "language",
        "ISBN": "ISBN",
        "shortTitle": "shortTitle",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "url": "url",
        "accessDate": "accessDate",
        "rights": "rights",
        "extra": "extra"
    },
    "bill": {
        "title": "title",
        "abstractNote": "abstractNote",
        "number": "billNumber",
        "code": "code",
        "volume": "codeVolume",
        "section": "section",
        "pages": "codePages",
        "authority": "legislativeBody",
        "session": "session",
        "history": "history",
        "date": "date",
        "language": "language",
        "url": "url",
        "accessDate": "accessDate",
        "shortTitle": "shortTitle",
        "rights": "rights",
        "extra": "extra"
    },
    "blogPost": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "blogTitle",
        "type": "websiteType",
        "date": "date",
        "url": "url",
        "accessDate": "accessDate",
        "language": "language",
        "shortTitle": "shortTitle",
        "rights": "rights",
        "extra": "extra"
    },
    "book": {
        "title": "title",
        "abstractNote": "abstractNote",
        "series": "series",
        "seriesNumber": "seriesNumber",
        "volume": "volume",
        "numberOfVolumes": "numberOfVolumes",
        "edition": "edition",
        "place": "place",
        "publisher": "publisher",
        "date": "date",
        "numPages": "numPages",
        "language": "language",
        "ISBN": "ISBN",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "bookSection": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "bookTitle",
        "series": "series",
        "seriesNumber": "seriesNumber",
        "volume": "volume",
        "numberOfVolumes": "numberOfVolumes",
        "edition": "edition",
        "place": "place",
        "publisher": "publisher",
        "date": "date",
        "pages": "pages",
        "language": "language",
        "ISBN": "ISBN",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "case": {
        "title": "caseName",
        "abstractNote": "abstractNote",
        "authority": "court",
        "date": "dateDecided",
        "number": "docketNumber",
        "reporter": "reporter",
        "volume": "reporterVolume",
        "pages": "firstPage",
        "history": "history",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "rights": "rights",
        "extra": "extra"
    },
    "computerProgram": {
        "title": "title",
        "abstractNote": "abstractNote",
        "seriesTitle": "seriesTitle",
        "versionNumber": "versionNumber",
        "date": "date",
        "system": "system",
        "place": "place",
        "publisher": "company",
        "programmingLanguage": "programmingLanguage",
        "ISBN": "ISBN",
        "shortTitle": "shortTitle",
        "url": "url",
        "rights": "rights",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "accessDate": "accessDate",
        "extra": "extra"
    },
    "conferencePaper": {
        "title": "title",
        "abstractNote": "abstractNote",
        "date": "date",
        "publicationTitle": "proceedingsTitle",
        "conferenceName": "conferenceName",
        "place": "place",
        "publisher": "publisher",
        "volume": "volume",
        "pages": "pages",
        "series": "series",
        "language": "language",
        "DOI": "DOI",
        "ISBN": "ISBN",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "dataset": {
        "title": "title",
        "abstractNote": "abstractNote",
        "number": "identifier",
        "type": "type",
        "versionNumber": "versionNumber",
        "date": "date",
        "publisher": "repository",
        "place": "repositoryLocation",
        "medium": "format",
        "DOI": "DOI",
        "citationKey": "citationKey",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "shortTitle": "shortTitle",
        "language": "language",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "dictionaryEntry": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "dictionaryTitle",
        "series": "series",
        "seriesNumber": "seriesNumber",
        "volume": "volume",
        "numberOfVolumes": "numberOfVolumes",
        "edition": "edition",
        "place": "place",
        "publisher": "publisher",
        "date": "date",
        "pages": "pages",
        "language": "language",
        "ISBN": "ISBN",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "document": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publisher": "publisher",
        "date": "date",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "email": {
        "title": "subject",
        "abstractNote": "abstractNote",
        "date": "date",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "language": "language",
        "rights": "rights",
        "extra": "extra"
    },
    "encyclopediaArticle": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "encyclopediaTitle",
        "series": "series",
        "seriesNumber": "seriesNumber",
        "volume": "volume",
        "numberOfVolumes": "numberOfVolumes",
        "edition": "edition",
        "place": "place",
        "publisher": "publisher",
        "date": "date",
        "pages": "pages",
        "ISBN": "ISBN",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "language": "language",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "film": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publisher": "distributor",
        "date": "date",
        "type": "genre",
        "medium": "videoRecordingFormat",
        "runningTime": "runningTime",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "forumPost": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "forumTitle",
        "type": "postType",
        "date": "date",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "rights": "rights",
        "extra": "extra"
    },
    "hearing": {
        "title": "title",
        "abstractNote": "abstractNote",
        "committee": "committee",
        "place": "place",
        "publisher": "publisher",
        "numberOfVolumes": "numberOfVolumes",
        "number": "documentNumber",
        "pages": "pages",
        "authority": "legislativeBody",
        "session": "session",
        "history": "history",
        "date": "date",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "rights": "rights",
        "extra": "extra"
    },
    "instantMessage": {
        "title": "title",
        "abstractNote": "abstractNote",
        "date": "date",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "rights": "rights",
        "extra": "extra"
    },
    "interview": {
        "title": "title",
        "abstractNote": "abstractNote",
        "date": "date",
        "medium": "interviewMedium",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "journalArticle": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "publicationTitle",
        "volume": "volume",
        "issue": "issue",
        "pages": "pages",
        "date": "date",
        "series": "series",
        "seriesTitle": "seriesTitle",
        "seriesText": "seriesText",
        "journalAbbreviation": "journalAbbreviation",
        "language": "language",
        "DOI": "DOI",
        "ISSN": "ISSN",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "letter": {
        "title": "title",
        "abstractNote": "abstractNote",
        "type": "letterType",
        "date": "date",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "magazineArticle": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "publicationTitle",
        "volume": "volume",
        "issue": "issue",
        "date": "date",
        "pages": "pages",
        "language": "language",
        "ISSN": "ISSN",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "manuscript": {
        "title": "title",
        "abstractNote": "abstractNote",
        "type": "manuscriptType",
        "place": "place",
        "date": "date",
        "numPages": "numPages",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "map": {
        "title": "title",
        "abstractNote": "abstractNote",
        "type": "mapType",
        "scale": "scale",
        "seriesTitle": "seriesTitle",
        "edition": "edition",
        "place": "place",
        "publisher": "publisher",
        "date": "date",
        "language": "language",
        "ISBN": "ISBN",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "newspaperArticle": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "publicationTitle",
        "place": "place",
        "edition": "edition",
        "date": "date",
        "section": "section",
        "pages": "pages",
        "language": "language",
        "shortTitle": "shortTitle",
        "ISSN": "ISSN",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "note": {},
    "patent": {
        "title": "title",
        "abstractNote": "abstractNote",
        "place": "place",
        "country": "country",
        "assignee": "assignee",
        "authority": "issuingAuthority",
        "number": "patentNumber",
        "filingDate": "filingDate",
        "pages": "pages",
        "applicationNumber": "applicationNumber",
        "priorityNumbers": "priorityNumbers",
        "date": "issueDate",
        "references": "references",
        "status": "legalStatus",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "rights": "rights",
        "extra": "extra"
    },
    "podcast": {
        "title": "title",
        "abstractNote": "abstractNote",
        "seriesTitle": "seriesTitle",
        "number": "episodeNumber",
        "medium": "audioFileType",
        "runningTime": "runningTime",
        "url": "url",
        "accessDate": "accessDate",
        "language": "language",
        "shortTitle": "shortTitle",
        "rights": "rights",
        "extra": "extra"
    },
    "preprint": {
        "title": "title",
        "abstractNote": "abstractNote",
        "type": "genre",
        "publisher": "repository",
        "number": "archiveID",
        "place": "place",
        "date": "date",
        "series": "series",
        "seriesNumber": "seriesNumber",
        "DOI": "DOI",
        "citationKey": "citationKey",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "shortTitle": "shortTitle",
        "language": "language",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "presentation": {
        "title": "title",
        "abstractNote": "abstractNote",
        "type": "presentationType",
        "date": "date",
        "place": "place",
        "meetingName": "meetingName",
        "url": "url",
        "accessDate": "accessDate",
        "language": "language",
        "shortTitle": "shortTitle",
        "rights": "rights",
        "extra": "extra"
    },
    "radioBroadcast": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "programTitle",
        "number": "episodeNumber",
        "medium": "audioRecordingFormat",
        "place": "place",
        "publisher": "network",
        "date": "date",
        "runningTime": "runningTime",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "report": {
        "title": "title",
        "abstractNote": "abstractNote",
        "number": "reportNumber",
        "type": "reportType",
        "seriesTitle": "seriesTitle",
        "place": "place",
        "publisher": "institution",
        "date": "date",
        "pages": "pages",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "standard": {
        "title": "title",
        "abstractNote": "abstractNote",
        "authority": "organization",
        "committee": "committee",
        "type": "type",
        "number": "number",
        "versionNumber": "versionNumber",
        "status": "status",
        "date": "date",
        "publisher": "publisher",
        "place": "place",
        "DOI": "DOI",
        "citationKey": "citationKey",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "shortTitle": "shortTitle",
        "numPages": "numPages",
        "language": "language",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "statute": {
        "title": "nameOfAct",
        "abstractNote": "abstractNote",
        "code": "code",
        "codeNumber": "codeNumber",
        "number": "publicLawNumber",
        "date": "dateEnacted",
        "pages": "pages",
        "section": "section",
        "session": "session",
        "history": "history",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "rights": "rights",
        "extra": "extra"
    },
    "thesis": {
        "title": "title",
        "abstractNote": "abstractNote",
        "type": "thesisType",
        "publisher": "university",
        "place": "place",
        "date": "date",
        "numPages": "numPages",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "tvBroadcast": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "programTitle",
        "number": "episodeNumber",
        "medium": "videoRecordingFormat",
        "place": "place",
        "publisher": "network",
        "date": "date",
        "runningTime": "runningTime",
        "language": "language",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "videoRecording": {
        "title": "title",
        "abstractNote": "abstractNote",
        "medium": "videoRecordingFormat",
        "seriesTitle": "seriesTitle",
        "volume": "volume",
        "numberOfVolumes": "numberOfVolumes",
        "place": "place",
        "publisher": "studio",
        "date": "date",
        "runningTime": "runningTime",
        "language": "language",
        "ISBN": "ISBN",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "archive": "archive",
        "archiveLocation": "archiveLocation",
        "libraryCatalog": "libraryCatalog",
        "callNumber": "callNumber",
        "rights": "rights",
        "extra": "extra"
    },
    "webpage": {
        "title": "title",
        "abstractNote": "abstractNote",
        "publicationTitle": "websiteTitle",
        "type": "websiteType",
        "date": "date",
        "shortTitle": "shortTitle",
        "url": "url",
        "accessDate": "accessDate",
        "language": "language",
        "rights": "rights",
        "extra": "extra"
    }
});