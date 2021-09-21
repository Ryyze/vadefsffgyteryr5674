const Discord = require('discord.js');
const fs = require('fs');
const client = require('../index')
const db = client.db

module.exports = {
  name: "profile",
  cooldown: 0,
  async execute(msg, args, client) {
 // let bottg = msg.guild.members.cache.get("721216626061606953");
 //   if(bottg) {
 //    return; 
  //    }
var args = msg.content.split(' ').slice(1);
    let user = msg.mentions.users.first() || client.users.cache.get(args[0]) || msg.author;

    
    //embeds
    
   let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#b256b6";
  let status;// = "https://c.top4top.io/p_172549tcj2.png";
if(user.presence.status === "online") {
	status = "https://cdn.discordapp.com/emojis/748319150685814824.png?v=1";
	} else if(user.presence.status === "dnd") {
		status = "https://cdn.discordapp.com/emojis/748319126073901138.png?v=1";
		} else if(user.presence.status === "idle") {
		status = "https://cdn.discordapp.com/emojis/748319171716317184.png?v=1";
			} else if(user.presence.status === "offline") {
		status = "https://c.top4top.io/p_172549tcj2.png";//"https://cdn.discordapp.com/emojis/749474352453517322.png?v=1";
				} 
    let nouser = new Discord.MessageEmbed()
    .setDescription(`**Couldn't Find User**`)
    .setColor(embedcolor);
  
        let bots = new Discord.MessageEmbed()
    .setDescription(`**Bots Doesn't Have Profiles**`)
    .setColor(embedcolor);
    
    //END EMBEDS
    if(!user) return msg.channel.send(nouser)
    
    if(user.bot) return msg.channel.send(bots)

    let curbg = await db.fetch(`currentbg_${user.id}`)
    if(curbg == null) curbg = 'https://cdn.discordapp.com/attachments/741429412083269753/741429831324926009/8d542db2bf43fd638bfa96006248b7fd.jpg';
    
      let coins = await db.fetch(`coins_${user.id}`)
        if(coins == null) coins = '0'
    
    let likes = await db.fetch(`likes_${user.id}`)
  if(likes == null) likes = '0'
    let note = await db.fetch(`note_${user.id}`);
    if(note == null) note = ''
var xp = await db.fetch(`xp_${user.id}`)
        if(xp == null) xp = 1 
        var level;  
        var nxp;
        var nextLvl;
    if(xp <= 30 && xp >= 1) level = 1 , nxp = 30 , nextLvl = 2;
    if(xp <= 90 && xp >= 31) level = 2 , nxp = 90 , nextLvl = 3;
    if(xp <= 150 && xp >= 91) level = 3 , nxp = 150 , nextLvl = 4;
    if(xp <= 220 && xp >= 151) level = 4 , nxp = 220 , nextLvl = 5;
    if(xp <= 350 && xp >= 221) level = 5 , nxp = 350 , nextLvl = 6;
    if(xp <= 500 && xp >= 351) level = 6 , nxp = 500 , nextLvl = 7;
    if(xp <= 800 && xp >= 501) level = 7 , nxp = 800 , nextLvl = 8;
    if(xp <= 1200 && xp >= 801) level = 8 , nxp = 1200 , nextLvl = 9;
    if(xp <= 1700 && xp >= 1201) level = 9 , nxp = 1700 , nextLvl = 10;
    if(xp <= 2200 && xp >= 1701) level = 10 , nxp = 2200 , nextLvl = 11;
    if(xp <= 3000 && xp >= 2201) level = 11 , nxp = 3000 , nextLvl = 12;
    if(xp <= 3800 && xp >= 3001) level = 12 , nxp = 3800 , nextLvl = 13;
    if(xp <= 4800 && xp >= 3801) level = 13 , nxp = 4800 , nextLvl = 14;
    if(xp <= 6000 && xp >= 4801) level = 14 , nxp = 6000 , nextLvl = 15; 
    if(xp <= 8000 && xp >= 6001) level = 15 , nxp = 8000 , nextLvl = 16;
    if(xp <= 10000 && xp >= 8001) level = 16 , nxp = 10000 , nextLvl = 17;
    if(xp <= 13000 && xp >= 10001) level = 17 , nxp = 13000 , nextLvl = 18;
    if(xp <= 16000 && xp >= 13001) level = 18 , nxp = 16000 , nextLvl = 19;
    if(xp <= 20000 && xp >= 16001) level = 19 , nxp = 20000 , nextLvl = 20;
    if(xp <= 23000 && xp >= 20001) level = 20 , nxp = 23000 , nextLvl = 21;
    if(xp <= 26000 && xp >= 23001) level = 21 , nxp = 26000 , nextLvl = 22;
    if(xp <= 29000 && xp >= 26001) level = 22 , nxp = 29000 , nextLvl = 23;
    if(xp <= 31000 && xp >= 29001) level = 23 , nxp = 31000 , nextLvl = 24;
    if(xp <= 35000 && xp >= 31001) level = 24 , nxp = 35000 , nextLvl = 25;
    if(xp <= 40000 && xp >= 35001) level = 25 , nxp = 40000;
    
    
        if(xp > 40000) nxp = "MAX" , xp = "MAX" , level = "25" , nextLvl = "MAX";

    let uBlacklist = await db.fetch(`Blacklist_${user.id}`);
    if(uBlacklist === 'on') coins = 'Blacklisted' ,  likes = 'Blacklisted' , note = 'Blacklisted'
   
   
    
    const devs = ["708079263387090974","692232002119925792","700656817344086078","605509682294947864","710671121871011891","547843804657352704","391356330654564352","560597939563790347","742863518218321994"];
    
  const vip = ["723911619251404801","","",""];
    
    
    
    
    const liver = await db.fetch(`liver_${user.id}`);
    const real = await db.fetch(`real_${user.id}`);
    const bvb = await db.fetch(`bvb_${user.id}`);
    const barca = await db.fetch(`barca_${user.id}`);
    let cur = await db.fetch(`curbadge_${user.id}`)

    
  const Canvas = require('canvas')
  const { loadImage } = require('canvas')
let Canva = require("canvas-constructor")
//let test = await new Canva(700,200)
 //   .setColor("#28292b")
 //   .addRect(0, nxp, 700, 200)



  const canvas = Canvas.createCanvas(200, 400);
	const ctx = canvas.getContext('2d');
   canvas.width = 350;

    

    
    
  
  const x = canvas.width / 2;


	 
    

  const back = await loadImage(curbg)
	ctx.drawImage(back, 0, 0, 360, 500);

    
//  const template = await loadImage('https://cdn.discordapp.com/attachments/755853325945143318/756994783028969653/155.png')//https://cdn.discordapp.com/attachments/749777003510759505/750223492716298260/sfdsdsdsd.png')
	
    //const template = await loadImage("https://cdn.discordapp.com/attachments/755853325945143318/757613348237082765/1155.png")
   const template = await loadImage("https://cdn.discordapp.com/attachments/755853325945143318/757611372996722899/Exe.png")
    //const template = await loadImage("https://cdn.discordapp.com/attachments/755853325945143318/757611877772558487/Exe.png")
 // const template = await loadImage('https://cdn.discordapp.com/attachments/756954016218611890/757037684408451142/Drax_EffectSide-profile15.png');
    //const template = await loadImage('https://cdn.discordapp.com/attachments/755853325945143318/757002488959336508/155666.png')
  //  const template = await loadImage('https://cdn.discordapp.com/attachments/756954016218611890/757000715284512889/Drax_EffectSide-profile11111111111111111.png')
    ctx.drawImage(template, 0, 0, 360, 400);

  
        ctx.font = "bold 15px kathen"; //Name ,_,
        ctx.fontSize = "15px";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.fillText(`${user.username} `, 178, 179);
  
        ctx.font = "bold 15px kathen"; //Name ,_,
        ctx.fontSize = "15px";
        ctx.fillStyle = "#f1f1f1";
        ctx.textAlign = "center";
        ctx.fillText(`${user.username} `, 178, 177);
   
  
        ctx.font = "bold 15px kathen"; //Name ,_,
        ctx.fontSize = "15px";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.fillText(`${note} `, x, 367.9);

        ctx.font = "bold 15px kathen"; //Name ,_,
        ctx.fontSize = "15px";
        ctx.fillStyle = "#f1f1f1";
        ctx.textAlign = "center";
        ctx.fillText(`${note} `, x, 365.9);
    
        ctx.font = "bold 12px kathen"; //Name ,_,
        ctx.fontSize = "12px";
        ctx.fillStyle = "#000000";
        ctx.fillText(`${coins} `, 259, 242);

        ctx.font = "bold 12px kathen"; //Name ,_,
        ctx.fontSize = "12px";
        ctx.fillStyle = "#f1f1f1";
        ctx.fillText(`${coins} `, 259, 240);
    
        ctx.font = "bold 10px kathen";
        ctx.fontSize = "10px";
        ctx.fillStyle = "#f1f1f1";
        ctx.fillText(`${xp}/${nxp}`,259, 302)
    
        ctx.font = "bold 15px kathen"; //Name ,_,
        ctx.fontSize = "15px";
        ctx.fillStyle = "#000000";
        ctx.fillText(`${likes} `, 99.6, 242);


    ctx.font = "bold 15px kathen"; //Name ,_,
        ctx.fontSize = "15px";
        ctx.fillStyle = "#f1f1f1";
        ctx.fillText(`${likes} `, 99.6, 240);
ctx.fillText(`${level}`,99.6,304)
  /*  let test = await new Canva(700,200)
        .setColor("#28292b")
     .addRect(0, nxp, 700, 200)
*/
   
       // if (devs.includes(user.id)) {

	//evs = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740429389832912896/741427091337248888/e63co024yh741.png');
	
    let statuus = await loadImage(status)
         ctx.drawImage(statuus, 47, 150, 40, 40);

    
          
   if (devs.includes(user.id)) {
	const devs = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740429389832912896/741427091337248888/e63co024yh741.png');
	ctx.drawImage(devs, 37, 21, 15, 15);
      }          
          
  //	const u = await Canvas.loadImage('https://cdn.discordapp.com/emojis/719853833257484298.png?v=1');
	//.drawImage(u, 149, 87.2, 32, 32);
          
          
          
          
    

           if (vip.includes(user.id)) {

	const vip2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740429389832912896/741426265722191872/hypesquad.png');
	ctx.drawImage(vip2, 179, 226, 42, 42); 
    }
    
    

    
    
    
  if(cur == 'https://cdn.discordapp.com/attachments/740556620358221906/741203011287646218/real-madrid.png') {
    if(devs.includes(user.id)) {
   const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203011287646218/real-madrid.png');
	 ctx.drawImage(real, 248, 226, 50, 50); 
    } else {
      if(vip.includes(user.id)) {
           const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203011287646218/real-madrid.png');
	 ctx.drawImage(real, 248, 226, 50, 50);  
      } else {
           const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203011287646218/real-madrid.png');
	 ctx.drawImage(real, 173, 226, 50, 50);  
      }
    }
  }
    
    
    
  //Liver
      if(cur == 'https://cdn.discordapp.com/attachments/740556620358221906/741203010046132224/liverpool.png') {
    if(devs.includes(user.id)) {
   const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203010046132224/liverpool.png');
	 ctx.drawImage(real, 256, 226, 50, 50); 
    } else {
      if(vip.includes(user.id)) {
           const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203010046132224/liverpool.png');
	 ctx.drawImage(real, 248, 226, 50, 50);  
      } else {
           const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203010046132224/liverpool.png');
	 ctx.drawImage(real, 173, 226, 50, 50); 
      }
    }
  }
    
    //BARCA
     if(cur == 'https://cdn.discordapp.com/attachments/740556620358221906/741203007877939210/022-barcelona.png') {
    if(devs.includes(user.id)) {
   const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203007877939210/022-barcelona.png');
	 ctx.drawImage(real, 248, 226, 50, 50); 
    } else {
      if(vip.includes(user.id)) {
           const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203007877939210/022-barcelona.png');
	 ctx.drawImage(real, 248, 226, 50, 50); 
      } else {
           const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203007877939210/022-barcelona.png');
	 ctx.drawImage(real, 173, 226, 50, 50); 
      }
    }
  }
    
    
//BVB    
    
     if(cur == 'https://cdn.discordapp.com/attachments/740556620358221906/741203008796360714/025-borusia-dortmund.png') {
    if(devs.includes(user.id)) {
   const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203008796360714/025-borusia-dortmund.png');
	 ctx.drawImage(real, 248, 226, 50, 50); 
    } else {
      if(vip.includes(user.id)) {
           const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203008796360714/025-borusia-dortmund.png');
	 ctx.drawImage(real, 248, 226, 50, 50);  
      } else {
           const real = await Canvas.loadImage('https://cdn.discordapp.com/attachments/740556620358221906/741203008796360714/025-borusia-dortmund.png');
	 ctx.drawImage(real, 173, 226, 50, 50); 
      }
    }
  }
    
    
    
      	ctx.beginPath();
	
    ctx.arc(180,80,70, -100, Math.PI * 2, true);//(//200,130, 85,0, Math.PI * 2, true);
	
    ctx.closePath();
	
    ctx.clip();
    

	const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
	
    ctx.drawImage(avatar, 100,12,149,155)//70, 100, 100);    
 /* ctx.beginPath();
    ctx.arc(200,20,70, -100, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();*/
 //   ctx.drawImage(statuus, 200, 100, 40, 40);

  
     // ctx.drawImage(statuus, 255, 150, 40, 40);

//tx.drawImage(nxp, 100 , 12,149,155)
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');
msg.channel.startTyping()
	msg.channel.send(attachment);
msg.channel.stopTyping()
     

      //https://i.redd.it/e63co024yh741.png
    
    
    //END LOL
    }
}



