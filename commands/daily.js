const Discord = require('discord.js');
const ms = require("parse-ms");
const client = require('../index')
const db = client.db

module.exports = {
  name: "daily",
  async execute(msg, args) {
    
 let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";
  let user = msg.author;

 
  let amount = Math.floor(Math.random() * 500) + 300;
    

      let timeout = 86400000;

      let daily = await db.fetch(`daily_${user.id}`);
  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
    let timeEmbed = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**<:Stop:753125779851706448> You've Already Collected Your Daily Reward\n<:Stop:753125779851706448> Collect It Again In ${time.hours}H ${time.minutes}M ${time.seconds}S.**`);
    msg.channel.send(timeEmbed)
  } else {
     let moneyEmbed = new Discord.MessageEmbed()
  .setColor(embedcolor)
  .setDescription(`**<:Follow:753125606765363200> You've Collected Your Daily Reward Of \`\`$${amount}\`\`.**`);
  msg.channel.send(moneyEmbed)
  db.add(`coins_${user.id}`, amount)
  db.set(`daily_${user.id}`, Date.now())
  }
    
 
 
  
}};