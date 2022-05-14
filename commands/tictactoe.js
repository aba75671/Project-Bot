const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tictactoe")
    .setDescription("Starts a game of Tic-Tac-Toe"),
  async execute(interaction) {
    constructGrid();
    await interaction.reply({
      embeds: [new MessageEmbed().setTitle("Turn: X")],
      components: [components[0], components[1], components[2]],
    });
  },
};

function constructGrid() {
  components = [];

  for (let row = 0; row < 3; row++) {
    actionRow = new MessageActionRow();

    for (let column = 0; column < 3; column++) {
      messageButton = new MessageButton()
        .setCustomId("tictactoe_" + row + "_" + column)
        .setLabel(" ")
        .setStyle("SECONDARY");
      actionRow.addComponents(messageButton);
    }
    components.push(actionRow);
  }
  return components;
}
