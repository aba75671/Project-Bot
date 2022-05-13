const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

let EMPTY = Symbol("empty");
let PLAYER1 = Symbol("player1");
let PLAYER2 = Symbol("player2");
let gameBoardState;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tictactoe")
    .setDescription("Starts a game of Tic-Tac-Toe"),
  async execute(interaction) {
    gameBoardState = [
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
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
      switch (gameBoardState[row][column]) {
        case EMPTY:
          messageButton.setLabel(" ").setStyle("SECONDARY");
          break;
        case PLAYER1:
          messageButton.setLabel("X").setStyle("PRIMARY");
          break;
        case PLAYER2:
          messageButton.setLabel("O").setStyle("DANGER");
          break;
      }
      actionRow.addComponents(messageButton);
    }
    components.push(actionRow);
  }
  return components;
}
