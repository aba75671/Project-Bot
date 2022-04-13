const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thesaurus')
		.setDescription('Replies with synonyms and antonyms of the word given'),
	async execute(interaction) {
		const key = interaction.options.getString('key');
		const query = new URLSearchParams({ key });

		const { list } = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${query}`)
			.then(response => response.json());
        
        if (!list.length) {
            return interaction.editReply(`No results found for **${key}**.`);
        }
        
		const [answer] = list;

		const embed = new MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Synonyms', value: trim(answer.syns, 1024) },
				{ name: 'Antonyms', value: trim(answer.ants, 1024) },
			);
		interaction.editReply({ embeds: [embed] });
	}
};
