const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// create a new Discord client with specified intents
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS);
const client = new Client({ intents: myIntents });

// command handling
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// event handling
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// when the client is ready, run this code, this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// client.on('message', message => {
//  	if (message.content.toLowerCase().includes('KEYWORD')) { // if message has the indicated word, sends a picture
// 		message.channel.send({files: ['./images/FILENAMEHERE']});
// 	}
	
// 	// when the specified user types a message, react to the message with smiling emoji
//  	if (message.author.id === '124332689707892736') { 
// 		const emoji = message.guild.emojis.find(emoji => emoji.name === 'smile');
// 		message.react(emoji);
// 	}

//  	if (isReady && message.content === 'KEYWORD') { // on keyword bot enters voice channel to play an mp3 file then exits
// 		isReady = false;
// 		const { voiceChannel } = message.member;
// 		voiceChannel.join().then(connection =>
// 		{
// 			const dispatcher = connection.playFile(path.join(./audio/FILENAMEHERE, 'MP3 FILENAME HERE'));
// 			dispatcher.on("end", end => {
// 				voiceChannel.leave();
// 			});
// 		}).catch(err => console.log(err));
// 		isReady = true;
// 	}

//  	if (message.author.discriminator === '4DIGITCODEHERE') { // using the unicode for each emoji it can react in the specified order
// 		message.react('🇫')
// 			.then(() => message.react('🇷'))
// 			.then(() => message.react('🇮'))
// 			.then(() => message.react('🇪'))
// 			.then(() => message.react('🇳'))
// 			.then(() => message.react('🇩'))
// 			.catch(() => console.error('One of the emojis failed to react.'));
// 	}

// });

client.login(token); // login to Discord with your app's token