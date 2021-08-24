//DISCORD
const { Collection, Client } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
client.login(
 ""
//.X0-5uw.-"
);
module.exports = client;
//END DISCORD
//
//PACKAGES
const Discord = require('discord.js')
const { join } = require("path");
const { readdirSync } = require("fs");
const moment = require("moment");
const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const mongoose = require("mongoose");
const GuildSettings = require("./models/settings");
mongoose.connect("mongodb+srv://Run:0kzfmxbQeRleAuWy@cluster0.rc7yp.mongodb.net/runbot?retryWrites=true&w=majority", {//mongodb+srv://Mazen:XpfAireuu7MXfrK4@cluster0.o3sxi.gcp.mongodb.net/bot?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//END PACKAGES
////
//DATABASE
const { Database } = require("quickmongo");
client.db = new Database("mongodb+srv://app:T1wQbuYQ4xiKlSTt@cluster0.8czu3.mongodb.net/bot?retryWrites=true&w=majority");//("mongodb+srv://Run:0kzfmxbQeRleAuWy@cluster0.rc7yp.mongodb.net/runbot?retryWrites=true&w=majority")
//mongodb+srv://RunBot:2L6TAPk9J6DYcoEx@cluster0.ueeau.azure.mongodb.net/bot?retryWrites=true&w=majority"//mongodb+srv://Mazen:XpfAireuu7MXfrK4@cluster0.o3sxi.gcp.mongodb.net/bot?retryWrites=true&w=majority"//  "mongodb+srv://Mazen:Mazen010027624901@cluster0.o3sxi.gcp.mongodb.net/test"
 // )
const db = client.db;
db.on("ready", async () => {
  
  const ping = await db.ping();
  console.log(
    `Database Connected Uptime : ${db.uptime} , Ping : => { Read : ${ping.read} ,Write : ${ping.write}, Average : ${ping.average}`
  );
}); 
//END DATABASE
//
//Command Handler
client.on("ready", () => {
  console.log(`${client.user.username} Logged In!!`);
  client.user.setActivity(`#help | AppBot`);
});

client.commands = new Collection();
const cooldowns = new Collection();

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file =>
  file.endsWith(".js")
);
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async msg => {
  let Blacklist = await db.fetch(`Blacklist_${msg.author.id}`);
  if (Blacklist == "on") return;

  //let prefix = await db.fetch(`${msg.guild.id}`)//gid : msg.guild.id});
  //if (prefix == null) prefix = "#";
  var storedSettings = await GuildSettings.findOne({ gid: msg.guild.id });
  if (!storedSettings) {
    const newSettings = new GuildSettings({
      gid: msg.guild.id
    });
    await newSettings.save().catch(()=>{});
    storedSettings = await GuildSettings.findOne({ gid: msg.guild.id });
  }
  let prefix = storedSettings.prefix;
  if (msg.content.startsWith(prefix)) {
    const args = msg.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        cmd => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
  let bottg = msg.guild.members.cache.get("721216626061606953");
if(bottg) {
  return;
  }
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg.reply(
          `<:749753030899007620:749779549574922301>  **Cooldown ${timeLeft.toFixed(
            1
          )} Seconds.**`
        );
        msg.react("749779549574922301");
      }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    try {
      command.execute(msg, args, client,prefix);
    } catch (error) {
      console.error(error);
      msg
        .reply(
          "<:749753030899007620:749779549574922301> ``Err, Contact Admin``"
        )
        .catch(console.error);
    }
  }
});
//END COMMAND HANDLER


fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Loading command ${commandName}`);
    client.commands.set(commandName, props);
  });
});
/*
client.on('message', async message => {
  var random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var ID = "";
        for (var y = 0; y < 6; y++) {
            ID += `${random.charAt(Math.floor(Math.random() * random.length))}`;
            }
        let reply = await db.fetch(`reply1_${message.guild.id}_`);
  if(message.content === reply) {
  message.channel.send(`**Welcome.**`);
  }
  });*/
//XP AND CREDITS

client.on("message", async msg => {
    if(msg.author.bot) return;
   let Blacklist = await db.fetch(`Blacklist_${msg.author.id}`);
            if(Blacklist == 'on') return;    
  db.add(`xp_${msg.author.id}`, 1);
  db.add(`coins_${msg.author.id}`, 1);
});

 



client.on('guildMemberAdd', async member => {
  let muted = await db.fetch(`muted_${member.id}_${member.guild.id}`)
  if(muted === null) return;
  let muteRole = member.guild.roles.cache.find(role => role.name === "Muted");
  if(muted === "True") member.roles.add(muteRole, `${member.user.tag} Has Left The Server And Rejoined To Unmute Himself`)
})

client.on('guildMemberAdd', async member => {
 let role = await db.fetch(`autoroler_${member.guild.id}`)
   if(role === null) return;
  let autorole = await db.fetch(`autorole_${member.guild.id}`)
  if(autorole === null) return;
  if(autorole === "True") member.roles.add(role, `Autorole`)
})


const devs = ["742863518218321994","708079263387090974","391356330654564352","605509682294947864","710671121871011891","742863518218321994","633775422554767370"]
  

client.on("message", async msg => {
  if (msg.content.startsWith( "#black")) {
    var args = msg.content.split(' ').slice(1);
      let member = msg.mentions.users.first() || client.users.cache.get(args[0]);
    let reason = msg.content.split(" ").slice(2).join(" ");
      
              if (!devs.includes(msg.author.id)) return;
        if(!member) return msg.channel.send(`**❌ | Usage : \`#blacklist [Mention/ID]\`**`);
     var Blacklist = await db.fetch(`Blacklist_${member.id}`);
      if(Blacklist === null) Blacklist = 'off';
          if(Blacklist === `on`) return msg.reply(`This user is already Blacklisted`);
    if(!reason) reason = 'No Reason.'
    msg.channel.send(`**✅ | Done Blacklisted ${member}.**`);
    
    db.set(`Blacklist_${member.id}`, "on")
   
let aembed = new Discord.MessageEmbed()
.setColor("#b256b6")
.setAuthor(`${member.username}`)
.setTitle(`**You Are Blacklisted From \`Rhyno\` **`)
.setDescription(`**Reason: \`\`${reason}\`\`**`)
.setFooter(`Join Support Server : rhyno.xyz/server` )
  db.set(`blacklist_${member.id}`, "on")
    db.set(`BlacklistReason_${member.id}`, reason)
member.send(aembed)
  
const hook = new Discord.WebhookClient(
      "750963465505603585",
      "fKL_Xe3NPhdeOBh9PijXkcMzQmJcNPCFrGCL5QFZ3geBxkl3EZGUCJ5bIGYxJuwPBdCs"
    );
    let beembed = new Discord.MessageEmbed()
.setColor("#b256b6")
.setTitle(`<:Follow:750957574232473601> ${member.username} **Has Been Blacklisted**`)
.setDescription(`
**ID** : \`\`${member.id}\`\` 
**By** : ${msg.author.username} 
**Reason** : \`\`${reason}\`\` 
	`)
.setFooter(`Rhyno Discord Bot Support` )
   hook.send(beembed)
    }})


//===========================================================
 

client.on("message", async msg => {
    if (msg.content.startsWith("#unblack")) {
    var args = msg.content.split(' ').slice(1);
      let member = msg.mentions.users.first() || client.users.cache.get(args[0]);
          if(!member) return msg.channel.send(`**❌ | Usage : #unblacklist \`<Mention/ID>\`**`);
      let Blacklist = await db.fetch(`Blacklist_${member.id}`);
      if(Blacklist === null) Blacklist = 'off';
      if(Blacklist === `off`) return msg.reply(`❌ | This User Is Not Blacklisted.`);
                    if (!devs.includes(msg.author.id)) return;
    msg.channel.send(`**✅ | Done UnBlackListed ${member}.**`)
      
db.delete(`Blacklist_${member.id}`)

      db.delete(`BlacklistReason_${member.id}`)
      
    const hook = new Discord.WebhookClient(
      "750965178543243324",
      "e2mUvOP4SvyLqA6OaDZwmtBMBi17CTDPR2A4k7CXp44xyMtW9S8Ow5FMaLRa6cbJdb-s"
    );
      
      let embed = new Discord.MessageEmbed()
.setColor("#b256b6")
.setTitle(`<:Follow:750957574232473601> ${member.username} Has Been UnBlackList`)
.setDescription(`
**ID** : \`\`${member.id}\`\` 
**By** : ${msg.author.username}`)
.setFooter(`Rhyno Discord Bot Support` )
       hook.send(embed)
    }})
     





client.on("message", async message => {
      let Command = message.content.split(' ')[0].toLowerCase();
      let args = message.content.split(' ');
    if (Command == '#leave') {
        if (!devs.includes(message.author.id)) return;
        if (!args [1]) return 
        let guild = client.guilds.cache.get (args[1]) || client.guilds.cache.find (Guild => (Guild.name == args.slice(1).join(' ')) || (Guild.name.startsWith (args.slice(1).join(' '))))
        if (!guild) return message.channel.send (`**No guild found with id/name \`${args.slice(1).join(' ')}\`**`)
        this.emojis = {
            yes: '✅',
            no: '❌'
        };
        message.channel.send (`**Are You sure you want me left this server:\nName: ${guild.name}\nMembers Count: ${guild.memberCount}\nOwnerShip: ${guild.owner} (ID: ${guild.ownerID})**`).then (async (msg) => {
            await msg.react (this.emojis.yes);
            await msg.react (this.emojis.no);
            let filter = (reaction, user) => {
                return user.id == message.author.id;
            }
            let collector = await msg.createReactionCollector (filter, {time: 1000 * 15});
            collector.on ('collect', async (r) => {
                collector.stop();msg.delete().catch (err => undefined);
                switch (r.emoji.name) {
                    case this.emojis.yes:
                        message.channel.send ('**Successfully left the server.**').then (() => guild.leave()).catch (err => guild.leave());
                        break;
                    case this.emojis.no:
                        message.channel.send ('**Successfully cancelled.**');
                        break;
                }
            }).on('end', () => {
                msg.delete();
                message.reply ('**Time out.**');
            })
        })
    }
});



client.on("guildCreate", async guild => {
    const hook = new Discord.WebhookClient(
      "750545951583764480",
      "VP5PyZqUVKhecy3O8AOlAe9sOvN7tDwcwimF3EKDWQJ-yObIt4ya4HtCbV7Fq11TnIYg"
    ); 
  
      let embed = new Discord.MessageEmbed()
.setColor("FFC0CB")
.setTitle(` ${client.user.tag} **Joined A New Server**`)
.setDescription(`
**Server Name** : \`\`${guild.name}\`\` 
**Server ID** : \`\`${guild.id}\`\` 
**Server Owner Name** : \`\`${guild.owner.user.tag}\`\` 
**Server Owner ID** : \`\`${guild.owner.id}\`\`
**Member Count** : \`\`${guild.memberCount}\`\` 
**Member Online** : \`\`${guild.members.cache.filter(c => c.presence.status !== "online").size}\`\` 
**Created AT** : \`\`${guild.createdAt.toLocaleString()}\`\`
**Text Channel Count** : \`\`${guild.channels.cache.filter(m => m.type === "text").size}\`\` 
**Voice Channel Count** : \`\`${guild.channels.cache.filter(m => m.type === "voice").size}\`\` 
**Roles Count** : \`\`${guild.roles.cache.size}\`\` 
**Server Region** : \`\`${guild.region}\`\` 
**Server Verification Level** : \`\`${guild.verificationLevel}\`\` 
**Server Boosts Level** : \`\`${guild.premiumSubscriptionCount}\`\` 
**Server Boosts Level** : \`\`${guild.premiumTier}\`\` 
`)
.setFooter(`Rhyno Discord Bot Support` )

    
hook.send(embed)
});



