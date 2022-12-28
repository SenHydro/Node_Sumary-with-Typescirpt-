// use with templates

const http = require("http");
const fs = require("fs");
const url = require("url");

const indexPage0 = fs.readFileSync(
  `${__dirname}/templates/index.html`,
  "utf-8"
);
const productPage1 = fs.readFileSync(
  `${__dirname}/templates/product1.html`,
  "utf-8"
);
const productPage2 = fs.readFileSync(
  `${__dirname}/templates/product2.html`,
  "utf-8"
);
const productPage3 = fs.readFileSync(
  `${__dirname}/templates/product3.html`,
  "utf-8"
);

const server = http.createServer((req: any, res: any) => {
  console.log(url.parse(req.url, true));
  const { pathname, query } = url.parse(req.url, true);
  const pathName11 = req.url;
  console.log(pathName11);
  if (pathname === "/" || pathname === "/index.html" || pathname === "/home") {
    res.end(indexPage0);
  } else if (pathname === "/product") {
    console.log(query.id);
    // Product 1
    if (query.id === "1") {
      res.end(productPage1);
    }
    // Product 2
    else if (query.id === "2") {
      res.end(productPage2);
    }
    // Product 3
    else if (query.id === "3") {
      res.end(productPage3);
    }
  } else {
    let htmlcode = `
    <div style="background-color:yellow">
        <h1>Not Found</h1>
        <h1>Somewhere beyond the sea</h1>
        <p style="color:red">Somewhere waiting for me<p>
        </div>`;
    res.writeHead(404);
    res.end(htmlcode);
  }
});

server.listen(2000, "localhost", () => {
  console.log("start server port 2000");
});
