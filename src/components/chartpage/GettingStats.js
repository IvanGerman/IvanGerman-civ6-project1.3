import { backgroundColorsForChart } from "../../state/data";

export class GettingStats {
  getPopulation() {
    console.log('getPopulation');
  }


  getStat(civs, allStatsForAllCivs, kindOfStat) {
    console.log('kindOfStat--', kindOfStat, civs, allStatsForAllCivs);

    let datasetsObj = {};
    let yLabels = [];
    let arr = [];

    civs.forEach((elem, index) => {
      for (let i = 0; i < allStatsForAllCivs[elem].length; i += 1) {
        yLabels.push(parseFloat(allStatsForAllCivs[elem][i][kindOfStat]));
      };
      datasetsObj.label = elem;
      datasetsObj.data = [...yLabels];
      yLabels.length = 0;
      datasetsObj.backgroundColor = backgroundColorsForChart[index];
      datasetsObj.borderColor = backgroundColorsForChart[index];
      datasetsObj.borderWidth = 2;

      arr.push({...datasetsObj});
    })
      console.log('arr--',arr);
      return arr;
  }




  getCities(civs, allStatsForAllCivs) {
    console.log('getCities', civs, allStatsForAllCivs);

    let datasetsObj = {};
    let yLabels = [];
    let arr = [];

    civs.forEach((elem, index) => {
      for (let i = 0; i < allStatsForAllCivs[elem].length; i += 1) {
        yLabels.push(parseFloat(allStatsForAllCivs[elem][i].citiesNumber));
      };
      datasetsObj.label = elem;
      datasetsObj.data = [...yLabels];
      yLabels.length = 0;
      datasetsObj.backgroundColor = backgroundColorsForChart[index];
      datasetsObj.borderColor = backgroundColorsForChart[index];
      datasetsObj.borderWidth = 2;

      // this.datasetsArr.push({...datasetsObj});
      arr.push({...datasetsObj});
    })
      console.log('arr--',arr);
      return arr;
  }

  getFood() {
    console.log('getFood');
  }
  getProduction() {
    console.log('getProduction');
  }
  getScience() {
    console.log('getScience');
  }
  getCulture() {
    console.log('getCulture');
  }
  getGold() {
    console.log('getGold');
  }
  getFaith() {
    console.log('getFaith');
  }
  getTiles() {
    console.log('getTiles');
  }
  getImprovedTiles() {
    console.log('getImprovedTiles');
  }
  getLandUnits() {
    console.log('getLandUnits');
  }
  getNavalUnits() {
    console.log('getNavalUnits');
  }
  getTechs() {
    console.log('getTechs');
  }
  getCivics() {
    console.log('getCivics');
  }
}
