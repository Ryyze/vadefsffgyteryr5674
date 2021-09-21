const Discord = require('discord.js')
const client = require('../index')
const db = client.db
const moment = require('moment')
module.exports = {
  name: "points",
  cooldown: 7,
  aliases: ["point"],
  async execute(msg, args, client) {

    let user = msg.mentions.members.first() || client.users.cache.get(args[0]);

     let embedcolor = await db.fetch(`embedcolor_${msg.guild.id}`)
    if (embedcolor === null) embedcolor = '#0000FF'
     
        msg.guilg.premuimSubscriptionCount
    
    if (args[1]) {
     let embed23 = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`<:syne_no:885155908202680400> | Oops, Only numbers are **Accepted!**`);

    if (isNaN(args[1])) {
      return msg.reply(embed23);
    }
    let embed3 = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(
        `"<:syne_coins:885156350009700413> | Oops, You can't trans negative **Points!**`
      );

    let embed313 = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(
        `<:syne_coins:885156350009700413> | Oops, You can't trans decimal **Points!**`
      );
    if (args[1].includes('.')) {
      return msg.reply(embed313);
    }
    
    if (args[1].includes("-")) {
      return msg.channel.send(embed3);
    }
    let embed4 = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(
        `<:syne_coins:885156350009700413> | Oops, You don't have enough **Points!**`
      );
let member = await db.fetch(`coins_${msg.author.id}`);
    if (member === null) member = '0'
    if (member < args[1]) {
      return msg.channel.send(embed4);
    }

       const Canvas = require("canvas");

    //let resulting = Math.floor(args[2] - args[2] * (5 / 100));
    let tax = Math.floor(args[1] * (4 / 100));
    let first = Math.floor(Math.random() * 10);
    let second = Math.floor(Math.random() * 10);
    let third = Math.floor(Math.random() * 10);
    let fourth = Math.floor(Math.random() * 10);
    let num = `${first}${second}${third}${fourth}`;
    //let canv as = Canvas.createCanvas(100, 50);
  //  let ctx = canvas.getContext("2d");
    //let tax = message.content.split(" ")[1]
    let Price = args[1]
    //tax = tax.replace(/%5/g,"");
    let resulting = Math.floor(Price - Price * (5 / 100));
/*onst background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/742876430093779060/758945390006370304/captcha_1.png")//https://cdn.discordapp.com/attachments/365219235288317962/656362038884565014/captcha.png");
  ctx.drawImage(background, 6, 3, canvas.width, canvas.height);
    ctx.font = "bold 25px kathen";
    ctx.fontSize = "7px";
    ctx.fillStyle = embedcolor;
    
        ctx.fillText(num, canvas.width / 4.8, canvas.height / 1.5);
      
        	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'confirm.png');
    */
     const canvas = Canvas.createCanvas(150, 50),
    ctx = canvas.getContext('2d');
    const WelcomeImage = await Canvas.loadImage('https://b.top4top.io/p_1618ok27o0.png')
    ctx.drawImage(WelcomeImage, 0, 0, canvas.width, canvas.height);
  ctx.font = "40px Arial";ctx.fontSize = "40px";ctx.fillStyle = "#CE7070";ctx.textAlign = "center";ctx.fillText(num[0], 30,40)//canvas.width / 3, canvas.height / 1.7);
ctx.font = "40px Arial";ctx.fontSize = "40px";ctx.fillStyle = "#FF0000";ctx.textAlign = "center";ctx.fillText(num[1], 60,40)//canvas.width / 2.5, canvas.height / 1.7);
ctx.font = "40px Arial";ctx.fontSize = "40px";ctx.fillStyle = "#483D8B";ctx.textAlign = "center";ctx.fillText(num[2], 90,40)//canvas.width / 2, canvas.height / 1.7);
ctx.font = "40px Arial";ctx.fontSize = "40px";ctx.fillStyle = "#1E90FF";ctx.textAlign = "center";ctx.fillText(num[3], 120,40)
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Syne_4digits.png'); 
    let embedverify = new Discord.MessageEmbed()
    .setDescription(`**Welcome ${msg.author}\n, You're sending \`${resulting}\`\n<:syne_coins:885156350009700413>, 
    So, We're Vrefying there's no ro-bots here please type the 4-digts to Confirm. : \`${num}\`**`)
.attachFiles(attachment)
.setImage('attachment://Syne_4digits.png')
.setColor(embedcolor)
.setThumbnail('https://cdn.discordapp.com/icons/747874086679740506/a_38737e5591b46bab7819123f08baf55e.gif?size=1024');
    
      msg.channel
      .send(embedverify)
.then(s => {
          msg.channel
            .awaitMessages(r => r.author.id === msg.author.id, {
              max: 1,
              time: 20000,
              errors: ["time"]
            })
            .then(async (collected) => {
                

              if (collected.first().content === num) {
      
               
                    let embed5 = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(
        `<:syne_yes:885156016570912778> | ${msg.author}, You're Transfered \`\`$${resulting}\`\`<:syne_coins:885156350009700413> Points to **\`\`${user.user.username}\`\`** `
      );

                s.delete()
                collected.first().delete()
                msg.delete()
                 
                let aembed = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`**Welcome ${user.user.username}, You Got \`\$${resulting}\`<:syne_coins:885156350009700413> **Points** From **ID**: \`${msg.author.id})\``);
       
      //     user.send(aembed);
               const hook = new Discord.WebhookClient(
      "HOOKID",
      "HOOKTOKEN"
    ); 
                
                
                
    db.add(`coins_${user.id}`, resulting).then(() => db.subtract(`coins_${msg.author.id}`, args[1]));

    msg.channel.send(embed5);
                setTimeout(async function(){
  
          let authorc = await db.fetch(`coins_${msg.author.id}`);
                  if(authorc === null) authorc = '0'

                  let userc = await db.fetch(`coins_${user.id || user.user.id}`);
                if(userc === null) authorc = '0'
                  let a = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setTitle(`${msg.author.tag} is Transed ${resulting} to ${user.tag || user.user.tag}`)
                .setDescription(`
-(1)
**${msg.author.tag} ID** : \`\`${msg.author.id}\`\` 
-(2)
**${user.tag || user.user.tag} ID** : \`\`${user.id || user.user.id}\`\` 
-(3)
**${msg.author.tag} Created At** : \`\`${moment(msg.author.createdTimestamp).format('YYYY/M/D HH:mm:ss')} - ${moment(msg.author.createdTimestamp).fromNow()}\`\` 
-(4)
**${user.tag || user.user.tag} Created At** : \`\`${moment(user.createdTimestamp).format('YYYY/M/D HH:mm:ss')} - ${moment(user.user.createdTimestamp).fromNow()}\`\` 
-(5)
**${msg.author.tag} Points** : \`\`${authorc}\`\` 
-(6)
**${user.tag || user.user.tag} Points** : \`\`${userc}\`\` 
**Guild Name**: \`\`${guild.name}\`\` 
**Guild  ID**: \`\`${guild.id}\`\` 
**Guild Texts**: \`\`${guild.channels.cache.filter(m => m.type === "text").size}\`\` 
**Guild Premuim Count**: \`\`${guild.premiumSubscriptionCount}\`\` 
**Total Members**: \`\`${guild.memberCount}\`\` 
**Online Members**: \`\`${guild.members.cache.filter(c => c.presence.status !== "online").size}\`\` 
**Guild Creation Date**: \`\`${guild.createdAt.toLocaleString()}\`\`
**Owner ID**: \`\`${guild.owner.id}\`\`
          msg.guild.members.cache.filter(c => c.presence.status !== "online")
            .size
        }\`\` 

`)
                .setTimestamp();
             hook.send(a)   
                   }, 5000);
              } else {
                let wrong = new Discord.MessageEmbed()
                .setDescription(`> **[[EEEED]]**`)
                      .setColor(embedcolor)
               // msg.channel.send(wrong);
            //   msg.delete
s.delete()

              }
    }  
                  )
      } 
      
      )
    };
 
    
    let mcoins = await db.fetch(`coins_${msg.author.id}`)
  if (mcoins === null) mcoins = 0;
    
    