client.on("guildDelete", async guild => {
    const hook = new Discord.WebhookClient(
      "750546913488797756",
      "4GqZhxhqzTb-hWbY5ocIi0-wcOjxfvIiDhfZYCy6TGLrooxadGBlGEQgFoXq51xQ09yP"
    ); 
      let embed = new Discord.MessageEmbed()
.setColor("FFC0CB")
.setTitle(`${client.user.tag} **Left Server**`)
.setDescription(`
**Server Name** : \`\`${guild.name}\`\` 
**Server ID** : \`\`${guild.id}\`\` 
**Server Owner Name** : \`\`${guild.owner.user.tag}\`\` 
**Server Owner ID** : \`\`${guild.owner.id}\`\`
**Member Count** : \`\`${guild.memberCount}\`\` 
**Member Online** : \`\`${guild.members.cache.filter(c => c.presence.status !== "online").size}\`\` 
**Created AT** : \`\`${guild.createdAt.toLocaleString()}\`\`
**Text Channel Count** : \`\`${guild.channels.cache.filter(m => m.type === "text").size}\`\` 
**Voice Channel Count** : \`\`${guild.channels.cache.filter(m => m.type === "voice").size}\`\` 
**Roles Count** : \`\`${guild.roles.cache.size}\`\` 
**Server Region** : \`\`${guild.region}\`\` 
**Server Verification Level** : \`\`${guild.verificationLevel}\`\` 
**Server Boosts Level** : \`\`${guild.premiumSubscriptionCount}\`\` 
**Server Boosts Level** : \`\`${guild.premiumTier}\`\` 

	`)
.setFooter(`Rhyno Discord Bot Support` )

    
hook.send(embed)
});


const AntiSpam = require('discord-anti-spam');
 const antiSpam = new AntiSpam({
	warnThreshold: 10, // Amount of messages sent in a row that will cause a warning.
	kickThreshold: 99999999999999999999999999999999999999999999999999, // Amount of messages sent in a row that will cause a ban.
	banThreshold: 99999999999999999999999999999999999999999999999999, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 86400000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '', // Message that will be sent in chat upon warning a user.
	kickMessage: 'KICKED', // Message that will be sent in chat upon kicking a user.
	banMessage: 'BANNED', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 20, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 99999999999999999999999999999999999999999999999999, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 99999999999999999999999999999999999999999999999999, // Amount of duplicate messages that trigger a warning.
	exemptPermissions: [], // Bypass users with any of these permissions.
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: ['700656817344086078'], // Array of User IDs that get ignored.
});
 
client.on('message', async (message) => {
 let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
  if (Blacklist == "on") return;
          antiSpam.message(message)
}
  ); 





 antiSpam.on("warnAdd", async (member) => {
    
    let Blacklist = await db.fetch(`Blacklist_${member.author.id}`);
  if (Blacklist == "on") return;
  
  
  
  let aembed = new Discord.MessageEmbed()
.setColor("#b256b6")
.setAuthor(`${member.user.tag}`)
.setTitle(`<:Follow:750957574232473601> You BlackListed From \`Rhyno\` **`)
.setDescription(`**Reason: \`\`Spamming\`\`**`)
.setFooter(`Join Support Server : rhyno.xyz/server` )
  db.set(`Blacklist_${member.id}`, "on")
   db.set(`BlacklistReason_${member.id}`, "Auto Blacklist")
member.send(aembed)
  
  
  
  
  
    let embed = new Discord.MessageEmbed()
.setColor("#b256b6")
.setTitle(`<:Follow:750957574232473601> ${member.user.tag} **Has Been Blacklisted**`)
.setDescription(`
**ID** : \`\`${member.id}\`\` 
**By** : \`\`Auto Blacklist\`\` 
**Reason** : \`\`Spamming\`\` 
**Server Name** : \`\`${member.guild.name}\`\` 
**Server ID** : \`\`${member.guild.id}\`\` 
**Server Owner Name** : \`\`${member.guild.owner.user.tag}\`\` 
**Server Owner ID** : \`\`${member.guild.owner.id}\`\`
**Member Count** : \`\`${member.guild.memberCount}\`\` 
**Member Online** : \`\`${member.guild.members.cache.filter(c => c.presence.status !== "online").size}\`\` 
**Created AT** : \`\`${member.guild.createdAt.toLocaleString()}\`\`
**Text Channel Count** : \`\`${member.guild.channels.cache.filter(m => m.type === "text").size}\`\` 
**Voice Channel Count** : \`\`${member.guild.channels.cache.filter(m => m.type === "voice").size}\`\` 
**Roles Count** : \`\`${member.guild.roles.cache.size}\`\` 
**Server Region** : \`\`${member.guild.region}\`\` 
**Server Verification Level** : \`\`${member.guild.verificationLevel}\`\` 
**Server Boosts Level** : \`\`${member.guild.premiumSubscriptionCount}\`\` 
**Server Boosts Level** : \`\`${member.guild.premiumTier}\`\` 

	`)
.setFooter(`Rhyno Discord Bot Support` )

    const hook = new Discord.WebhookClient(
      "750969954752397323",
      "lamCCEUSueh-8sRU3Q21xR7OaJEvMJmKPOYhtsnrq9PK9Bt2QM9IodOiEaauzfDkBoK9"
    );
hook.send(embed)
})



const tickets = JSON.parse(fs.readFileSync("./tickets.json"));
const ticket = JSON.parse(fs.readFileSync("./ticket.json"));
client.on('message', async message => {
	if(message.author.bot) return;
	if(!message.channel.guild) return;
	let args = message.content.split(" ");
  if(!tickets[message.guild.id]) 
    tickets[message.guild.id] = {
    	"onoff": "off",
    "system": "system",
    "message": "message"
    }
      fs.writeFileSync("./tickets.json", JSON.stringify(tickets));
let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = "#";

	if(args[0].toLowerCase() === prefix + "tickets") {
		if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | انت لا تمتلك الصلاحيات الكافية
الصلاحية المطلوبة : \`ADMINISTRATOR\`**`)
if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | انا لا تمتلك الصلاحيات الكافية
الصلاحية المطلوبة : \`ADMINISTRATOR\`**`)
if(!tickets[message.guild.id]) 
    tickets[message.guild.id] = {
    	"onoff": "off",
    "system": "system",
    "message": "message"
    }
    fs.writeFileSync("./tickets.json", JSON.stringify(tickets));
if(!args[1]) return message.channel.send(`**❌ | الـشـرح :
\`${prefix}tickets on
${prefix}tickets off\`**`)
  if(args[1].toLowerCase() === "on") {
  	if(tickets[message.guild.id].onoff === "on") return message.channel.send(`**❌ | خاصية التذاكر مفعلة**`)
    message.channel.send(`**✅ | تم تفعيل خاصية التذاكر**`)
    tickets[message.guild.id].onoff = "on";
    fs.writeFileSync("./tickets.json", JSON.stringify(tickets));
} else if(args[1].toLowerCase() === "off") {
if(tickets[message.guild.id].onoff === "off") return message.channel.send(`**❌ | خاصية التذاكر غير مفعلة**`)
    message.channel.send(`**✅ | تم الغاء تفعيل خاصية التذاكر**`)
    tickets[message.guild.id].onoff = "off";
  fs.writeFileSync("./tickets.json", JSON.stringify(tickets));
} else if(args[1].toLowerCase() === "system") {
	if(tickets[message.guild.id].onoff === "off") return message.channel.send(`**❌ | خاصية التذاكر غير مفعلة**`)
	if(!args[2]) return message.channel.send(`**❌ | الاستعمال : 
\`${prefix}tickets system command
${prefix}tickets system reaction\`**`)
if(args[2].toLowerCase() === "command") {
	tickets[message.guild.id].system = "command";
	tickets[message.guild.id].message = "message";
  fs.writeFileSync("./tickets.json", JSON.stringify(tickets));
	message.channel.send(`**✅ | تم تغيير سيستم التذاكر الى : \`الأوامر\`**`)
	} else if(args[2].toLowerCase() === "reaction") {
	tickets[message.guild.id].system = "reaction";
fs.writeFileSync("./tickets.json", JSON.stringify(tickets));
    message.channel.send(`**✅ | تم تغيير سيستم التذاكر الى : \`الرياكشن\`**`)

	}

	}

	}

	});

	

	client.on('message', async message => {
		if(message.author.bot) return;
		if(!message.channel.guild) return;
		if(tickets[message.guild.id].onoff === 'off') return;
        let args = message.content.split(" ");
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = "#";

		if(args[0].toLowerCase() === prefix + "new") {
			if(tickets[message.guild.id].system === "command") {
				let channel = message.guild.channels.cache.find(c => c.name === `ticket-${message.author.username}`, "text")
				     if(channel) return message.channel.send(`**❌ | انت تمتلك تذكرة ارجو الانتظار حتى يتم اغلاقها**`)
   message.guild.channels.create(`ticket-${message.author.username}`, {type: "text"}).then(c => {
       c.createOverwrite(message.guild.id, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
        });
        c.createOverwrite(message.author.id, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        });
     message.channel.send(`**تم فتح تذكرتك <#${c.id}>**`)
        let embed = new Discord.MessageEmbed()
      .setTitle(`تذكرة ${message.author.username}`)
       .setDescription(`**${message.author}, ارجو انتظار الادارة للرد عليك
لا تزعجهم بالمنشن .**`)
      .setFooter(client.user.username,client.user.displayAvatarURL())
      .setTimestamp()
      .setThumbnail(message.author.displayAvatarURL({dynamic:true}));
      c.send({embed: embed})
     });  
				} else if(tickets[message.guild.id].system === "reaction") {
					if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | انت لا تمتلك الصلاحيات الكافية لعمل رسالة تيكيت برياكشن
الصلاحية المطلوبة : \`ADMINISTRATOR\`**`)
if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | انا لا تمتلك الصلاحيات الكافية
الصلاحية المطلوبة : \`ADMINISTRATOR\`**`)
					if(!args[1]) return message.channel.send(`**❌ | ارجو كتابة نص رسالة التيكيت**`)
					let embed = new Discord.MessageEmbed()
					.setColor("RANDOM")
					.setDescription(`**${args.slice(1).join(" ")}**`)
					.setFooter(message.guild.name,message.guild.iconURL({dynamic:true}))
					.setTimestamp()
					message.channel.send(embed).then(msg => {
msg.react("📥");
						tickets[message.guild.id].message = msg.id;

fs.writeFileSync("./tickets.json", JSON.stringify(tickets));
						})
					}

			}

		});
		client.on('messageReactionAdd',  async (reaction, user) => {
if(user.id == client.user.id) return;
      if(reaction.emoji.name === "📥") {
if(reaction.message.id === tickets[reaction.message.guild.id].message) {
			 let u = client.users.cache.get(user.id);
 /* let channel = reaction.message.guild.channels.cache.find(c => c.id === ticket[u.id].channel)
  if(channel) {
   return channel.send(`**❌ | <@${u.id}>, انت تمتلك تيكت فعلا !**`)
    
    } else {  */
  reaction.message.guild.channels.create(`ticket-${u.username}`, {type: "text"}).then(c => {
      c.createOverwrite(reaction.message.guild.id, {
            VIEW_CHANNEL: false,
           SEND_MESSAGES: false
        });
        c.createOverwrite(u.id, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        });
        let embed = new Discord.MessageEmbed()
       .setTitle(`تذكرة ${u.username}`)
       .setDescription(`**<@${u.id}>, ارجو انتظار الادارة للرد عليك
لا تزعجهم بالمنشن .
اضغط على 🔒 لقفل التيكيت**`)
      .setFooter(client.user.username,client.user.displayAvatarURL())
      .setTimestamp()
      .setThumbnail(u.displayAvatarURL({dynamic:true}))
if(!ticket[u.id]) 
    ticket[u.id] = {
   "channel": c.id,
   "message": "message"
    }
      fs.writeFileSync("./ticket.json", JSON.stringify(ticket));
      c.send(embed).then(msg => {      
        msg.react("🔒");
        ticket[u.id].message = msg.id;
        ticket[u.id].channel = c.id;
        fs.writeFileSync("./tickets.json", JSON.stringify(tickets));
        })

							});

							
}
  
							
}
			});
