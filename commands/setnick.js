
const Discord = require("discord.js");
const client = require('../index')
const db = client.db
module.exports = {
  name: "setnick",
  cooldown: 5,
  aliases: ["nick"],
  async execute(msg, args) {
    
     
    let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
          const newusername = msg.content.split(" ").slice(2).join(" ");

      let id = msg.content.split(" ").slice(1).join(" ");
    var args = msg.content.split(" ");
  let user = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[1])
    
    const perm = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **You Don't Have \`MANAGE_NICKNAMES\`**`)
    .setColor(embedcolor)
    
const mention = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **Please Mention User or ID**`)
    .setColor(embedcolor)
   
        const enperms = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **I Don't Have \`MANAGE_NICKNAMES\`**`)
    .setColor(embedcolor)
    
              const eban = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **I Cant't Ban This Memeber**`)
    .setColor(embedcolor)
               const ucant = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **You Can't Change This Member Nick Because He Have A Role Higher Or Equal Your Role.**`)
    .setColor(embedcolor)
 /*   const rembed = new Discord.MessageEmbed()
        .setColor(embedcolor)
       .setDescription(`**${user || user.user} Nickname has Been Reseted**`);
    
     const done = new Discord.MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**${user || user.user} Nickname has Been Set To ${newusername}**`);
    */
          if (!msg.member.hasPermission("MANAGE_NICKNAMES")) return msg.channel.send(perm)
      if (!msg.guild.member(client.user).hasPermission('MANAGE_NICKNAMES')) return msg.channel.send(enperms)
    
      if (!user) return msg.channel.send(mention)
      let rolePosition = msg.guild.member(user).roles.highest.position;
      let userRolePossition = msg.member.roles.highest.position;
    if (userRolePossition <= rolePosition) return msg.channel.send(ucant)


   
          

     if (!newusername) {
       let hhga = new Discord.MessageEmbed()
       .setDescription(`**${user || user.user} Nickname has Been Reseted**`)
     .setColor(embedcolor);     
       return msg.guild.members.cache.get(user.user.id).setNickname(""), msg.channel.send(hhga);
    
}
      let hjk = new Discord.MessageEmbed()
          .setDescription(`**${user || user.user} Nickname has Been Set To ${newusername}**`)
    .setColor(embedcolor);
       msg.guild.members.cache.get(user.user.id).setNickname(newusername);
       

              msg.channel.send(hjk)

  }
}