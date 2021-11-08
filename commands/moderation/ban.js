const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            group: "moderation",
            memberName: "ban",
            description: "Its for banning people, DUH",
            examples: ['ban @StarAssassin64 existing', 'ban @StarAssassin64'],
            args: [
                {
                    name: 'userid',
                    description: "The UserID (or @) of a person",
                    type: 'user'
                },
                {
                    name: 'reason',
                    description: 'Reason why you are banning a person',
                    type: 'string',
                    default: 'N/a'
                }
            ]
        })
    }
    run(msg, {userid, reason}) {
        if(!msg.member.hasPermission('BAN_MEMBERS')) {
            return msg.channel.send(`**${msg.author.username}**, You don't have permission to use this, dummy!`)
        }

        if(!msg.guild.me.hasPermission('BAN_MEMBERS')) {
            return msg.channel.send(`**${msg.author.username}**, I don't have permission to use this command. Contact an Administrator now!`)
        }

        let target = userid

        if (!target) {
            return msg.channel.send(`**${msg.author.username}**, You forgot to mention a person, dummy.`)
        }

        if (target.id === msg.author.id) {
            return msg.channel.send(`**${msg.author.username}**, You can't ban yourself, stupid!`)
        }

        const embed = new MessageEmbed()
            .setAuthor('StarAssassin64')
            .setTitle('Banned Member')
            .setDescription(`${msg.author.username} banned ${userid}`)
            .setColor(0xFF0000)
            .addField('Reason:', `**${reason}**`, false)
            .setTimestamp
            .setFooter('Moderation Commands')

        guild.members.ban(userid)
            .then( user => console.log(`${msg.author.username || msg.author.id || msg.author} banned ${user.username || user.id || user} from ${guild.name}`))
            .catch(console.error);

        return msg.embed(embed)
        
    }
}
