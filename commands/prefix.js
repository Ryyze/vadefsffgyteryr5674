const Discord = require('discord.js');
const client = require('../index')
const db = client.db
const mongoose = require("mongoose");
const GuildSettings = require("../models/settings");
mongoose.connect("mongodb+srv://Mazen:XpfAireuu7MXfrK4@cluster0.o3sxi.gcp.mongodb.net/bot?retryWrites=true&w=majority", {
useNewUrlParser: true,
  useUnifiedTopology: true
});
module.exports = {
  name: "prefix",
  cooldown: 0,
  async execute(msg, args) {
  	  var storedSettings = await GuildSettings.findOne({ gid: msg.guild.id });
  if (!storedSettings) {
    const newSettings = new GuildSettings({
      gid: msg.guild.id
    });
    await newSettings.save().catch(()=>{});
    storedSettings = await GuildSettings.findOne({ gid: msg.guild.id });
  }
  let prefix = storedSettings.prefix;
  	   let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#b256b6";
    
    const perm = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, <:749753030899007620:749779549574922301> **You Don't Have \`ADMINISTRATOR\`.**`)
    .setColor(embedcolor)
        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(perm)
        
  let prefix1 = msg.content.split(" ").slice(1).join(" ");
  let embbed = new Discord.MessageEmbed()
  .setDescription(`${msg.author}, **Please Type New Prefix**.`)
  .setColor(embedcolor)
if(!prefix1) return msg.channel.send(embbed);
    if(prefix1.includes(" ")) return msg.channel.send(`**❌ | Prefix Not Space.**`)
   if(prefix1.length >= 10) return msg.channel.send(`**❌ | Prefix Than More 10 Word.**`);
   // storedSettings.prefix = prefix1;
  /*    const newSettings = new GuildSettings({
      gid: msg.guild.id
    });*/
 storedSettings.prefix = prefix1;
 await storedSettings.save().catch(()=>{});
   msg.channel.send(`**✅ | Done Set New Prefix To : \`${prefix1}\`.**`);
   }
  }