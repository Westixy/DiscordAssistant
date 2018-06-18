module.exports = m => console.log(`${
  m.guild
    ? m.guild.name
    : 'MP'}:${
  m.channel.type !== 'dm'
    ? m.channel.name
    : m.channel.recipient.username}:${
  m.member
    ? m.member.displayName
    : m.author.username} > ${m.content}`)