const { Command } = require('discord.js-commando');
const https = require('https');
const { key } = require('./key.json');


module.exports = class LifetimeStats extends Command {
    constructor(client) {
        super(client, {
            name: 'spltstats',
            group: "splitgate",
            memberName: "spltstats",
            description: "Displays the Lifttime Stats of a user on Splitgate using Tracker.GG",
            examples: ["spltstats psn starassassin64", 'spltstats xbl starassassin264', 'spltstats steam 76561198306367184'],
            args: [
                {
                    key: "platform",
                    prompt: "What platform are you looking up?",
                    type: "string"
                },
                {
                    key: "platID",
                    prompt: "What is the Platform ID (Xbox is your gamertag, PSN is your PsID, Steam is your SteamID64)?",
                    type: "string"
                }
            ]
        });
    }
    run(msg, { platform, platID}) {
        const options = {
            'method' : 'GET',
            'hostname' : 'public-api.tracker.gg',
            'port' : null,
            'path': "/v2/splitgate/standard/profile/" + platform + "/" + platID,
            'headers': {
                "TRN-Api-Key": key,
                "Accept": "applications/json",
                "Accpet-Encoding": "gzip"
            }
        };
        const req = https.request(options, (res) => {
            console.log(https.ClientRequest)
        });
        req.on('eror', (e) => {
            console.error(e);
        });
        req.end();
        return msg.say('Check Console!');
    }
}