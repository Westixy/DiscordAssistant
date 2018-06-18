module.exports = m => {
  const d = new Date
  console.log(m)
  console.log(`${d.getUTCFullYear()}.${
    d.getUTCMonth()}.${
    d.getUTCDate()}-${
    d.getUTCHours()}:${
    d.getUTCMinutes()} ${
    m.guild
      ? m.guild.name
      : 'MP'}:${
    m.channel.type !== 'dm'
      ? m.channel.name
      : m.channel.recipient.username}:${
    m.member
      ? m.member.displayName
      : m.author.username} > ${
    m.content}`)
}