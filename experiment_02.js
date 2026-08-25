const url = require("url");
const address = "https://www.google.com/search?q=nodejs";
const myurl = new URL(address);
console.log("Protocol:", myurl.protocol);
console.log("Host:", myurl.host);
console.log("Hostname:", myurl.hostname);
console.log("Pathname:", myurl.pathname);
console.log("Search:", myurl.search);