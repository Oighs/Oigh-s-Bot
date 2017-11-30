const Discord = require ('discord.js');
const bot = new Discord.Client();
const low = require ("lowdb");
const FileSync = require ("lowdb/adapters/FileSync");
const Commando = require ('discord.js-commando');
const commanBot = new Commando.Client();

var pref = (">")
var randnum = 0;

bot.login("Mzg0NzM2MjY0NDEyNDYzMTA0.DP3JGA.DcL74x_Y63X-DjbBSrnw1kX6wik");

bot.on(("ready"), ()=> {
    console.log("☻Bot démarré !!☻")
    bot.user.setGame(">aide|old_alpha rd-03")
    bot.user.setUsername("Oigh's Bot™")
});

bot.on(("guildCreate"), (guild)=> {
    console.log("[+]-" + guild.name);
});

bot.on(("guildDelete"), (guild)=> {
    console.log("[-]-" + guild.name);
});

bot.on(("guildMemberAdd"), (member)=> {
    
        member.send(`Salut ${member} bvn sur ${member.guild.name}, n'oublie pas de faire **>aide** pour avoir accés à mes commandes !!`);
    
    });
    
bot.on(("guildMemberRemove"), (member)=> {    
        member.sendMessage(`Ohhh ${member}, tu as quitté ${member.guild.name} :sob:. Ou tu t'est fais ban/kick !!`);
    });

