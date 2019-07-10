//make vars for location of the user input element, default reset, url locations
let userIn = document.getElementById('userIn');
let def = document.getElementById('default');
let URLs = document.getElementById('url');
let defaultLinks;

//get the number of links the user wants to hold at one time
chrome.storage.sync.get(['links'], function(result) {
    console.log('number of links to display: ' + result.links);
    defaultLinks = parseInt(result.links);
    constructLinks(defaultLinks);
});

chrome.storage.sync.get({url:[]}, function (result) {
    //give our array the values from storage
    let urlList = [];
    urlList = result.url;
    linkDisplay(urlList.length,urlList);
    urlList = [];
});

//run the function to create the two buttons
constructNumOfCLicks();
refreshButton();
clearData();

//function that clear the links when user presses any of the two buttons
function clearLinks() {
    document.getElementById('url').remove();
    let div = document.createElement('div');
    div.id = 'url';
    document.getElementById('URLs').appendChild(div);
}

//function that makes the links based on numLinks
function constructLinks (numLinks) {
    let i = 0;
    URLs = document.getElementById('url');
    while (i < numLinks) {
        let link = document.createElement('a');
        link.id = 'link:'+(i+1);
        link.innerHTML = 'link: '+(i+1);
        i++;
        console.log('loop run');
        URLs.appendChild(link);
        URLs.appendChild(document.createElement('br'));
        URLs.appendChild(document.createElement('br'));
    }
    console.log('loop done');
}

//function that display all links to options page
function linkDisplay (numLinks,urlList) {
    let i = 0;
    console.log(urlList);
    while( i < numLinks ) {
        let link = 'link:'+(i+1);
        let url = urlList[i];
        let linkLocation = document.getElementById(link);
        linkLocation.innerHTML = url;
        linkLocation.setAttribute('href',url);
        linkLocation.setAttribute('target','_blank');
        i++;
    }
}

//function that constructs the button to get the user input for the number of links
//as well as set number of links back to default value of 20
function constructNumOfCLicks () {
    //make vars to get location of items to append to
    //make button elements default and submit to get user input
    let input = document.getElementById('quantInput');
    let setDefButton = document.createElement('button');
    setDefButton.innerHTML = 'default';
    let userButton = document.createElement('button');
    userButton.innerHTML = 'submit';

    //add event listener to see how many links to write
    userButton.addEventListener('click', function () {
        chrome.storage.sync.set({links:Number(input.value)} , function () {
            console.log('ammounts of links: ' + input.value);
            clearLinks();
            constructLinks(Number(input.value));
        })
    });

    //add event listener to set default links to 20 when clicked
    setDefButton.addEventListener('click', function() {
        chrome.storage.sync.set({links:20} , function () {
            console.log('default 20 links set');
            clearLinks();
            constructLinks(20);
        })
    });

    //add the two buttons to the page
    userIn.appendChild(userButton);
    def.appendChild(setDefButton);
}

//function that makes the refresh button to show new links
function refreshButton() {
    let location = document.getElementById('saved_url');
    let reButton = document.createElement('button');
    reButton.innerHTML = "click to show new links";
    reButton.addEventListener('click', function () {
        chrome.tabs.reload();
    })
    location.appendChild(reButton);
}

//function that clears the urls
function systemClear () {
    clearLinks();
    chrome.storage.local.remove(['url']);
    constructLinks(defaultLinks);
}

//function that makes the clear all data button
function clearData () {
    let location = document.getElementById('saved_url');
    let clearButton = document.createElement('button');
    clearButton.innerHTML = 'click to clear all data';
    clearButton.addEventListener('click', function () {
        clearLinks();
        chrome.storage.sync.remove(['url']);
        chrome.storage.local.remove(['url']);
        constructLinks(defaultLinks);
    });
    location.appendChild(clearButton);
}

