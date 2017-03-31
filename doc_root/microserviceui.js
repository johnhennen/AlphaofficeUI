// JAVASCRIPT DOCUMENT
/*********************************************************    
CHANGE THE URLS BELOW FOR THE WORKSHOP - THESE URLS MUST POINT TO THE MICROSERVICES.      
*********************************************************/ 
var dbServiceURL = "http://localhost:8002"; // THIS URL IS FOR THE CLIENT TEST ONLY. REPLACE THIS WITH THE MYSQL APPLICATION CLOUD CONTAINER URL TO RUN IN THE CLOUD.
var tweetServiceBaseURL = "http://localhost:8003"; // THIS URL IS FOR THE CLIENT TEST ONLY. REPLACE THIS WITH THE TWITTER APPLICATION CLOUD CONTAINER URL TO RUN IN THE CLOUD.
/*********************************************************    
CHANGE THE URLS ABOVE FOR THE WORKSHOP.    
*********************************************************/ 
var initMessageVar = "<div class='noTwitterMessageClass'>The database microservice<br>has not yet been implemented.</div>";
var jsonObj;
var tagVar;
var twitterFeedFound = false;

// GET THE DATABASE JSON AND CREATE THE PRODUCT DIV AS SOON AS THE PAGE IS LOADED.
function initiateDoc() {   
    initialMessage();  
    getServiceJSON(dbServiceURL, "product");
}    

// CALL A REMOTE REST MICROSERVIVE.        
function getServiceJSON(pathParm, serviceParm) {
    if ((serviceParm == "twitter")&&(!twitterFeedFound)) {
        showNoTwitterFeed();
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jsonObj = JSON.parse(this.responseText);
            if (serviceParm == "product") {
                createProductDiv();
            }
            else {
                twitterFeedFound = true;
                createTwitterDiv();
            }            
        }
    };
    xmlhttp.open("GET", pathParm, true);
    xmlhttp.send();
}

// ASSEMBLE DYNAMIC HTML FOR THE PRODUCT DIV FROM DATA IN THE JSONOBJ OBJECT.
function createProductDiv() {      
    var startVar = "<table><tr><td class='headerClass'>Category</td><td class='headerClass'>Product Name</td><td class='headerClass'>Hash Tag</td></tr>";
    var stringVar = "<div class='noTwitterMessageClass'>The HTML UI javascript file (microservice.js)<br>has not yet been modified.</div>";  
    /*********************************************************    
    UNCOMMENT THE SECTION BELOW FOR THE WORKSHOP - THIS SECTION PARSES AND DISPLAYS DATA FROM THE DATABASE MICROSERVICE.      
    *********************************************************/      
    /*
    stringVar = startVar;
    for (var i in jsonObj.products) {
            stringVar = stringVar + "<tr><td class='categoryClass'><a href='#' onclick='callTwitter(\"" +  jsonObj.products[i].twitterTag  +  
                "\")'>" + jsonObj.products[i].category + 
                "</a></td><td class='productNameClass'><a href='#' onclick='callTwitter(\"" +  jsonObj.products[i].twitterTag  +   "\")'>" +
                jsonObj.products[i].productName + "</td><td class='dbHashtagClass'><a href='#' onclick='callTwitter(\"" +  jsonObj.products[i].twitterTag  +   "\")'>" + 
                jsonObj.products[i].twitterTag + "</td></tr>";            
    }      
    stringVar = stringVar + "</table>"  
    */
    /*********************************************************    
    UNCOMMENT THE SECTION ABOVE FOR THE WORKSHOP     
    *********************************************************/                  
    document.getElementById("productDiv").innerHTML = stringVar; 
    hideTwitterDiv();   
}  

