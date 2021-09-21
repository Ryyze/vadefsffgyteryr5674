const Discord = require('discord.js');
const client = require('../index')
const db = client.db
module.exports = {
  name: "roles",
  cooldown: 5,
  description:"Show guild roles",
  async execute(msg, args, client) {
    
     let embedcolor = await db.fetch(`embedcolor_${msg.guild.id}`)
    if (embedcolor === null) embedcolor = '#0000FF'
      let roles = msg.guild.roles.cache
      .map(r => `**<@&${r.id}> - Users ${r.members.size}**`)
      .slice(0, 20)
      .join("\n");
    let embed = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setTitle("**Server Roles**")
      .setDescription(roles);
    
    msg.channel.send(embed)
}
 
}