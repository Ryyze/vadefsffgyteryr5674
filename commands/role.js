const Discord = require('discord.js');
const client = require('../index')
const db = client.db
module.exports = {
  name: "role",
  cooldown: 5,
  async execute(msg, args, client) {
    
    let embedcolor = await db.fetch(`embedcolor_${msg.guild.id}`)
    if (embedcolor === null) embedcolor = '#0000FF'
      let id = msg.content.split(" ").slice(1).join(" ");
    let member = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(id);
     let rname = msg.content.split(" ").splice(2).join(" ");
    let role = msg.guild.roles.cache.find(val => val.name === rname);
    
    //EMBEDS
    let one = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**You Don't Have \`MANAGE_ROLES\` Permission**`);
    
        let two = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**I Don't Have \`MANAGE_ROLES\` Permission!**`);
    
            let three = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**Please Mention A User**`);
    
                let four = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**Invaild User**`);
    
    
                    let five = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**${rname} Isn't A Role In This Server!**`);
    
                        let six = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**Failed To Add The Role To User Because Your Role Is Lower Than The Specified Role.**`);
        
                        let seven = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**Failed To Add The Role To The User Because My Highest Role Is Lower Than The Specified Role.**`);
    
    
                            let e = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**${msg.author}**,** I've Removed \`${rname}\` Role From ${member}.**`);
    
    
                                let err = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**Err : ${e}**`);
    
                                    let er = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**${msg.author}**,** I've Added \`${rname}\` Role To ${member}.**`);
    //
    if(!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send(one);
  if (!msg.guild.member(client.user).hasPermission("MANAGE_ROLES")) return msg.reply(two);
    if (msg.mentions.users.size === 0) return msg.reply(three);
   
    
    if (!member) return msg.reply(four);
   
    if (!role) return msg.reply(five);
    let botRolePosition = msg.guild.member(client.user).roles.highest.position;
    let rolePosition = role.position;
    let userRolePossition = msg.member.roles.highest.position;
    //if (userRolePossition <= rolePosition) return msg.channel.send(six)
    if (botRolePosition <= rolePosition) return msg.channel.send(seven);
    
if(msg.guild.member(msg.mentions.members.first()).roles.cache.has(role.id)) {
    msg.channel.send(e);
member.roles.remove(role);

  } else {
member.roles.add(role).catch(e => {
        return msg.channel.send(err);
    });
    msg.channel.send(er);
  }

    
}
 
}