const dotenv = require('dotenv')
const Discord = require('discord.js')
dotenv.config()

const mods = [
  require('./mods/reference'),
  require('./mods/evaluator')
]
const logger = require('./logger')
const bot = new Discord.Client

bot.on('ready', () => console.log('bot:main', 'Bot ready'))

bot.on('message', m => {
  logger(m)
  if (m.author.tag !== m.client.user.tag) return
  for (const mod of mods) mod(m)
})

process.on('SIGINT', bot.destroy.bind(bot))
bot.login(process.env.DISCORD_TOKEN)

bot.on('error', console.error)