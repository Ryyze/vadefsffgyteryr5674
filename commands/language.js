const Discord = require('discord.js');
const fs = require("fs");
const client = require('../index');
const language = require("./language.json");
module.exports = {
  name: "language",
  async execute(msg, args) {
  var args = msg.content.split(" ");
  if(!language[msg.guild.id])
   language[msg.guild.id] = {
   	"language": "english"
   }
  fs.writeFileSync("./language.json", JSON.stringify(language));
     const perm = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **You Don't Have \`ADMINISTRATOR\`.**`)
        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(perm)    
//if(args[1] =! ["arabic","ar","english","en"]) return msg.channel.send(`**❌ | Example : \`#language <arabic,ar,english,en>\`.**`);
if(args[1] === "arabic" || args[1] === "ar") {
if(language[msg.guild.id].language === "arabic") return msg.channel.send(`**❌ | Sorry, But Already Language Arabic.**`);
language[msg.guild.id].language = "arabic";
fs.writeFileSync("./language.json", JSON.stringify(language));
msg.channel.send(`**✅ | Done Set Language To : \`Arabic\`.**`);
} else if(args[1] === "english" || args[1] === "en") {
if(language[msg.guild.id].language === "english") return msg.channel.send(`**❌ | Sorry, But Already Language English.**`);
language[msg.guild.id].language = "english";
fs.writeFileSync("./language.json", JSON.stringify(language));
msg.channel.send(`**✅ | Done Set Language To : \`English\`.**`);
} else {
  return msg.channel.send(`**❌ | Example : \`#language <arabic,ar,english,en>\`.**`);
  }
  }
}