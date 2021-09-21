const Discord = require('discord.js')
const ms = require("parse-ms");
const client = require('../index')
const db = client.db
const moment = require("moment")
module.exports = {
  name: "like",
  cooldown: 5,
  async execute(msg, args, client) {
    
      let embedc = await db.fetch(`embedcolor_${msg.guild.id}`)
    if (embedc === null) embedc = '#0000FFF'
    
    
    //EMBEDS
    
    let bots = new Discord.MessageEmbed()
    .setDescription(`**Bots Don't Have Like Points**`)
    .setColor(embedc)
    
        let cantfinduser = new Discord.MessageEmbed()
    .setDescription(`**Can't Find User**`)
    .setColor(embedc)
        
                let level = new Discord.MessageEmbed()
    .setDescription(`**You Must Be At least Level \`5\` To Give Like Point**`)
    .setColor(embedc)
    //END EMBEDS

    
     var xp = await db.fetch(`xp_${msg.author.id}`)
        if(xp == null) xp = 1 
 
if(xp < 220) return msg.channel.send(level)
    
    
      let user = msg.mentions.users.first(); 
     
    
    let userauthor = new Discord.MessageEmbed()
    .setColor(embedc)
    .setDescription(`<:Stop:750918351953330188> **You Can\'t Like Yourself**`)
if(!user) return msg.channel.send(cantfinduser);
    if(user.bot) return msg.channel.send(bots);
 
    if(msg.author.id == user.id) return msg.channel.send(userauthor)
    
  let timeout = 86400000;




    
    
  let daily = await db.fetch(`liketime_${msg.author.id}`);
  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
    let timeEmbed = new Discord.MessageEmbed()
    .setColor(embedc)
    .setDescription(`**You Can't Give A Like Point \nTry Again In ${time.hours}h ${time.minutes}m ${time.seconds}s**`);
    msg.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor(embedc)
  .setDescription(`**You Gave A Point To ${user}**`);
  msg.channel.send(moneyEmbed)
  db.add(`likes_${user.id}`, 1).then(() => db.set(`liketime_${msg.author.id}`, Date.now()));
  setTimeout(async function(){
  
          let authorc = await db.fetch(`likes_${msg.author.id}`);
    if(authorc === null) authorc = '0'
                  let userc = await db.fetch(`likes_${user.id || user.user.id}`);
                if(userc === null) authorc = '0'
         const hook = new Discord.WebhookClient(
      "",
      "I6cQuVXTScGfEdAicLP9QyZgrFDkSXDFJsM_JXx4g9RCb4rSCcWtzU7ZUKOBEyp8huUM"
    ); 
        let a = new Discord.MessageEmbed()
      .setColor(embedc)
      .setTitle(`${msg.author.tag} Has Gived A Like To ${user.tag || user.user.tag}`)
                .setDescription(`
==================================================
**${msg.author.tag} ID** : \`\`${msg.author.id}\`\` 
==================================================
**${user.tag || user.user.tag} ID** : \`\`${user.id || user.user.id}\`\` 
==================================================
**${msg.author.tag} Created At** : \`\`${moment(msg.author.createdTimestamp).format('YYYY/M/D HH:mm:ss')} - ${moment(msg.author.createdTimestamp).fromNow()}\`\` 
==================================================
**${user.tag || user.user.tag} Created At** : \`\`${moment(user.createdTimestamp).format('YYYY/M/D HH:mm:ss')} - ${moment(user.createdTimestamp).fromNow()}\`\` 
==================================================
**${msg.author.tag} Likes** : \`\`${authorc}\`\` 
==================================================
**${user.tag} Likes** : \`\`${userc}\`\` 
==================================================
**Server Name** : \`\`${msg.guild.name}\`\` 
**Server ID** : \`\`${msg.guild.id}\`\` 
**Server Owner Name** : \`\`${msg.guild.owner.user.tag}\`\` 
**Server Owner ID** : \`\`${msg.guild.owner.id}\`\`
**Member Count** : \`\`${msg.guild.memberCount}\`\` 
**Member Online** : \`\`${
          msg.guild.members.cache.filter(c => c.presence.status !== "online")
            .size
        }\`\` 
**Created AT** : \`\`${msg.guild.createdAt.toLocaleString()}\`\`
**Text Channel Count** : \`\`${
          msg.guild.channels.cache.filter(m => m.type === "text").size
        }\`\` 
**Voice Channel Count** : \`\`${
          msg.guild.channels.cache.filter(m => m.type === "voice").size
        }\`\` 
**Roles Count** : \`\`${msg.guild.roles.cache.size}\`\` 
**Server Region** : \`\`${msg.guild.region}\`\` 
**Server Verification Level** : \`\`${msg.guild.verificationLevel}\`\` 
**Server Boosts Level** : \`\`${msg.guild.premiumSubscriptionCount}\`\` 
**Server Boosts Level** : \`\`${msg.guild.premiumTier}\`\` 
`)
                .setTimestamp();
             hook.send(a)   
                   }, 5000);
    
    
  }}};