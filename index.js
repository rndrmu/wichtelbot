const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const isImage = require('is-image');

var file_corrected;

const unlockGifting = new Date('2020-12-23');

const moment = require('moment')

const { token, prefix, adminid } = require('./config.json');

const santa = {
            send: (absender, msgcontent, msgtype) => { return( new Discord.MessageEmbed().setTitle(`Your ${absender} sent you a message!`).setDescription(msgcontent).setFooter(`If you wish to reply use \` ${prefix}${msgtype} \` `) ) },
            success: (msgtype, type) => { return( new Discord.MessageEmbed().setDescription(`:white_check_mark: ${msgtype} sent successfully to ${type}!`) ) },
            error: (error) => { return( new Discord.MessageEmbed().setDescription(':x:' + error) ) },
            help: () => { return( new Discord.MessageEmbed().setTitle('Commands').addField("..send", "Sends an anonymous message to the person you're gifting", true) .addField("..tosanta", "Sends a message to your santa", true).addField("..sendgift", "Ready to send your gift? Use this command with an attachment or a URL to send it to the recipient", false).addField("..giftee", "View information about the person you're gifting", true).addField("..confirm", "Confirm that you received your giftees", true).addField("Bug Report", "Found a Bug? \n Then  send a DM to <@<ADMINID>>", false).setFooter('Bot by ducc1#1999 ') ) },
            imageEmbed: (comment, imageURL) => { return( new Discord.MessageEmbed().setAuthor(comment).setImage(imageURL) ) },
            nonImageEmbed: (comment, attachment) => { return( new Discord.MessageEmbed().setAuthor(comment).setDescription(attachment) ) }
}
// github => [here](https://github.com/duckforceone/secret-santa-bot/issues) or

client.on("rateLimit", (data) => { console.log( data ); })


activityList = [
    "Gift Exchange",
    "use ..confirm to confirm your entry!"
]

typelist = [
    "STREAMING",
    "LISTENING",
    "WATCHING",
    "COMPETING",
    "PLAYING"
]

streamerList = [
    "https://twitch.tv/selphy",
    "https://twitch.tv/theducc1_"
]

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    setInterval(() => {
        const index = Math.floor(Math.random() * (activityList.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        const activityType = Math.floor(Math.random() * (typelist.length - 1) + 1);


            client.user.setPresence({ 
                status: "online",
                activity: { 
                    type: typelist[activityType],
                    name: activityList[index],
                    url: "https://twitch.tv/theducc1_"
                }, 
            })

        

       
    }, 30000);

    
});




