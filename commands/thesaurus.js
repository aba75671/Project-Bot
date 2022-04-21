const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { thesaurusKey } = require("../config.json");

const fetch = require("node-fetch");
const trim = (str, max) =>
  str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("thesaurus")
    .setDescription(
      "Replies with synonyms and antonyms of the word given from Merriam-Webster"
    )
    .addStringOption((option) =>
      option.setName("input").setDescription("Enter your desired word")
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const word = interaction.options.getString("input");
    const query = new URLSearchParams({ word });

    if (!word[0]) {
      interaction.editReply(`You didn't include a word for the search!`);
      return;
    }

    const meta = await fetch(
      `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${query}?key=${thesaurusKey}`,
      { method: 'GET' }
    ).then((response) => response.json());

    if (!meta[0]) {
      return interaction.editReply(`No results found for **${word}**.`);
    }

    const embed = new MessageEmbed()
      .setColor("#EFFF00")
      .setTitle(meta[0].id)
      .addFields(
        { name: "Synonyms", value: trim(meta[0].syns[0], 1024) },
        { name: "Antonyms", value: trim(meta[0].ants[0], 1024) }
      )
      .setFooter({ text: "Results provided by Merriam-Webster" });
    interaction.editReply({ embeds: [embed] });
  },
};
