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
    //this.getDataForOneCiv(` CIVILIZATION_${this.allCivs[0]}`);
    this.getDataForAllCivs(this.allCivs);
    this.getAllStatsForOneCiv();
    //this.getAllStatsForAllCivs(this.allCivs);
    this.getFoodPerTurn();
    this.chartIt();
  }   

  getDataForOneCiv(civ) {
    this.specCivArr = data.csvRowsToArray.filter((elem) => {
      return elem.includes(civ);
    });
    console.log('this.specCivArr-',this.specCivArr);
    return this.specCivArr;
  }

  getDataForAllCivs(civs) {
    civs.forEach((elem) => { console.log('elem--',elem);
      let result = this.getDataForOneCiv(` CIVILIZATION_${elem}`);
      this.specCivArrAllCivs.push(result);
    })
    console.log('this.specCivArrAllCivs-',this.specCivArrAllCivs);
  }

  getAllStatsForOneCiv() {
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
  
    console.log('this.allStatsForOneCiv-',this.allStatsForOneCiv);
  }

  // getAllStatsForAllCivs(civs) {
  //   civs.forEach((elem) => {
  //     let result = this.getAllStatsForOneCiv//----------------------
  //     this.allStatsForAllCivs[` CIVILIZATION_${elem}`] = 35
  //   })
  //   console.log('this.allStatsForAllCivs--',this.allStatsForAllCivs);
  // }

  getFoodPerTurn() {
    for (let i = 0; i < this.allStatsForOneCiv.length; i += 1) {
      this.xLabels.push(i + 1);
      this.yLabels.push(parseFloat(this.allStatsForOneCiv[i].population) + 1);
    }
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
