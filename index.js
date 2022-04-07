// require the discord.js module
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// create a new Discord client with specified intents
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS);
const client = new Client({ intents: myIntents });

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if(message.author.bot) return; //do nothing for bot responses

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	
	const { commandName } = interaction;
	
	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});
	

/* 	if (message.content.toLowerCase().includes('KEYWORD')) { // if message has the indicated word, sends a picture
		message.channel.send({files: ['./images/FILENAMEHERE']});
	}
 */	
	// when the specified user types a message, react to the message with smiling emoji
 	if (message.author.discriminator === '0583') { 
		const emoji = message.guild.emojis.find(emoji => emoji.name === 'smile');
		message.react(emoji);
	}


/* 	if (isReady && message.content === 'KEYWORD') { // on keyword bot enters voice channel to play an mp3 file then exits
		isReady = false;
		const { voiceChannel } = message.member;
		voiceChannel.join().then(connection =>
		{
			const dispatcher = connection.playFile(path.join(./audio/FILENAMEHERE, 'MP3 FILENAME HERE'));
			dispatcher.on("end", end => {
				voiceChannel.leave();
			});
		}).catch(err => console.log(err));
		isReady = true;
	}
 */
/* 	if (message.author.discriminator === '4DIGITCODEHERE') { // using the unicode for each emoji it can react in the specified order
		message.react('🇫')
			.then(() => message.react('🇷'))
			.then(() => message.react('🇮'))
			.then(() => message.react('🇪'))
			.then(() => message.react('🇳'))
			.then(() => message.react('🇩'))
			.catch(() => console.error('One of the emojis failed to react.'));
	}
 */
});

client.login(token); // login to Discord with your app's token