const Discord = require ('discord.js');
const bot = new Discord.Client();
const low = require ("lowdb");
const FileSync = require ("lowdb/adapters/FileSync");
const weather = require("weather-js");
const Wiki = require("wikijs");

const config = require("./config.json");

var pref = config.prefix
var randnum = 0;

const yt = require("ytdl-core")
const Youtube = require("youtube-node")
var Search = new Youtube();
Search.setKey('AIzaSyBqKpw8Y0JGRdaUdQGhbOmWw0qEsXcfmNg');
const queue = []
var key ="AIzaSyBqKpw8Y0JGRdaUdQGhbOmWw0qEsXcfmNg"

const mappings = (function (object) {
    let output = [];

    for (let key in object) {
        output.push({
            regex: new RegExp(key, 'ig'),
            replacement: object[key]
        })
    }
})

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: [], server_database: [], idées: []}).write()

var storynumber = db.get('histoires').size().value();

bot.login(process.env.TOKEN);

bot.on(("ready"), ()=> {
    console.log("☻Bot démarré !!☻")
    function jeux() {
        
        
          var answers = ['###aide|vChristmas-Exclusivity', '(ﾉ◕ヮ◕)', `${servercount} Guilds`, `${bot.users.size} Users`, "Joyeux Noël !!!!!!!"];
        
        
            return answers[Math.floor(Math.random()*answers.length)];
        }
        var servercount = bot.guilds.size;
            var servers = bot.guilds.array().map(g => g.name).join(',');
        
        setInterval(() => {
        bot.user.setGame(jeux(), "https://www.twitch.tv/xxoighs_servicexx/")     }, 5000)
    bot.user.setUsername("Oigh's Bot™")
    bot.user.setAvatar("./OighBotNoël.png")
}); 

bot.on("guildCreate", guild  => {
    try {
   guild.channels.find("name", "notifications").send(`Salut, merci de m'avoir invité sur le serv ${guild.name}, faites >help pour avoir la liste de mes commandes !!`)
}catch(err) {
    guild.owner.send("Veuillez créer le salon `notifications` !! Car une grande partie de mes fonctionalité sera désactivé !!")
}
});

bot.on("guildMemberAdd", async member => {
    try {
    let rol = member.guild.roles.find("name", "Enderman")
    var emb = new Discord.RichEmbed()
            .setColor("730000")
            .setTitle("Notification")
            .setDescription(`:boom:${member.user.tag} est arivé(e):boom:`)
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
    member.guild.channels.find("name", 'notifications').send(emb);
    member.addRole(rol)
}catch(err) {
    member.guild.owner.send("Veuillez Créer le salon `notifications` et le rôle `Enderman` pour que tout le monde sache l'arrivée de qq !!")
}
    });
    
    bot.on("roleCreate", role =>{
        try {
        var emb = new Discord.RichEmbed()
        .setColor("730000")
        .setTitle("Notification")
        .setDescription(`Un rôle vien d'être créé sur ${role.guild.name}`)
        .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        role.guild.channels.find("name", 'notifications').send(emb)
        } catch(err) {
            role.guild.owner.send("Veuillez créer le salon `notifications`, comme ça tout le monde sera au courant des roles créés !!")
        }
    });

    bot.on("roleDelete", role =>{
        try {
        var emb = new Discord.RichEmbed()
        .setColor("730000")
        .setTitle("Notification")
        .setDescription(`Le rôle ${role.name} viens d'être supprimé sur ${role.guild.name}`)
        .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
    role.guild.channels.find("name", 'notifications').send(emb)
        } catch(err) {
            role.guild.owner.send("Veuillez créer le salon `notifications`, comme ça tout le monde sera au courant des roles détruits !!")
        }
    })

    bot.on("emojiCreate", emoji =>{
        try {
        var emb = new Discord.RichEmbed()
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
            .setColor("730000")
            .setTitle("Notification")
            .setDescription(`L'image ${emoji.name}.png viens d'être importé pour un émoji sur ${emoji.guild.name}`)
        emoji.guild.channels.find("name", 'notifications').send(emb)
        } catch(err) {
            emoji.guild.owner.send("Veuillez créer le salon `notifications`, comme ça tout le monde sera au courant des emojis créés !!")
        }
    })

    bot.on("emojiDelete", emoji =>{
        try {
        var emb = new Discord.RichEmbed()
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
            .setColor("730000")
            .setTitle("Notification")
            .setDescription(`L'emoji ${emoji.name} viens d'être supprimé sur ${emoji.guild.name}`)
        emoji.guild.channels.find("name", 'notifications').send(emb)
        } catch(err) {
            emoji.guild.owner.send("Veuillez créer le salon `notifications`, comme ça tout le monde sera au courant des emojis créés !!")
        }
    })