bot.on(("msg"), (msg)=>{

    if(msg.content === pref + "ping") {

    }

    if (!msg.content.startsWith(pref)) return;
    var args = msg.content.substring(pref.length).split(" ");

    switch (args[0].toLowerCase()){
        case "aide":
        var embed1 = new Discord.RichEmbed()
        .setColor("#C000C7")
        .setTitle("Commandes basique :")
        .setDescription("** **")
        .addField("Help :", "`>aide` → Les commandes !!")
        .addField("Ping:ping_pong::", "`>ping` → Le ping du bot !!")
        .addField("Version :", "`>version` → La version !!")
        .addField("Infos sur la M.A.J. :", "`>majInfos` → Infos sur la dernière M.A.J. !!")
        .addField("Pop Corn:popcorn: :", "`Pop Corn` → `PopCorn.gif` !!")
        .addField("Mimi :", "`Mimi` → `ChatonTropMimi.gif`")
        .addField("Moi :", "`>me` → Des infos sur toi")
        .setFooter("Oigh's Bot™-Oigh.minecraft@gmail.msg.content")
    var embed5 = new Discord.RichEmbed()
        .setColor("#C000C7")
        .setTitle("Pas d'erreur !!")
        .setDescription("La commande `>aide` est bien arrivé en MP")
        .setFooter("Oigh's Bot™-Oigh.minecraft@gmail.msg.content")
    msg.channel.send(embed5)
    msg.author.send(embed1);
    console.log("Help commmand execute !!")
        break;

        case "version":
        var embed2 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Version :")
            .setFooter("Oigh's Bot™-Oigh.minecraft@gmail.msg.content")
            .setDescription("**old_alpha rd-03**(:warning:Je suis alpha, donc ne pas abuser !!:warning:)")
        msg.author.send(embed2);
        console.log("Version execute");
        break;

        case "registerguild":
        var guildNameMessage = msg.guild.name.toString()
        var guildIDmessage = msg.guild.id.toString();
            console.log('[ Commande registerguild pour enregistrement dans base de donnée ServerID : ' + guildIDmessage + " ]");
            msg.delete(100).catch();                
            if (dbsvr.get('server_database').find({ serverID: guildIDmessage }).value()){
                console.log("[ Enregistrement refusé (" + guildIDmessage + ") Le serveur est déja enregistré ]");
                msg.reply("Le serveur a déja été enregistré dans la base de donnée !");
            }else{
                dbsvr.get('server_database')
                    .push({serverID : guildIDmessage, serverName : guildNameMessage, botlogs_enable : "0"})
                    .write()
                console.log('[ Serveur enregistré avec succès (ID :' + guildIDmessage + ') ]');
                msg.reply("Demande d'enregistrement accepté, le serveur est maintenant repertorié dans la base de donnée. Merci d'avoir choisi ExoBot !");
            }
    break;

        case "majInfos":
        var embed4 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Information sur la maj **old_alpha rd-03**:")
            .setDescription("Ajout de `Pop Corn` → avoir des `PopCorn.gif`\nAjout de `Mimi` → avoir des `ChatTropMimi.gif`\nAjout de `>me` → avoir des infos sur toi !!")
            .setFooter("Oigh's Bot™-Oigh.minecraft@gmail.msg.content")
        var embed8 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Pas d'erreur !!")
            .setDescription("La commande `>majInfos` est bien arrivé en MP")
            .setFooter("Oigh's Bot™-Oigh.minecraft@gmail.msg.content")
        msg.channel.send(embed8);
        msg.author.send(embed4);
        console.log("MajInfos");
        break;

        case "ping":
        var embed3 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setFooter("Oigh's Bot™-Oigh.minecraft@gmail.msg.content")
            .setTitle("Pong !! :ping_pong:")
            .setDescription(`Mon ping est de ${bot.pings}`)
        msg.channel.send(embed3);
        console.log(`Pings is ${bot.pings}`);
        break;

        case"me":
        var embed6 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle(`${msg.author.username} :`)
            .setDescription("** **")
            .addField("Discriminateur :(@Exemple__**#5658**__)", `#${msg.author.discriminator}`)
            .setImage(msg.author.avatarURL)
            .setFooter("Oigh's Bot™-Oigh.minecraft@gmail.msg.content")
            .addField("Pings :", msg.author.p)
            .addField("Status :", `${msg.author.username} est :"${msg.author.presence.status}"(dnd = Occupé, idle = innactif)`)
        var embed7 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Pas d'erreur !!")
            .setDescription("La commande `>me` est bien arrivé en MP")
            .setFooter("Oigh's Bot™-Oigh.minecraft@gmail.msg.content")
        msg.channel.send(embed7);
        msg.author.send(embed6);
        console.log(`${msg.author.username}: Me execute`);
        break;

        case "botInfos":
        var embed9 = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Liens :")
            .setDescription("** **")
            .addField("Nom d'utilisateur :", bot.user.username)
            .addField("Status :", `Status :${bot.status}, Pings :${bot.pings}`)
            .addField("Créateur(s) :", "@Oigh sur YT#7970 YT :http://bit.ly/2i1gJSY")
            .addField("Version :", "__old_alpha rd-03__")
            .addField("Support :", "*À venir*...")
            .addField("Contact :", "(Voir E-Mail ci-dessous )")
            .setFooter("Oigh's Bot™-Oigh.minecraft@gmail.msg.content")
        break;

        default:
        var erreur = new Discord.RichEmbed()
            .setColor("#650000")
            .setTitle(":x:Erreur:x: :")
            .setDescription("**Nom de l'erreur :**\n** **\nMISSING_COMMAND")
            .setFooter("Oigh's Bot™-Oigh.minecraft@gmail.msg.content")
        msg.channel.send(erreur)
        break;
}

    if(msg.content === pref + "version") {

    }

    if(msg.content === pref + "majInfos") {

    }



    if(msg.content === pref + "me") {
    }

    if(msg.content === pref + "aide") {

    }

    if (msg.content === "Mimi") {
        cat_random();

        if(randnum == 0) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Trop mimi !!")
            .setImage("http://humourtop.msg.content/les-50-meilleurs-gifs-animes-droles-de-chatons/Chaton_trop_mimi.gif")
        msg.channel.send(catembed);
        console.log(randnum)
        }
        if(randnum == 1) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Trop mimi !!")
            .setImage("http://humourtop.msg.content/les-50-meilleurs-gifs-animes-droles-de-chatons/Bebe_chaton_mignon.gif")
        msg.channel.send(catembed);
        console.log(randnum)
        }
        if(randnum == 2) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Le mignon laser !!")
            .setImage("http://gifdrole.msg.content/les_gifs_animes_des_chatons_les_plus_droles_et_mignons_du_monde/Chat_laser.gif")
        msg.channel.send(catembed);
        console.log(randnum)
        }
        if(randnum == 3) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Trop mimi !!")
            .setImage("https://data.photofunky.net/output/image/d/0/2/d/d02db9/photofunky.gif")
        msg.channel.send(catembed);
        console.log(randnum)
        }
        if(randnum == 4) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Les amoureux !!")
            .setImage("https://s-media-cache-ak0.pinimg.msg.content/originals/39/b1/ba/39b1baf02f9f6668cd3d9acf3e6725c4.gif")
        msg.channel.send(catembed);
        console.log(randnum)
        }
        if(randnum == 5) {
            var catembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Trop mimi !!")
            .setImage("http://gifdrole.msg.content/les_gifs_animes_des_chatons_les_plus_droles_et_mignons_du_monde/Chat_chasseur.gif")
        msg.channel.send(catembed);
        console.log(randnum)
        }
    }


    if(msg.content === "Pop Corn") {

        pop_random();    
        
        if(randnum == 0) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://i.giphy.msg.content/media/V11V1iyPOR916/200.gif")
        msg.channel.send(popembed)
        }

        if(randnum == 1) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://i.giphy.msg.content/media/RHiD0K65NxxLO/giphy.webp")
        msg.channel.send(popembed)
        }
        if(randnum == 2) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("http://i0.kym-cdn.msg.content/photos/images/original/000/897/363/8c8.gif")
        msg.channel.send(popembed)
        }
        if(randnum == 3) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://nosamislesmots.files.wordpress.msg.content/2016/03/tumblr-gif-popcorn.gif")
        msg.channel.send(popembed)
        }
        if(randnum == 4) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://media.giphy.msg.content/media/1P4BNpi8NYWVq/giphy.gif")
        msg.channel.send(popembed)
        }
        if(randnum == 5) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://media.giphy.msg.content/media/6DAZjokJUbzVu/giphy.gif")
        msg.channel.send(popembed)
        }
        if(randnum == 6) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("http://jp59.j.p.pic.centerblog.net/e18fee6f.gif")
        msg.channel.send(popembed)
        }
        if(randnum == 7) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://media.giphy.msg.content/media/8ZHxehd7ENuvK/source.gif")
        msg.channel.send(popembed)
        }
        if(randnum == 8) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("http://images-in.i.m.pic.centerblog.net/e474ddcb.gif")
        msg.channel.send(popembed)
        }
        if(randnum == 9) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("http://i0.kym-cdn.msg.content/photos/images/newsfeed/000/896/913/9e5.gif")
        msg.channel.send(popembed)
        }
        if(randnum == 10) {
            var popembed = new Discord.RichEmbed()
            .setColor("#C000C7")
            .setTitle("Tu aime les Pop Corn ?")
            .setImage("https://78.media.tumblr.msg.content/58dd040f43055670b2b9f3c0faff53dc/tumblr_o4ocucclA71t4fj2vo1_1280.gif")
        msg.channel.send(popembed)
        }
}
  
})

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
