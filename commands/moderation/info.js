const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "info",
            group: "moderation",
            memberName: "info",
            description: "Information about the Bot",
            examples: ['reply']
        })
    }
    run(msg) {
        const embed = new MessageEmbed()
            .setAuthor('StarAssassin64')
            .setTitle('Information about Le Tracker')
            .setColor(0xFF0000)
            .setFooter('Bot Information')
            .addField('Created by:', 'StarAssassin64#9196', true)
            .addField('Written in:', 'JavaScript', true)
            .addField('Purpose:', 'For supplying stats for people in games and for some discord moderation', true)
            .addField('Contact:', 'Contact StarAssassin64#9196 or starassassin264@outlook.com')
            .setTimestamp()
        
        return msg.embed(embed)
    }
}