client.on('messageReactionAdd',  async (reaction, user) => {
      if(user.id === client.user.id) return;
      let u = client.users.cache.get(user.id);
    if(reaction.emoji.name === "🔒") {
			if(reaction.message.id === ticket[u.id].message) {
							reaction.message.channel.delete();
        
        }
      
      }
  })

client.on("message", async msg => {
    if (msg.content.startsWith("sdfgsdfhgdfghsdfhg")) {
   
                    if (!devs.includes(msg.author.id)) return;
      db.fetch(`currentbg_${msg.auhtor.id}`,"https://cdn.discordapp.com/attachments/703337874510315762/750649193122496552/unknown.png")

   
    }})


let level = require("./level.json");
client.on('message', message => {
	if(message.channel.type === "dm") return;
	if(message.author.bot) return;
	if(!level[message.author.id]) 
	   level[message.author.id] = {
		"xp": 0,
		"xp1": 0,
		"level": 0
		}
	fs.writeFileSync("./level.json", JSON.stringify(level));
    level[message.author.id].xp1 += 1;
    if(level[message.author.id].xp1 === 3) {
		level[message.author.id].xp += 1;
		level[message.author.id].xp1 = 0;
		fs.writeFileSync("./level.json", JSON.stringify(level));
		}
	if(level[message.author.id].xp === 1000) {
		level[message.author.id].level += 1;
		fs.writeFileSync("./level.json", JSON.stringify(level));
		message.channel.send(`**⬆️ | Up, You Leveled Up To \`${level[message.author.id].level}\`.**`);
		}
		let args = message.content.split(" ");
		if(args[0].toLowerCase() === "level") {
			let user = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author;
			if(!level[user.id]) 
	   level[user.id] = {
		"xp": 0,
		"xp1": 0,
		"level": 0
		}
	fs.writeFileSync("./level.json", JSON.stringify(level));
			let embed = new Discord.MessageEmbed()
			.setTitle(`${user.username} Profile`)
			.addField(`**XP :**`,`\`${level[user.id].xp} XP\``)
			.addField(`**Level :**`,`\`${level[user.id].level} Level\``)
			.setFooter(`Requsted By ${message.author.username}`,message.author.avatarURL())
			.setTimestamp()
			.setThumbnail(user.avatarURL())
			message.channel.send(embed);
			}
	});


/*client.on('message', message => {
	if(message.content ===  "partners") {
		let partnner1 = "752729100212502579";
		let partner1 = client.users.cache.get(partnner1);
		let partnner2 = "752731975508295716";
		let partner2 = client.users.cache.get(partnner2);
	let embed = new Discord.MessageEmbed()
	.setTitle(`Partners List`)
	.setDescription(`${partner1}
${partner2}`)
	.setFooter(`Requsted By ${message.author.username}`, message.author.displayAvatarURL())
  .setThumbnail(client.user.displayAvatarURL())
  
	message.channel.send(embed);
   }
	});*/

client.on('message', message => {
	if(message.content === "partners") {
	let guild = client.guilds.cache.get("752729806352941167");
	let partners = guild.roles.cache.get("752733040429629511").members.map(m => `<@${m.id}>`).join("\n");
	let embed = new Discord.MessageEmbed()
	.setTitle(`Partners List`)
	.setDescription(`${partners}`)
	.setFooter(`Requsted By ${message.author.username}`,message.author.displayAvatarURL())
	.setThumbnail(client.user.displayAvatarURL())
	message.channel.send(embed);
	}
})


client.on(`message`, (message) => {
    if (message.content.startsWith("ban")) {
         var bandEmbed = new Discord.MessageEmbed()
         .setTitle("**Command: Ban**")
         .addField("**Usage:**","#ban (user) (time m/h/d/mo/y) (reason)")
         .addField("**Examples:**",`#ban <@${message.author.id}>
#ban <@${message.author.id}> spamming
#ban <@${message.author.id}> 1h spamming
#ban <@${message.author.id}> 1d spamming
#ban <@${message.author.id}> 1w`)
         .setDescription("Bans Members")
         .setColor("#0000FF")
         message.channel.send(bandEmbed);
    }
});


/*
let safe = require("./safe.json");
let safe1 = require("./safe1.json");
let prefix = "$";
client.on('message', message => {
	let args = message.content.split(" ");
	if(args[0].toLowerCase() === prefix + "safe") {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission \`ADMINISTRATOR\`.**`);
	if(!safe[message.guild.id])
	  safe[message.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
    if(!args[1]) return message.channel.send(`**❌ | Example :
\`${prefix}safe on
${prefix}safe off\`**`);
  if(!args[1] == ["on", "off"]) return message.channel.send(`**❌ | Example :
\`${prefix}safe on
${prefix}safe off\`**`);
if(args[1].toLowerCase() === "on") {
	if(safe[message.guild.id].onoff === "on") return message.channel.send(`**❌ | Safe Already Is On.**`);
	safe[message.guild.id].onoff = "on";
	fs.writeFileSync("./safe.json", JSON.stringify(safe));
	message.channel.send(`**✅ | The Safe Is Now On.**`);
	} else if(args[1].toLowerCase() === "off") {
		if(safe[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Safe Already Is OFF.**`);
	safe[message.guild.id].onoff = "off";
	fs.writeFileSync("./safe.json", JSON.stringify(safe));
	message.channel.send(`**✅ | The Safe Is Now OFF.**`);
	}
}
	});
client.on('message', message => { 
	let args = message.content.split(" ")//message.content.split(" ");
	let number = args[1];
	if(message.content.split(" ")[0] === prefix + "kickLimit") {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission \`ADMINISTRATOR\`.**`)
	if(!safe[message.guild.id])
	  safe[message.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
    if(safe[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Safe Is OFF.**`);
    if(!number) return message.channel.send(`**❌ | Please Type Number.**`);
	if(number.includes(".") || isNaN(number)) return message.channel.send(`**❌ | Please Write Numbers.**`);
    if(number > 5) return message.channel.send(`**❌ | Sorry , But Limits Kick Than 5.**`);
    safe[message.guild.id].kickLimit = number;
    fs.writeFileSync("./safe.json", JSON.stringify(safe));
    message.channel.send(`**✅ | Done Set Kick Limit To : \`${number}\`**.`);

} else if(args[0] === prefix + "banLimit") {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission \`ADMINISTRATOR\`.**`)
	if(!safe[message.guild.id])
	  safe[message.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
    if(safe[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Safe Is OFF.**`);
    if(!number) return message.channel.send(`**❌ | Please Type Number.**`);
	if(number.includes(".") || isNaN(number)) return message.channel.send(`**❌ | Please Write Numbers.**`);
    if(number > 5) return message.channel.send(`**❌ | Sorry , But Limits Ban Than 5.**`);
    safe[message.guild.id].banLimit = number;
    fs.writeFileSync("./safe.json", JSON.stringify(safe));
    message.channel.send(`**✅ | Done Set Ban Limit To : \`${number}\`.**`);
    
} else if(args[0] === prefix + "dChannelsLimit") {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission \`ADMINISTRATOR\`.**`)
	if(!safe[message.guild.id])
	  safe[message.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
    if(safe[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Safe Is OFF.**`);
    if(!number) return message.channel.send(`**❌ | Please Type Number.**`);
	if(number.includes(".") || isNaN(number)) return message.channel.send(`**❌ | Please Write Numbers.**`);
    if(number > 5) return message.channel.send(`**❌ | Sorry , But DeleteChannels Limit Than 5.**`);
    safe[message.guild.id].dChannelsLimit = number;
    fs.writeFileSync("./safe.json", JSON.stringify(safe));
    message.channel.send(`**✅ | Done Set DeleteChannels Limit To : \`${number}\`.**`);

} else if(args[0] === prefix + "cChannelsLimit") {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission \`ADMINISTRATOR\`.**`)
	if(!safe[message.guild.id])
	  safe[message.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
    if(safe[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Safe Is OFF.**`);
    if(!number) return message.channel.send(`**❌ | Please Type Number.**`);
	if(number.includes(".") || isNaN(number)) return message.channel.send(`**❌ | Please Write Numbers.**`);
    if(number > 5) return message.channel.send(`**❌ | Sorry , But CreateChannels Limit Than 5.**`);
    safe[message.guild.id].cChannelsLimit = number;
    fs.writeFileSync("./safe.json", JSON.stringify(safe));
    message.channel.send(`**✅ | Done Set CreateChannels Limit To : \`${number}\`.**`);

} else if(args[0] === prefix + "dRolesLimit") {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission \`ADMINISTRATOR\`.**`)
	if(!safe[message.guild.id])
	  safe[message.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
    if(safe[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Safe Is OFF.**`);
    if(!number) return message.channel.send(`**❌ | Please Type Number.**`);
	if(number.includes(".") || isNaN(number)) return message.channel.send(`**❌ | Please Write Numbers.**`);
    if(number > 5) return message.channel.send(`**❌ | Sorry , But DeleteRole Limit Than 5.**`);
    safe[message.guild.id].dRolesLimit = number;
    fs.writeFileSync("./safe.json", JSON.stringify(safe));
    message.channel.send(`**✅ | Done Set DeleteRoles Limit To : \`${number}\`.**`);

} else if(args[0] === prefix + "cRolesLimit") {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission \`ADMINISTRATOR\`.**`)
	if(!safe[message.guild.id])
	  safe[message.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
    if(safe[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Safe Is OFF.**`);
    if(!number) return message.channel.send(`**❌ | Please Type Number.**`);
	if(number.includes(".") || isNaN(number)) return message.channel.send(`**❌ | Please Write Numbers.**`);
    if(number > 5) return message.channel.send(`**❌ | Sorry , But CreateRoles Limit Than 5.**`);
    safe[message.guild.id].cRolesLimit = number;
    fs.writeFileSync("./safe.json", JSON.stringify(safe));
    message.channel.send(`**✅ | Done Set CreateRoles Limit To : \`${number}\`.**`);
} 
	});

client.on('guildBanAdd', async(guild, user) => {
		let entry1 = await guild.fetchAuditLogs({
        type: 'MEMBER_BAN_ADD'
    }).then(audit => audit.entries.first())
    let entry = entry1.executor
		if(!safe[guild.id])
	  safe[guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
		    if(safe[guild.id].onoff === "off") return;
		
  let byy = client.users.cache.get(entry.id);
 // byy.send(`**Tests.**`);
  if(!safe1[byy.id])
    safe1[byy.id] = {
    "kickLimit": 1,
		"banLimit": 1,
		"dChannelsLimit": 1,
		"cChannelsLimit": 1,
		"dRolesLimit": 1,
		"cRolesLimit": 1
      }
  fs.writeFileSync("./safe1.json", JSON.stringify(safe1));
 if(safe1[byy.id].banLimit >= safe[guild.id].banLimit) {
 guild.members.cache.get(byy.id).roles.cache.map(role => {
   guild.members.cache.get(byy.id).roles.remove(role);
   })
   } else {
   safe1[byy.id].banLimit += 1;
  }
		});
client.on('guildMemberRemove', async member => {
		let entry1 = await member.guild.fetchAuditLogs({
      type: "MEMBER_KICK"
    }).then(audit => audit.entries.first())
    let entry = entry1.executor
		if(!safe[member.guild.id])
	  safe[member.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
		    if(safe[member.guild.id].onoff === "off") return;
		
  let byy = client.users.cache.get(entry.id);
 // byy.send(`**Tests.**`);
  if(!safe1[byy.id])
    safe1[byy.id] = {
    "kickLimit": 1,
		"banLimit": 1,
		"dChannelsLimit": 1,
		"cChannelsLimit": 1,
		"dRolesLimit": 1,
		"cRolesLimit": 1
      }
  fs.writeFileSync("./safe1.json", JSON.stringify(safe1));
 if(safe1[byy.id].kickLimit >= safe[member.guild.id].kickLimit) {
 member.guild.members.cache.get(byy.id).roles.cache.map(role => {
   member.guild.members.cache.get(byy.id).roles.remove(role);
   })
   } else {
   safe1[byy.id].kickLimit += 1;
  }
		});

client.on('channelDelete', async channel => {
		let entry1 = await channel.guild.fetchAuditLogs({
      type: "CHANNEL_DELETE"
    }).then(audit => audit.entries.first())
    let entry = entry1.executor
		if(!safe[channel.guild.id])
	  safe[channel.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
		    if(safe[channel.guild.id].onoff === "off") return;
  let byy = client.users.cache.get(entry.id);
  if(!safe1[byy.id])
    safe1[byy.id] = {
    "kickLimit": 1,
		"banLimit": 1,
		"dChannelsLimit": 1,
		"cChannelsLimit": 1,
		"dRolesLimit": 1,
		"cRolesLimit": 1
      }
  fs.writeFileSync("./safe1.json", JSON.stringify(safe1));
 if(safe1[byy.id].dChannelsLimit >= safe[channel.guild.id].dChannelsLimit) {
 channel.guild.members.cache.get(byy.id).roles.cache.map(role => {
   channel.guild.members.cache.get(byy.id).roles.remove(role);
   })
   } else {
   safe1[byy.id].dChannelsLimit += 1;
  }
		});
/*client.on('channelCreate', async channel => {
		let entry1 = await channel.guild.fetchAuditLogs({
      type: "CHANNEL_CREATE"
    }).then(audit => audit.entries.first())
    let entry = entry1.executor
		if(!safe[channel.guild.id])
	  safe[channel.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
		    if(safe[channel.guild.id].onoff === "off") return;
  let byy = client.users.cache.get(entry.id);
  if(!safe1[byy.id])
    safe1[byy.id] = {
    "kickLimit": 1,
		"banLimit": 1,
		"dChannelsLimit": 1,
		"cChannelsLimit": 1,
		"dRolesLimit": 1,
		"cRolesLimit": 1
      }
  fs.writeFileSync("./safe1.json", JSON.stringify(safe1));
 if(safe1[byy.id].cChannelsLimit >= safe[channel.guild.id].cChannelsLimit) {
 channel.guild.members.cache.get(byy.id).roles.cache.map(role => {
   channel.guild.members.cache.get(byy.id).roles.remove(role);
    // "ADMINI
   })
   } else {
   safe1[byy.id].cChannelsLimit += 1;
  }
		});*/
