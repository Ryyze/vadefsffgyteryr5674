  const Discord = require("discord.js");
const client = require('../index')
const db = client.db

module.exports = {
  name: "ping",
  cooldown: 5,
  async execute(msg, args) {
    
  let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#b256b6";
    let pong = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**Pong**`);
    
    let pingging = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**pingging**`);
    
     let ping = new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`**Ping : ${client.ws.ping}**`);
    
    msg.channel.send(pong)
      .then(function(m) {
        setTimeout(function() {
          m.edit(pingging);
        }, 100);
        let start = Date.now();
        setTimeout(function() {
          m.edit(ping);
        }, 100);
      });
  }
}


    