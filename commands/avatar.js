const Discord = require('discord.js')
const client = require('../index')
const db = client.db
module.exports = {
  name: "avatar",
  cooldown: 5,
  async execute(msg, args) {
    
 
  
  let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#b256b6";
          var args = msg.content.split(' ').slice(1);
let user = msg.mentions.users.first() || msg.author; 
let aembed = new Discord.MessageEmbed()
.setColor(embedcolor)
.setTitle(`<:syne_image:885156581619167292> |User's Avatar!`)
.setImage(`${user.displayAvatarURL({ dynamic: true })}?size=1024`)
.setFooter(`<:SYNE:>yne Bot`, client.user.avatarURL({ format: 'png', dynamic: true, size: 1024 })) 
.setURL(user.displayAvatarURL({ dynamic: true }))
	msg.channel.send(aembed);
  
}
}