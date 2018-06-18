const dotenv = require('dotenv')
const Discord = require('discord.js')
dotenv.config()

const bot = new Discord.Client

const reference = async message => {
  const getRef = c => /\{ref:(\d{18})\}/img.exec(c)
  const refs = []
  let {
    content
  } = message
  let i = 0
  for (let ref = getRef(content); ref !== null; ref = getRef(content)) {
    content = content.replace(ref[0], `\`*${i}\``)
    refs.push(ref[1])
    i++
  }
  if (refs.length === 0) return
  message.edit(content)
  for (let i = 0; i < refs.length; i++) {
    try {
      const refMsg = await message.channel.fetchMessage(refs[i])
      message.channel.send(new Discord.RichEmbed()
        .setAuthor(refMsg.member.displayName, refMsg.author.avatarURL)
        .setColor(0x1c59bc)
        .setDescription(refMsg.content.slice(0, 256))
        .setTimestamp(new Date(refMsg.createdTimestamp).toISOString())
        .setFooter(`*${i} : ${refMsg.id}`))
    } catch (e) {
      message.channel.send(`\`*${i}\` Message not found ${refs[i]}`)
    }
  }
}

bot.on('ready', () => console.log('bot:main', 'Bot ready'))
bot.on('message', m => console.log(`${m.guild.name}:${m.channel.name}:${m.author.tag} > ${m.content}`))

bot.on('message', m => {
  if (m.author.tag !== m.guild.me.user.tag) return
  reference(m)
})

process.on('SIGINT', bot.destroy.bind(bot))
bot.login(process.env.DISCORD_TOKEN)

bot.on('error', console.error)