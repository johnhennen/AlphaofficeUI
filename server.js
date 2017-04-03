var http = require("http");
var fs = require("fs");

// CREATE HTTP SERVER
http.createServer(function(request, response) {
    var fullVar; 
    var htmlVar;
    var cssVar;
    var jsVar;
    	
    // BEGIN ASSEMBLING AN HTML STRING (LIKE AN HTML FILE) THAT INCLUDES A <SCRIPT> CLIENT JAVASCRIPT SECTION AND A <STYLE> CSS SECTION.
    // THIS PROCESS WILL READ IN 3 FILES AND CONCATENATE THEM INTO ONE LONG STRING.
    
    // READ IN THE HTML FILE TO CREATE THE <BODY> SECTION OF THE HTML STRING.	
	fs.readFile('./doc_root/microserviceui.html', function read(error, data) {
        if (error) {
            console.log("htmlvar error: " + error);
        }
        htmlVar = data;   
        cssRead();    
    });

    // READ IN THE CSS FILE TO CREATE THE <STYLE> SECTION OF THE HTML STRING.
    function cssRead() {
        fs.readFile('./doc_root/microserviceui.css', function read(error, data) {
            if (error) {
                console.log("cssvar error: " + error);
            }
            cssVar = data;   
            jsRead();    
        });
    }

    // READ IN THE JS FILE TO CREATE THE <SCRIPT> SECTION OF THE HTML STRING.
    function jsRead() {
        fs.readFile('./doc_root/microserviceui.js', function read(error, data) {
            if (error) {
                console.log("jsvar error: " + error);
            }
            jsVar = data;   
            sendHTML();    
        });
    }

    // CONCATENATE THE SECTIONS TOGETHER AND WRITE TO THE WEB
    function sendHTML() {
        fullVar = "<!DOCTYPE html><meta charset='UTF-8'/><html><head><script type='text/javascript'>" + jsVar + "</script><style>" + 
            cssVar + "</style></head>" + htmlVar + "</html>";
        response.writeHead(200, {'Content-Type': 'text/html' });
        response.end(fullVar, 'utf-8');
    }			
			
}).listen(process.env.PORT || 8001);
