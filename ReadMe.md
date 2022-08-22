Requirements: Must have node installed

Copy the gamestate_integration_dota2-gsi.cfg file and paste it in your Steam\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration folder

Start project from terminal window, in the root of the project run the command: npm run start.

Start a dota match you should see text on your terminal telling you the connection has been established.
Once the game has ended navigate to the link provided in the success message to download the xls file.

Some fields are not provided by game state integration and should be filled manually, though they are present in the match results screen in client.

These fields are : [Position, Draft_Pick, bounties, heal, damage to buildings reduced, damage received, damage received reduced]
