const http = require("http");

const D2gsi = require("dota2-gsi");
const exportFromJSON = require("export-from-json");

const gsiListener = new D2gsi({ port: 3030 });

let radiant = [];
let dire = [];
let finalPayload = [];
let matchid;
let isMatchOver;

const viewingDate = new Date();

gsiListener.events.on("newclient", function (client) {
  console.log("Connected, Waiting on game to end to record results");
  client.on("map:win_team", function (win_team) {
    if (win_team !== "none") {
      console.log("Your file is ready: http://localhost:3031");
      const { player, hero, map } = client.gamestate;

      const { game_time } = map;

      const { team2, team3 } = player;
      const team2h = hero.team2;
      const team3h = hero.team3;

      matchid = map.matchid;

      function getPlayerPayload(player) {
        const winStatus =
          win_team === player.playerData.team_name ? "WIN" : "LOSS";
        const convertedTime = `${Math.floor(game_time / 60)}:${game_time % 60}`;
        const heroFullName = player.heroData.name.slice(14).split("_");
        const readeableDate = `${viewingDate.toLocaleDateString()} ${viewingDate.toLocaleTimeString()}`;

        for (let i = 0; i < heroFullName.length; i++) {
          heroFullName[i] =
            heroFullName[i][0].toUpperCase() + heroFullName[i].substr(1);
        }

        const playerPayload = [
          readeableDate,
          matchid,
          convertedTime,
          winStatus,
          player.playerData.name,
          "position",
          player.heroData.level,
          heroFullName.join(" "),
          player.playerData.kills,
          player.playerData.deaths,
          player.playerData.assists,
          player.playerData.net_worth,
          player.playerData.last_hits,
          player.playerData.denies,
          player.playerData.gpm,
          "bounties",
          "heal",
          player.playerData.hero_damage,
          "damage to buildings",
          "damage received",
          "damage received reduced",
          "draft pick",
          player.playerData.support_gold_spent,
          player.playerData.camps_stacked,
        ];

        return playerPayload;
      }

      for (let i = 0; i <= 9; i++) {
        if (i > 4) {
          dire[i] = {
            playerData: team3[`player${i}`],
            heroData: team3h[`player${i}`],
          };
          finalPayload[i] = getPlayerPayload(dire[i]);
        } else {
          radiant[i] = {
            playerData: team2[`player${i}`],
            heroData: team2h[`player${i}`],
          };
          finalPayload[i] = getPlayerPayload(radiant[i]);
        }
      }

      http
        .createServer(function (request, response) {
          const data = finalPayload;
          const fileName = `Inhouse-Stats-Match#${matchid}`;
          const exportType = "xls";

          const result = exportFromJSON({
            data,
            fileName,
            exportType,
            processor(content, type, fileName) {
              switch (type) {
                case "xls":
                  response.setHeader(
                    "Content-Type",
                    "application/vnd.ms-excel"
                  );
                  break;
              }
              response.setHeader(
                "Content-disposition",
                "attachment;filename=" + fileName
              );
              return content;
            },
          });
          response.write(result);
          response.end();
        })
        .listen(3031);
    }
  });
});
