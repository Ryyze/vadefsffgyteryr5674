const Discord = require('discord.js')
const moment = require('moment')
const client = require('../index')
const db = client.db
module.exports = {
  name: "user",
  cooldown: 5,
  async execute(msg, args) {
      let Blacklist = await db.fetch(`blacklist_${msg.author.id}`);
  if (Blacklist == "on") return;
    let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#b256b6";
   let user = msg.mentions.users.first() || client.users.cache.get(args[0]) || msg.author;
  
  if (Blacklist == "on") return;
    let boost = user.premiumSince
    
   

    let roles =  msg.guild.member(user).roles.cache.map(r => `${r}`).join(',')

    let uembed = new Discord.MessageEmbed()
  .setThumbnail(`${user.displayAvatarURL()}`)
.addField("<:syne_members:> |Username:", `** \`\`${user.username}\`\` **`)
.addField("<:syne_time:>Joined Discord At",`**${moment(user.createdTimestamp).format("YYYY/MM/DD HH:mm:ss")}\n \`\`${moment(user.createdTimestamp).fromNow()}\`\`**`)
 if(boost ==  null) {
        uembed.addField()
    } else {
      uembed.addField(`<:syne_boost:> |Server Booster:`, `**${boost}**`)
    }
uembed.addField("<:syne_ticket:> |User roles:",`**${roles}**`)
.setColor(embedcolor)
   .setFooter(`<:SYNE:>yne Bot`)
msg.channel.send(uembed)

    

  }
}

