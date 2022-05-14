const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isButton()) {
      //----Beginning of handling tictactoe interactions----//
      if (interaction.customId.includes("tictactoe")) {
        //variables needed to consider win and draw
        var isDraw = false;
        var count = 0;

        //Store all information from the clicked button
        var clickedRowNumber = interaction.customId[10];
        var clickedColNumber = interaction.customId.substring(
          interaction.customId.length - 1
        );
        var clickedButton =
          interaction.message.components[clickedRowNumber].components[
            clickedColNumber
          ];
        var clickedRowComp = interaction.message.components[clickedRowNumber];

        //current player
        var labelLength = interaction.message.embeds[0].title.length;
        var currentPlayer = interaction.message.embeds[0].title.substring(
          labelLength - 1
        );

        //update based on which player's turn it is
        clickedButton.label = currentPlayer;

        //taking turns
        if (currentPlayer == "X") {
          currentPlayer = "O";
        } else {
          currentPlayer = "X";
        }

        //value of current player's turn
        var newPlayer = "Turn: " + currentPlayer;

        //create a new board and update the buttons
        var components = [];

        for (var i = 0; i < 3; i++) {
          var component = interaction.message.components[i];
          if (i != clickedRowNumber) {
            components.push(component);
          } else {
            components.push(clickedRowComp);
          }
        }

        //check if the game is a draw after a button has been clicked
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (
              interaction.message.components[row].components[col].label != " "
            ) {
              count += 1;
            }
            if (count === 9) {
              isDraw = true;
            }
          }
        }

        //update interaction accordingly based on state of game(onging, draw, win)
        if (isDraw === false) {
          interaction.update({
            embeds: [new MessageEmbed().setTitle(newPlayer)],
            components: [components[0], components[1], components[2]],
          });
        }

        if (isDraw === true) {
          interaction.update({
            embeds: [
              new MessageEmbed().setTitle("The game has ended in a draw!"),
            ],
            components: [],
          });
        }
        //----End of tictactoe interactions----//
      }

      //log when someone triggers an interaction in the specific channel
      console.log(
        `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
      );
    }
  },
};
