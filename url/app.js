
import { readFile } from "fs/promises";
import {createServer} from "http";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import { writeFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3002;
const DATA_FILE = path.join("data" , "links.json")

const loadLinks = async() =>{
  try{
    const data = await readFile(DATA_FILE,"utf-8");
    return JSON.parse(data);
  }catch(error){
    if(error.code === "ENOENT"){
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
}

const saveLinks = async (links) =>{
  await writeFile(DATA_FILE, JSON.stringify(links))
}

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
    }else if(req.url === "/style.css"){
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
  if(req.method === "POST" && req.url === "/shorten"){
    const links = await loadLinks();
    let body = "";
    req.on("data" , (chunk)=> (body += chunk));
    req.on("end",async()=>{
      console.log(body);
      const {url , shortCode} = JSON.parse(body);

      if(!url){
        res.writeHead(400 , {"Content-Type":"text/plain"});
        return res.end("URL is required");
      }

      const finalShortCode = shortCode || crypto.randomBytes(4).tostring("hex");

      if(links[finalShortCode]){
         res.writeHead(400 , {"Content-Type":"text/plain"});
        return res.end("Short Code already exists.Please choose another.");
      }

      links[finalShortCode] = url;
      await saveLinks(links);
      
      res.writeHead(200 , {"Content-Type":"application/json"});
      res.end(JSON.stringify({success:true , shortCode : finalShortCode}))
    });
  }
});

server.listen(PORT ,()=>{
    console.log(`server running at http://localhost:${PORT}`);
});


