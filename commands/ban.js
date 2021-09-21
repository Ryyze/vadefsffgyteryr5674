const Discord = require('discord.js');
const client = require('../index')
const db = client.db

module.exports = {
  name: "ban",
  cooldown: 0,
  async execute(msg, args,prefix) {
    
let id = msg.content.split(" ").slice(1).join(" ");
    let user = msg.mentions.users.first() || client.users.cache.get(id)
  let reason = msg.content.split(" ").slice(2).join(" ");
if(!reason) reason = 'No reason specified';
    
    
    let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
    
    const perm = new Discord.MessageEmbed()
        .setDescription(`<:syne_no:885155908202680400> | Oops, You don't have enough **Premissions!**`)
    .setColor(embedcolor)
    
const mention = new Discord.MessageEmbed()
        .setDescription(`<:syne_no:885155908202680400> | Oops, You must insert **ID** or User's **Mention!**`)
    .setColor(embedcolor)
   
        const enperms = new Discord.MessageEmbed()
        .setDescription(`<:syne_no:885155908202680400> | Oops, I don't have enough **Premissions!**`)
    .setColor(embedcolor)
    
              const eban = new Discord.MessageEmbed()
        .setDescription(`<:syne_no:885155908202680400> | Oops, I don't have enough Premissions to ban That **Member!**`)
    .setColor(embedcolor)
               const ucant = new Discord.MessageEmbed()
        .setDescription(`<:syne_no:885155908202680400> | Oops, You don't have enough Premissions to ban That **Member!**`)
    .setColor(embedcolor)
    
    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.channel.send(perm)
 if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(enperms)

  
  
  if (!user) return msg.channel.send(mention)
  
      let rolePosition = msg.guild.member(user).roles.highest.position;
      let userRolePossition = msg.member.roles.highest.position;
    if(!reason) reason = 'No reason specified';
  if (!msg.guild.member(user)
  .bannable) return msg.channel.send(eban)
  if (userRolePossition <= rolePosition) return msg.channel.send(ucant)
  
    msg.guild.members.ban(user, { reason: `${user.tag || user.user.tag} A Member banned by: ${msg.author.tag} With a Reason: ${reason}` });
                     const enbanned = new Discord.MessageEmbed()
.setTitle('<:syne_rocket:885156447036530748> |Member Has Been **Banned!**')

    .addField(`<:syne_members:>User:`, `${user.username || user.user.username}`).addField(`<:syne_ticket:885156415625383957>With a Reason: `,`${reason}`)
    .addField(`<:syne_ticket:885156415625383957>Banned By: `,`${msg.author}`).addField(`<:syne_time:886525993299345438>>Ends in:`,)
    .setColor(embedcolor)
  msg.channel.send(enbanned)


  }
}