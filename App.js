import { RestClientV5} from 'bybit-api';
  ;
// import  crypto from 'crypto'

// const apiKey = 'GWdlIevjvvOkfLDOEg';
// const secretKey = 'nAk6IN7z8c18WyaAPNgugyJ5IQiN4Asu32io'; // замените на ваш секретный ключ
// const timestamp = Date.now();
// const recvWindow = 5000;
// const host = 'api-testnet.bybit.com';
// const endpoint = '/v5/account/wallet-balance';
// const accountType = 'UNIFIED';
// const coin = 'BTC';

// const queryParams = `accountType=${accountType}&coin=${coin}`;
// const signaturePayload = `GET${endpoint}${timestamp}${recvWindow}${queryParams}`;

// const signature = crypto.createHmac('sha256', secretKey).update(signaturePayload).digest('hex');

// const url = `https://${host}${endpoint}?${queryParams}`;

// const headers = {
//   'X-BAPI-API-KEY': apiKey,
//   'X-BAPI-SIGN': signature,
//   'X-BAPI-TIMESTAMP': timestamp,
//   'X-BAPI-RECV-WINDOW': recvWindow,
// };

// const requestOptions = {
//   method: 'GET',
//   headers: headers,
// };

// fetch(url, requestOptions)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('Response:', data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


// url='https://api-testnet.bybit.com';

// var apiKey = "GWdlIevjvvOkfLDOEg";
// var secret = "nAk6IN7z8c18WyaAPNgugyJ5IQiN4Asu32io";
// var recvWindow = 5000;
// var timestamp = Date.now().toString();

// const key = 'GWdlIevjvvOkfLDOEg';
// const secret = 'nAk6IN7z8c18WyaAPNgugyJ5IQiN4Asu32io';

// function getSignature(parameters, secret) {
//   return crypto.createHmac('sha256', secret).update(timestamp + key + recvWindow + parameters).digest('hex');
// }


const key = '0CKILIAuz2E2kpQujw'
const secret = 'Q0y8s6KTwVVc3XR866sD95N8RmRFO8saqD6Q'

const client = new RestClientV5({  
  testnet: true,  
  key: key,
  secret: secret,
});


// Initialize the bot
const bot = new Bot("7195778070:AAGxfcGsRDe26uBHldTMphWXFrYlrwNGiBc");

bot.command("start", async (ctx) => ctx.reply("Welcome! Up and running.")); 

let lastPrice = null
client
  .getMarkPriceKline({
    category: 'linear',
    symbol: 'BTCUSD',
    interval: '15'
  })

  .then((response) => {
    console.log(`Let's go`);
    try {
      lastPrice = response.result.list[0][4];
    } catch (error) {
      console.error('We Have Some Problem Now Try Later', error);
    }
  })
  .catch((error) => {
    console.error(error);
  });


  
   
  


//_____________TELEG_BOT_______________//
bot.hears("Price of BTC", async (ctx) => {
  if (lastPrice) {
    await ctx.reply(`Price: ${lastPrice}`)
  } else {
    await ctx.reply(`Now we can't give you price`)
  }
})


bot.start();

