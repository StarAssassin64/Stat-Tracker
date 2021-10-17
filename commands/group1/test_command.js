const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reply",
            group: "group1",
            memberName: "reply",
            description: "Test Command",
            examples: ['reply']
        });
    }
    run(msg) {
        return msg.say('Hello There!');
    }
};