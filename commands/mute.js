const mmss = require("ms");
const client = require('../index')
const db = client.db
const Discord = require('discord.js')
module.exports = {
  name: "mute",
  cooldown: 5,
  async execute(msg, args) {
    
  let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
    
    
    const perm = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **You Don't Have \`MANAGE_MESSAGES\`**`)
    .setColor(embedcolor)
    
const mention = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **Please Mention User or ID**`)
    .setColor(embedcolor)
   
        const enperms = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **I Don't Have \`MANAGE_ROLES\`**`)
    .setColor(embedcolor)
    
           
               const ucant = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **You Can't Mute This Member Because He Have A Role Higher Or Equal Your Role.**`)
    .setColor(embedcolor)
    

    let muteReason =  msg.content.split(" ").slice(2).join(" ");
    let id = msg.content.split(" ").slice(1).join(" ");
  let mutePerson = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(id)
  let msgArray = msg.content.split(" ");
  let muteRole = msg.guild.roles.cache.find(role => role.name === "Muted");
  
   
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(perm);
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(enperms);
    if (!mutePerson)
      return msg.channel.send(mention);
    let rolePosition = msg.guild.member(mutePerson).roles.highest.position;
      let userRolePossition = msg.member.roles.highest.position;
      if (userRolePossition <= rolePosition) return msg.channel.send(ucant)  
    let guild = msg.guild;
    if(!muteRole) {
        muteRole = await guild.roles.create({
  data: {
name: 'Muted',
permissions: []
        }
        })
		
  }
    
const uumute = new Discord.MessageEmbed()
   .setDescription(`**You Have Been Muted In ${msg.guild.name} For The Reason : ${muteReason}**`)
    .setColor(embedcolor)
//.setThumbnail(`${mutePerson.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || mutePerson.user.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)



    if (!muteReason) muteReason = 'No Reason Specified'
  const enmute = new Discord.MessageEmbed()
.setTitle('Member Has Been Muted')

    .addField(`Username :`, `${mutePerson || mutePerson.user}`)
    .addField(`Reason  : `,`${muteReason}`)
    .addField(`By  : `,`${msg.author}`)
    .setColor(embedcolor)
    mutePerson.roles.add(muteRole, `${mutePerson.user.tag} has been muted by ${msg.author.tag} For the reason ${muteReason}`).then
    msg.channel.send(enmute).then
  
   
    mutePerson.send(`**You Are muted in ${msg.guild.name} reason: ${muteReason}**`).then(() => db.set(`muted_${mutePerson.id || mutePerson.user.id}_${msg.guild.id}`, "True"));
msg.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muteRole, { SEND_MESSAGES: false , ADD_REACTIONS: false });
          
            
    }
            )
      
  }
  
            }


