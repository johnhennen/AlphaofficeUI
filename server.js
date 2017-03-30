var http = require("http");
var fs = require("fs");

// REDIRECT TO A STATIC HTML PAGE.
http.createServer(function(request, response) {
    var fullVar; 
    var htmlVar;
    var cssVar;
    var jsVar;
    	
	fs.readFile('./doc_root/microserviceui.html', function read(error, data) {
        if (error) {
            console.log("htmlvar error: " + error);
        }
        htmlVar = data;   
        cssRead();    
    });

    function cssRead() {
        fs.readFile('./doc_root/microserviceui.css', function read(error, data) {
            if (error) {
                console.log("cssvar error: " + error);
            }
            cssVar = data;   
            jsRead();    
        });
    }

    function jsRead() {
        fs.readFile('./doc_root/microserviceui.js', function read(error, data) {
            if (error) {
                console.log("jsvar error: " + error);
            }
            jsVar = data;   
            sendHTML();    
        });
    }

    function sendHTML() {
        fullVar = "<!DOCTYPE html><meta charset='UTF-8'/><html><head><script type='text/javascript'>" + jsVar + "</script><style>" + 
            cssVar + "</style></head>" + htmlVar + "</html>";
        response.writeHead(200, {'Content-Type': 'text/html' });
        response.end(fullVar, 'utf-8');
    }			
			
}).listen(8001);
