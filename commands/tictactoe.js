const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tictactoe")
    .setDescription("Starts a game of Tic-Tac-Toe"),
  async execute(interaction) {
    let EMPTY = Symbol("empty");
    let initialBoard = [
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    await interaction.reply({
      content: "Tic-Tac-Toe game in progress!",
      components: constructGrid(),
    });
  },
};

function constructGrid() {
  components = [];

  for (let row = 0; row < 3; row++) {
    actionRow = new MessageActionRow();

    for (let column = 0; column < 3; column++) {
      messageButton = new MessageButton()
        .setCustomId("tictactoe")
        .setLabel("test")
        .setStyle("SECONDARY");

      actionRow.addComponents(messageButton);
    }
    components.push(actionRow);
  }
  return components;
}
