const Discord = require('discord.js')
const client = require('../index')
const db = client.db
const moment = require('moment')
module.exports = {
  name: "reply",
  async execute(msg, args, client) {
  if(!msg.member.hasPermission("ADMINSTRATOR")) return msg.channel.send(`**❌ | You don't have permission administrator.**`);
  var args = msg.content.split(" ");
  if(!args[1]) return msg.react("❌");
  if(args[1] === "create") {
  var random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var ID = "";
        for (var y = 0; y < 6; y++) {
            ID += `${random.charAt(Math.floor(Math.random() * random.length))}`;
        };
        if(!args[2]) return msg.react("❌");
        msg.channel.send(`**Done.**`);
        db.set(`reply_${msg.guild.id}_${ID}`, ID);
  } 
    let reply = await db.fetch(`reply_${msg.guild.id}_${ID}`);
  if(args[0].toLowerCase() === reply) {
  msg.channel.send(`**Welcome.**`);
  }
  }
       }