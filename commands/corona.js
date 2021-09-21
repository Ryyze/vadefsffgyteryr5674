const Discord = require('discord.js');
const api = require('novelcovid');
const client = require('../index')
const db = client.db
module.exports = {
  name: "corona",
  cooldown: 5,
  async execute(msg, args, client) {
    
let embedcolor = await db.get(`embedcolor_${msg.guild.id}`);
    if(embedcolor == null) embedcolor = "#0000FF";

    let prefix = await db.fetch(`prefix_${msg.guild.id}`);
  if (prefix == null) prefix = "#";
    const embed13 = new Discord.MessageEmbed()
   .setDescription(`**Type A Country Name Or Get Informations About Every Country By Typing ${prefix}corona all**`)
   .setColor(embedcolor)
    
    if(!args[0]) {
      return msg.channel.send(embed13);
    }

    if(args[0] === "all") { 
      //if they entered all as the first argument, get information from all countries
      await api.all().then((data) => {
        //create an embed with the information and send it to the channel
        let embed = new Discord.MessageEmbed()
          .setTitle("Global cases around the world")
            .addField("Total Cases", data.cases, true)
            .addField("Total Deaths", data.deaths, true)
            .addField("Total Recovered", data.recovered, true)
            .addField("Today's Cases", data.todayCases, true)
            .addField("Today's Deaths", data.todayDeaths, true)
          .addField("Active Cases", data.active, true)
          .setColor(embedcolor)
          .setFooter(`Requested By ${msg.author.username}`, msg.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })) 
      
        return msg.channel.send(embed);
      }).catch(err => console.log(err));     
    
    
    } else{

      let country = args.slice(0).join(' ');
const embed2 = new Discord.MessageEmbed()
   .setDescription("**I Don't Think This Country Exists**")
   .setColor(embedcolor)
      await api.countries({country: country}).then((data) => {
        if(data.country === undefined) return msg.channel.send(embed2);
        
        //create an embed with the data and send it to the channel
        let embed = new Discord.MessageEmbed()
          .setTitle(`${data.country} Cases`)
          .addField("**Total Cases**", data.cases, true)
          .addField("Total Deaths**", data.deaths, true)
          .addField("Total Recovered", data.recovered, true)
          .addField("Today's Cases", data.todayCases, true)
          .addField("Today's Deaths", data.todayDeaths, true)
          .addField("Active Cases", data.active, true)
          .setColor(embedcolor)
          .setFooter(`Requested By ${msg.author.username}`, msg.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })) 
            
        return msg.channel.send(embed);
      }).catch(err => console.log(err));
    }
  }
}