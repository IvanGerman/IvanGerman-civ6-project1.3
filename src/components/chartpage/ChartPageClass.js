import { backgroundColorsForChart, data } from "../../state/data";
import { changeUrl } from "../../state/functions";
import { GettingStats } from "./GettingStats";
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
    //this.getFoodPerTurn(this.allCivs[0]);
    //change y-achse title per innerHTML, default population
    this.getXLabelsValues(this.allCivs);
    this.getFoodPerTurn2(this.allCivs);
    this.chartIt();
    //const gettingStatsObj = new GettingStats();
    //gettingStatsObj.getPopulation();
    const statsButtonsWrapper = document.querySelector('.statsButtonsWrapper');
    console.log('statsButtonsWrapper--',statsButtonsWrapper);
    this.addEventListeners(statsButtonsWrapper);
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
      let result = [...this.getAllStatsForOneCiv(elem)];
      //console.log('result--',elem, result);
      this.allStatsForAllCivs[elem] = result;
      this.allStatsForOneCiv.length = 0;
    })
    console.log('this.allStatsForAllCivs--',this.allStatsForAllCivs);
  }

  // getFoodPerTurn(civ) {
  //   for (let i = 0; i < this.allStatsForAllCivs[civ].length; i += 1) {
  //     this.xLabels.push(i + 1);
  //     this.yLabels.push(parseFloat(this.allStatsForAllCivs[civ][i].foodPerTurn));
  //   }
  //   console.log('xLabels-',this.xLabels);
  //     console.log('yLabels-',this.yLabels);
  // }

  getXLabelsValues(civs) {
    for (let i = 0; i < this.allStatsForAllCivs[civs[0]].length; i += 1) {
      this.xLabels.push(i + 1);
    };
    console.log('xLabels-',this.xLabels);
  }
  getFoodPerTurn2(civs) {
    // for (let i = 0; i < this.allStatsForAllCivs[civs[0]].length; i += 1) {
    //   this.xLabels.push(i + 1);
    // };
    // console.log('xLabels-',this.xLabels);
    
    let datasetsObj = {};
    let yLabels = [];

    civs.forEach((elem, index) => {
      for (let i = 0; i < this.allStatsForAllCivs[elem].length; i += 1) {
        yLabels.push(parseFloat(this.allStatsForAllCivs[elem][i].foodPerTurn));
      };
      datasetsObj.label = elem;
      datasetsObj.data = [...yLabels];
      yLabels.length = 0;
      datasetsObj.backgroundColor = backgroundColorsForChart[index];
      datasetsObj.borderColor = backgroundColorsForChart[index];
      datasetsObj.borderWidth = 2;

      this.datasetsArr.push({...datasetsObj});
    })
      console.log('datasetsArr',this.datasetsArr);
  }

  chartIt() {
  
    const ctx = document.getElementById('myChart').getContext('2d');

      let myChart = null;

      if (Chart.getChart("myChart")) {
        Chart.getChart("myChart").destroy();
      };

      myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.xLabels,
              datasets: this.datasetsArr
          }
      });
  };

  addEventListeners(element) {
    const gettingStatsObj = new GettingStats();
    element.addEventListener('click', (event) => {
      
      switch(event.target.dataset.buttonName) {
        case 'population':
          gettingStatsObj.getPopulation();
          break;

        case 'cities':
          this.datasetsArr = gettingStatsObj.getCities(this.allCivs, this.allStatsForAllCivs);
          this.chartIt();
          break; 

        case 'food':
          gettingStatsObj.getFood();
          break; 
        case 'production':
          gettingStatsObj.getProduction();
          break;
        case 'science':
          gettingStatsObj.getScience();
          break;  
        case 'culture':
          gettingStatsObj.getCulture();
          break; 
        case 'gold':
          gettingStatsObj.getGold();
          break;
        case 'faith':
          gettingStatsObj.getFaith();
          break; 
        case 'tiles':
          gettingStatsObj.getTiles();
          break; 
        case 'improvedTiles':
          gettingStatsObj.getImprovedTiles();
          break;
        case 'landUnits':
          gettingStatsObj.getLandUnits();
          break; 
        case 'navalUnits':
          gettingStatsObj.getNavalUnits();
          break; 
        case 'techs':
          gettingStatsObj.getTechs();
          break;
        case 'civics':
          gettingStatsObj.getCivics();
          break; 
        default:
          return; 
      }

      // if (event.target.dataset.buttonName === 'population') {
      //   gettingStatsObj.getPopulation();
      // };
      // if (event.target.dataset.buttonName === 'cities') {
      //   gettingStatsObj.getCities();
      // };

    })
  }

}