// ASSEMBLE DYNAMIC HTML FOR THE TWITTER DIV FROM DATA IN THE JSONOBJ OBJECT.
function createTwitterDiv() {
    var startVar = "<table><tr><td class='headerClass'>Screen Name</td><td class='headerClass'>Tweet Text" +                            
                        "</td><td class='headerClass'>Hash Tag</td><td class='headerClass'>Date and Time</td></tr>"; 
    stringVar = startVar; 
    for (var k in jsonObj.tweets) {
        if (jsonObj.tweets[k].text) {        
            var hashtagsVar;          
            if (jsonObj.tweets[k].entities.hashtags[0]) {      
                if (jsonObj.tweets[k].entities.hashtags[0].text) {
                    hashtagsVar = jsonObj.tweets[k].entities.hashtags[0].text;                          
                }                           
            }   
            var theDate = new Date(parseInt(jsonObj.tweets[k].timestamp_ms)); //jsonObj.tweets[k].timestamp_ms);
            var month = "0" + (theDate.getMonth()+1); month = month.substr(-2);
            var day = "0" + theDate.getDate(); day = day.substr(-2);        
            var hour = "0" + theDate.getHours(); hour = hour.substr(-2);        
            var minute = "0" + theDate.getMinutes(); minute = minute.substr(-2);        
            var dateString = month + '/' + day + '/' + theDate.getFullYear() + ' ' + hour + ':' + minute;     
            stringVar = stringVar + "<tr><td class='screenNameClass'>" + jsonObj.tweets[k].user.screen_name.trim() + "</td><td class='tweetTextClass'>" +                            
                jsonObj.tweets[k].text.trim() + "</td><td class='twitterTagClass'>" + hashtagsVar.trim() + "</td><td class='twitterTimeClass'>" + 
                dateString + "</td></tr>";                                                        
        }
    }
    if (stringVar == startVar) {
        stringVar = "<div class='noTwitterMessageClass'>There are no tweets<br>for this product.</div>"    
    }   
    else {    
        stringVar = stringVar + "</table>";
    }             
    document.getElementById("twitterDiv").innerHTML = stringVar;   
    showTwitterDiv();   
}

// CALL THE TWITTER MICROSERVICE.
function callTwitter(tagParm) {    
    tagVar = tagParm.replace("#", "%23"); // SINCE # IS A SPECIAL CHARACTER IN A URL, IT IS NECESSARY TO REPLACE IT WITH IT'S ASCII CODE EQUIVALENT.
    getServiceJSON((tweetServiceBaseURL + "/?hashtag=" + tagVar), "twitter");
}

// SHOW THE TWITTER DIV AND HIDE THE PRODUCT DIV.
function showTwitterDiv() {
    document.getElementById("twitterHolderDiv").style.visibility = "visible";
    document.getElementById("twitterDiv").style.visibility = "visible";    
    document.getElementById("productDiv").style.visibility = "hidden"; 
    document.getElementById("instructionLabel").style.visibility = "hidden";  
}

// HIDE THE TWITTER DIV AND SHOW THE PRODUCT DIV.
function hideTwitterDiv() {
    document.getElementById("twitterHolderDiv").style.visibility = "hidden";
    document.getElementById("twitterDiv").style.visibility = "hidden";    
    document.getElementById("productDiv").style.visibility = "visible";
    document.getElementById("instructionLabel").style.visibility = "visible";    
}

// SHOW THE INTERNAL DIV AND HIDE ALL ELSE.  DISPLAY THE INITIAL MESSAGE.
function initialMessage() {
    document.getElementById("twitterHolderDiv").style.visibility = "hidden";
    document.getElementById("twitterDiv").style.visibility = "visible";    
    document.getElementById("productDiv").style.visibility = "hidden"; 
    document.getElementById("instructionLabel").style.visibility = "hidden"; 
    document.getElementById("twitterDiv").innerHTML = initMessageVar;  
}

// SHOW NO TWITTER FEED.
function showNoTwitterFeed() {
    var messageVar = "<div class='noTwitterMessageClass'>The Twitter microservice<br>has not yet been implemented.</div>";
    document.getElementById("twitterHolderDiv").style.visibility = "visible";
    document.getElementById("twitterDiv").style.visibility = "visible";    
    document.getElementById("productDiv").style.visibility = "hidden"; 
    document.getElementById("instructionLabel").style.visibility = "hidden";
    document.getElementById("twitterDiv").innerHTML = messageVar;      
}
