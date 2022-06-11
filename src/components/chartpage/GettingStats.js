import { backgroundColorsForChart } from "../../state/data";

export class GettingStats {
  getPopulation() {
  }

  getStat(civs, allStatsForAllCivs, kindOfStat) {

    let datasetsObj = {};
    let yLabels = [];
    let arr = [];

    civs.forEach((elem, index) => {
      for (let i = 0; i < allStatsForAllCivs[elem].length; i += 1) {
        yLabels.push(parseFloat(allStatsForAllCivs[elem][i][kindOfStat]));
      };
      datasetsObj.label = elem.slice(14);
      datasetsObj.data = [...yLabels];
      yLabels.length = 0;
      datasetsObj.backgroundColor = backgroundColorsForChart[index];
      datasetsObj.borderColor = backgroundColorsForChart[index];
      datasetsObj.borderWidth = 2;

      arr.push({...datasetsObj});
    })
      return arr;
  }

  getCities(civs, allStatsForAllCivs) {

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
      return arr;
  }
}
