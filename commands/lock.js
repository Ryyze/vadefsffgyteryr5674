const Discord = require('discord.js');
const client = require('../index')
const db = client.db
module.exports = {
  name: "lock",
  cooldown: 0,
  async execute(msg, args) {
    
let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
    
    const perm = new Discord.MessageEmbed()
        .setDescription(`**${msg.author.username}**,** You Don't Have \`MANAGE_CHANNELS\`**`)
    .setColor(embedcolor)
    

   
        const enperms = new Discord.MessageEmbed()
        .setDescription(`**${msg.author.username}**, **I Don't Have \`MANAGE_CHANNELS\`**`)
    .setColor(embedcolor)
    
              const done = new Discord.MessageEmbed()
        .setDescription(`**<#${msg.channel.id}> Has Been Locked :closed_lock_with_key: **`)
    .setColor(embedcolor)
             
    
if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(enperms);
if(!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.channel.send(perm);
           msg.channel.createOverwrite(msg.guild.id, {
         SEND_MESSAGES: false
           }).then(() => {
             msg.channel.send(done)
}
                   )
    }

}