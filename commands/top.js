const client = require('../index')
const db = client.db
const Discord = require("discord.js");


module.exports = {
  name: "top",
  cooldown: 0,
  async execute(msg, args, client) {
    
    let embedcolor = await db.fetch(`embedcolor_${msg.guild.id}`)
    if (embedcolor === null) embedcolor = '#0000FF'


if (args[0] === 'coins') {
       let money = await db.startsWith(`coins`, { sort: '.data'})
 
 
    //    money.length = 20;
let finalOutput = ' ';
   for (var i in money) {
    finalOutput += `**${client.users.cache.get(money[i].ID.split("_")[1].tag) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** | $${money[i].data} \n`;
          
    }
 
    money.length = 20;
    var finalLb = "";
    for (var i in money) {
      if (money[i].data === null) money[i].data = 0
      finalLb += `\`#${money.indexOf(money[i]) + 1}\` | **${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** Coins : \`${money[i].data}\`\n`;
    }; 
   const ccembed = new Discord.MessageEmbed()
    .setTitle(`**Coins Leaderboard**`)
    .setDescription(finalLb)
    .setColor(embedcolor)
  
    msg.channel.send(ccembed)
  
  
  } 
    if (args[0] === 'xp') {
      
            let xp = await db.startsWith(`xp`, { sort: '.data'})
 
 
       //xp.length = 10;
let finalOutput = ' ';
   for (var i in xp) {
    finalOutput += `**${client.users.cache.get(xp[i].ID.split("_")[1])}** | ${xp[i].data} XP \n`;
    }
  
    xp.length = 20;
    var finalLb = "";
    for (var i in xp) {
      if (xp[i].data === null) xp[i].data = 0
      finalLb += `\`#${xp.indexOf(xp[i]) + 1}\` | **${client.users.cache.get(xp[i].ID.split('_')[1]) ? client.users.cache.get(xp[i].ID.split('_')[1]).tag : "Unknown User#0000"}** XP : \`${xp[i].data}\`\n`;
    };    
      const ccembed = new Discord.MessageEmbed()
    .setTitle(`**XP Leaderboard**`)
    .setDescription(finalLb)
    .setColor(embedcolor)
  
    msg.channel.send(ccembed)
      
    } if (args[0] === 'likes') {
      
            let likes = await db.startsWith(`likes`, { sort: '.data'})
 
 
        likes.length = 10;
let finalOutput = ' ';
   for (var i in likes) {
    finalOutput += `**${client.users.cache.get(likes[i].ID.split("_")[1])}** | ${likes[i].data} Likes \n`;
    }
  likes.length = 20;
    var finalLb = "";
    for (var i in likes) {
      if (likes[i].data === null) likes[i].data = 0
      finalLb += `\`#${likes.indexOf(likes[i]) + 1}\` | **${client.users.cache.get(likes[i].ID.split('_')[1]) ? client.users.cache.get(likes[i].ID.split('_')[1]).tag : "Unknown User#0000"}** Likes : \`${likes[i].data}\`\n`;
    };    
      const ccembed = new Discord.MessageEmbed()
    .setTitle(`**Likes Leaderboard**`)
    .setDescription(finalLb)
    .setColor(embedcolor)
  
    msg.channel.send(ccembed)
      
    }  if (args[0] !== 'xp' && args[0] !== 'coins' && args[0] !== 'likes') {
    let prefix = await db.fetch(`prefix_${msg.guild.id}`)
  if (prefix === null) prefix = (`#`);
      let enbed = new Discord.MessageEmbed()
      .setDescription(`
**You Can Only Use :**
> **${prefix}top coins**
> **${prefix}top xp**
> **${prefix}top likes**
`)
.setColor(embedcolor)
    msg.channel.send(enbed)
    
    
  }}};