import telebot
import instaloader
import os

# Telegram bot token
TOKEN = "7484789302:AAFBOAYZFb7_p0ctxykfH7xA2VIJQF667oQ"
bot = telebot.TeleBot(TOKEN)

# Instaloader obyekti
i_loader = instaloader.Instaloader()

@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "Salom! Instagram video yuklovchi botga xush kelibsiz. Menga Instagram video havolasini yuboring.")

@bot.message_handler(func=lambda message: True)
def download_instagram_video(message):
    url = message.text
    
    if "instagram.com" not in url:
        bot.reply_to(message, "Iltimos, to'g'ri Instagram havolasini yuboring!")
        return
    
    try:
        bot.reply_to(message, "Videoni yuklab olish jarayoni boshlandi...⏳")
        
        post = instaloader.Post.from_shortcode(i_loader.context, url.split("/")[-2])
        video_url = post.video_url
        
        if video_url:
            bot.send_video(message.chat.id, video_url)
        else:
            bot.reply_to(message, "Bu havolada video topilmadi! ❌")
    except Exception as e:
        bot.reply_to(message, f"Xatolik yuz berdi: {str(e)}")

if __name__ == "__main__":
    print("Bot ishga tushdi...")
    bot.polling(none_stop=True)
