import { data } from "../../state/data";
// import { GettingStats } from "./GettingStats";
// import { GettingTeamStats } from "./GettingTeamStats";

export class PieChartsPageClass {

  allCivs = data.allCivs;

  labels = [];
  renderPieData = [];
  

  constructor() {   
    const statsButtonsWrapper = document.querySelector('.statsButtonsWrapper');
    this.addEventListeners(statsButtonsWrapper);
    this.team1Civs = document.querySelector('.team1Civs');
    this.team2Civs = document.querySelector('.team2Civs');
    console.log('pie data.csvRowsToArray--',data.csvRowsToArray);
   
    console.log(data.allCivsArrays);
    let lastTurnNumber = data.csvRowsToArray[data.csvRowsToArray.length - 1][0];
    console.log('lastTurnNumber---',lastTurnNumber, typeof(lastTurnNumber));
    this.lastTurnStats = [];
    
    for ( let i = Number(data.csvRowsToArray.length) - 1; i >= 0; i-- ) {
      if ( data.csvRowsToArray[i][0] === lastTurnNumber ) {
        this.lastTurnStats.push(data.csvRowsToArray[i]);
      } else {
        break;
      }
    }
    console.log('this.lastTurnStats-',this.lastTurnStats);

    if (data.teamModeIsOn === true) {
      console.log('data.teamModeIsOn---',data.teamModeIsOn);
      console.log(data.team1Civs,'---',data.team2Civs);
      this.labels = ['CIVILIZATION__TEAM1', 'CIVILIZATION__TEAM2']
    } else {
      console.log('data.teamModeIsOn---',data.teamModeIsOn);
      console.log(this.allCivs);
      this.labels = this.allCivs;
      for ( let i = 0; i < this.allCivs.length; i += 1 ) {
        this.lastTurnStats.forEach((elem) => { 
          if ( elem[1] === this.allCivs[i] ) {
            this.renderPieData.push(elem[3])
          }
        })
      }
    };
    console.log('this.renderPieData--',this.renderPieData);
    //here we get all data for the chart
    //{ population: { 'france': 50, 'spain': 70},
    //  science: { 'france': 30, 'spain': 44},
    //}
  }   


  chartIt() {  
  
    const ctx = document.getElementById('myPieChart').getContext('2d');

      let myChart = null;

      if (Chart.getChart("myPieChart")) {
        Chart.getChart("myPieChart").destroy();
      };

      myChart = new Chart(ctx, {
          type: 'pie',
          data: {
              labels: this.labels,
              datasets: [{
                label: 'My First Dataset',
                data: this.renderPieData,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(8, 145, 22)',
                  'rgb(233, 223, 223)',
                  'rgb(54, 162, 235)',
                  'rgb(54, 162, 235)',
                  'rgb(54, 162, 235)',
                  'rgb(54, 162, 235)',
                  'rgb(54, 162, 235)',
                  'rgb(54, 162, 235)',
                  'rgb(54, 162, 235)'
                ],
                hoverOffset: 4
              }]
          },
          options: {
            
          }
      });
  };

  getSpecialStat(kindOfStat) { console.log('kindOfStat--',kindOfStat);
    //this.renderPieData = ['to figure out'];
    //this.chartIt();
    //this.yAxisTitle.innerHTML = kindOfStat;
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
