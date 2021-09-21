const Discord = require('discord.js')
const client = require('../index')
const db = client.db
module.exports = {
  name: "autorole",
  cooldown: 0,
  async execute(msg, args) {
    var args = msg.content.split(" ");
   let embedcolor = await db.fetch(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
  if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(`**❌ | You Don't Have Enough Permissions.**`);
  let autoroler = await db.fetch(`autoroler_${msg.guild.id}`)
  let autorole = await db.fetch(`autorole_${msg.guild.id}`)
    if(args[1].toLowerCase() === "on") {
	if(autorole === true) return msg.channel.send(`**❌ | Autorole Already Is On.**`);
   db.set(`autorole_${msg.guild.id}`, true)
	msg.channel.send(`**✅ | The Autorole Is Now On.**`);
	} if(args[1].toLowerCase() === "off") {
	if(autorole === false) return msg.channel.send(`**❌ | Autorole Already Is OFf.**`);
   db.set(`autorole_${msg.guild.id}`, false)
	msg.channel.send(`**✅ | The Autorole Is Now OFF.**`);
	} else if(args[1].toLowerCase() === "role") {
    if(!args[2]) return msg.channel.send(`**❌ | Please Type Role.**`)
    }
}
} 