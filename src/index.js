const dotenv = require('dotenv')
const Discord = require('discord.js')
dotenv.config()

const reference = require('./commands/reference')
const evaluator = require('./commands/evaluator')

const bot = new Discord.Client

bot.on('ready', () => console.log('bot:main', 'Bot ready'))
bot.on('message', m =>
  console.log(`${
    m.guild
      ? m.guild.name
      : 'MP'}:${
    m.channel.type !== 'dm'
      ? m.channel.name
      : m.channel.recipient.username}:${
    m.member
      ? m.member.displayName
      : m.author.username} > ${m.content}`))

bot.on('message', m => {
  if (m.author.tag !== m.client.user.tag) return
  reference(m)
  evaluator(m)
})

process.on('SIGINT', bot.destroy.bind(bot))
bot.login(process.env.DISCORD_TOKEN)

bot.on('error', console.error)