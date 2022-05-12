import { backgroundColorsForChart } from "../../state/data";

export class GettingTeamStats {

  teamStats = {'CIVILIZATION__TEAM1': [],
    'CIVILIZATION__TEAM2': []
  }

  singleTurnStats = {}

  getTeamStats(allStats, team1Civs, team2Civs, loopLength) {
    console.log('GettingTeamStats');

    this.getSingleTeamStats(allStats, team1Civs, 'CIVILIZATION__TEAM1', loopLength);
    this.getSingleTeamStats(allStats, team2Civs, 'CIVILIZATION__TEAM2', loopLength);

    console.log('this.teamStats--',this.teamStats);
  }

  getSingleTeamStats(allStats, teamCivs, teamName, loopLength) {
    console.log('GettingTeamStats--', teamCivs);
    let objProperties = ['population','citiesNumber','foodPerTurn','productionPerTurn','sciencePerTurn','culturePerTurn','goldPerTurn','faithPerTurn','tiles','improvedTiles','landUnits','navalUnits',
      'techs','civics'];
    let arr = [];

    for (let x = 0; x < objProperties.length; x +=1) {
      for (let i = 0; i < loopLength; i += 1) {

        let sum = 0;
        this.singleTurnStats = {};

        for (let j = 0; j < teamCivs.length; j += 1) {
          sum += Number(allStats[` CIVILIZATION_${teamCivs[j]}`][i][objProperties[x]]);
        }
        console.log('sum--', i, '---',sum);
        this.singleTurnStats[objProperties[x]] = sum;
        //arr.push(this.singleTurnStats);
      }
    }

    arr.push(this.singleTurnStats);
    this.teamStats[teamName] = arr;
  }

}
