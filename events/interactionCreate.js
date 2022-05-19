const { ButtonComponent } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isButton()) {
      //----Beginning of handling tictactoe interactions----//
      if (interaction.customId.includes("tictactoe")) {
        //variables needed to consider win and draw
        var isDraw = false;
        var isOver = false;
        var count = 0;
        var winner = " ";

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

        //check if either player has won before changing turns
        for (let i = 0; i < 3; i++) {
          if (
            interaction.message.components[i].components[0].label ==
              interaction.message.components[i].components[1].label &&
            interaction.message.components[i].components[1].label ==
              interaction.message.components[i].components[2].label &&
            interaction.message.components[i].components[0].label != " "
          ) {
            isOver = true;
            winner = currentPlayer;
          }
          if (
            interaction.message.components[0].components[i].label ==
              interaction.message.components[1].components[i].label &&
            interaction.message.components[1].components[i].label ==
              interaction.message.components[2].components[i].label &&
            interaction.message.components[0].components[i].label != " "
          ) {
            isOver = true;
            winner = currentPlayer;
          }
          if (
            interaction.message.components[0].components[0].label ==
              interaction.message.components[1].components[1].label &&
            interaction.message.components[1].components[1].label ==
              interaction.message.components[2].components[2].label &&
            interaction.message.components[0].components[0].label != " "
          ) {
            isOver = true;
            winner = currentPlayer;
          }
          if (
            interaction.message.components[0].components[2].label ==
              interaction.message.components[1].components[1].label &&
            interaction.message.components[1].components[1].label ==
              interaction.message.components[2].components[0].label &&
            interaction.message.components[0].components[2].label != " "
          ) {
            isOver = true;
            winner = currentPlayer;
          }
        }

        //taking turns
        if (currentPlayer == "X") {
          interaction.message.components[clickedRowNumber].components[
            clickedColNumber
          ].setStyle("DANGER");
          currentPlayer = "O";
        } else {
          interaction.message.components[clickedRowNumber].components[
            clickedColNumber
          ].setStyle("PRIMARY");
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

        //check if the game is a draw
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (
              interaction.message.components[row].components[col].label != " "
            ) {
              count += 1;
            }
            if (count === 9) {
              isDraw = true;
              isOver = true;
            }
          }
        }

        //update interaction if the game is ongoing
        if (isDraw === false && isOver === false) {
          interaction.update({
            embeds: [new MessageEmbed().setTitle(newPlayer)],
            components: [components[0], components[1], components[2]],
          });
        }

        //update interaction if one player has won
        if (isDraw === false && isOver === true) {
          interaction.update({
            embeds: [
              new MessageEmbed().setTitle(
                "Player " + winner + " has won the game!"
              ),
            ],
            components: [],
          });
        }

        //update interaction if the game is a draw
        if (isDraw === true && isOver === true) {
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
