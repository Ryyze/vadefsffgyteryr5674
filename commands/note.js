const Discord = require('discord.js')
const ms = require("parse-ms");
const client = require('../index')
const db = client.db
module.exports = {
  name: "note",
  cooldown: 5,
  async execute(msg, args, client) {
      let Blacklist = await db.fetch(`blacklist_${msg.author.id}`);
  if (Blacklist == "on") return;
       let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#b256b6";
    
    //EMBEDS
    
    let one = new Discord.MessageEmbed()
    .setDescription(`<:749753030899007620:749779549574922301> **Please Type A Valid Note**`)
    .setColor(embedcolor);
    
    let long = new Discord.MessageEmbed()
    .setDescription(`**<:749753030899007620:749779549574922301> Your Note Is Too Long**`)
    .setColor(embedcolor);
    
    let done = new Discord.MessageEmbed()
    .setDescription(`**<:outputonlinepngtools1:750100409892339896> Note Updated**`)
    .setColor(embedcolor);
    
    
    //END EMBEDS
    let noty = args.join(" ");
       if(Blacklist === 'on') return;
    if(msg.mentions.users.size >= 1) return msg.reply("<:749753030899007620:749779549574922301> Error !");
    if(noty.length < 1) return msg.reply(one)
    if(noty.length > 30) return msg.reply(long)



db.set(`note_${msg.author.id}`, noty)
msg.channel.send(done);
    
    
  }
}