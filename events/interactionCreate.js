const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    if (interaction.isButton()) {
      //----Beginning of handling tictactoe interactions----//
      if (interaction.customId.includes("tictactoe")) {
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

        //update interaction
        interaction.update({
          embeds: [new MessageEmbed().setTitle(newPlayer)],
          components: [components[0], components[1], components[2]],
        });
      }
      //----End of tictactoe interactions----//
    }

    //log when someone triggers an interaction in the specific channel
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );
  },
};
