import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface(
    {
        input : process.stdin, //read data
        output : process.stdout // write data
    }
)
const fileCreation = ()=>{
 rl.question("enter the file name:" , (filename)=>{
   rl.question('enter the content for your file:',(content)=>{
     fs.writeFile(`${filename}.txt`,content,(err)=>{   // asyncronous way
        if(err){
            console.error(`error writing the file:, ${err.message}`);
        }else{
            console.log(`File "${filename}.txt" Created successfully`);
        }
        rl.close(); // close the interface
        
        })
     })
   })
};

fileCreation();