/*
client.on("roleDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    let entry = entry1.executor
		if(!safe[channel.guild.id])
	  safe[channel.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
		    if(safe[channel.guild.id].onoff === "off") return;
  let byy = client.users.cache.get(entry.id);
  if(!safe1[byy.id])
    safe1[byy.id] = {
    "kickLimit": 1,
		"banLimit": 1,
		"dChannelsLimit": 1,
		"cChannelsLimit": 1,
		"dRolesLimit": 1,
		"cRolesLimit": 1
      }
  fs.writeFileSync("./safe1.json", JSON.stringify(safe1));
 if(safe1[byy.id].dRolesLimit >= safe[channel.guild.id].dRolesLimit) {
 channel.guild.members.cache.get(byy.id).roles.cache.map(role => {
   channel.guild.members.cache.get(byy.id).roles.remove(role);
   })
   } else {
   safe1[byy.id].dRolesLimit += 1;
  }
		});
/*
client.on("roleCreate", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    let entry = entry1.executor
		if(!safe[channel.guild.id])
	  safe[channel.guild.id] = {
		"onoff": "off",
		"kickLimit": 0,
		"banLimit": 0,
		"dChannelsLimit": 0,
		"cChannelsLimit": 0,
		"dRolesLimit": 0,
		"cRolesLimit": 0
		}
		fs.writeFileSync("./safe.json", JSON.stringify(safe));
		    if(safe[channel.guild.id].onoff === "off") return;
  let byy = client.users.cache.get(entry.id);
  if(!safe1[byy.id])
    safe1[byy.id] = {
    "kickLimit": 1,
		"banLimit": 1,
		"dChannelsLimit": 1,
		"cChannelsLimit": 1,
		"dRolesLimit": 1,
		"cRolesLimit": 1
      }
  fs.writeFileSync("./safe1.json", JSON.stringify(safe1));
 if(safe1[byy.id].cRolesLimit >= safe[channel.guild.id].cRolesLimit) {
 channel.guild.members.cache.get(byy.id).roles.cache.map(role => {
   channel.guild.members.cache.get(byy.id).roles.remove(role);
   
   })
   } else {
   safe1[byy.id].cRolesLimit += 1;
  }
		});*/
