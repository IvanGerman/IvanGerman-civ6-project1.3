import { data } from "../../state/data";
import { GettingStats } from "./GettingStats";
import { GettingTeamStats } from "./GettingTeamStats";
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
  gettingTeamStatsObj = new GettingTeamStats();

  constructor() {
    this.team1Civs = document.querySelector('.team1Civs');
    this.team2Civs = document.querySelector('.team2Civs');
    this.yAxisTitle = document.querySelector('.kind-of-stat');
    const pieChartsLink = document.querySelector('.pie-charts-li');
    pieChartsLink.style.display = 'block';  
    const lineChartsLink = document.querySelector('.line-charts-li');
    lineChartsLink.style.display = 'block';
    const timeStampSpan = document.querySelector('.timestamp');
    timeStampSpan.style.display = 'block';
    const statsButtonsWrapper = document.querySelector('.statsButtonsWrapper');
    this.addEventListeners(statsButtonsWrapper);

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    let newdate = year + "/" + month + "/" + day;
    timeStampSpan.innerHTML = newdate;
    
    if (data.teamModeIsOn === true) {
      this.allCivs = data.allCivsForTeamSelection;//this.allCivs = both teams
      this.getAllStatsForAllCivs(this.allCivs);
      this.getXLabelsValues(this.allCivs);
      //sum up stats of team1 civs and team2 civs
      this.allStatsForAllCivs = this.getTeamStats(this.allStatsForAllCivs, data.team1Civs, data.team2Civs);
      this.team1Civs.innerHTML = `TEAM1:   ${data.team1Civs}`;
      this.team2Civs.innerHTML = `TEAM2:   ${data.team2Civs}`;
      this.allCivs = ['CIVILIZATION__TEAM1', 'CIVILIZATION__TEAM2'];
      //this.allStatsForAllCivs = summed stats of team1 and 2
      this.getSpecialStat('population');
      //data.setTeamModeIsOn = false;
      const selectCivLink = document.querySelector('.sel-civ-li');
      selectCivLink.style.display = 'block';
      return;
    };
    if (data.teamModeIsOn === false) {
      this.getAllStatsForAllCivs(this.allCivs);
      this.getXLabelsValues(this.allCivs);
      this.getSpecialStat('population');
    }; 
    const selectCivLink = document.querySelector('.sel-civ-li');
    selectCivLink.style.display = 'block';
  }   

  getDataForOneCiv(civ) {
    this.specCivArr = data.csvRowsToArray.filter((elem) => {
      return elem.includes(civ);
    });
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
      this.allStatsForAllCivs[elem] = result;
      this.allStatsForOneCiv.length = 0;
    })
  }

  getXLabelsValues(civs) {
    for (let i = 0; i < this.allStatsForAllCivs[civs[0]].length; i += 1) {
      this.xLabels.push(i + 1);
    };
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
          },
          options: {
            layout: {
              padding: 0
            },
            plugins: {
              legend: {
                display: true,
                onHover : () => {
                  const labelCanvas = document.querySelector('.myChart');
                  labelCanvas.style.cursor = 'pointer';
                },
                onLeave : () => {
                  const labelCanvas = document.querySelector('.myChart');
                  labelCanvas.style.cursor = 'default';
                },
                labels: {
                  // render: 'label',
                  // precision: 1,
                  // arc: false,
                  // position: 'border',
                  font: {
                    size: 15
                  },
                  color: [
                    '#ffffff'
                  ]
                },
                title: {
                  font: {
                    size: 15
                  }
                }
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#ffffff'
                }
              },
              y: {
                ticks: {
                  color: '#ffffff'
                }
              }
            }
          }
      });
  };

  getSpecialStat(kindOfStat) {
    this.datasetsArr = this.gettingStatsObj.getStat(this.allCivs, this.allStatsForAllCivs, kindOfStat);
    this.chartIt();
    this.yAxisTitle.innerHTML = kindOfStat;
  }

  getTeamStats(allStats, team1Civs, team2Civs) {
    let loopLength = allStats[` CIVILIZATION_${team1Civs[0]}`].length;
    let teamStats = this.gettingTeamStatsObj.getTeamStats(allStats, team1Civs, team2Civs, loopLength);
    return teamStats;
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
