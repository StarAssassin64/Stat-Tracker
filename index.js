const {token, cpf, OwnerID, discord_URL} = require('./config.json');
const { CommandoClient } = require('discord.js-commando');
const fetch = require('node-fetch');

const client = new CommandoClient({
    commandPrefix: cpf,
    owner: OwnerID,
    disableEveryone: true
});

var disCommandHead = {
    "Authorization": "Bot ODg3ODI3MDUxNDEzODk3MjE2.YUJzYA.2pa6NJEr4W1v28cD5qPBKSvj_Yk"
}
var disCommands = {
    "name": 'spltstats',
    'type': 1,
    'description': 'Splitgate Lifetime Stats from Tracker.GG',
    'options': [{
        'name': 'Platform',
        'description': 'What platform is being used',
        'type': 3,
        'required': true,
        'choices': [
            {
                'name': "Playstation",
                'value': 'psn'
            },
            {
                'name': 'Xbox',
                'value': 'xbl'
            },
            {
                'name': 'Steam',
                'value': 'steam'
            }
        ]
    },
    {
        'name': 'Platform ID',
        'description': 'Either your SteamID64, XBL Gamertag, or your PSN Username',
        'type': 3,
        'required': true
    }]
}

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['group1', 'Default Group'],
        ['splitgate', "Commands for Splitgate"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(__dirname + "/commands");

client.on('ready', () => {
    fetch(discord_URL, {
        method: 'POST',
        body: JSON.stringify(disCommands),
        headers: disCommandHead
    })
    console.log('Logged in......');
    client.user.setActivity('Splitgate');
});

client.login(token)

