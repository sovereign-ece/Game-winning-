from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # This button opens your GitHub game link inside Telegram
    keyboard = [
        [InlineKeyboardButton("Play Efikcoin Clicker 🚀", web_app={"url": "https://efikcoin-eternal-blockchain.github.io/ECE-Wallet/game.html"})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "Welcome to Efikcoin Eternal! 💎\n\nTap the button below to start mining and earn rewards.",
        reply_markup=reply_markup
    )

if __name__ == '__main__':
    app = ApplicationBuilder().token("YOUR_BOTFATHER_TOKEN").build()
    app.add_handler(CommandHandler("start", start))
    print("Bot is running...")
    app.run_polling()
