const dotenv = require('dotenv')
const Discord = require('discord.js')
dotenv.config()

const bot = new Discord.Client

const reference = (message, refs) => {
  if (refs === null || refs.length === 0) return
  let {
    content
  } = message
  for (let i = 0; i < refs.length / 2; i++) {
    const idx = i * 2
    content = content.replace(refs[idx], `\`[${i}]\``)
    message.channel.fetchMessage(refs[idx + 1])
      .then(refMsg => {
        message.channel.send(new Discord.RichEmbed()
          .setAuthor(refMsg.author.tag, refMsg.author.avatarURL)
          .setColor(0x1c59bc)
          .setDescription(refMsg.content.slice(0, 256))
          .setTimestamp(new Date(refMsg.createdTimestamp).toISOString())
          .setFooter(`[${i}] : ${refMsg.id}`)
        )
      })
      .catch(e => {
        message.channel.send(`\`[${i}]\` Message not found ${refs[idx + 1]}`)
      })
  }
  message.edit(content)
}

bot.on('ready', () => console.log('bot:main', 'Bot ready'))
bot.on('message', m => console.log(`${m.guild.name}:${m.channel.name}:${m.author.tag} > ${m.content}`))

bot.on('message', m => {
  if (m.author.tag !== m.guild.me.user.tag) return
  const refs = /\{ref:(\d{18})\}/ig.exec(m.content)
  reference(m, refs)
})

process.on('SIGINT', bot.destroy.bind(bot))
bot.login(process.env.DISCORD_TOKEN)

bot.on('error', console.error)