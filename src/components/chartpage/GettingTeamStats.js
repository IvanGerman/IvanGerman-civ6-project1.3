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
    return this.teamStats;
  }

  getSingleTeamStats(allStats, teamCivs, teamName, loopLength) {
    console.log('GettingTeamStats--', teamCivs);
    let objProperties = ['population','citiesNumber','foodPerTurn','productionPerTurn','sciencePerTurn','culturePerTurn','goldPerTurn','faithPerTurn','tiles','improvedTiles','landUnits','navalUnits',
      'techs','civics'];
    let arr = [];

      for (let i = 0; i < loopLength; i += 1) {

        let sum = 0;
        let populationSum = 0;
        let citiesNumberSum = 0;
        let foodPerTurnSum = 0;
        let productionPerTurnSum = 0;
        let sciencePerTurnSum = 0;
        let culturePerTurnSum = 0;
        let goldPerTurnSum = 0;
        let faithPerTurnSum = 0;
        let tilesSum = 0;
        let improvedTilesSum = 0;
        let landUnitsSum = 0;
        let navalUnitsSum = 0;
        let techsSum = 0;
        let civicsSum = 0;

        this.singleTurnStats = {};

        // for (let j = 0; j < teamCivs.length; j += 1) {
        //   populationSum += Number(allStats[` CIVILIZATION_${teamCivs[j]}`][i].population);
        //   citiesNumberSum += Number(allStats[` CIVILIZATION_${teamCivs[j]}`][i].citiesNumber);
        // }
        // this.singleTurnStats.population = populationSum;
        // this.singleTurnStats.citiesNumber = citiesNumberSum;
        // arr.push(this.singleTurnStats);


        //-----
        for (let i2 = 0; i2 < 14; i2 += 1) {
          for (let j = 0; j < teamCivs.length; j += 1) {
            sum += Number(allStats[` CIVILIZATION_${teamCivs[j]}`][i][objProperties[i2]]);
          }
          this.singleTurnStats[objProperties[i2]] = sum;
          sum = 0;
        }
        arr.push(this.singleTurnStats);

      }
    

    //arr.push(this.singleTurnStats);
    this.teamStats[teamName] = arr;
  }

}
