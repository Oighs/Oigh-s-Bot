const Discord = require("discord.js")
const bot = new Discord.Client()
bot.login("MzI5NTY4NDMzNTk3NTc5MjY4.DDVGPw.emkpj8hBXdnrYkzWgLV1i5rS3_Y")
bot.on("ready", ()=>{
    bot.setGame("Trolololololol")
})

bot.on("message", msg=>{
    if(msg.content === "id") {
        msg.channel.send(bot.user.id)
    }
})