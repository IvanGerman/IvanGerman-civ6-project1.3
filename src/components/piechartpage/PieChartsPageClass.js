import { data } from "../../state/data";
// import { GettingStats } from "./GettingStats";
// import { GettingTeamStats } from "./GettingTeamStats";

export class PieChartsPageClass {

  xLabels = [];
  yLabels = [];
  allCivs = data.allCivs;
  

  constructor() {   
    this.team1Civs = document.querySelector('.team1Civs');
    this.team2Civs = document.querySelector('.team2Civs');
    console.log('pie data.csvRowsToArray--',data.csvRowsToArray);
    if (data.teamModeIsOn === true) {
      console.log('data.teamModeIsOn---',data.teamModeIsOn);
    } else {
      console.log('data.teamModeIsOn---',data.teamModeIsOn);
    }
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
              labels: ['Red','Blue','Yellow',],
              datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
              }]
          },
          options: {
            
          }
      });
  };

  

  // addEventListeners(element) {

  //   element.addEventListener('click', (event) => {
      
  //     switch(event.target.dataset.buttonName) {
  //       case 'population':
  //         this.getSpecialStat('population');
  //         break;

  //       case 'cities':
  //         this.getSpecialStat('citiesNumber');
  //         break; 

  //       case 'food':
  //         this.getSpecialStat('foodPerTurn');
  //         break; 

  //       case 'production':
  //         this.getSpecialStat('productionPerTurn');
  //         break;
  //       case 'science':
  //         this.getSpecialStat('sciencePerTurn');
  //         break;  
  //       case 'culture':
  //         this.getSpecialStat('culturePerTurn');
  //         break; 
  //       case 'gold':
  //         this.getSpecialStat('goldPerTurn');
  //         break;
  //       case 'faith':
  //         this.getSpecialStat('faithPerTurn');
  //         break; 
  //       case 'tiles':
  //         this.getSpecialStat('tiles');
  //         break; 
  //       case 'improvedTiles':
  //         this.getSpecialStat('improvedTiles');
  //         break;
  //       case 'landUnits':
  //         this.getSpecialStat('landUnits');       
  //         break; 
  //       case 'navalUnits':
  //         this.getSpecialStat('navalUnits');    
  //         break; 
  //       case 'techs':
  //         this.getSpecialStat('techs');     
  //         break;
  //       case 'civics':
  //         this.getSpecialStat('civics');
  //         break; 
  //       default:
  //         return; 
  //     }
  //   })
  // }

}
