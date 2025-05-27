import https from "https";
import readline from "readline";
import chalk from "chalk"; // just for styling in terminal

const rl =readline.createInterface({
    input :process.stdin,
    output: process.stdout
})
const api_key = 'c9770dd5bb4adb71ab6c6857';
const url =`https://v6.exchangerate-api.com/v6/${api_key}/latest/USD`;

const convertCurrency =(amount , rate)=>{
    return (amount * rate).toFixed(2);
}

https.get(url,(response)=>{
    let data = "";
  response.on('data', (chunk)=>{
    data += chunk;   
  })

  response.on('end',()=>{
    const rates = JSON.parse(data).conversion_rates;


    rl.question("Enter the amount in USD: ",(amount)=>{
        rl.question('Enter the target currency(e.g., INR,NPR,EUR):',(currency)=>{
           const rate = rates[currency.toUpperCase()];
           if(rate){
            console.log(chalk.black.bgWhite.bold(`${amount} USD is approximately ${convertCurrency(amount , rate)} ${currency}`));
           }else{
            console.log('Invalid Currency Code');
           }
           rl.close();
        })
    })
  })
})