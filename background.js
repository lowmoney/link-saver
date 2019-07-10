//attributes to add to our context menu from right-click
let  contextMenusItem = {
    "id": "URL",
    "title": "Save Link",
    "contexts": ["link"]
}

let urlList = [];

//make on intstall
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({url:urlList}, function() {
        console.log("url is set to empty array of strings on install");
    });
    chrome.storage.sync.set({links:20},function() {
        console.log("number of links set to default 20 on install");
    });
    chrome.contextMenus.create(contextMenusItem);
});

//make on startup
chrome.runtime.onStartup.addListener(function() {
    chrome.storage.sync.set({url:urlList}, function() {
        console.log("url set to empty array of strings on each start up");
    });
    chrome.storage.sync.set({links:20},function() {
        console.log("number of links set to default 20 on install");
    });
});


//function that takes the URL and saves to an array of URLs
function URL(URL){
    urlList.push(URL);
    chrome.storage.sync.set({url:urlList}, function () {
        console.log('added url to array');
        console.log(urlList.toString());
    })
}


//add event listener to see if user clicked a context menu
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    //check and see if user cleared storage
    chrome.storage.sync.get({url:[]}, function (result) {
        //give our array the values from storage
        if(result.url.length==0){
            urlList = [];
        }
    });
    //if user clicks our context menu
    if (info.menuItemId == "URL") {
        //get the url from info
        let url = info.linkUrl;
        //call URL function and pass on our url
        URL(url);
    }
});

