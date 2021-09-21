const Discord = require('discord.js')
const moment = require('moment');
require('moment-duration-format');
const client = require('../index')
const db = client.db
module.exports = {
  name: "about",
  cooldown: 5,
  aliases: ["about","info"],
  async execute(msg, args, client) {
    
let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
    const embed = new Discord.MessageEmbed()
    .setTitle(`<SYNE:>yne Bot Discord`)
    .setDescription(`(<:SYNE:>) Syne is Easy and Fast Bot Uptime 24h 7-day a Week<syne_rocket:885156447036530748:>!`)
    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .addField(`<:syne_up:885156189896335420>Guilds: `,`${client.guilds.cache.size}`,true) .addField(`<:syne_members:>Users: `,`${client.users.cache.size}`,true)
    .addField(`<:syne_time:886525993299345438>Published in:`, client.user.createdAt.toLocaleString(),true) .addField(`<:syne_dev:885156555606081596>Bot's Library:`, `discord.js v12.5.0`, true)
    .addField(`<syne_rocket:885156447036530748:>Online Since:`,moment.duration(client.uptime).format('d [days], h [hours], m [minutes], s [seconds]', { trim: "small" }),true)
    .setFooter(`Requester: ${msg.author.username}`, msg.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })) 
    .setColor(embedcolor)
    msg.channel.send(embed)

    
  }
}