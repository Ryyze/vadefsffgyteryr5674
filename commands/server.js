const Discord = require("discord.js");
const moment = require('moment')
const client = require('../index')
const db = client.db
module.exports = {
  name: "server",
  cooldown: 5,
  async execute(msg, args) {

  
    let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
    

    
      const embed = new Discord.MessageEmbed()
 .setAuthor(`${msg.guild.name} Info`,msg.guild.iconURL())
    .setThumbnail(msg.guild.iconURL())
      .addField("> Guild", `>>> **Name : ${msg.guild.name}
ID: (${msg.guild.id})
Owner: ${msg.guild.owner}**`)
      .addField("> Guild Details",
`>>> **Region: \`${msg.guild.region.toString().toUpperCase()}\`
Members: \`${
msg.guild.members.cache.size}\` Bots: \`${msg.guild.members.cache.filter(m=>m.user.bot).size}\`
AfkChannel: \`${msg.guild.afkChannel || "None"}\` AfkTime: \`${msg.guild.afkTimeout / 60} Minutes\`
Verification: \`${msg.guild.verificationLevel}\`
Server Channels: \`🔊\`${msg.guild.channels.cache.filter(m => m.type === 'voice').size} \`#\`${msg.guild.channels.cache.filter(m => m.type === 'text').size}
Server Roles: \`${msg.guild.roles.cache.size}\`
Server Emoji:\`${msg.guild.emojis.cache.size}\`
Server Creation Date: \`${moment(msg.guild.createdTimestamp).format("YYYY/M/D HH:mm:ss")}\`
Server Boosts Count : \`${msg.guild.premiumSubscriptionCount}\`
Server Boost Level : \`${msg.guild.premiumTier}\`
**`)
.setThumbnail(msg.guild.iconURL())
.setImage(msg.guild.bannerURL({size: 1024}))
.setFooter(`Requested By ${msg.author.username}`, msg.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })) 
.setColor(embedcolor)  
       
    msg.channel.send(embed);
    
    
    
 }
}