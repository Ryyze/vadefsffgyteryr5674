
const Discord = require("discord.js");
const client = require('../index')
const db = client.db
module.exports = {
  name: "unban",
  cooldown: 5,
  async execute(msg, args) {
    
    let user = args[0];
  let reason = args.slice(1).join(' ');

    let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
    
    const perm = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **You Don't Have \`BAN_MEMBERS\`**`)
    .setColor(embedcolor)
    
const mention = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **Please Type User ID**`)
    .setColor(embedcolor)
   
        const enperms = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **I Don't Have \`BAN_MEMBERS\`**`)
    .setColor(embedcolor)
    
              const eban = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **I Cant't Ban This Memeber**`)
    .setColor(embedcolor)
               const ucant = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **You Can't Ban This Member Because He Have A Role Higher Or Equal Your Role.**`)
    .setColor(embedcolor)
               
               const not = new Discord.MessageEmbed()
        .setDescription(`${msg.author}, **This Person Isn't Banned**`)
    .setColor(embedcolor)
               
    
    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.channel.send(perm)
 if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(enperms)
    
    if (reason.length < 1) reason = 'No reason supplied.';
  if (!user) return msg.channel.send(mention).catch(console.error);
  
    const enban = new Discord.MessageEmbed()
.setTitle('Member Has Been Unbanned')
    .addField(`User  : `,`<@${args[0]}>`)
    .addField(`Reason  : `,`${reason}`)
    .addField(`By  : `,`${msg.author}`)
    .setColor(embedcolor)
    

   msg.guild.members.unban(user, reason).then(e => {
          msg.reply(enban);
        }).catch(e =>{
    if(e){
      return msg.channel.send(not);
    }
  }  
            
      
  
          )
  }
}                        