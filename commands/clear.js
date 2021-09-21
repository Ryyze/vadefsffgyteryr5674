const Discord = require('discord.js')
const client = require('../index')
const db = client.db
module.exports = {
  name: "clear",
  cooldown: 0,
   description:"Clear messages",
  async execute(msg, args, client) {
    
const msg_count = msg.content.split(/ +/).slice(1).shift();
    let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";

    const perm = new Discord.MessageEmbed()
        .setDescription(`<:syne_no:885155908202680400> | Oops, You don't have enough **Premissions!**`)
    .setColor(embedcolor)    
   
        const enperms = new Discord.MessageEmbed()
        .setDescription(`<:syne_no:885155908202680400> | Oops, I don't have enough **Premissions!**`)
    .setColor(embedcolor)
    
              const enan = new Discord.MessageEmbed()
        .setDescription(`<:syne_no:885155908202680400> | Oops, Usage: ?clear [Numbers]
        Example: ?clear 99`)
    .setColor(embedcolor)
               const ucant = new Discord.MessageEmbed()
        .setDescription(`<:syne_no:885155908202680400> | Oops, You can only delete 100 Message every **Command!**`)
    .setColor(embedcolor)
    
               const done = new Discord.MessageEmbed()
        .setDescription(`<:syne_yes:885156016570912778> | **Woo**Hoo I have cleared \`${msg_count}\` **Messages!**`)
    .setColor(embedcolor)
                      const done1 = new Discord.MessageEmbed()
        .setDescription(`<:syne_yes:885156016570912778> | **Woo**Hoo I have cleared \`100\` **Messages!**`)
    .setColor(embedcolor)
               
     
    if(!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(enperms);
 
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(perm);
    
    if (!msg_count) { msg.channel.bulkDelete("100").then(msgs => {
      let donne = new Discord.MessageEmbed()
      .setDescription(`<:syne_yes:885156016570912778> | **Woo**Hoo I have cleared \`${msg.size}\` **Messages!**`)
     .setColor(embedcolor)
                     msg.channel.send(donne).then(m => m.delete({ timeout: 3000, reason: '<:syne_time:886525993299345438> | Oops, Timed **Out!**' }))
         })         
    } else {
    

    if (isNaN(msg_count)) return msg.channel.send(enan);

   

    if (msg_count>100) return msg.channel.send(ucant);

    

    
  msg.delete()
    setTimeout(function(){
   msg.channel.bulkDelete(msg_count).catch(WoW =>{});
   }, 500);
    


    setTimeout(function(){
    msg.channel.send(done).then(m => m.delete({ timeout: 3000, reason: '<:syne_time:886525993299345438> | Oops, Timed **Out!**' }))
     }, 750);
  }
}
} // 