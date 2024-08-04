const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config()
const token =process.env.TOKEN;
const {downloaderMethod}=require('./request')
const bot=new TelegramBot(token, {polling: true});

bot.on("message", async (msg) => {
    try{
           const chatId=msg.chat.id;
           if(msg.text === "/start"){
              const name = msg.from.first_name;
              const lastname = msg.from.last_name;
              await bot.sendMessage(
                chatId,
                `Assalomu Aleykum <pre><b>${name}</b> <b>${
                  lastname ? lastname : ""
                }</b></pre> botimizga xush kelibsiz.\nBotga instagram vidio linkini yuboring va uni siz yuklab beramiz`,
                {
                  parse_mode: "HTML",
                }
              );
           }
           const getVideaUrl=await downloaderMethod(msg.text)
         if(getVideaUrl){
           const loadingMessage = await bot.sendMessage(
             chatId,
             "Biroz kuting..."
           );
            setTimeout(async () => {
              await bot.deleteMessage(
                loadingMessage.chat.id,
                loadingMessage.message_id
              );
            }, 500);
            await bot.sendVideo(chatId, getVideaUrl.videoURL, {
              caption: "Tuzuvchi Muhsinbek Mirzamatov",
            });
            await bot.deleteMessage(
              loadingMessage.chat.id,
              loadingMessage.message_id
            );
         }else if(msg.text === "/video"){
               await bot.sendMessage(chatId, "Video linkini yuboring")
            }else if(msg.text.toLocaleLowerCase()==="salom"){
              await bot.sendMessage(chatId, "Assalomu Aleykum")
            }else if(msg.text.toLocaleLowerCase()==="seni kim tuzgan"){
              await bot.sendMessage(chatId, "Meni Muhsinbek Mirzamatov tuzgan")
            }else if(msg.text.toLocaleLowerCase()==="tuzuvching kim"){
              await bot.sendMessage(chatId, "Muhsinbek Mirzamatov tuzuvchi")
            }
    }catch(err){
        console.log(err);;
    }
})
