const Discord = require('discord.js');
const client = require('../index')
const db = client.db

module.exports = {
    name: "kick",
    cooldown: 5,
    async execute(msg, args) {
      
  
      let id = msg.content.split(" ").slice(1).join(" ");
let user = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(id)
    
    let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
    
    const perm = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **You Don't Have \`KICK_MEMBERS\`**`)
    .setColor(embedcolor)
    
const mention = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **Please Mention User or ID**`)
    .setColor(embedcolor)
   
        const enperms = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **I Don't Have \`KICK_MEMBERS\`**`)
    .setColor(embedcolor)
    
              const ekick = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **I Cant't Kick This Memeber**`)
    .setColor(embedcolor)
               const ucant = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **You Can't Kick This Member Because He Have A Role Higher Or Equal Your Role.**`)
    .setColor(embedcolor)
    
      
if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send(perm);
if(!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send(enperms);

let reason = msg.content.split(" ").slice(2).join(" ");
if (!user) return msg.channel.send(mention);
let rolePosition = msg.guild.member(user).roles.highest.position;
      let userRolePossition = msg.member.roles.highest.position;
if (userRolePossition <= rolePosition) return msg.channel.send(ucant)
      if(!reason) reason = 'No reason specified';
if (!msg.guild.member(user)
.kickable) return msg.channel.send(ekick);
  
      
msg.guild.member(user).kick(`${user.tag || user.user.tag} has been kicked by : ${msg.author.tag} For The Reason ${reason}`);
const enkick = new Discord.MessageEmbed()
.setTitle('Member Has Been Kicked')

    .addField(`Username :`, `${user.username || user.user.username}`)
    .addField(`Reason  : `,`${reason}`)
    .addField(`By  : `,`${msg.author}`)
    .setColor(embedcolor)
.setThumbnail(`${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) || user.user.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
  msg.channel.send(enkick)
   
  }
}