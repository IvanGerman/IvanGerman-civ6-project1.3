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
  gettingStatsObj = new GettingStats();

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

  getXLabelsValues(civs) {
    for (let i = 0; i < this.allStatsForAllCivs[civs[0]].length; i += 1) {
      this.xLabels.push(i + 1);
    };
    console.log('xLabels-',this.xLabels);
  }
  getFoodPerTurn2(civs) {
    
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

  getSpecialStat(kindOfStat) {
    this.datasetsArr = this.gettingStatsObj.getStat(this.allCivs, this.allStatsForAllCivs, kindOfStat);
    this.chartIt();
  }

  addEventListeners(element) {

    element.addEventListener('click', (event) => {
      
      switch(event.target.dataset.buttonName) {
        case 'population':
          this.getSpecialStat('population');
          break;

        case 'cities':
          this.getSpecialStat('citiesNumber');
          break; 

        case 'food':
          this.getSpecialStat('foodPerTurn');
          break; 

        case 'production':
          this.getSpecialStat('productionPerTurn');
          break;
        case 'science':
          this.getSpecialStat('sciencePerTurn');
          break;  
        case 'culture':
          this.getSpecialStat('culturePerTurn');
          break; 
        case 'gold':
          this.getSpecialStat('goldPerTurn');
          break;
        case 'faith':
          this.getSpecialStat('faithPerTurn');
          break; 
        case 'tiles':
          this.getSpecialStat('tiles');
          break; 
        case 'improvedTiles':
          this.getSpecialStat('improvedTiles');
          break;
        case 'landUnits':
          this.getSpecialStat('landUnits');       
          break; 
        case 'navalUnits':
          this.getSpecialStat('navalUnits');    
          break; 
        case 'techs':
          this.getSpecialStat('techs');     
          break;
        case 'civics':
          this.getSpecialStat('civics');
          break; 
        default:
          return; 
      }
    })
  }

}