bot.on(("guildMemberRemove"), (member)=> {
    try {
    member.guild.channels.find("name", 'welcome').send(`:sob: "${member.user.tag}" est parti(e):sob:`);
        } catch(err) {
            member.guild.owner.send("Veuillez créer le salon `notifications`, comme ça tout le monde sera au courant des personnes qui partent !!")
        }
        })

bot.on(("message"), async (msg)=>{

    try {
    if (msg.channel.type === "dm") return;

    var msgAuthURL = msg.author.avatarURL;
    var msgAuthName = msg.author.username;
    var msgauthor = msg.author.id;

        const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        
        if(!db.get("xp").find({user: msgauthor}).value()){
            db.get("xp").push({user: msgauthor, xp: 1}).write();
        }else{
            var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
            console.log(userxpdb);
            var userxp = Object.values(userxpdb)
            console.log(userxp);
            console.log(`Nombre d'xp : ${userxp[1]}`)
    
            db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    
        }   

        if (msg.content === pref + "join"){
            if (msg.channel.type === 'dm')return;
            if (!msg.member.voiceChannel) 
                return msg.reply(" , Tu es deja dans un channel vocal !")
          let voiceChannel = msg.member.voiceChannel;
          voiceChannel.join()
          console.log('joinvoc')
            
        }        
        
        if (msg.content === pref + "leave"){
            if (msg.channel.type === 'dm') return;
            if(Bot.voiceChannel) {
              return msg.channel.sendMessage("Je ne suis pas dans un salon vocal.");
            }
            if(!msg.member.voiceChannel)
              return msg.channel.sendMessage("Vous n'êtes pas dans un channel vocal.");
          let voiceChannel = msg.member.voiceChannel;
          voiceChannel.leave()
          console.log('leave')
        }

 if (msg.content.startsWith(pref + "add")) {
            if (msg.channel.type === 'dm') return;
            var length = msg.content.length;
            var AddToQueue = msg.content.slice(4, length);
        
            Search.search(AddToQueue, 1, function (error, result) {
              if (error) {
                console.log(error);
              } else {
                if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].songs = [];
                msg.channel.sendMessage("", {embed: {
                  thumbnail: {url: msg.author.avatarURL},
                        description: `[${result.items[0].snippet.title}](${result.items[0].snippet.link})`,
                        title: "Adding",
                        color: 0x556555,
                }
              })
                queue[msg.guild.id].songs.push({ songUrl: result.items[0].id.videoId, songTitle: result.items[0].snippet.title });
              }
            });
        }
        
        if (msg.content === pref + "queue") {
            if (msg.channel.type === 'dm') return;
            if(!msg.guild.songs === 0)
            return msg.channel.sendMessage("Il n'y a pas de musique a la queue, faite `//add (musique)` pour en ajouter a la queue.")
             var icon = msg.author.avatarURL;
             var name = msg.author.username;
            
            let tosend = [];
            queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i + 1}. "${song.songTitle}`); });
        
            let queue_embed = new Discord.RichEmbed().setColor("#FF8900").setAuthor(name, icon).setTitle("__**Queue**__").setDescription(tosend).setTimestamp().setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL);
        
        
            msg.channel.sendEmbed(queue_embed, { disableEveryone: true });
        }

 if (msg.content == pref + "play") {
            if (msg.channel.type === 'dm') return;
            if(!msg.member.voiceChannel)
              return msg.channel.sendMessage(" Vous n'êtes pas dans un channel vocal.");
          
              playsong(msg)
            
            function playsong(msg) {
              let toplay = [];
              queue[msg.guild.id].songs.forEach((song, i) => { toplay.push(`${song.songUrl}`); });
              let toplayname = [];
              queue[msg.guild.id].songs.forEach((song, i) => { toplayname.push(`${song.songTitle}`); });
          
              msg.channel.sendMessage(toplayname[0])
          
              console.log(toplay)
              var voiceChannel = msg.member.voiceChannel;
              voiceChannel.join()
                .then(connnection => {
                  let stream = yt("youtube.com/watch?v=" + toplay[0], { audioonly: true });
                  const dispatcher = connnection.playStream(stream);
                  dispatcher.on('end', () => {
                    queue[msg.guild.id].songs.shift()
                    toplay.shift();
                    toplayname.shift();
                    if (toplay.length > 0) {
                      playsong(msg);
                    return;
                    }
                  });
                });
            return;}
        }
        
        if (command === "eval") {
            if (msg.author == config.creator) {
              const code = args.join(" ");
              let evaled = eval(code);
        
              if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
        
              msg.channel.send(clean(evaled), {code : ""});
            }else{
                msg.channel.send("Impossible d'évaluer le code, vous n'êtes pas mon __**Fondateur**__")
            }
          }
        
        if(command === "ping") {
        const m = await msg.channel.send("Ping?");
        m.edit(`Pong! la latence est de ${m.createdTimestamp - msg.createdTimestamp}ms, celle de l'API est de ${Math.round(bot.ping)}ms`);
        m.edit(`Pong! la latence est de ${m.createdTimestamp - msg.createdTimestamp}ms, celle de l'API est de ${Math.round(bot.ping)}ms`);
        m.edit(`Pong! la latence est de ${m.createdTimestamp - msg.createdTimestamp}ms, celle de l'API est de ${Math.round(bot.ping)}ms`);
        m.edit(`Pong! la latence est de ${m.createdTimestamp - msg.createdTimestamp}ms, celle de l'API est de ${Math.round(bot.ping)}ms`);
        m.edit(`Pong! la latence est de ${m.createdTimestamp - msg.createdTimestamp}ms, celle de l'API est de ${Math.round(bot.ping)}ms`);
        m.edit(`Pong! la latence est de ${m.createdTimestamp - msg.createdTimestamp}ms, celle de l'API est de ${Math.round(bot.ping)}ms`);
        m.edit(`Pong! la latence est de ${m.createdTimestamp - msg.createdTimestamp}ms, celle de l'API est de ${Math.round(bot.ping)}ms`);
        m.edit(`Pong! la latence est de ${m.createdTimestamp - msg.createdTimestamp}ms, celle de l'API est de ${Math.round(bot.ping)}ms`);
        m.edit(`Pong! la latence est de ${m.createdTimestamp - msg.createdTimestamp}ms, celle de l'API est de ${Math.round(bot.ping)}ms`);
        msg.delete();
        m.delete();
        }
        if(command === "say") {
            const sayMessage = args.join(" ");
            msg.delete().catch(O_o=>{});
            msg.channel.send(sayMessage);
          }
        
        if(command === "kick") {
            if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send("Vous n'avez pas les droits pour kick un utilisateur !");    
          let member = msg.mentions.members.first();
          if(!member)
            return msg.reply("Sois la mention est invalide, sois elle est inexistante.");
          if(!member.kickable) 
            return msg.reply("Tu ne peut pas kick cette personne, as-tu les permissions:grey_question:");
          let reason = args.slice(1).join(' ');
          if(!reason)
            return msg.reply("Maintenant la raison du ban et c'est fini ...");
          member.kick(reason)
            .catch(error => msg.reply(`Dsl ${msg.author} mais tu ne peut pas ban car: ${error}`));
            msg.channel.send(`${member.user} est kick, par ${msg.author.tag} car: ${reason}, et puis qu'il prenne ça dans son cul`);
          msg.delete();
        }
        
        if(command === "ban") {
            if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("Vous n'avez pas les droits pour ban un utilisateur !");
            
          let member = msg.mentions.members.first();
          if(!member)
            return msg.reply("Sois la mention est invalide, sois elle est inexistante.");
          if(!member.bannable) 
            return msg.reply("Tu ne peut pas ban cette personne, as-tu les permissions:grey_question:");
      
          let reason = args.slice(1).join(' ');
          if(!reason)
            return msg.reply("Maintenant la raison du ban et c'est fini ...");
            await member.ban(reason)
                .catch(error => msg.reply(`Dsl ${msg.author} mais tu ne peut pas ban car: ${error}`));
                msg.channel.send(`${member.user} est banni, par ${msg.author.tag} car: ${reason}, et puis qu'il prenne ça dans son cul`);
          msg.delete();
        }

        if(command === "punir"){
            
            if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Vous n'avez pas les droits pour muter un utilisateur !");
            
            let toMute = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
            if(!toMute) return msg.channel.send("Merci d'entrer un utilisateur !");
            let role = msg.guild.roles.find(r => r.name === "Punis");
                if(!role){
                    role = await msg.guild.createRole({
                        name: "Punis",
                        color:"#73000",
                        permissions:[]
                      });
            
                    msg.guild.channels.forEach(async (channel, id) => {
                      await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        CHANGE_NICKNAME: false,
                        CREATE_INSTANT_INVITE: false,
                        VIEW_CHANNEL: false,
                        SEND_TTS_MESSAGES: false
                        
                      });
                    });
                }
            
                if(toMute.roles.has(role.id)) return msg.channel.send('Cet utilisateur est déjà punis !');
            
                await(toMute.addRole(role));
                msg.channel.send("Je l'ai punis !"), msg.delete();
                return;
              }

        if(command === "depunir") {
              if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Vous n'avez pas les droits pour muter un utilisateur !");
                
                let toMute = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
                if(!toMute) return msg.channel.send("Merci d'entrer un utilisateur !");
                let role = msg.guild.roles.find(r => r.name === "Punis");
                toMute.removeRole(role)
                msg.channel.send("Je l'ai dépunis !!")

            }
        
        if(command === "purge") {
            if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Vous n'avez pas les droits pour purger un channel !");
          const deleteCount = parseInt(args[0], 10);
          if(!deleteCount || deleteCount < 2 || deleteCount > 200)
            return msg.reply("Precise le nombre de msg à supprimer (2<200>2)");
          const fetched = await msg.channel.fetchMessages({count: deleteCount});
          const m = await msg.channel.send("Les messages sont suprimés");
          m.edit("Les messages sont suprimés");
          m.edit("Les messages sont suprimés");
          m.edit("Les messages sont suprimés");
          m.edit("Les messages sont suprimés");
          m.edit("Les messages sont suprimés");
          m.edit("Les messages sont suprimés");
          m.delete();
          msg.channel.bulkDelete(fetched)
            .catch(error => msg.reply(`Tu ne peut pas supprimer les msg car: ${error}`));
        }

        if (command === "google"){
            const google = require("google");
            const unirest = require("unirest");
            con = console.log;
            var AuthDetails = require("./auth.json");
           
              if(msg.content.substr(9)) {
                let query = msg.content.substr(9);
                  con(query);
                let num = (msg.content.substr(9).lastIndexOf(" ") + 1);
                if(!query || isNaN(num)) {
                  query = msg.content.substr(9);
                  num = 0;
                }
                if(num < 0 || num > 2) {
                  num = 0;
                } else {
                  num = parseInt(num);
                }
                unirest.get(`https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(query)}&key=${AuthDetails.youtube_api_key}&limit=1&indent=True`).header("Accept", "application/json").end(res => {
                  const doSearch = () => {
                    google(query, (err, res) => {
                      if(err || res.links.length == 0) {
                        msg.channel.sendMessage("🙅 Pas de resultas!");
                      } else {
                        const results = [];
                        if(num == 0) {
                          num = 1;
                        }
                        for(let i=0; i < Math.min(res.links.length, num); i++) {
                          if([`News for ${query}`, `Image pour ${query}`].indexOf(res.links[i].title)>-1) {
                            res.links.splice(i, 1);
                            i--;
                            continue;
                          }
                      msg.channel.sendMessage({
                    embed: {
                      type: 'rich',
                      description: '',
                      fields: [{
                        name: 'Resulta Google',
                        value: `[${res.links[i].title}](`+`${res.links[i].href})`,
                        inline: true
                      },{
                        name: '** **',
                        value: `${res.links[i].description}`,
                        inline: true
                      }],
                       thumbnail: {
                         url: "http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
                            },
                      color: 3447003,
                      footer: {
                        text: `Oigh's Bot™-Oigh.minecraft@gmail.com`,
                        proxy_icon_url: bot.user.avatarURL
                      }
                    }
            });
                        }
           
                      }
                    });
                  };
                 
                  if(res.status == 200 && res.body.itemListElement[0] && res.body.itemListElement[0].result && res.body.itemListElement[0].result.detailedDescription) {
                    msg.channel.sendMessage(`\`\`\`${res.body.itemListElement[0].result.detailedDescription.articleBody}\`\`\`<${res.body.itemListElement[0].result.detailedDescription.url}>`).then(() => {
                      if(num > 0) {
                        doSearch();
                      }
                    });
                  } else {
                    doSearch();
                  }
                });
              } else {
                con(`Parameters not provided for >google command`);
                msg.channel.sendMessage(` ❓❓❓`);
              }
            }
         
    if (!msg.content.startsWith(pref)) return;
    var switc = msg.content.substring(pref.length).split(" ");

    switch (switc[0].toLowerCase()){

        case "standby":
        if(msg.author.username == "🌀Oigh's sur YT||Vb||Js🌀") {
            msg.channel.sendMessage("Je vais m'étaindre")
            bot.destroy()
        }else {
            msg.channel.send("Tu n'est pas le __***Fondateur***__")
        }
        break;

        case "contrôl_pann":
        if(msg.author == config.creator) {
            var me = await msg.channel.send("Voici le contrôle pannel de Oigh's Bot");
            await me.react("📛")
            await me.react("⚡")
            const panier = me.createReactionCollector((reaction, user) => user.id === msg.author.id);
            
           panier.on('collect', async(reaction) => 
           {
            if (reaction.emoji.name === "📛") {
                if(msg.author == config.creator) {
                    msg.author.send("Bye Bye: Déconnection")
                    me.delete()
                    bot.destroy()
                    
                }else{
                    me.edit("Tu n'est pas le __***Fondateur***_")
                }
            }

           if (reaction.emoji.name === "⚡") {
           
            msg.delete()
           
           }
        }
    )
}else{
    msg.channel.send("Tu n'es pas le __**Fondateur**__")
}
           
            break;

        case "méteo":
        if (msg.channel.type === "dm") return;
        var location = msg.content.substr(6);
        var unit = "C";

            weather.find({search: location, degreeType: unit}, function(err, data) {
                if (data.length === 0) {
                    msg.channel.send('Peut tu entrer une localsation valide ?') 
                    return; 
                }
                if(err) {
                    msg.channel.send("\n" + `Je n'ai pas trouvé d'infos sur: ${location}`);
                   } else {
                    data = data[0];

                   msg.channel.send("\n" + "" + data.location.name + " En ce moment: \n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\nPrévisions pour demain :\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
                }
            });
            
        break;

        
        case "google":
        if (msg.channel.type === "dm") return;
        break;

    case "invite":
    
    if (msg.channel.type === "dm") return;
    var ebf = new Discord.RichEmbed()
        .setColor(73000)
        .setAuthor("Invite moi !!", bot.user.avatarURL)
        .setDescription("→[**ICI**](http://bit.ly/2yax8KE)←")
        .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
    msg.channel.send(ebf)
    break;
        
        case "fetenoel":        
        if (msg.channel.type === "dm") return;
        
        var speudo = msg.content.substr(10);
        var speudo_emb = new Discord.RichEmbed()
                .setColor("4A0043")
                .setAuthor(msg.author.username, msg.author.avatarURL)
                .setDescription(`${speudo} ! ${msgAuthName} te souhaite un joyeux Noël !!`)
                .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
            msg.channel.send(speudo_emb)
            console.log("Joyeux Noël");
        break;
        
        case "afk":
        if (msg.channel.type === "dm") return;
            var em = new Discord.RichEmbed()
                .setColor("4A0043")
                .setAuthor(msgAuthName, msgAuthURL)
                .setDescription(`**${msgAuthName}** est **AFK** `)
                .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
            msg.channel.send(em)
        break;

        case "unafk":
        if (msg.channel.type === "dm") return;
            var em = new Discord.RichEmbed()
                .setColor("4A0043")
                .setAuthor(msgAuthName, msgAuthURL)
                .setDescription(`**${msgAuthName}** n'est plus **AFK** `)
                .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
            msg.channel.send(em)
        break;

case "add":

if (msg.channel.type === "dm") return;
break;

        case "ping":
        if (msg.channel.type === "dm") return;
        break;
        case"ban":
        if (msg.channel.type === "dm") return;
        break;
        case "kick":
        if (msg.channel.type === "dm") return;
        break;
        case "purge":
        if (msg.channel.type === "dm") return;
        break;
        case "say":
        if (msg.channel.type === "dm") return;
        break;
        case "eval":
        if (msg.channel.type === "dm") return;
        break;
        case "idée":        
        if (msg.channel.type === "dm") return;
        var value = msg.content.substr(6);
        var author = msg.author.username;
        var number = db.get('idées').map('id').value();
        db.get('idées')
            .push({ idée_value: value, idée_author: author })
            .write();
        var oui = new Discord.RichEmbed()
            .setColor("730000")
            .setAuthor("Pas d'erreur", bot.user.avatarURL)
            .setDescription("L'idée à bien d'être ajouté au fichiers !!")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(oui)
        console.log(value)
        break;
        case "addstory":
        if (msg.channel.type === "dm") return;
        var value = msg.content.substr(10);
        var author = msg.author.id;
        var server = msg.guild.id;
        var number = db.get("story").map("id").value();
        db.get("histoires")
            .push({ id: number + 1, storyText: value, storyAuthor: author, storyServer: server})
            .write()
        var oui = new Discord.RichEmbed()
            .setColor("730000")
            .setAuthor("Pas d'erreur", bot.user.avatarURL)
            .setDescription("L'histoire à bien d'être ajouté au fichiers !!")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(oui)
        console.log(value)
        break;
        case "aide":
        if (msg.channel.type === "dm") return;
        var embed1 = new Discord.RichEmbed()
        .setColor("#C000C7")
        .setAuthor("Commandes basique :upside_down::", "https://discordapp.com/assets/96b458e549758981dba74c32137c0784.svg")
        .addField("Help :", "`###aide` → Les commandes !!")
        .addField("Ping:ping_pong::", "`###ping` → Le ping du bot !!")
        .addField("Version :", "`###version` → La version !!")
        .addField("Infos sur la M.A.J. :", "`###maj` → Infos sur la dernière M.A.J. !!")
        .addField("Pop Corn:popcorn: :", "`###popgif` → `PopCorn.gif` !!")
        .addField("Mimi :", "`###randcat` → `ChatonTropMimi.gif` !!")
        .addField("Moi :", "`###me` → Des infos sur toi !!")
        .addField("Invite  moi !!", "`###invite` → donne le lien d'invitation")
        .addField("Information :", "`###infos @qqn#01010` → donne les infos de la personne mentionné")
        .addField("AFK :", "`###afk` → pour dire que tu est afk")
        .addField("UnAFK :", "`###unafk` → pour dire que tu n'est plus afk")
        .addField("Météo :", "`###météo <location>` → Donne la météo sur le lieu demandé")
        .addField("Google :", "`###google <Recherche>` → Effectue une recherche sur google")
        .addField("Fêter Noël !", "`###fetenoel qqn#01010` → Fête un joyeux Noël à la personne mentionné !! (Exclusif de la version `vChrismas-Exclusivity`)")
        .addField("Le bot parle pour vous !", "`###say <Chose à dire>` → Dis la chose à dire")
        .addField("Stats :", "`###stats` → Donne les stats du bots")
        .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
	var embed8 = new Discord.RichEmbed()
		.setColor("#C000C7")
		.setAuthor("Database :", bot.user.avatarURL)
		.addField("Raconter au :robot::", "`###addstory` → raconte une histoire au bot !!")
        .addField("Raconter :", "`###sendstory` → raconte une histoire des fichiers !!")
        .addField("Idées", "`###idée` → enregistre une idée dans la DB")
		.setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
	var embed9 = new Discord.RichEmbed()
		.setColor("#C000C7")
		.setTitle("Commandes d'administration :cop::", bot.user.avatarURL)
		.addField("Kick :", "`###kick @qqn#01010` → kick la personne mentionné (:warning: Reqiert la permission `KICK_MEMBERS`)")
        .addField("Ban :", "`###ban @qqn#01010` → ban la personne mentionné (:warning: Reqiert la permission `BAN_MEMBERS`)")
        .addField("Purge :", "`###purge 1-200` → clear le nombre de msg demandé (:warning: Reqiert la permission `ADMINISTRATOR`)")
        .addField("Punir :", "`###punir @qqn#01010` → punis la personne mentionné (:warning: Reqiert la permission `ADMINISTRATOR`)")
        .addField("Depunir :", "`###depunir @qqn#01010` → dépunis la personne mentionné (:warning: Reqiert la permission `ADMINISTRATOR`)")
        .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
    var embed10 = new Discord.RichEmbed()
            .setColor("#00000")
            .setTitle("Commandes du fondateur du :robot::")
            .addField("Evaluation :", "`###eval <CODE>` → Evalue le code demandé !!")
            .addField("Panneau de contrôle :", "`###contrôl_pann` → Affcihe le panneau de contrôle du bot !!")
    var me = await msg.channel.send("Clique sur les différent émoji pour en savoir un peut plus !! (PS : L'eclair supprime tout)");
    await me.react("⬛")
    await me.react("⛔")
    await me.react("📲")
    await me.react("💥")
    await me.react("⚡")
    const panier = me.createReactionCollector((reaction, user) => user.id === msg.author.id);
    
   panier.on('collect', async(reaction) => 
   {
    if (reaction.emoji.name === "⬛") {
   
   me.edit(embed1);
   
    }
   if (reaction.emoji.name === "⛔") {
   
   me.edit(embed9);
    
   }
   if (reaction.emoji.name === "📲") {

       me.edit(embed8)
   }
   if (reaction.emoji.name === "⚡") {
   
    msg.delete()
   me.delete()
   
    }

    if (reaction.emoji.name === "💥") {
        me.edit(embed10)
    }
   
    await reaction.remove(msg.author.id);
   
   }
);
    console.log("Help commmand execute !!")
        break;

        case "queue":
        if (msg.channel.type === "dm") return;
        break;

        case "play":
        if (msg.channel.type === "dm") return;
        break;

        case "join":
        if (msg.channel.type === "dm") return;
        break;

        case "leave":
        if (msg.channel.type === "dm") return;
        break;

        case "version":
        if (msg.channel.type === "dm") return;
        var embed2 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setAuthor("Version :", bot.user.avatarURL)
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
            .setDescription("**vChristmas-Exclusivity** (:christmas_tree: Cette version est exlusive, fin le 18/01/2018 :mrs_claus:)")
        msg.author.send(embed2);
        msg.delete();
        console.log("Version execute");
        break;

        case "maj":
        if (msg.channel.type === "dm") return;
        var embed4 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Information sur la maj **vChristmas-Exclusivity:", bot.user.avatarURL)
            .setDescription("A vous de découvrir l'exclusivité, arrêt le 13 janvier 2018 à 18h00")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(embed4);
        msg.delete();
        console.log("MajInfos");
        break;
        
        case "sendstory" :
        if (msg.channel.type === "dm") return;
        story_random();
        console.log(randnum);

        var story = db.get(`histoires[${randnum}].story_value`).toString().value();
        var author_story = db.get(`histoires[${randnum}].story_author`).toString().value();
        console.log(story);

        msg.channel.send(`Voici l'histoire : ${story} (Histoire de ${author_story})`)
        
        break;

        case"infos":
        if (msg.channel.type === "dm") return;
        var speudo = msg.mentions.users.first()
        var embed7 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setAuthor(`${speudo.username} :`, speudo.avatarURL)
            .setDescription("** **")
            .addField("Discriminateur :(@Exemple__**#5658**__)", `#${speudo.discriminator}`)
            .setImage(speudo.avatarURL)
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
            .addField("Id", speudo.id)
        msg.channel.send(embed7);
        msg.delete();
        console.log(`${speudo}: Me execute`);
        break;

        case "wiki":
        if (msg.channel.type === "dm") return;
			if(!msg.content.substr(5)) {
				console.log(Date.now(), "DANGER", "Vous devez fournir un terme de recherche.");
				msg.reply("Vous devez fournir un terme de recherche.");
				return;
			}
			var wiki = new Wiki.default();
			wiki.search(msg.content.substr(5)).then(function(data) {
				if(data.results.length==0) {
					console.log(Date.now(), "DANGER","Wikipedia ne trouve pas ce que vous avez demandée : " + msg.content.substr(5));
					msg.reply("Je ne peut trouvé ce que vous voulez dans Wikipedia :(");
					return;
				}
				wiki.page(data.results[0]).then(function(page) {
					page.summary().then(function(summary) {
						if(summary.indexOf(" may refer to:") > -1 || summary.indexOf(" may stand for:") > -1) {
							var options = summary.split("\n").slice(1);
							var info = "Selectioné une options parmis celle-ci :";
							for(var i=0; i<options.length; i++) {
								info += "\n\t" + i + ") " + options[i];
							}
							msg.reply(info);
							selectMenu(msg.channel, msg.author.id, function(i) {
								commands.wiki.process(Client, msg, options[i].substring(0, options[i].indexOf(",")));
							}, options.length-1);
						} else {
							var sumText = summary.split("\n");
							var count = 0;
							var continuation = function() {
								var paragraph = sumText.shift();
								if(paragraph && count<3) {
									count++;
									msg.reply(msg.channel, paragraph, continuation);
								}
							};
							msg.reply("**Trouvé " + page.raw.fullurl + "**", continuation);
						}
					});
				});
			}, function(err) {
				console.log(Date.now(), "ERREUR","Impossible de se connecté a Wikipédia");
				msg.reply("Uhhh...Something went wrong :(");
			})
        break;

        case"me":
        if (msg.channel.type === "dm") return;
        var embed6 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setAuthor(`${msg.author.username} :`, msg.author.avatarURL)
            .setDescription("** **")
            .addField("Discriminateur :(@Exemple__**#5658**__)", `#${msg.author.discriminator}`)
            .setImage(msg.author.avatarURL)
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
            .addField("Roles", "?")
            .addField("Status :", `${msg.author.username} est :"${msg.author.presence.status}"(dnd = Occupé, idle = innactif)`)
        var embed7 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setAuthor("Pas d'erreur !!", bot.user.avatarURL)
            .setDescription("La commande `>me` est bien arrivé en MP")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(embed7);
        msg.author.send(embed6);
        msg.delete();
        console.log(`${msg.author.username}: Me execute`);
        break;

        case "depunir":
        if (msg.channel.type === "dm") return;
        break;

        case "popgif":
        if (msg.channel.type === "dm") return;
        break;

        case "randcat":
        if (msg.channel.type === "dm") return;
        break;

        case "xpstat":
        if (msg.channel.type === "dm") return;
        break;

        case "stats":
        if (msg.channel.type === "dm") return;
        var s = (Math.round(bot.uptime / 1000) % 60)
        var m = (Math.round(bot.uptime / (1000 * 60)) % 60)
        var h = (Math.round(bot.uptime / (1000 * 60 * 60)))
	var j = (Math.round(bot.uptime / (1000 * 60 * 60 * 48)))
	var M = (Math.round(bot.uptime / (1000 * 60 * 60 * 48 * 30 )))
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        var servercount = bot.guilds.size;
            var servers = bot.guilds.array().map(g => g.name).join(',');
        var embed = new Discord.RichEmbed()
            .setColor(543756)   
            .setAuthor("Stats du bot :", bot.user.avatarURL)
            .addField("Créateur :", config.creator)
            .addField("Prefix :", config.prefix)
            .addField("Personnes m'ayant utilisé :", bot.users.size)
            .addField("Pings :", bot.pings)
            .addField("Serveur(s)", servercount)
            .addField("Support", "En cours de programation...")
            .addField("Invite-moi !!", "→[**ICI**](http://bit.ly/2yax8KE)←")
            .addField("Temps depuis le quel je suis connecté :", `${M} mois, ${j} jour(s), ${h} heure(s), ${m} minute(s), ${s} seconde(s)`)
            .addField("RAM :", `${Math.ceil(process.memoryUsage().heapTotal / 1000000)}`)
            .addField("Librarys du bot :", "`Disocord.js`, `LowDB`")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(embed)
    break;

        default:
        if (msg.channel.type === "dm") return;
        var erreur = new Discord.RichEmbed()
            .setColor("#650000")
            .setAuthor(":x:Erreur:x: :", bot.user.avatarURL)
            .setDescription("**Nom de l'erreur :**\n** **\nMISSING_COMMAND")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(erreur)
        msg.delete();
        break;
}

if (msg.content === pref + "xpstat"){    
    var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
    var xpfinal = Object.values(xp);
    var xp_embed = new Discord.RichEmbed()
        .setAuthor(`XP de ${msg.author.username}`, bot.user.avatarURL)
        .setDescription("Voici tout vos xp monsieur !")
        .addField("XP :", `${xpfinal[1]} xp`)
        .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
    msg.channel.send({embed: xp_embed});
}

    if(msg.content === pref + "version") {

    }

    if(msg.content === pref + "majInfos") {

    }



    if(msg.content === pref + "me") {
    }

    if(msg.content === pref + "aide") {

    }

    if (msg.content === pref + "randcat") {
        cat_random();

        if(randnum == 0) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Trop mimi !!")
            .setImage("http://humourtop.com/les-50-meilleurs-gifs-animes-droles-de-chatons/Chaton_trop_mimi.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(catembed);
        console.log(randnum)
        msg.delete();
        }
        if(randnum == 1) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Trop mimi !!")
            .setImage("http://humourtop.com/les-50-meilleurs-gifs-animes-droles-de-chatons/Bebe_chaton_mignon.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(catembed);
        console.log(randnum)
        msg.delete();
        }
        if(randnum == 2) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Le mignon laser !!")
            .setImage("http://gifdrole.com/les_gifs_animes_des_chatons_les_plus_droles_et_mignons_du_monde/Chat_laser.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(catembed);
        console.log(randnum)
        msg.delete();
        }
        if(randnum == 3) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Trop mimi !!")
            .setImage("https://data.photofunky.net/output/image/d/0/2/d/d02db9/photofunky.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(catembed);
        msg.delete();
        console.log(randnum)
        }
        if(randnum == 4) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Les amoureux !!")
            .setImage("https://s-media-cache-ak0.pinimg.com/originals/39/b1/ba/39b1baf02f9f6668cd3d9acf3e6725c4.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(catembed);
        console.log(randnum)
        msg.delete();
        }
        if(randnum == 5) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Trop mimi !!")
            .setImage("http://gifdrole.com/les_gifs_animes_des_chatons_les_plus_droles_et_mignons_du_monde/Chat_chasseur.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(catembed);
        console.log(randnum)
        msg.delete();
        }
    }

    if(msg.content ===  pref + "popgif") {

        pop_random();    
        
        if(randnum == 0) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://i.giphy.com/media/V11V1iyPOR916/200.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)
        }

        if(randnum == 1) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://i.giphy.com/media/RHiD0K65NxxLO/giphy.webp")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)
        }
        if(randnum == 2) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("http://i0.kym-cdn.com/photos/images/original/000/897/363/8c8.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)
        }
        if(randnum == 3) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://nosamislesmots.files.wordpress.com/2016/03/tumblr-gif-popcorn.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)
        }
        if(randnum == 4) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://media.giphy.com/media/1P4BNpi8NYWVq/giphy.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)
    }
        if(randnum == 5) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://media.giphy.com/media/6DAZjokJUbzVu/giphy.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)
    }
        if(randnum == 6) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("http://jp59.j.p.pic.centerblog.net/e18fee6f.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)
    }
        if(randnum == 7) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://media.giphy.com/media/8ZHxehd7ENuvK/source.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)
        }
        if(randnum == 8) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("http://images-in.i.m.pic.centerblog.net/e474ddcb.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)  
        }
        if(randnum == 9) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("http://i0.kym-cdn.com/photos/images/newsfeed/000/896/913/9e5.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)  
        }
        if(randnum == 10) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://78.media.tumblr.com/58dd040f43055670b2b9f3c0faff53dc/tumblr_o4ocucclA71t4fj2vo1_1280.gif")
            .setFooter(`Oigh's Bot™-Oigh.minecraft@gmail.com`, bot.user.avatarURL)
        msg.channel.send(popembed)  
        }
        msg.delete();
}
    }catch(e) {
        config.creator.send(`${msg.author} à executé une commande contenant l'erreur ${e}`)
    }
})

//Les Functions : {

    function pop_random(min, max) {
        min = Math.ceil(0);
        max = Math.floor(10);
        randnum = Math.floor(Math.random() * (max - min +1) + min);
    }

    function cat_random(min, max) {
        min = Math.ceil(0);
        max = Math.floor(5);
        randnum = Math.floor(Math.random() * (max - min +1) + min);
    }

    function story_random(min, max) {
        min = Math.ceil(0);
        max = Math.floor(storynumber);
        randnum = Math.floor(Math.random() * (max - min +1) + min);
    }

    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }

// }
