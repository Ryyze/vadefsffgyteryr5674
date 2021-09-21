const Discord = require(`discord.js`)
const client = require('../index')
const db = client.db
module.exports = {
  name: "unmute",
  cooldown: 5,
  async execute(msg, args, client) {
    
     let id = msg.content.split(" ").slice(1).join(" ");
  let mutePerson = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(id)
    let muteRole = msg.guild.roles.cache.find(role => role.name === "Muted");
    
    let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#b256b6";
    
    const perm = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **You Don't Have \`MUTE_MEMBERS\`**`)
    .setColor(embedcolor)
    
const mention = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **Please Mention User or ID**`)
    .setColor(embedcolor)
   
        const enperms = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **I Don't Have \`MANAGE_ROLES\`**`)
    .setColor(embedcolor)
    
              const eban = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **I Cant't Ban This Memeber**`)
    .setColor(embedcolor)
               const done = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **${mutePerson} Has been Unmuted**`)
    .setColor(embedcolor)
    
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send(perm);
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(enperms)
    if(!mutePerson) return msg.channel.send(mention);
    msg.guild.member(mutePerson).roles.remove(muteRole, `Unmuted by ${msg.author.tag}`).then
    msg.channel.send(done).then(() => db.delete(`muted_${mutePerson.id || mutePerson.user.id}_${msg.guild.id}`));
    
  }
}