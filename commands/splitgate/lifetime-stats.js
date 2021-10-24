const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
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
        fetch(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${platID}`, {
            'method' : 'GET',
            'headers' : {
                "TRN-Api-Key": key,
                "Accept": "applications/json",
                "Accpet-Encoding": "gzip"
            }})
            .then(res => res.json())
            .then(json => {
                if (json.data.platformInfo.platformSlug === "psn") {
                    var logos = ' <:pslogo:888941851942481950>'
                } else if (json.data.platformInfo.platformSlug === "steam") {
                    var logos = ' <:steamlogo:888941969487839232>'
                } else {
                    var logos = ' <:xblogo:888941921278521364>'
                }

                if (json.data.segments[0].stats.rankLevel.value === null) {
                    var rank = 0
                } else {
                    var rank = 1
                }

                if (rank = 1) {
                    var rankName = json.data.segments[0].stats.rankLevel.metadata.rankName
                    var rankIMG = json.data.segments[0].stats.rankLevel.metadata.imageURL
                } else {
                    var rankName= "Not Ranked"
                    var rankIMG = "https://static.wikia.nocookie.net/splitgate_gamepedia_en/images/a/a7/No_Rank_-_Rank_-_Splitgate.png/revision/latest/scale-to-width-down/50?cb=20210809111258"
                }

                const embed = new MessageEmbed()
                    .setAuthor('StarAssassin64')
                    .setTitle('Splitgate Lifetime Stats')
                    .setURL(`https://tracker.gg/splitgate/profile/${platform}/${platID}/overview`)
                    .setColor(0xFF0000)
                    .setFooter('Splitgate Stats from Tracker.gg')
                    .addField('Data for:', `${json.data.platformInfo.platformUserHandle}${logos}`)
                    .addField('Kill Data:', `Kills: ${json.data.segments[0].stats.kills.displayValue} | Assists: ${json.data.segments[0].stats.assists.displayValue} | Deaths: ${json.data.segments[0].stats.deaths.displayValue}`)
                    .addField('Match Data:', `Matches: ${json.data.segments[0].stats.matchesPlayed.displayValue} | Wins: ${json.data.segments[0].stats.wins.displayValue} | Losses: ${json.data.segments[0].stats.losses.displayValue} | W/L Ratio (Percentage): ${json.data.segments[0].stats.wlPercentage.displayValue} `)
                    .addField('Gameplay Data:', `Accuracy: ${json.data.segments[0].stats.shotsAccuracy.displayValue} | K/D: ${json.data.segments[0].stats.kd.displayValue} | K/D percentile: ${JSON.stringify(json.data.segments[0].stats.kd.percentile)}%`)
                    .addField('Other Data:', `Rank: ${rankName} | Level: ${json.data.segments[0].stats.progressionLevel.displayValue} | Total Earned Points: ${json.data.segments[0].stats.points.displayValue} | Teabags: ${json.data.segments[0].stats.teabags.displayValue}`)
                    .setThumbnail(rankIMG)
                    .setTimestamp()
                
                return msg.embed(embed);
            });
            
        return msg.say('Check Console!');
        };
    }; 
