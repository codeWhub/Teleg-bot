import { RestClientV5} from 'bybit-api';
import { Bot, InlineKeyboard, Keyboard, InputFile } from "grammy"

// const key = 'i6DQJ4re6Xnj1Dhfl0'
// const secret = 'Q6dyTxk6FdvTVrZotjN5Vg9P285JtzJ00Xrn'
const bot = new Bot("7195778070:AAGxfcGsRDe26uBHldTMphWXFrYlrwNGiBc");
const key = 'Q9eRMEfhAFd7B66FtS'
const secret = 'fAVNtitENQAi42tnNqXFHjikrP8DjgESRwK0'

const client = new RestClientV5({
    key: key,
    secret: secret,
    parseAPIRateLimits: true,
    demoTrading: true,
  });
  
  // (async () => {
  
    //     const balance1 = await client.getWalletBalance({
    //       accountType: 'UNIFIED',
    //     });
    //     console.log('balance1: ', JSON.stringify(balance1, null, 2));
  
    

    // client
    // .getActiveOrders({
    //     category: 'linear',
    //     symbol: 'ETHUSDT',
    //     openOnly: 0,
    // })
    // .then((response2) => {
    //     console.log(response2);
    // })
    // .catch((error) => {
    //     console.error(error);
    // });


//__________________PRICE_________________//
bot.hears('BTC', async (ctx) => {
    try {
        // Fetch the BTC price
        const price = await client.getMarkPriceKline({
            category: 'linear',
            symbol: 'BTCUSD',
            interval: '15',
        });

        // Reply with the BTC price
        ctx.reply(`Price of BTC: ${price.result.list[0][4]}`);
    } catch (error) {
        // Handle errors
        console.error(error);
        ctx.reply('Failed to fetch the price of BTC.');
    }
});
//_____________________SUBMIT ORDER__________________//
let coin = null
let qty = null
let category = null
let type = null
let side = null
bot.hears('Order', async (ctx) => {
    try {
        await ctx.reply('Which coin ? (Example: BTCUSDT')
        bot.on('message', async (ctx) => {
            coin = ctx.message.text
        })

        await ctx.reply('What quantity?')
        if (ctx.message.text !== 0 || ctx.message.text !== -1) {
            bot.on('message', async (ctx) => {
                qty = ctx.message.text
            })
        }

        await ctx.reply('Category? (spot, linear, inverse)')
        bot.on('message', async (ctx) => {
            category = ctx.message.text
        })

        await ctx.reply('Type of order? (Market, Limit)')
        bot.on('message', async (ctx) => {
            type = ctx.message.text
        })

        await ctx.reply('(Buy/Sell) ?')
        bot.on('message', async (ctx) => {
            side = ctx.message.text
        })

        client
            .submitOrder({
                category: category,
                symbol: coin,
                side: side,
                orderType: type,
                qty: qty,
            });
        ctx.reply('Order placed successfully')
    } catch (error)  {
        console.log("Error", error);
    }
}) 








// bot.hears('Order', async (ctx) => {
//     try {
//         await ctx.reply('Which coin ? (Example: BTCUSDT)');
//         bot.on('message', async (ctx) => {
//             const symbol = ctx.message.text;
            
//             await ctx.reply('What quantity?');
//             bot.on('message', async (ctx) => {
//                 const qty = ctx.message.text;
                
//                 await ctx.reply('Category? (spot, linear, inverse)');
//                 bot.on('message', async (ctx) => {
//                     const category = ctx.message.text;
                
//                     await ctx.reply('Type of order? (Market, Limit)');
//                     bot.on('message', async (ctx) => {
//                         const orderType = ctx.message.text;
                    
//                         await ctx.reply('(Buy/Sell) ?');
//                         bot.on('message', async (ctx) => {
//                             const side = ctx.message.text;
                            
//                             client
//                                 .submitOrder({
//                                     category: category,
//                                     symbol: symbol,
//                                     side: side,
//                                     orderType: orderType,
//                                     qty: qty,
//                                 });

//                                 ctx.reply('Order placed successfully')
//                                 .catch((error) => {
//                                     console.error(error);
//                                     ctx.reply(`Error when placing an order: Check that you did everything correctly. If the error persists contact us`);
//                                 });
//                         });
//                     });
//                 });
//             });
//         });
    
//     } catch (e) {
//         console.log('Error', e);
//     }
// });
//_____________________END_____________________//


//____________________WALLET BALANCE_______________________//

bot.hears('wallet', async (ctx) => {
    const balance1 = await client.getWalletBalance({
            accountType: 'UNIFIED',
        })
        ctx.reply(`Wallet balance: ${JSON.stringify(balance1.result.list[0].totalEquity, null, 2)}$`)
    // console.log('balance1: ', JSON.stringify(balance1, null, 2));
})


//____________________END_____________________//
bot.start()