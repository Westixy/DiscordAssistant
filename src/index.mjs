import dotenv from 'dotenv'
import Discord from 'discord.js'
import debug from 'debug'
import CommandManager from './commands.js'

import evaluator from './commands/evaluator'

dotenv.config()

const CM = CommandManager.init()
const bot = new Discord.Client

CM.addCommand('eval', evaluator)

bot.on('ready', () => debug('bot:main', 'Bot ready'))
bot.on('message', CM.messageHandler)
process.on('SIGINT', () => {
  bot.destroy()
})
bot.login(process.env.DISCORD_TOKEN)