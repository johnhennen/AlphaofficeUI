## Introduction

This is the Git repository for the Node.js UI frontend module for the **Oracle Public Cloud DevOps Cloud Native Microservices-DB Workshop.** There are no dependencies for this Node.js module.  The main js file for this Node.js module is server.js.  This module performs two very simple functions:
- First server.js reads the 3 files from the doc_root directory (microservice.html with html code, microservice.js with client js code and microservice.css with css code).  The server.js code then constructs a full HTML page with a "style" section and "script" section by concatenating the contents of the three files.
- The server.js code then writes this concatenated HTML string to the web.