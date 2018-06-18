module.exports = m => {
  const d = new Date
  const p = n => String(n).padStart(2, '0')
  const s = n => String(n).slice(2, 4)
  console.log(`${
    s(d.getUTCFullYear())}/${
    p(d.getUTCMonth()+1)}/${
    p(d.getUTCDate())} ${
    p(d.getUTCHours())}:${
    p(d.getUTCMinutes())} ${
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