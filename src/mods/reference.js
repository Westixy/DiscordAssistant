const Discord = require('discord.js')

module.exports = async message => {
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
        .setDescription(refMsg.content.length < 256
          ? refMsg.content
          : `${refMsg.content.slice(0, 253)}...`
        )
        .setTimestamp(new Date(refMsg.createdTimestamp).toISOString())
        .setFooter(`*${i} : ${refMsg.id}`))
    } catch (e) {
      message.channel.send(`\`*${i}\` Message not found ${refs[i]}`)
    }
  }
}