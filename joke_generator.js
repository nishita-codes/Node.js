import https from "https";
import chalk from "chalk";

const getJoke = ()=>{
    const url = 'https://official-joke-api.appspot.com/random_joke';

    https.get(url, (response) =>{
        let data ="";
     response.on('data' , (chunk)=>{  //chunk ---data one by one deta hai
         data += chunk; 
     });
     response.on('end' , () =>{          //ek time esa aayega jb data khtm ho jaayega tb hum end use krenge 
        const joke = JSON.parse(data);
        console.log(`Here is a random ${joke.type} joke:`);
        console.log(chalk.red(`${joke.setup}`));
        console.log(chalk.blue.bgRed.bold(`${joke.punchline}`));

     })   
     response.on('error',(err)=>{
        console.log(`error fetching the joke, ${err.message}`)
     })      
    })
}
getJoke();