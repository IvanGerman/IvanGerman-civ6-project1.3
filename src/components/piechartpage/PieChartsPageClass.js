import { data } from "../../state/data";
export class PieChartsPageClass {

  allCivs = data.allCivs;
  lastTurnStats = [];
  labels = [];
  renderPieData = [];
  

  constructor() {   
    const statsButtonsWrapper = document.querySelector('.statsButtonsWrapper');
    this.addEventListeners(statsButtonsWrapper);
    this.yAxisTitle = document.querySelector('.kind-of-stat');
    this.team1Civs = document.querySelector('.team1Civs');
    this.team2Civs = document.querySelector('.team2Civs');
    this.team1Civs.style.color = 'rgb(255, 99, 132)';
    this.team2Civs.style.color = 'rgb(54, 162, 235)';

    if ( data.teamModeIsOn === true ) {
      this.team1Civs.style.display = 'block';
      this.team2Civs.style.display = 'block';
      this.team1Civs.innerHTML = `TEAM1:__${data.team1Civs.join(`,  `)}`;
      this.team2Civs.innerHTML = `TEAM2:__${data.team2Civs.join(`,  `)}`;
    };
    if ( data.teamModeIsOn === false ) {
      this.team1Civs.style.display = 'none';
      this.team2Civs.style.display = 'none';
    };
    
   
    let lastTurnNumber = data.csvRowsToArray[data.csvRowsToArray.length - 1][0];
    
    for ( let i = Number(data.csvRowsToArray.length) - 1; i >= 0; i-- ) {
      if ( data.csvRowsToArray[i][0] === lastTurnNumber ) {
        this.lastTurnStats.push(data.csvRowsToArray[i]);
      } else {
        break;
      }
    }

    if (data.teamModeIsOn === true) {
      this.labels = ['TEAM1', 'TEAM2'];
      this.allCivs = ['TEAM1', 'TEAM2'];
      this.getSpecialStat('population', 3);
    };

    if (data.teamModeIsOn === false) {
      this.labels.length = 0;
      data.allCivs.forEach((elem) => {
        this.labels.push(elem.substr(14));
      });
      this.getSpecialStat('population', 3)
    };
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
                  'rgb(240, 116, 7)',
                  'rgb(233, 223, 223)',
                  'rgb(132, 66, 245)',
                  'rgb(233, 66, 245)',
                  'rgb(20, 6, 82)',
                  'rgb(7, 240, 69)',
                  'rgb(240, 26, 7)',
                  'rgb(7, 240, 228)'
                ],
                hoverOffset: 4
              }]
          },
          options: {
            
          }
      });
  };



  getSpecialStat(kindOfStat = 'population', statArrayIndex = 3) {
    if ( data.teamModeIsOn === true ) {
      this.renderPieData = this.getRenderPieDataForTeams(kindOfStat, statArrayIndex);
      this.chartIt();
      this.yAxisTitle.innerHTML = kindOfStat;
      return;
    }
    this.getRenderPieData(statArrayIndex);
    this.chartIt();
    this.yAxisTitle.innerHTML = kindOfStat;
  };



  getRenderPieDataForTeams(kindOfStat = 'population', statArrayIndex = 3) {
    if (this.renderPieData.length !== 0) {this.renderPieData = []};
    let team1Score = 0;
    let team2Score = 0;

    function sumUpTeamScore(teamCivs, statArrayIndex, lastTurnStats) {
      let summedScore = 0;  
      teamCivs.forEach((elem) => {
        for ( let i = 0; i < lastTurnStats.length; i += 1 ) {
          if ( lastTurnStats[i][1] === ` CIVILIZATION_${elem}`) {
            summedScore = summedScore + Number(lastTurnStats[i][statArrayIndex]);
          }
        }
      });
      return summedScore;
    };

    team1Score = sumUpTeamScore(data.team1Civs, statArrayIndex, this.lastTurnStats);
    team2Score = sumUpTeamScore(data.team2Civs, statArrayIndex, this.lastTurnStats);
    return [team1Score, team2Score];
  };



  getRenderPieData(statArrayIndex) {
    if (this.renderPieData.length !== 0) {this.renderPieData = []};
    for ( let i = 0; i < this.allCivs.length; i += 1 ) {
      this.lastTurnStats.forEach((elem) => { 
        if ( elem[1] === this.allCivs[i] ) {
          this.renderPieData.push(elem[statArrayIndex])
        }
      })
    }
  };
  


  addEventListeners(element) {

    element.addEventListener('click', (event) => {
      
      switch(event.target.dataset.buttonName) {
        case 'population':
          this.getSpecialStat('population', 3);
          break;

        case 'cities':
          this.getSpecialStat('citiesNumber', 2);
          break; 

        case 'food':
          this.getSpecialStat('foodPerTurn', 19);
          break; 

        case 'production':
          this.getSpecialStat('productionPerTurn', 18);
          break;
        case 'science':
          this.getSpecialStat('sciencePerTurn', 14);
          break;  
        case 'culture':
          this.getSpecialStat('culturePerTurn', 15);
          break; 
        case 'gold':
          this.getSpecialStat('goldPerTurn', 16);
          break;
        case 'faith':
          this.getSpecialStat('faithPerTurn', 17);
          break; 
        case 'tiles':
          this.getSpecialStat('tiles', 10);
          break; 
        case 'improvedTiles':
          this.getSpecialStat('improvedTiles', 11);
          break;
        case 'landUnits':
          this.getSpecialStat('landUnits', 6);       
          break; 
        case 'navalUnits':
          this.getSpecialStat('navalUnits', 9);    
          break; 
        case 'techs':
          this.getSpecialStat('techs', 4);     
          break;
        case 'civics':
          this.getSpecialStat('civics', 5);
          break; 
        default:
          return; 
      }
    })
  }

}