/*
client.on('guildMemberAdd', async member => {
  if(!member.user.bot) return;
  if(member.user === client.user.id) return;
 /* const entry1 = await member.guild.fetchAuditLogs({
        type: ''
    }).then(audit => audit.entries.first())*/
   // let entry = entry1.executor
  /*r.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
 // if(userID === member.guild.ownerID) return;
     if(safe[member.guild.id].onoff === "off") return;
 // let rolee = member.guild.roles.cache.find(r => r.name === member.username)
  setTimeout(() =>{
  member.guild.members.cache.get(member.id).roles.cache.filter(r=> r.name != '@everyone').map(role => {
  return role.setPermissions([]);
  })
    }, 6000)
  });

client.on('message', message => {
     if(message.content === "zab") {
      let role = message.guild.roles.cache.find(r => r.name === "Support")
   message.guild.members.cache.get(message.author.id).roles.add(role);
       message.channel.send(`**Done .**`)
      }       
  })
/*
 client.on('message', message => {
  let args = message.content.split(" ");
  let role = message.guild.roles.cache.find(r => r.name === args.slice(1).join(" "));
  if(args[0].toLowerCase() === prefix + "mem-role") {
if(!role) return message.channel.send(`**Please Write Role Name.**`);
let members = message.guild.roles.cache.get(role.id).members.cache.map(m => m.username);
message.channel.send(`${members.join("\n")}test`)//.join("\n"));
}
});*/
const prefix = "#";
client.on('message', async msg => {  
    var args = msg.content.split(' ');
    if(args[0].toLowerCase() === prefix + "id") {
    let user = msg.mentions.users.first() || client.users.cache.get(args[1]) || msg.author;
  //if(user.username.length === 6) 
      if(!user) return msg.channel.send(`**❌ | I Can't Find This User.**`)    
    if(user.bot) return msg.react("❌");  
      const millis = new Date().getTime() - user.createdAt;
        const now = new Date();
        const createdAt = millis / 1000 / 60 / 60 / 24;
        const millisj = new Date().getTime() - user.joinedAt;
        const nowj = new Date();
        const joinedAt = millisj / 1000 / 60 / 60 / 24;
  const Canvas = require('canvas')
  const { loadImage } = require('canvas')
  const canvas = Canvas.createCanvas(592, 207);
	const ctx = canvas.getContext('2d');
   canvas.width = 591;  
  const x = canvas.width / 2;    
  //    if(user.username.length > 6) use
  const back = await loadImage("https://cdn.discordapp.com/attachments/755853325945143318/757050669315129384/Appbot_filev4.png")
	ctx.drawImage(back, 0, 0, 591, 207);

        ctx.font = "bold 10px kathen"; //Name ,_,
        ctx.fontSize = "10px";
   //     ctx.fillStyle = "#000000";
   //     ctx.textAlign = "center";
    //    ctx.fillText(`${user.username} `, 260, 65);
 // if(user.username.length < 6) {
        ctx.font = "bold 12px kathen"; //Name ,_,
        ctx.fontSize = "12px";
        ctx.fillStyle = "#f1f1f1";
    //    ctx.textAlign = "center";
        ctx.fillText(`${user.username} `, 190, 65);
        ctx.font = "bold 12px kathen";
        ctx.fontSize = "12px";
        ctx.fillText(`${moment.utc(user.createdTimestamp).format("YYYY/M/D hh:mm")}`,440,111)//, MMMM Do")}`, 260, 100)
        ctx.fillText(`${user.presence.status}`,240, 115)
      // } else {
   /*    ctx.font = "bold 30px kathen"; //Name ,_,
        ctx.fontSize = "40px";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.fillText(`${user.username.length == 5} `, x, 202);*/
     
     
       ctx.beginPath();
	   ctx.arc(199.5, 115.2, 52, -45.9, Math.PI * 2, true);
	   ctx.closePath();
	   ctx.clip();
	    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
	 //  ctx.drawImage(avatar, 147.7, 63.4, 104, 104);    
    
  	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'id.png');
    msg.channel.startTyping()
      setTimeout(() => {
	msg.channel.send(attachment);
    msg.channel.stopTyping()
     }, 1000)
    }
});
let party = require("./party.json");
client.on('message' , message => {
  let args = message.content.split(" ");
  if(args[0].toLowerCase() === prefix + "party") {
    if(message.channel.type === "dm") return message.channel.send(`**❌  | Please Write This Commands In Guild.**`)
  //  ifaif
    if(!party[message.guild.id])
      party[message.guild.id] = {
     "onoff": "off",
     "room": ""
        }
    fs.writeFileSync("./party.json", JSON.stringify(party))
    if(!args[1]) return message.channel.send(`**❌ | Please Write \`on\` or \`off\`.**`)
 //   if(!args[1] == ["on", "off"])return
  //  message.channel.send(`**❌ | Example :
//\`${prefix}party on
//${prefix}party off\`**`)
    if(args[1] === "on") {
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission.**`)
      if(party[message.guild.id].onoff === "on") return message.channel.send(`**❌ | Party Already On.**`)
      party[message.guild.id].onoff = "on";
message.channel.send(`**✅ | Done Party Now On.**`) 
    } else if(args[1] === "off") {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission.**`)
   if(party[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Party Already OFF.**`)
      party[message.guild.id].onoff = "off";
    message.channel.send(`**✅ | Done Party Now OFF.**`) 
 
        }else if(args[1] == "room") {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission.**`)  
         if(party[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Sorry Please On Party Command.**`)
          if(!args[2]) return message.channel.send(`**❌  | Please Mention Or Write Name Room.**`)
         let channel = message.mentions.channels.first() || client.channels.cache.get(args[2]) || message.guild.channels.cache.find(c => c.name === args[2]);
       if(!channel) return message.channel.send(`**❌ | Sorry , But I Can't Find This Room.**`)
     party[message.guild.id].room = channel.id;  
          message.channel.send(`**✅  | Done ${channel} This Channel Now Party Room.**`)
        } else if(args[1] === "info") {
          let onoff;
          if(party[message.guild.id].onoff === "on") {
           onoff = "On";
            } else if(party[message.guild.id].onoff === "off") {
          onoff = "OFF";  
            }
 let channel = message.guild.channels.cache.find(c => c.id === party[message.guild.id].room);
         
          let embed = new Discord.MessageEmbed()
          .setAuthor(`${message.guild.name} Party Info`, message.guild.iconURL({dynamic:true}))
          .addField(`**On/OFF :**`, `\`${onoff}\``)
          .addField(`**Room :**`, `${channel}`)
          .setFooter(`Requsted By ${message.author.username}`,message.author.displayAvatarURL({dynamic:true}))
          .setThumbnail(message.guild.iconURL({dynamic:true}))
          message.channel.send(embed);
          } else if(args[1] === "delete") {
                if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**❌ | You Don't Have Permission.**`)  
              if(party[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Sorry, But Party Now OFF.**`)
        let channel = message.guild.channels.cache.find(c => c.id === party[message.guild.id].room);
      if(!channel) return message.channel.send(`**❌ | I Can't Find Party Room.**`)
if(!args[2]) return message.channel.send(`**❌ | Please Write Party Message ID.**`)
        channel.messages.fetch(args[2]).then( m => m.delete())      
    //   if(!fetchMsg) return message.channel.send(`**❌  | I Can't Find This Party Message.**`) 
         //   fetchMsg.delete()
            message.channel.send(`**✅  | Done Cleared This Party.**`)
            } else {
         message.channel.send(`**❌ | Example :
\`${prefix}party on
${prefix}party off\`**`)
     
   }       
  }
  });
const UserBlocked = new Set(); 
client.on('message', message => {
if(message.content.startsWith(`https://r.agar.io/`)) {
  if(party[message.guild.id].onoff === "off") return message.channel.send(`**❌ | Sorry, But Party Now OFF.**`)
    //|| message.content === `http://r.agar.io/`) {
let channel = message.guild.channels.cache.find(c => c.id === party[message.guild.id].room);
  if(!channel) return message.channel.send(`**❌ | I Can't Find Party Room.**`)
   /*   if (!cooldowns.has(message.author.id)) {
      cooldowns.set(message.author.id, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(message.author.id);
    const cooldownAmount = (10 || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `<:749753030899007620:749779549574922301>  **Cooldown ${timeLeft.toFixed(
            1
          )} Seconds.**`
        );
        message.react("749779549574922301");
      }
    }*/
  message.delete()
  const now = Date.now();
      // if (now < 1000000) {
  //const cooldownAmount = 10000 * 1000 * 10000 * 10000 * 10000 * 20000;
  //      const timeLeft = (10000000000000000000000 - now) / 1000;
  if(UserBlocked.has(message.author.id)) return message.reply(`**❌ | Please Wait 10Min.**`)
  
         
        UserBlocked.add(message.author.id)
//  message.delete()
  let embed = new Discord.MessageEmbed()
  .setTitle(`New Party`)
  .setDescription(`URL :
${message.content}
`)
  .setImage(`https://cdn.discordapp.com/attachments/742876430093779060/757553584442310656/IMG_20200921_124635.jpg`)//https://cdn.discordapp.com/attachments/742876430093779060/757552917694906388/IMG_20200921_124435.jpg`)//https://images-ext-1.discordapp.net/external/SNGRZswR6NlGjBrGv25L1b-8jwg8ONJ1NTRmNL0Zfzc/https/static.miniclipcdn.com/images/big-images/Agar.io_MC_444x287.png`)
  .setFooter(`Requsted By ${message.author.username}`,message.author.displayAvatarURL())
  .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
  setTimeout(() => {
    UserBlocked.delete(message.author.id)
    
    }, 600000)
channel.send({embed: embed}).then(m => {
  m.react("✅");
  setTimeout(() => {
  m.react("❌");
    }, 1000)
  
  })//message.content);
}
});
/*

const Enmap = require('enmap');
const cd = require('countdown');
//onst moment = require('moment');
const ms = require('ms');
const totime = require('to-time');
const dbg = new Enmap({ name: 'Giveaway' });

client.on("ready", async () => {
  await dbg.defer;
  await console.log(`Logged in as [ ${client.user.username} ]!`);
  client.guilds.cache.forEach(async g => {
    g.channels.cache
      .filter(
        c =>
          c.type == "text" &&
          c.permissionsFor(client.user.id).has("VIEW_CHANNEL")
      )
      .forEach(async c => {
        let fetched = await c.messages.fetch();
        if (fetched.size == 0) return;
        let mess = await fetched.filter(
          r =>
            r.author.id === client.user.id &&
            r.content ==
              `**🎉 GIVEAWAY 🎉**`
        );
        if (mess.size == 0) return;
        mess.forEach(m => {
          if (!m) return;
          if (!dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`)) return;
          let time2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtime;
          let text2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtext;
          let win2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gwin;
          if (time2 === null || time2 === undefined) return;
          let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor(`${text2}`, g.iconURL())
            .setDescription(
              `React with 🎉 to enter!\nTime remaining: ${cd(
                new Date().getTime(),
                time2
              )}`
            )
            .setFooter(`Ends at`, client.user.displayAvatarURL())
            .setTimestamp(time2);
          let embed2 = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(text2, g.iconURL)
            .setFooter(`Ended at`);
          let ttimer = setInterval(async () => {
            if (
              !m ||
              m.content ==
                `🎉 **GIVEAWAY ENDED** 🎉`
            )
              return;
            let ttt = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
            if (ttt.includes(moment().diff(time2, "seconds")))
              return m.edit(
                `🎉 **GIVEAWAY** 🎉`,
                embed
                  .setColor("#ffb800")
                  .setDescription(
                    `**Last chance to enter!!!**\nReact with 🎉\nTime remaining: ${cd(
                      new Date().getTime(),
                      time2
                    )}`
                  )
              );
            m.edit(
              `🎉 **GIVEAWAY** 🎉`,
              embed.setDescription(
                `React with 🎉 to enter!\nTime remaining: ${cd(
                  new Date().getTime(),
                  time2
                )}`
              )
            );
            if (moment().isAfter(time2)) {
              m.reactions.cache
                .filter(a => a.emoji.name == "🎉")
                .map(r =>
                  r.users.fetch().then(u => {
                    let rusers = u
                      .filter(user => !user.bot)
                      .random(parseInt(win2));
                    m.edit(
                      `**🎉 GIVEAWAY ENDED 🎉**`,
                      embed2
                        .setTimestamp()
                        .setDescription(`Winners:\n${rusers || "No winners"}`)
                    );
                    if (
                      m.reactions.cache
                        .filter(a => a.emoji.name == "🎉")
                        .map(reaction => reaction.count)[0] <= 1
                    ) {
                      return m.channel.send(`No winners :rolling_eyes:`);
                    } else {
                      m.channel.send(
                        `Congratulations ${rusers}! You won the **${text2}**`
                      );
                    }
                    dbg.delete(`giveaway.${g.id}.${c.id}.${m.id}.time`);
                    clearInterval(ttimer);
                    return;
                  })
                );
            }
          }, 5000);
        });
      });
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
});
client.on("message", async message => {
  if (message.author.bot || message.channel.type == "dm") return undefined;
  let args = message.content.split(" ");
  let timer;
  if (args[0] == `${prefix}start`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.cache.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1] || !args[2] || !args[3])
        return message.channel.send(
          `**Usage:** **\`${prefix}start [Time] [Winners] [Giveaway Prize]\n\`**
**Example:** **\`${prefix}start 4h 1 Nitro\`**`
        );
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS"))
        return message.channel.send(`I don't have **Embed Links** permission.`);
      if (ms(args[1]) === undefined)
        return message.channel.send(`Please use a proper time format.`);
      if (isNaN(args[2]))
        return message.channel.send(`Winners must be number!`);
      if (args[2] < 1 || args[2] > 10)
        return message.channel.send(`Winners must be bettwen 1 and 10.`);
      let timega = ms(args[1]) / 1000;
      let time = Date.now() + totime.fromSeconds(timega).ms();
      if (timega < 5)
        return message.channel.send(
          `Giveaway time can't be less than 5 seconds.`
        );
      let timespan = cd(new Date().getTime(), time);
      let rusers;
      let embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`${args.slice(3).join(" ")}`)
        .setDescription(
          `React with 🎉 to enter!\nTime remaining: ${timespan}`
        )
        .setFooter(`Ends at`, client.user.displayAvatarURL())
        .setTimestamp(time);
      let embed2 = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(args.slice(3).join(" "))
        .setFooter(`Ended at`);
      let msg = await message.channel
        .send(
          `**🎉 GIVEAWAY 🎉**`,
          embed
        )
        .catch(err => message.channel.send(`Error: \`${err}\``));
      dbg.set(
        `giveaway.${message.guild.id}.${message.channel.id}.${msg.id}.time`,
        {
          gtime: time,
          gid: msg.id,
          gtext: args.slice(3).join(" "),
          gwin: args[2]
        }
      );
      await msg.react("🎉");
      timer = setInterval(() => {
        if (
          !msg ||
          msg.content ==
            `**🎉 GIVEAWAY ENDED 🎉**`
        )
          return;
        let ttt = [-2, -3, -4, -5, -6, -7, -8, -9, -10];
        if (ttt.includes(moment().diff(time, "seconds")))
          return msg.edit(
            `**🎉 GIVEAWAY 🎉**`,
            embed
              .setColor("#ffb800")
              .setDescription(
                `**Last chance to enter!!!**\nReact with 🎉\nTime remaining: ${cd(
                  new Date().getTime(),
                  time
                )}`
              )
          );
        msg.edit(
          `**🎉 GIVEAWAY 🎉**`,
          embed.setDescription(
            `React with 🎉 to enter!\nTime remaining: ${cd(
              new Date().getTime(),
              time
            )}`
          )
        );
        rusers = msg.reactions.cache
          .filter(a => a.emoji.name == "🎉")
          .map(reaction =>
            reaction.users.cache.filter(u => !u.bot).random(parseInt(args[2]))
          )[0];
        if (moment().isAfter(time)) {
          msg.edit(
            `**🎉 GIVEAWAY ENDED 🎉**`,
            embed2
              .setTimestamp()
              .setDescription(`Winners:\n${rusers || "No winners"}`)
          );
          if (
            msg.reactions.cache
              .filter(a => a.emoji.name == "🎉")
              .map(reaction => reaction.count)[0] <= 1
          ) {
            return message.channel.send(``);
          } else {
            msg.channel.send(
              `Congratulations ${rusers}! You won the **${args
                .slice(3)
                .join(" ")}**`
            );
          }
          clearInterval(timer);
          return;
        }
      }, 5000);
    } else return undefined;
  } else if (args[0] == `${prefix}reroll`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.cache.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1])
        return message.channel.send(
          `**Usage:** **\`${prefix}reroll [giveaway message id]\`**`
        );
      if (isNaN(args[1])) return message.channel.send(`Thats not a message ID`);
      message.channel
        .messages.fetch(args[1])
        .then(async m => {
          if (m.author.id != client.user.id)
            return message.channel.send(`This is not a giveaway message.`);
     /*     if (!m.content.startsWith(`**🎉 GIVEAWAY 🎉**`))
            return message.channel.send(`This is not a giveaway message.`);
         if (!
            m.content ==
            `**🎉 GIVEAWAY ENDED 🎉**`
          )
            return message.channel.send(`The giveaway is not ended.`);
          if (m.reactions.size < 1)
            return message.channel.send(
              `I can't find reactions in this message.`
            );
          if (
            m.reactions.cache
              .filter(a => a.emoji.name == "🎉")
              .map(reaction => reaction.count)[0] <= 1
          )
            return message.channel.send(``);
          m.reactions.cache
            .filter(a => a.emoji.name == "🎉")
            .map(r =>
              r.users.fetch().then(async u => {
                let rusers = u.filter(user => !user.bot).random();
                await message.channel.send(`The new winner is: ${rusers}`);
              })
            );
        })
        .catch(err =>
          message.channel.send(`I can't find this message in the channel.`)
        );
    } else return undefined;
  } else if (args[0] == `${prefix}end`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.cache.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1])
        return message.channel.send(
          `**Usage:** **\`${prefix}gend [giveaway message id]\`**`
        );
      if (isNaN(args[1])) return message.channel.send(`Thats not a message ID`);
      message.channel
        .messages.fetch(args[1])
        .then(async m => {
         /* if (m.author.id != client.user.id)
            return message.channel.send(`This is not a giveaway message.1`);
          if (!m.content.startsWith(`**🎉 GIVEAWAY 🎉**`))
            return message.channel.send(`This is not a giveaway message.1`);
       *   if (!
            m.content ==
            `**🎉 GIVEAWAY ENDED 🎉**`
          )
            return message.channel.send(`The giveaway is ended.`);
          if (m.reactions.cache.size < 1)
            return message.channel.send(
              `I can't find reactions in this message.`
            );
          let gv = dbg.get(
            `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
          );
          let rusers = m.reactions.cache.map(r =>
            r.users.catch.filter(u => !u.bot).random(parseInt(gv.gwin))
          );
          let embed2 = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(gv.gtext)
            .setFooter(`Ended at`);
          m.reactions.cache
            .filter(a => a.emoji.name == "🎉")
            .map(r =>
              r.users.fetch().then(async u => {
                let rusers = u
                  .filter(user => !user.bot)
                  .random(parseInt(gv.gwin));
                m.edit(
                  `**🎉 GIVEAWAY ENDED 🎉**`,
                  embed2
                    .setTimestamp()
                    .setDescription(`Winners:\n${rusers || "No winners"}`)
                );
                if (
                  m.reactions.cache
                    .filter(a => a.emoji.name == "🎉")
                    .map(reaction => reaction.count)[0] <= 1
                ) {
                  return message.channel.send(`No winners :rolling_eyes:`);
                } else {
                  message.channel.send(
                    `Congratulations ${rusers}! You won the **${gv.gtext}**`
                  );
                }
                await dbg.delete(
                  `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
                );
                return;
              })
            );
        })
        .catch(err =>
      //    message.channel.send(`I can't find this message in the channel.`)
     //   );
               console.log(err))
    } else return undefined;
  }
})

*/
const Enmap = require('enmap');
const cd = require('countdown');
const totime = require('to-time');
const ms = require("ms");
const dbg = new Enmap({ name: 'Giveaway' });
/*client.on("ready", async () => {
  await dbg.defer;
  await console.log(`Logged in as [ ${client.user.username} ]!`);
  client.guilds.cache.forEach(async g => {
    g.channels.cache
      .filter(
        c =>
          c.type == "text" &&
          c.permissionsFor(client.user.id).has("VIEW_CHANNEL")
      )
      .forEach(async c => {
        let fetched = await c.messages.fetch();
        if (fetched.size == 0) return;
        let mess = await fetched.filter(
          r =>
            r.author.id === client.user.id &&
            r.content ==
              `**🎉 GIVEAWAY 🎉**`
        );
        if (mess.size == 0) return;
        mess.forEach(m => {
          if (!m) return;
          if (!dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`)) return;
          let time2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtime;
          let text2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtext;
          let win2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gwin;
          if (time2 === null || time2 === undefined) return;
          let embed = new Discord.MessageEmbed()
.setColor("RANDOM")
            .setAuthor(`${text2}`, g.iconURL())
            .setDescription(
              `اضغط على 🎉!\nوقت الجيف اواي : ${cd(
                new Date().getTime(),
                time2
              )}`
            )
            .setFooter(`Ends at`, client.user.avatarURL())
            .setTimestamp(time2);
          let embed2 = new Discord.MessageEmbed()
.setColor("RANDOM")
            .setAuthor(text2, g.iconURL())
            .setFooter(`Ended at`);
          let ttimer = setInterval(async () => {
            if (
              !m ||
              m.content ==
                `🎉 **GIVEAWAY ENDED** 🎉`
            )
              return;
            let ttt = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
            if (ttt.includes(moment().diff(time2, "seconds")))
              return m.edit(
                `🎉 **GIVEAWAY** 🎉`,
                embed
.setColor("RANDOM")
                  .setDescription(
                    `**اضغط على 🎉\nوقت الجيف اواي: ${cd(
                      new Date().getTime(),
                      time2
                    )}`
                  )
              );
            m.edit(
              `🎉 **GIVEAWAY** 🎉`,
              embed.setDescription(
                `اضغط على 🎉 !\nوقت الجيف اواي: ${cd(
                  new Date().getTime(),
                  time2
                )}`
              )
            );
            if (moment().isAfter(time2)) {
              m.reactions.cache
                .filter(a => a.emoji.name == "🎉")
                .map(r =>
                  r.users.fetch().then(u => {
                    let rusers = u
                      .filter(user => !user.bot)
                      .random(parseInt(win2));
                    m.edit(
                      `**🎉 GIVEAWAY ENDED🎉**`,
                      embed2
                        .setTimestamp()
                        .setDescription(`Winners:\n${rusers || "Not Winners"}`)
                    );
                    if (
                      m.reactions.cache
                        .filter(a => a.emoji.name == "🎉")
                        .map(reaction => reaction.count)[0] <= 1
                    ) {
                      return m.channel.send(`No winners :rolling_eyes:`);
                    } else {
                      m.channel.send(
                        `**:tada: | Winners : ${rusers} ! 
:first_place: | Prize : ${text2} !**`
                      );
                    }
                    dbg.delete(`giveaway.${g.id}.${c.id}.${m.id}.time`);
                    clearInterval(ttimer);
                    return;
                  })
                );
            }
          }, 5000);
        });
      });
  });
});*/
client.on("ready", async () => {
  await dbg.defer;
  await console.log(`Logged in as [ ${client.user.username} ]!`);
  client.guilds.cache.forEach(async g => {
    g.channels.cache
      .filter(
        c =>
          c.type == "text" &&
          c.permissionsFor(client.user.id).has("VIEW_CHANNEL")
      )
      .forEach(async c => {
        let fetched = await c.messages.fetchs();
        if (fetched.size == 0) return;
        let mess = await fetched.filter(
          r =>
            r.author.id === client.user.id &&
            r.content ==
              `**🎉 GIVEAWAY 🎉**`
        );
        if (mess.size == 0) return;
        mess.forEach(m => {
          if (!m) return;
          if (!dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`)) return;
          let time2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtime;
          let text2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtext;
          let win2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gwin;
          if (time2 === null || time2 === undefined) return;
          let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor(`${text2}`, g.iconURL())
            .setDescription(
              `React with 🎉 to enter!\nTime remaining: ${cd(
                new Date().getTime(),
                time2
              )}`
            )
            .setFooter(`Ends at`, client.user.displayAvatarURL())
            .setTimestamp(time2);
          let embed2 = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(text2, g.iconURL)
            .setFooter(`Ended at`);
          let ttimer = setInterval(async () => {
            if (
              !m ||
              m.content ==
                `**🎉 GIVEAWAY ENDED 🎉**`
            )
              return;
            let ttt = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
            if (ttt.includes(moment().diff(time2, "seconds")))
              return m.edit(
                `**🎉 GIVEAWAY 🎉**`,
                embed
                  .setColor("#ffb800")
                  .setDescription(
                    `**Last chance to enter!!!**\nReact with 🎉\nTime remaining: ${cd(
                      new Date().getTime(),
                      time2
                    )}`
                  )
              );
            m.edit(
              `**🎉 GIVEAWAY 🎉**`,
              embed.setDescription(
                `React with 🎉 to enter!\nTime remaining: ${cd(
                  new Date().getTime(),
                  time2
                )}`
              )
            );
            if (moment().isAfter(time2)) {
              m.reactions.cache
                .filter(a => a.emoji.name == "🎉")
                .map(r =>
                  r.fetchUsers().then(u => {
                    let rusers = u
                      .filter(user => !user.bot)
                      .random(parseInt(win2));
                    m.edit(
                      `${g} GIVEAWAY ENDED ${g}`,
                      embed2
                        .setTimestamp()
                        .setDescription(`Winners:\n${rusers || "No winners"}`)
                    );
                    if (
                      m.reactions.cache
                        .filter(a => a.emoji.name == "🎉")
                        .map(reaction => reaction.count)[0] <= 1
                    ) {
                      return m.channel.send(`No winners :rolling_eyes:`);
                    } else {
                      m.channel.send(
                        `Congratulations ${rusers}! You won the **${text2}**`
                      );
                    }
                    dbg.delete(`giveaway.${g.id}.${c.id}.${m.id}.time`);
                    clearInterval(ttimer);
                    return;
                  })
                );
            }
          }, 5000);
        });
      });
  });
});
client.on("message", async message => {
  if (message.author.bot || message.channel.type == "dm") return undefined;
  let args = message.content.split(" ");
  let timer;
  if (args[0] == `${prefix}start`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.cache.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1] || !args[2] || !args[3])
        return message.channel.send(
          `**❎ | Example :** \n**\`${prefix}start [Time] [Winners] [Giveaway Prize]\`**`)// **Example:** **\`${prefix}gstart 4h 1 Nitro\`**`
      if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR"))
        return message.channel.send(`**انا لا أمتلك \`\`ADMINISTRATOR\`\``)
          //(`I don't have **Embed Links** permission.`);
      if (ms(args[1]) === undefined)
        return message.channel.send(`**❎ | Please Type GiveAway Time.**`);
      if (isNaN(args[2]))
        return message.channel.send(`**❎ | Please Type GiveAway Winners.**`);
      if (args[2] < 1 || args[2] > 10)
        return message.channel.send(`**❎ | Please Winners No more than 10.**`);
      let timega = ms(args[1]) / 1000;
      let time = Date.now() + totime.fromSeconds(timega).ms();
      if (timega < 5)
        return message.channel.send(
      `**❎ | Please Time No less Than 5.**`
        );
      let timespan = cd(new Date().getTime(), time);
      let rusers;
      message.delete()
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${args.slice(3).join(" ")}`)
        .setDescription(
          `React with 🎉 to enter !
Time remaining: **${timespan}\n**Hosted By : <@${message.author.id}>`
        )
        .setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic:true}))
        .setTimestamp(time)
        .setThumbnail(message.guild.iconURL({dynamic:true}))
      let embed2 = new Discord.MessageEmbed()
.setColor("RANDOM")
        .setAuthor(args.slice(3).join(" "))
      //  .setFooter(`سوف ينتهي في`);
      let msg = await message.channel
        .send(
          `**🎉 GIVEAWAY 🎉**`,
          embed
        )
        .catch(err => message.channel.send(`Error: \`${err}\``));
      dbg.set(
        `giveaway.${message.guild.id}.${message.channel.id}.${msg.id}.time`,
        {
          gtime: time,
          gid: msg.id,
          gtext: args.slice(3).join(" "),
          gwin: args[2]
        }
      );
      await msg.react("🎉");
      timer = setInterval(() => {
        if (
          !msg ||
          msg.content ==
            `**🎉 GIVEAWAY ENDED 🎉**`
        )
          return;
    /*    let ttt = [-2, -3, -4, -5, -6, -7, -8, -9, -10];
        if (ttt.includes(moment().diff(time, "seconds")))
          return msg.edit(
            `**🎉 GIVEAWAY 🎉**`,
            embed
.setColor("RANDOM")
              .setDescription(
                `React with 🎉 to enter !
Time remaining: **${cd(
                  new Date().getTime(),
                  time
                )}**\nHosted By: <@${message.author.id}>`
              )
          );*/
    let ttt = [-2, -3, -4, -5, -6, -7, -8, -9, -10];
        if (ttt.includes(moment().diff(time, "seconds")))
          return msg.edit(
            `**🎉 GIVEAWAY 🎉**`,
            embed
              .setColor("#ffb800")
              .setDescription(
                `**Last chance to enter !!!**\nReact with 🎉\nTime remaining: **${cd(
                  new Date().getTime(),
                  time
                )}**\nHosted By: <@${message.author.id}>`
              )
          );
        msg.edit(
          `**🎉 GIVEAWAY 🎉**`,
          embed.setDescription(
            `React with 🎉 to enter !\nTime remaining: **${cd(
              new Date().getTime(),
              time
            )}**\nHosted By: <@${message.author.id}>`
          )
        );      
        rusers = msg.reactions.cache
          .filter(a => a.emoji.name == "🎉")
          .map(reaction =>
            reaction.users.cache.filter(u => !u.bot).random(parseInt(args[2]))
          )[0];
        if (moment().isAfter(time)) {
          msg.edit(
            `**🎉 GIVEAWAY ENDED 🎉**`,
            embed2
              .setTimestamp()
              .setDescription(`Winners: \n${rusers || "Not Winners"}`)//\n<@${message.author.id}>`)
          );
          if (
            msg.reactions.cache
              .filter(a => a.emoji.name == "🎉")
              .map(reaction => reaction.count)[0] <= 1
          ) {
            return message.channel.send(``);
          } else {
            msg.channel.send(
                    `Congratulations ${rusers} ! You won the **${args.slice(3).join(" ")}** !
https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${msg.id}`)//**:tada: | Winners : ${rusers || `\`Not Winners\``} !\n:first_place: | Prize :** **${args.slice(3).join(" ")} !**`);
          
            
          }
          clearInterval(timer);
          return;
        }
      }, 5000);
    } else return undefined;
  } else if (args[0] == `${prefix}reroll`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.cache.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1])
        return message.channel.send(
          `**❎ | Example : \n\`${prefix}reroll  [Giveaway ID]\`**`
        );
      if (isNaN(args[1])) return message.channel.send(`**❎ | This Message Not Giveaway**`);
      message.channel
        .messages.fetch(args[1])
        .then(async m => {
          if (
            m.content !=
            `**🎉 GIVEAWAY ENDED 🎉**`
          )
            
            return message.channel.send(`**❎ | This Giveaway Not End.**`);
                let gv = dbg.get(
            `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
          );
        if (m.reactions.cache.size < 1)
            return message.channel.send(
              `**❎ | Not Found Reactions On This Giveaway**`
            );
          if (
            m.reactions.cache
              .filter(a => a.emoji.name == "🎉")
              .map(reaction => reaction.count)[0] <= 1
          )
            return message.channel.send(``);
          m.reactions.cache
            .filter(a => a.emoji.name == "🎉")
            .map(r =>
              r.users.fetch().then(async u => {
             message.delete()
            let rusers = u.filter(user => !user.bot).random();
                await message.channel.send(`🎉 The New Winner : ${rusers} ! Congratulations !
https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${args.slice(1).join(" ")}`);
              })
            );
        })
    
    } else return undefined;
  } else if (args[0] == `${prefix}end`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.cache.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1])
        return message.channel.send(
          `**❎ | Example : \n\`${prefix}end [Giveaway ID]\`**`
        );
      if (isNaN(args[1])) return message.channel.send(`**❎ | This Not ID Giveaway.**`);
      message.channel
        .messages.fetch(args[1])
        .then(async m => {
          if (m.author.id != client.user.id)
            return message.channel.send(`**❎ | This Message Not Giveaway.**`)//(` is not a giveaway message.`);
          if (!m.content.startsWith(`**🎉 GIVEAWAY 🎉**`))
            return message.channel.send(`**❎ | This Message Not Giveaway.**`)//(`This is not a giveaway message.`);
          if (
            m.content ==
            `**🎉 Giveaway ENDED 🎉**`
          )
            return message.channel.send(`**❎ | This Giveaway is Already Ended.**`)//(`The giveaway is ended.`);
          if (m.reactions.size < 1)
            return message.channel.send(
              `**❎ | Not Found Reactions On This Giveaway.**`//❌ | لا يوجد رياكشن على هذا الجيف اواي.**.`
            );
          let gv = dbg.get(
            `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
          );
          let rusers = m.reactions.cache.map(r =>
            r.users.cache.filter(u => !u.bot).random(parseInt(gv.gwin))
          );
        message.delete()
          let embed2 = new Discord.MessageEmbed()
.setColor("RANDOM")
            .setAuthor(gv.gtext)
            .setFooter(`سوف ينتهي في`);
          m.reactions.cache
            .filter(a => a.emoji.name == "🎉")
            .map(r =>
              r.users.fetch().then(async u => {
                let rusers = u
                  .filter(user => !user.bot)
                  .random(parseInt(gv.gwin));
                m.edit(
                  `**🎉 GIVEAWAY ENDED 🎉**`,
                  embed2
                    .setTimestamp()
                    .setDescription(`Winners: \n${rusers || "Not Winners"}`)
                );
                        message.channel.send(
                    `Congratulations ${rusers} ! You won the **${gv.gtext}** !
https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${m.id}`);
                await dbg.delete(
                  `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
                );
                return;
              })
            );
        })
        .catch(err =>
          message.channel.send(`I can't find this message in the channel.`)
        );
    } else return undefined;
  }
});
/*
const { token, owners } = require("./config")
const blacklistedPermissions = ["administrator", "banMembers", "kickMembers", "manageChannels", "manageRoles"];
const { Client1 } = require("eris");
const client = new Client(token, {
  disableEvents: ["TYPING_START", "PRESENCE_UPDATE", "VOICE_STATE_UPDATE", "USER_UPDATE", "MESSAGE_UPDATE", "MESSAGE_DELETE", "MESSAGE_DELETE_BULK"],
  disableEveryone: true,
  getAllUsers: true
});

var actions = [];

const FetchAduitLogs = (guild, type, targetID) => new Promise(async (resolve, reject) => {
    const auditLogs = await guild.getAuditLogs(10, undefined, type);
    const audit = auditLogs && auditLogs.entries ? auditLogs.entries.sort((a, b) => b.id - a.id).find(log => log.targetID == targetID) : undefined;
    if (audit && audit.user) return resolve(audit.user);
    return resolve(false);
  });
  
const RegisterAction = (action)=>{ actions.push(action); setTimeout(()=> actions = actions.filter(x=> x.code !== action.code), action.endsAt);};

client
  .on("ready", ()=> { client.editStatus("invisible"); console.log("Logined to Discord API"); })
  .on("messageCreate", message=>{
  if(!message.author.bot && owners.includes(message.author.id) && message.content.toLowerCase().startsWith("here"))message.channel.createMessage("Yes. i'm here").then(m=> setTimeout(()=>m.delete(), 20000));
  }).on("guildBanAdd", async (guild, user) => {
    const Logs = await FetchAduitLogs(guild, 22, user.id);
    if (Logs)return RegisterAction({
        ID: Logs.id,
        code: Logs.id+Date.now(),
        guild: guild.id,
        action: "guildBanAdd",
        time: Date.now(),
        maxTimes: 2,
        endsAt: 86400000
      });
  }).on("guildMemberRemove", async (guild, user) => {
    const Logs = await FetchAduitLogs(guild, 20, user.id);
    if (Logs && !owners.includes(Logs.id)) return actions.push({
        ID: Logs.id,
        code: Logs.id+Date.now(),
        guild: guild.id,
        action: "guildMemberRemove",
        time: Date.now(),
        maxTimes: 2,
        endsAt: 86400000
      });
  }).on("channelDelete", async channel => {
    const Logs = await FetchAduitLogs(channel.guild, 12, channel.id);
    if (Logs && !owners.includes(Logs.id)) return actions.push({
        ID: Logs.id,
        code: Logs.id+Date.now(),
        guild: channel.guild.id,
        action: "channelDelete",
        time: Date.now(),
        maxTimes: 2,
        endsAt: 21600000
      });
  }).on("channelCreate", async channel => {
    if(!channel.guild)return;
    const Logs = await FetchAduitLogs(channel.guild, 10, channel.id);
    if (Logs && !owners.includes(Logs.id)) return actions.push({
        ID: Logs.id,
        code: Logs.id+Date.now(),
        guild: channel.guild.id,
        action: "channelCreate",
        time: Date.now(),
        maxTimes: 3,
        endsAt: 21600000
      });
  }).on("channelUpdate", async (channel, newChannel) => {
    const Logs = await FetchAduitLogs(channel.guild, 11, channel.id);
    if (Logs && !owners.includes(Logs.id)) return actions.push({
        ID: Logs.id,
        code: Logs.id+Date.now(),
        guild: channel.guild.id,
        action: "channelUpdate",
        time: Date.now(),
        maxTimes: 5,
        endsAt: 21600000
      });
  }).on("guildRoleUpdate", async (guild, newRole, oldRole) => {
    const Logs = await FetchAduitLogs(guild, 31, newRole.id);
    if (Logs && !owners.includes(Logs.id)) actions.push({
        ID: Logs.id,
        code: Logs.id+Date.now(),
        guild: guild.id,
        action: "guildRoleUpdate",
        time: Date.now(),
        maxTimes: 2,
        endsAt: 21600000
      });
  
const permissions = Object.keys(newRole.permissions.json).filter(e => Object.keys(oldRole.permissions.json).every(x=> x !== e));
if(Logs && !owners.includes(Logs.id) && permissions.find(x=> blacklistedPermissions.includes(x)))newRole.edit({ permissions: oldRole.permissions.allow }).catch(()=>{});
  }).on("guildRoleDelete", async (guild, role) => {
    const Logs = await FetchAduitLogs(guild, 32, role.id);
    if (Logs) return RegisterAction({
        ID: Logs.id,
        code: Logs.id+Date.now(),
        guild: guild.id,
        action: "guildRoleDelete",
        time: Date.now(),
        maxTimes: 2,
        endsAt: 21600000
      });
  }).on("guildRoleCreate", async (guild, role) => {
    const Logs = await FetchAduitLogs(guild, 30, role.id);
    if (Logs && !owners.includes(Logs.id)) actions.push({
        ID: Logs.id,
        code: Logs.id+Date.now(),
        guild: guild.id,
        action: "guildRoleCreate",
        time: Date.now(),
        maxTimes: 3,
        endsAt: 21600000
      });
  
let permissions = Object.keys(role.permissions.json);
if(Logs && !owners.includes(Logs.id) && permissions.find(x=> blacklistedPermissions.includes(x)))role.edit({ permissions: 0 }).catch(()=>{});
}).connect();


setInterval(()=> ["guildBanAdd", "guildMemberRemove", "channelDelete", "channelCreate", "channelUpdate", "guildRoleUpdate", "guildRoleCreate"].forEach(async event=>{
for(let ID of actions.filter(x=> x.action == event).map(x=> x.ID)){
let a = actions.filter(x=> x.action == event && x.ID == ID);
for(let guildID of [...new Set(a.map(x=> x.guild))]){
if(a.length !== 0 && a.length >= a.find(g=> g.guild == guildID).maxTimes && !owners.includes(ID)){
try {
console.log("Trying to stop him...");
actions = actions.filter(x=> (x.ID !== ID));
const member = client.guilds.get(guildID).members.get(ID);
for(let roleID of member.roles){
  let role = client.guilds.get(guildID).roles.get(roleID);
  if(role && Object.keys(role.permissions.json).find(x=> blacklistedPermissions.includes(x)))member.removeRole(roleID).catch(()=>role.edit({permissions: 0 }).catch(()=>{}));
}}catch(err){ console.error(err); }}}}}), 5000);



*/
/*
const test = require("./test.json");
client.on('message', message => {
          
          if(!test[message.guild.id + message.author.id])
          
             test[message.guild.id + message.author.id] = {
              "coins": 0
               
               }
          fs.writeFileSync("./test.json", JSON.stringify(test))
          test[message.guild.id + message.author.id].coins +=1;
          if(message.content === "testm") {
          message.channel.send(test[message.guild.id + message.author.id].coins)
          }
          })*/
const sug = JSON.parse(fs.readFileSync("./sug.json", "utf8"));
var sugcool = new Set();
client.on('message', async message => {
    if (message.content.startsWith(prefix + 'sug')) {
        if (['set', 'blacklist add', 'blacklist add', 'blacklist list', 'on', 'off'].includes(message.content.split(" ")[1])) return null;
        if (!sug[message.guild.id] || !message.guild.channels.cache.get(sug[message.guild.id].channel)) return message.channel.send(`**❌ | please Type \`${prefix}sug room\` To SetUp the Suggestions channels`);
        if (sug[message.guild.id].onoff == 'Off') return message.channel.send(`**This Command Has Been Disabled**!`);
        if (!sug[message.guild.id]) sug[message.guild.id] = {};
        var args = message.content.split(" ").slice(1).join(" ");
        if (!args) return message.channel.send('**Please Type Your Suggestion**!');
        var random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var ID = "";
        for (var y = 0; y < 6; y++) {
            ID += `${random.charAt(Math.floor(Math.random() * random.length))}`;
        };
        let embed = new Discord.MessageEmbed().setAuthor(`New Suggestion By ${message.author.username}`, message.author.avatarURL).setColor('#f06301')
            .addField('**Suggestion:**', args).setFooter(`UserID: (${message.author.id}) | sID: (${ID})`).setTimestamp();
        let ch = client.channels.cache.get(sug[message.guild.id].channel);
        message.channel.send(`**☑️ Your Suggestion Has Been Sent To ${ch}**!`);
        message.author.send(new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`Hey,${message.author}. Your suggestion has been sent to the ${ch} channel to be voted on!
  Your suggestion ID (sID) for reference is **${ID}**`).setColor('#00ff97').setFooter(`Guild ID: (${message.guild.id}) | sID: (${ID})`).setTimestamp())
        ch.send(embed).then(M => {
            M.react('👍');
            M.react('👎')
            sug[message.guild.id + ID] = {
                ID: M.id,
                by: message.author.id,
                content: args
            }
            fs.writeFile("./sug.json", JSON.stringify(sug), (err) => {
                if (err) console.error(err)
            });
            fs.writeFile("./sug.json", JSON.stringify(sug), (err) => {
                if (err) console.error(err)
            });
        })
    }
    if (message.content.startsWith(prefix + 'reply')) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You Don't Have **MANAGE_MESSAGES** Premission!`)
        if (!sug[message.guild.id] || !message.guild.channels.cache.get(sug[message.guild.id].channel)) return message.channel.send(
            `**❌ | please Type \`${prefix}sug room\` To SetUp the Suggestions channels`)
        var ID = message.content.split(" ")[1];
        if (!ID || !sug[message.guild.id + ID]) return message.channel.send('**I Cannot Find Suggestion With This ID**!')
        let ch = message.guild.channels.cache.get(sug[message.guild.id].channel)
        let oMessage = sug[message.guild.id + ID].ID ? await ch.messages.fetch(sug[message.guild.id + ID].ID) : null;
        if (!oMessage) return message.channel.send('**❌ | I Cannot Find Suggestion With This ID**!')
        let editt = message.content.split(" ")[2];
        if (!editt) return message.channel.send(`**Please Type Your Reply**!`);
        message.channel.send(`**☑️ The __Suggestion__ With The ID \`${ID}\` Has Been Replyed**!`)
        let em = message.guild.members.cache.get(sug[message.guild.id + ID].by);
        em.send(new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`Hey,${message.author}. Your suggestion With ID **${ID}** Has Been Replyed By **${message.author.tag}**!
  [Go To It](https://discordapp.com/channels/${message.guild.id}/${ch.id}/${sug[message.guild.id+ID].ID})`)
            .setColor('#00ff97').setFooter(`Guild ID: (${message.guild.id}) | sID: (${ID})`).setTimestamp())
        oMessage.edit(new Discord.MessageEmbed().setAuthor(`New Suggestion By ${em.user.username}`, em.avatarURL)
            .addField('**Suggestion:**', sug[message.guild.id + ID].content).addField(`**${message.author.tag} Replay:**`, editt)
            .setFooter(`UserID: (${sug[message.guild.id+ID].by}) | sID: (${ID})`).setTimestamp().setColor('#9ef001'))

    }
})
client.on('message', async message => {
   	let args = message.content.split(" ");
    if (args[0].toLowerCase() === (prefix + 'edit')) {
      //  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You Don't Have **MANAGE_MESSAGES** Premission!`)
        if (!sug[message.guild.id] || !message.guild.channels.cache.get(sug[message.guild.id].channel)) return message.channel.send(
            `**❌ | please Type \`${prefix}sug room\` To SetUp the Suggestions channels`)
        var ID = args[1];
      if(message.author.id != sug[message.guild.id + ID].by) return message.channel.send(`**❌ | This Sug Not Your Suggest.**`)
        if (!ID || !sug[message.guild.id + ID]) return message.channel.send('**I Cannot Find Suggestion With This ID**!')
        let ch = message.guild.channels.cache.get(sug[message.guild.id].channel)
        let oMessage = sug[message.guild.id + ID].ID ? await ch.messages.fetch(sug[message.guild.id + ID].ID) : null;
        if (!oMessage) return message.channel.send('**❌ | I Cannot Find Suggestion With This ID**!')
        let editt = args.slice(2).join(" ");
        if (!editt) return message.channel.send(`**Please Type Your Edit**!`);
        message.channel.send(`**☑️ The __Suggestion__ With The ID \`${ID}\` Has Been Edited**!`)
        let em = message.guild.members.cache.get(sug[message.guild.id + ID].by);
        em.send(new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`Hey,${message.author}. Your suggestion With ID **${ID}** Has Been Replyed By **${message.author.tag}**!
  [Go To It](https://discordapp.com/channels/${message.guild.id}/${ch.id}/${sug[message.guild.id+ID].ID})`)
            .setColor('#00ff97').setFooter(`Guild ID: (${message.guild.id}) | sID: (${ID})`).setTimestamp())
            sug[message.guild.id + ID].content = editt;
        oMessage.edit(new Discord.MessageEmbed().setAuthor(`New Suggestion By ${em.user.username}`, em.avatarURL)
        
            .addField('**Suggestion:**', sug[message.guild.id + ID].content)
            .setFooter(`UserID: (${sug[message.guild.id+ID].by}) | sID: (${ID})`).setTimestamp().setColor('#9ef001'))
    }
})

client.on('message', message => {
    if (message.content.startsWith(prefix + 'sug room')) {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`You Don't Have **MANAGE_GUILD** Premission!`)
        let ch = message.mentions.channels.first() || message.guild.channels.cache.get(message.content.split(" ")[1]);
        if (!ch) return message.channel.send('I Cannot Find This Channel');
        sug[message.guild.id] = {
            onoff: 'On',
            channel: ch.id
        };
        fs.writeFile("./sug.json", JSON.stringify(sug), (err) => {
            if (err) console.error(err)
        });
        message.channel.send(`** To ${ch}**!`)
    }
})




