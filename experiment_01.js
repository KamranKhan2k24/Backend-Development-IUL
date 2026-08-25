const fs = require("fs");
fs.writeFile("student.txt", "Welcome to Node.js", (err) => {
  if (err) console.log(err);
  else console.log("File Created");
});
fs.readFile("student.txt", "utf8", (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});
fs.appendFile("student.txt", "\nThis is new data.", (err) => {
  if (err) console.log(err);
  else console.log("File Updated");
});