if(!user) {
  let membed = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`Your Account Belance is \`${mcoins}\`<:syne_coins:885156350009700413> **Points.**`)
   //   .setThumbnail(msg.author.displayAvatarURL());
  return msg.channel.send(membed)
}
      let coins = await db.fetch(`coins_${user.id}`);
    if (coins === null) coins = '0'
      if(user){
        if (args[1]) return;
        let embed = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`**This User have \`${coins}\`<:syne_coins:885156350009700413> **Points.**`);
     return msg.channel.send(embed)
    }
   
   
   /*
    let membed = new Discord.MessageEmbed()
    .setDescription(`<:outputonlinepngtools2:750100410127089786> **${msg.author.username}**, **Your Balance Is ${mcoins}**`)
    .setColor(embedcolor)
    
    
    
     
    
    
    
    

 
    
    let msgcoin = `<:outputonlinepngtools2:750100410127089786> **${user.username}**, **Your Balance Is ${coins}**`
    
    if(user.id !== msg.author.id) msgcoin = `<:outputonlinepngtools2:750100410127089786> **${user}**, **Balance Is ${coins}**`;
    let embed = new Discord.MessageEmbed()
    .setDescription(msgcoin)
    .setColor(embedcolor)

    msg.channel.send(embed)*/
    
  }
}
