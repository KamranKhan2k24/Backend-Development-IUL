const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.write("helllo! This is my first http server,");
  res.end(); //end the response
});
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});