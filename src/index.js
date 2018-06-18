const dotenv = require('dotenv')
const Discord = require('discord.js')
dotenv.config()

const reference = require('./commands/reference')

const bot = new Discord.Client

bot.on('ready', () => console.log('bot:main', 'Bot ready'))
bot.on('message', m => console.log(`${m.guild.name}:${m.channel.name}:${m.member.displayName} > ${m.content}`))

bot.on('message', m => {
  if (m.author.tag !== m.guild.me.user.tag) return
  reference(m)
})

process.on('SIGINT', bot.destroy.bind(bot))
bot.login(process.env.DISCORD_TOKEN)

bot.on('error', console.error)