client.on('message', async (message) => {
    if (message.author.bot) return;
    if(message.channel.type != 'dm') return;
    if(!message.content.startsWith(prefix)) return(message.channel.send(`Looks like you forgot the prefix! Start the command with ${prefix}`));
    

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const msg = args.splice(0).join(' ');
    //const userToSendDMTo = args[0];

    switch(command) {


        case 'send': 
       
        if (message.author.tag == "" /*Name without illegal character */)
               file_corrected = /*Name with illegal character */
            else  file_corrected = message.author.tag;

        fs.readFile(`./users/${file_corrected}.json`, {encoding: 'utf-8'}, (err, data) => {
            if (err) return (message.channel.send(`An error occured. Please try again later! \`ERR_NO_FILE\` `))
            let jsondata = JSON.parse(data);
            let empfaenger = jsondata.giftee.id
            if (!msg) return (message.channel.send(`No message entered!`))
            console.log( typeof empfaenger );
            let giftee = client.guilds.cache.get('605513855631622187').members.cache.find(x => x.user.tag == empfaenger).id
            client.users.fetch(giftee).then((user) => {
                user.send(santa.send('gifter', msg, 'tosanta')).then( client.channels.cache.get('785906181893652481').send(new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} -> ${empfaenger}`)
                .setDescription(msg))  );

            }).then(message.channel.send(santa.success(`Message`, `giftee`))).catch( santa.error(`An error occured :/`)  );
        })
        
        break;

        case 'tosanta':

if (message.author.tag == "" /*Name without illegal character */)
               file_corrected = /*Name with illegal character */
            else  file_corrected = message.author.tag;

                    fs.readFile(`./users/${file_corrected}.json`, {encoding: 'utf-8'}, (err, data) => {
                        if (err) return (message.channel.send(`An error occured. Please try again later! \`ERR_NO_FILE\` `))
                        let jsondata = JSON.parse(data);
                        let replyTo = jsondata.getsGiftedBy
                        if (!msg) return (message.channel.send(`No message entered!`))
                        let giftee = client.guilds.cache.get('605513855631622187').members.cache.find(x => x.user.tag == replyTo).id
                        client.users.fetch(giftee).then((user) => {
                            user.send(santa.send('giftee',msg, 'send')).then( client.channels.cache.get('785906181893652481').send(new Discord.MessageEmbed()
                            .setAuthor(`${message.author.tag} -> ${replyTo}`)
                            .setDescription(msg)) 
                            ).then(message.channel.send(santa.success(`Message`, `santa`))).catch( santa.error(`An error occured :/`) );

                        });
                    })

        break;

        case 'giftee':

if (message.author.tag == "" /*Name without illegal character */)
               file_corrected = /*Name with illegal character */
            else  file_corrected = message.author.tag;

                    fs.readFile(`./users/${file_corrected}.json`, {encoding: 'utf-8'}, (err, data) => {
                        if (err) return (message.channel.send(`An error occured. Please try again later! \`ERR_NO_FILE\` `))
                        let json = JSON.parse(data);
                        let repliesTo = client.guilds.cache.get('605513855631622187').members.cache.find(x => x.user.tag == json.giftee.id).id
                        let interests = json.giftee.interests
                        let spReqs = json.giftee.spReqs
                        //message.channel.send(`You're gifting: <@${repliesTo}> \n\n Their interests are: ${interests}\n \n\n :warning: Special Requirements: ${spReqs}\n `);
                        message.channel.send(new Discord.MessageEmbed().setDescription(`You're gifting <@${repliesTo}> (${json.giftee.id}) \n\n Their interests are: ${interests}\n \n\n :warning: Special Requirements: ${spReqs}\n`) )
                    })

        break;

        case 'sendgift':
            let today = new Date();

                        if( unlockGifting - today <= 0 ) {

                            if(message.attachments.first()) {

if (message.author.tag == "" /*Name without illegal character */)
               file_corrected = /*Name with illegal character */
            else  file_corrected = message.author.tag;

                                let digiGift = message.attachments.first()
                                /* This is debug stuff, ignore pls */
                                //if (isImage(digiGift.proxyURL)) console.log('is image')
                               // console.log(digiGift);
                               // message.reply(`Chosen gift: ${digiGift.url}`)
                                fs.readFile(`./users/${file_corrected}.json`, {encoding: 'utf-8'}, (err, data) => {
                                    if (err) return (message.channel.send(`An error occured. Please try again later! \`ERR_NO_FILE\` `))
                                    let jsondata = JSON.parse(data);
                                    let replyTo = jsondata.giftee.id
                                    if (!msg)  var santaComment = ' '  
                                    else var santaComment = msg 
                                    let giftee = client.guilds.cache.get('605513855631622187').members.cache.find(x => x.user.tag == replyTo).id
                                    client.users.fetch(giftee).then((user) => {
                                        //console.log(user);
    
                                        if (isImage(digiGift.proxyURL)) {
                                            user.send(santa.imageEmbed(`You received a gift! | ${santaComment}`, digiGift.proxyURL)).then(message.channel.send(santa.success(`Gift`, `giftee`))).catch( console.error ).then( client.channels.cache.get('773261899981783150').send(new Discord.MessageEmbed().setAuthor(`GIFT SENT: ${message.author.tag} -> ${replyTo}`).setDescription(`Message: ${santaComment} \n\n Attachement (if embed fails): \n ${digiGift.url}`).setImage(digiGift.proxyURL)))
                                        } else {
                                           user.send(santa.nonImageEmbed(`You received a gift! | ${santaComment}`, digiGift.url)).then(message.channel.send(santa.success(`Gift`, `giftee`))).catch( console.error ).then( client.channels.cache.get('773261899981783150').send(new Discord.MessageEmbed().setAuthor(`GIFT SENT: ${message.author.tag} -> ${replyTo}`).setDescription(`Message: ${santaComment} \n\n\n they sent the following attachment: ${digiGift.url}`)))     
                                        }
                                    });
                                })
                            } else {
  
if (message.author.tag == "" /*Name without illegal character */ )
               file_corrected = //name with illegal character
            else  file_corrected = message.author.tag;

                                fs.readFile(`./users/${file_corrected}.json`, {encoding: 'utf-8'}, (err, data) => {
                                    if (err) return (message.channel.send(`An error occured. Please try again later! \`ERR_NO_FILE\` `))
                                    let jsondata = JSON.parse(data);
                                    let replyTo = jsondata.giftee.id
                                    if (!msg)  return (message.channel.send(`You can't just send no gift :(`))  
                                    let giftee = client.guilds.cache.get('605513855631622187').members.cache.find(x => x.user.tag == replyTo).id
                                  client.users.fetch(giftee).then((user) => {
                                        user.send(`Your Santa sent you a Gift: \n\n\n ${msg}`).then(message.channel.send(santa.success(`Gift`, `giftee`))).catch( console.error ).then( client.channels.cache.get('773261899981783150').send(new Discord.MessageEmbed().setAuthor(`GIFT SENT: ${message.author.tag} -> ${replyTo}`).setDescription(`Message: ${msg}`)))     
                                    });
                                })
                            }
                        } else {
                            message.channel.send( santa.error(`Gifting will unlock on the 23rd!`) )
                        }

        break;


        case 'help': message.channel.send(santa.help()); break;

case 'sendoutstuff':
    if(!adminid.includes(message.author.id)) return message.channel.send('You are not authorized to use this command!')
    
    const everyone = fs.readdirSync('./users').filter(file => file.endsWith('.json'))

    for (const user of everyone) {
        console.log( user );
        fs.readFile(`./users/${user}`, {encoding: 'utf-8'},  (err, data) => {

	    if (user == "" /*Name without illegal character */)
               file_corrected = /*Name with illegal character */
            else  file_corrected = user;
            const stuff = JSON.parse(data)
	    console.log(stuff)
            let santa = client.guilds.cache.get('605513855631622187').members.cache.find(x => x.user.tag == file_corrected.split('.json')[0]).id
            let giftee = client.guilds.cache.get('605513855631622187').members.cache.find(x => x.user.tag == stuff.giftee.id).id
            console.log( `${santa} -> ${giftee}` );

           new geschenkBestaetigung().send(santa, giftee, message.channel)
        })
    }

break;

case 'confirm':

let testchan = client.channels.cache.get("789217028186570823");

try {
    testchan.send( new Discord.MessageEmbed().setDescription( ` :white_check_mark: ${message.author.tag} sent a confirmation! ` ).setTimestamp( new Date() ) )
    .then( message.channel.send( new Discord.MessageEmbed().setDescription( ` :white_check_mark: Success! ` ).setTimestamp( new Date() ) ) )
}
catch {
    message.channel.send( new Discord.MessageEmbed().setDescription( ` :x: An error occured! ` ).setTimestamp( new Date() ) )
}
break;

        case 'listps': 
                if(!adminid.includes(message.author.id)) return message.channel.send('You are not authorized to use this command!')
                new geschenkBestaetigung().list(message.channel)
        break;

        default: message.channel.send(`That is not a valid command! \n\n Use \`${prefix} help\` to see a list of all my commands `); break;
    }

})


client.login(token);

class geschenkBestaetigung {
        send(santaid, gifteeid, errorHandle) {
            client.users.fetch(santaid).then( (santaC) => {
                santaC.createDM().then( santaC.send( 
                    new Discord.MessageEmbed()
        .setAuthor(`Announcement`)
        .setColor('#a1c2f7')
        .setDescription(/* Boop */)
        .setTimestamp(new Date)
                 ) ).then( errorHandle.send( santa.success(`Rundbrief`, `<@${santaid}>`) ) ).catch( console.log('error!') )
            } )
        }

        list(chan) {
            const contestants = fs.readdirSync('./users').filter(file => file.endsWith('.json'));
                chan.send(`There are ${contestants.length} participants`)
                for (const file of contestants) {
		            fs.readFile(`./users/${file}`, (err, data) => {
   
                        if (file == "" /*Name without illegal character */)
                            file_corrected = /*Name with illegal character */
                        else  file_corrected = file;
                        const stuff = JSON.parse(data);
                        let santa = file_corrected
                        let giftee =  stuff.giftee.id
                        let gifter = stuff.getsGiftedBy
                        chan.send(`${santa.split('.json')[0]} ==>  ${giftee}`)

                    })
                }
        }

}

