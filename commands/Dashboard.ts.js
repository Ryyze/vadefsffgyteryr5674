 const Discord = require('discord.js')
const client = require('../index')
const mongoose = require("mongoose");
const GuildSettings = require("../models/settings");


const db = client.db
module.exports = {
  name: "help",
  cooldown: 3,
  async execute(msg, args) {

    let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";

   
//et prefix = await db.fetch(`prefix_${msg.guild.id}`);
  //  if(prefix == null) prefix = "#";*/
      var storedSettings = await GuildSettings.findOne({ gid: msg.guild.id });

  if (!storedSettings) {    طة ةةةةةةةةةةةةةةة

    const newSettings = new GuildSettings({

      gid: msg.guild.id

    });

    await newSettings.save().catch(()=>{});

    storedSettings = await GuildSettings.findOne({ gid: msg.guild.id });

  }
    let prefix = storedSettings.prefix;
   /* let embed = new Discord.MessageEmbed()
    .setTitle(`<:Run:753125288568946750> **Rhyno Commands**`)
    .setDescription(`
    **${msg.guild.name}** Prefix Is \`${prefix}\`
\`=======================================\`
<:Public:753125081147768902> **Public Commands**
**
> ${prefix}server \`|\` View Server Information
> ${prefix}info \`|\` View Ryhno Bot Information
> ${prefix}user \`|\` View User Information
> ${prefix}avatar \`|\` View User Avatar
> ${prefix}roles \`|\` View Server Roles
**
<:Moderation:753125168712384542> **Moderation Commands**
**
> ${prefix}ban \`|\` Ban A User From Guild
> ${prefix}unban \`|\` Unban A User From Guild
> ${prefix}kick \`|\` Kick A User From Guild
> ${prefix}mute \`|\` Mute A User From Chat
> ${prefix}unmute \`|\` Unmute A User From Chat
> ${prefix}role [user] [role] \`|\` Add / Remove Role From User
> ${prefix}lock \`|\` Lock Text Channel
> ${prefix}unlock \`|\` Unlock Voice Channel
> ${prefix}nick [user] [name] \`|\` Change User Nickname
**
<:Money:753125398610575390> **Economy Commands**
**
> ${prefix}profile \`|\` View Profile
> ${prefix}coins \`|\` View User Coins
> ${prefix}coins [user] [amount] \`|\` Transfer Coins To User
> ${prefix}note \`|\` Set Note
> ${prefix}daily \`|\` Collect Daily
**
<:Music:753124896732610570> **Music Commands**
**
> ${prefix}play \`|\` Add A Song To Queue
> ${prefix}skip \`|\` Skip Current Song
> ${prefix}queue \`|\` Display Queue
> ${prefix}stop \`|\` Stop Queue And Leave
> ${prefix}now-playing \`|\` View Current Song
> ${prefix}volume \`|\` Change Song Volume
> ${prefix}pause \`|\` Pause Current Song
> ${prefix}resume \`|\` Resume Current Song
> ${prefix}repeat \`|\` Repeat Song
> ${prefix}clear-queue \`|\` Clear Current Queue
> ${prefix}shuffle \`|\` Shuffle Current Queue

**
> **[Support Server](https://discord.gg/CcHNt4e)**
> **[Dashboard](https://rhyno.xyz/login)**
`)
    .setFooter(`Ryhno Team`, msg.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })) 
    .setThumbnail(client.user.displayAvatarURL())//'https://cdn.discordapp.com/icons/747874086679740506/a_38737e5591b46bab7819123f08baf55e.gif?size=1024')
    .setColor(embedcolor)

*/
  var args = msg.content.split(" ");
if(args[1] === "ar" || args[1] === "arabic") {
  if(!msg.channel.guild) return msg.reply(':thinking: Hi, you can not type commands here, so go into your server and start again');
          var embed = new Discord.MessageEmbed()
  .setDescription(":flag_sa:``اوامر ابب بالعربي!``")
  .addField(`أهلااً انا روبوت هل تُريد المُساعده .. `, "يُمكنك طلب ``الدعم الفني`` عن طريق دخول بواسطة ``رابط سيرفر ديسكورد``")
          .addField(`:map: الاوامر العامه : `, "``#avatar`` , ``#id``\n``#color`` , ``#server``\n``#ping`` , ``#credit``\n``#daily`` , ``#work``\n``#points`` , ``#profile`` , ")
          .addField(`:woman_mechanic: اوامر الاداره :`, "``#ban`` , ``#kick``\n``#mute`` , ``#role``\n``#unmute`` , ``#move``\n``#lock`` , ``#unlock``")
          .addField(`:control_knobs: اوامر الحماية الخاصة : `, "``#create log`` , ``#remove log``\n``#anti bots on`` , ``antilinks on``\n``#anti kick [رقم] `` , ``#anti ban [رقم]``\n``#antidelete channels [رقم]`` , ``#anticreate channels [رقم]``\n``#antidelete roles [رقم]`` , ``#anticreate roles [رقم]``\n``#anti ban [رقم]``, ")
          .addField(`:sparkles: اوامر الشخصيات الخاصة`, "\n``#prime``\n``#settingprime``")
          .addField(`:notes: اوامر الاغاني `, " , ``#play`` , ``#skip``\n``#vol`` , ``#repeat``\n``#settings``")
          .addField(`يُمكن رؤية الاشياء الجديده التي تمت آضافتها في البوت`, "لرؤية التحديثات : ``#updates``")
          .addField("يُمكنك آضافة البوت ", "أضافات البوت الان :  [اضافة البوت](https//app-bot.ml/invite)")
          msg.channel.send({
              embed: embed
          });
} else if(args[1] === "en" || args[1] === "english") {
    if(!msg.channel.guild) return msg.reply(':thinking: Hi, you can not type commands here, so go into your server and start again');
          var embed = new Discord.MessageEmbed()
          .setDescription(":flag_us:``English app commands!``")
          .addField(`Hey, I'm a robot. Are you looking for help? .. `, "You can request ``technical support`` via online chats on the ``discord server.``")
          .addField(`:map: Publice commands : `, " ``#avatar`` , ``#id``\n``#color`` , ``#server``\n``#ping`` , ``#credit``\n``#daily`` , ``#work``\n``#points`` , ``#profile`` , ")
          .addField(`:woman_mechanic: Moderator commands :`, "``#ban`` , ``#kick``\n``#mute`` , ``#role``\n ``#unmute`` , ``#move``\n``#lock`` , ``#unlock``")

          .addField(`:map: Owners commands : `, " ``#create log`` , ``#remove log``\n ``#anti bots on`` , ``antilinks on``\n``#anti kick [number] `` , ``#anti ban [number]``\n``#antidelete channels [number]`` , ``#anticreate channels [number]``\n``#antidelete roles [number]`` , ``#anticreate roles [number]``\n``#anti ban [number]`` ")
   
          .addField(`:sparkles: Premium commands`, "\n``#prime``\n``#settingprime``")
   
          .addField(`:notes: Music commands `, "``#play`` , ``#skip``\n``#vol`` ``#repeat``\n``#settings``")
     
          .addField(`All new robot updates`, "to see new update : ``#updates``")
          .addField("You can add robot to your discord server", "invite now :  [invite](https//app-bot.ml/invite)")
          msg.channel.send({
              embed: embed
          });
} else {
  //   if(message.content.startsWith(prefix + "help")) {
      if(!msg.channel.guild) return msg.reply(':thinking: Hi, you can not type commands here, so go into your server and start again');
          var embed = new Discord.MessageEmbed()  
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(":speech_balloon: ``Choose your language | اختر لُغتك``")
          .addField(`ادا كُنت عربياً فقط ابداء بالامر الاتي :`, "``#help ar``")
          .addField(`if your  lang is english start with :`, "``#help en``")
          .setImage('https://cdn.discordapp.com/attachments/746374587863924781/753969267631718430/Appbot_support_countrys.png')
          .addField("You can add robot to your discord server", "invite now :  [invite](https//app-bot.ml/invite)")
          msg.channel.send({
              embed: embed
          });

            
   }  

 //   msg.channel.send(embed)//`${prefix}`)
  }
}