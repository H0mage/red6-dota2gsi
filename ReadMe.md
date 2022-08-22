# Red6 - Dota2-GSI - Statviewer

## Requirements

- Must have node installed

- Copy the **_gamestate_integration_dota2-gsi.cfg_** file and paste it in your **_Steam\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration folder_**

## Instructions

1. Start project from terminal window, in the root of the project run the command: **_npm run start_**

2. Start a dota match you should see text on your terminal telling you the connection has been established.
3. Once the game has ended navigate to the link provided in the success message to download the xls file.

### Minor Caveats

- Some fields are not provided by game state integration and should be filled manually, though they are present in the match results screen in client.

- These fields are : [Position, Draft_Pick, bounties, heal, damage to buildings reduced, damage received, damage received reduced]
