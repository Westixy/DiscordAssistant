const localeval = require('localeval')
module.exports = async m => {
  if (m.content.match(/^\{eval\}\n/)) {
    const code = /```(js)\n((.*\n?)+)\n```/igm.exec(m.content)
    if (code === null) return
    m.edit(`\`\`\`${code[1]}\n${code[2]}\n\`\`\`\nResult : \`${localeval(code[2])}\``)
  }
}