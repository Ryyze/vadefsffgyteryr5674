const Discord = require("discord.js");
const snekfetch = require('snekfetch');
const client = require('../index')
const db = client.db
module.exports = {
  name: "meme",
  cooldown: 5,
  async execute(msg, args) {
    
    let embedc = await db.fetch(`embedcolor_${msg.guild.id}`)
    if (embedc === null) embedc = '#b256b6'

    
         const { body } = await snekfetch
            .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return msg.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.MessageEmbed()
        .setColor(embedc)
        .setDescription("**Posted by:** " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField(" info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        msg.channel.send(embed)
  }
}