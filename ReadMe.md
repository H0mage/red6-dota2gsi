# Red6 - Dota2-GSI - Statviewer

## Requirements

- Must have node installed. You can download from [HERE](https://nodejs.org/en/download/)

- Copy the **gamestate_integration_dota2-gsi.cfg** file and paste it in your **\Steam\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration** folder

## Instructions

1. In a terminal window, in the project root run the following command: **npm install**
2. Once the previous command has finished run the next one in the same place: **npm run start**

3. Start a dota match you should see text on your terminal telling you the connection has been established.
4. Once the game has ended navigate to the link provided in the success message to download the xls file.

### Minor Caveats

- Some hero names use the nicknames from Original Dota, for now change manually if needed.

- Some fields are not provided by game state integration and should be filled manually, though they are present in the match results screen in client.

- These fields are : [Position, Draft_Pick, bounties, heal, damage to buildings reduced, damage received, damage received reduced]
