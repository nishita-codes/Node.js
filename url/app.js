
import { readFile } from "fs/promises";
import {createServer} from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3002;

const server = createServer(async (req , res)=>{
    console.log(req.url);
  if(req.method === "GET"){
    if(req.url === "/"){
        try{
        const filePath = path.join(__dirname, "public", "index.html");
        const data = await readFile(filePath);
        res.writeHead(200, {"Content-Type":"text/html"});
        res.end(data);
        }catch(error){
          res.writeHead(404,{'Content-Type': 'text/html'});
          res.end("404 page not found hiii");
        }
    }else if(req.method === "GET"){
    if(req.url === "/style.css"){
        try{
        const cssPath = path.join(__dirname, "public", "style.css");
        const data = await readFile(cssPath);
        res.writeHead(200, {"Content-Type":"text/css"});
        res.end(data);
        }catch(error){
          res.writeHead(404,{'Content-Type': 'text/html'});
          res.end("404 page not found");
        }
      }
  }
 }
});

server.listen(PORT ,()=>{
    console.log(`server running at http://localhost:${PORT}`);
});


