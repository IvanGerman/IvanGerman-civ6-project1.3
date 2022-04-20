import { data } from "../../state/data";
import { changeUrl } from "../../state/functions";

export class ChartPageClass {

  xLabels = [];
  yLabels = [];
  specCivArr = [];
  allStatsForOneCiv = [];
  allStatsForAllCivs = {};
  datasetsArr = [];
  allCivs = data.allCivs;
  specCivArrAllCivs = [];

  constructor() {
    console.log('allCivs--',this.allCivs);
    this.getAllStatsForAllCivs(this.allCivs);
    this.getFoodPerTurn(` CIVILIZATION_${this.allCivs[0]}`);
    this.chartIt();
  }   

  getDataForOneCiv(civ) {
    this.specCivArr = data.csvRowsToArray.filter((elem) => {
      return elem.includes(civ);
    });
    //console.log('this.specCivArr-',this.specCivArr);
    return this.specCivArr;
  }

  getAllStatsForOneCiv(civ) {
    this.getDataForOneCiv(civ);
    this.specCivArr.forEach((elem) => {
      const allStatsForOneCivObj = {};
      allStatsForOneCivObj.citiesNumber = elem[2];
      allStatsForOneCivObj.population = elem[3];
      allStatsForOneCivObj.techs = elem[4];
      allStatsForOneCivObj.civics = elem[5];
      allStatsForOneCivObj.landUnits = elem[6];
      allStatsForOneCivObj.navalUnits = elem[9];
      allStatsForOneCivObj.tiles = elem[10];
      allStatsForOneCivObj.improvedTiles = elem[11];
      allStatsForOneCivObj.sciencePerTurn = elem[14];
      allStatsForOneCivObj.culturePerTurn = elem[15];
      allStatsForOneCivObj.goldPerTurn = elem[16];
      allStatsForOneCivObj.faithPerTurn = elem[17];
      allStatsForOneCivObj.productionPerTurn = elem[18];
      allStatsForOneCivObj.foodPerTurn = elem[19];

      this.allStatsForOneCiv.push(allStatsForOneCivObj);
    });
    return this.allStatsForOneCiv;
  }

  getAllStatsForAllCivs(civs) {
    civs.forEach((elem) => {
      let result = [...this.getAllStatsForOneCiv(` CIVILIZATION_${elem}`)];
      //console.log('result--',elem, result);
      this.allStatsForAllCivs[` CIVILIZATION_${elem}`] = result;
      this.allStatsForOneCiv.length = 0;
    })
    console.log('this.allStatsForAllCivs--',this.allStatsForAllCivs);
  }

  getFoodPerTurn(civ) {
    for (let i = 0; i < this.allStatsForAllCivs[civ].length; i += 1) {
      this.xLabels.push(i + 1);
      this.yLabels.push(parseFloat(this.allStatsForAllCivs[civ][i].foodPerTurn));
    }
    console.log('xLabels-',this.xLabels);
      console.log('yLabels-',this.yLabels);
  }

  chartIt() {
  
    const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.xLabels,
              datasets: [{
                  label: this.allCivs[0],
                  data: this.yLabels,
                  backgroundColor:'rgba(255, 99, 132, 0.2)',
                  borderColor:'rgba(255, 99, 132, 1)',
                  borderWidth: 2
              }]
          }
      });
  };

}
