const Discord = require('discord.js')
const client = require('../index')
const db = client.db
module.exports = {
  name: "autoroleinfo",
  cooldown: 5,
  async execute(msg, args) {
    
   let embedcolor = await db.fetch(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
  
  let autoroler = await db.fetch(`autoroler_${msg.guild.id}`)
  let autorole = await db.fetch(`autorole_${msg.guild.id}`)
  if(autorole == null) autorole = "False"
      if(autoroler == null) autoroler = "Not Set"
    
    let embed = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setTitle(`**Auto Role Information**`)
    .setDescription(`
**AutoRole Enabled : ${autorole}**
**AutoRole Name : ${autoroler}>**
` )
    
    msg.channel.send(embed)
}
} 