if(!Zotero.zotMod) {
    Zotero.zotMod = {};
}
if(!Zotero.zotMod.dialogs) {
    Zotero.zotMod.dialogs = {};
}
Zotero.zotMod.dialogs = Object.assign(Zotero.zotMod.dialogs, {
    init() {
        Zotero.zotMod.logger.log("dialogs init");
        this.SUCCESS_ICON = "chrome/content/icons/16.png";
        this.ERROR_ICON = "chrome/content/icons/16.png";
        this.LOADING_ICON = "chrome/content/icons/16.png";
    },

    publishError(title, message, times=3000) {
        var progressWindowError = new Zotero.ProgressWindow({closeOnClick:true});
        progressWindowError.changeHeadline(title);
        progressWindowError.progress = new progressWindowError.ItemProgress();
        progressWindowError.progress.setText(message);
        progressWindowError.progress.setError();
        progressWindowError.show();
        progressWindowError.startCloseTimer(times);
    },

    publishSuccess(title, message, times=3000) {
        var progressWindowSuccess = new Zotero.ProgressWindow({closeOnClick:true});
        progressWindowSuccess.changeHeadline(title);
        progressWindowSuccess.progress = new progressWindowSuccess.ItemProgress();
        progressWindowSuccess.progress.setText(message);
        progressWindowSuccess.show();
        progressWindowSuccess.startCloseTimer(times);
    },

    initializeProgress(title, message) {
        Zotero.zotMod.logger.log(Zotero.zotMod.rootURI + this.LOADING_ICON);
        var progressWindowProgress = new Zotero.ProgressWindow({closeOnClick:true});
        // var loadingIcon = "chrome://zotero/skin/spinner-16px.png";
        progressWindowProgress.changeHeadline(title);
        progressWindowProgress.progress = new progressWindowProgress.ItemProgress();
        // progressWindowProgress.progress.setIcon(Zotero.Icons.getImageSrc("tick"));
        progressWindowProgress.progress.setProgress(0);
        progressWindowProgress.progress.setText(message);
        progressWindowProgress.show();
        return progressWindowProgress;
    },
    
    publishProgress(handle, progress, message, title = null) {
        var validatedProgress = Math.min(Math.max(progress, 0), 100);
        handle.progress.setProgress(validatedProgress);
        handle.progress.setText(message);
        if (title) {
            handle.changeHeadline(title);
        }
        if (progress === 100) {
            // var successIcon = "chrome://zotero/skin/tick.png";
            // handle.progress.setIcon(successIcon);
            // handle.startCloseTimer();
            handle.close();
        }
    },

    fetchWithTimeout(url, requestInfo, timeout) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Request timed out'));
            }, timeout);
        });
    
        return Promise.race([
            fetch(url, requestInfo),
            timeoutPromise
        ]);
    },
});