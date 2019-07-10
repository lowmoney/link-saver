//get the location of our div tag with element id
let URL_tag = document.getElementById('url');
let urlList = [];

//get the url from storage
chrome.storage.sync.get({url:[]}, function(result) {
    urlList = result.url;
    //give our par tag the url
    if(urlList.length>0){
        URL_tag.innerHTML = urlList[(urlList.length)-1];
        console.log("html link is: "+ urlList[(urlList.length)-1]);
    }else{
        URL_tag.innerHTML = "no links saved yet"
    }
    
})

function popupBuilder () {
    //make the link to our extension options page
    let optionLink = 'chrome-extension://ckjapaekdeccjiiaijkaedmbgegnjleo/options.html';
    let options = document.getElementById('options');
    let optionButton = document.createElement('a');
    optionButton.innerHTML = 'Load options';
    optionButton.setAttribute('href',optionLink);
    optionButton.setAttribute('target','_blank');
    options.appendChild(optionButton);

    let saved_links = document.getElementById('saved_links');
    let linkButton = document.createElement('a');
    linkButton.innerHTML = 'Go to saved links';
    linkButton.setAttribute('href',optionLink); 
    linkButton.setAttribute('target','_blank');  
    saved_links.appendChild(linkButton);
}

popupBuilder();