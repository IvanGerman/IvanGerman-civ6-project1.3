import ChartPage from "../../pages/chartpage/ChartPage";
import { data } from "../../state/data";
import { changeUrl } from "../../state/functions";

export class SelectionLogic {

  completedTeamCount = 0;
  isTeamComplete = false;
  civsForComparingCount = 0;

  constructor(team1 = [], team2 = [], civsForComparing = [], civForGovernor = '') {
    this.team1 = team1;
    this.team2 = team2;
    this.civsFromBothTeams = [];
    this.civsForComparing = civsForComparing;
    this.civForGovernor = civForGovernor;
    this.previousSelectedHTMLelement = '';
    this.paragraph1 = document.querySelector('.paragraph1');
    this.paragraph2 = document.querySelector('.paragraph2');
    this.func1Callback = function func1 (event)  {
      console.log('show team stats');
      changeUrl('chartpage');
    };
    this.func2Callback = function func2 (event)  {
      console.log('now show chart page');
      changeUrl('chartpage');
    };
  }

  //---------------------------------------------------------------------------------
  getAllCivs(civs) {
    return civs;
  }

  addToTeam(selectedCiv, maxTeamMembers) {
  
    if (this.isTeamComplete === false) {
    this.team1.push(selectedCiv);
    this.completedTeamCount += 1;
    if (this.completedTeamCount >= maxTeamMembers) {
      console.log('completedTeam');
      data.setTeamModeIsOn = true;
      console.log('this.team1--****',this.team1);
      data.setTeam1Civs = this.team1;
      console.log('data.allCivsForTeamSelection--',data.allCivsForTeamSelection);
      this.team2 = getTeam2(data.allCivsForTeamSelection, this.team1);
      data.setTeam2Civs = this.team2;
      console.log('this.team2--****',this.team2);

      this.isTeamComplete = true;

      //get team2
      function getTeam2(allCivs, team1Civs) {
        const allCivsModified = allCivs.map((elem) => { 
          return elem.slice(14) });
        let result = allCivsModified.filter( (elem) => {
          return !team1Civs.includes(elem);
        })
        return result;
      };
      this.team2 = getTeam2(data.allCivsForTeamSelection, this.team1);

      //start to show go button and then chart
        this.paragraph1.style.opacity = '0';
        setTimeout(() => {
          this.paragraph1.innerHTML = 'Click me to show stats';
          this.paragraph1.style.color = 'rgb(255, 251, 0)';
          this.paragraph1.style.opacity = '1';
          this.paragraph1.addEventListener('click',this.func1Callback
          )
        }, 400);
      
    }
     
    //return this.team1, this.team2;
    }
  }

  removeFromTeam(selectedCiv) {
    this.completedTeamCount -= 1;
    let index = this.team1.indexOf(selectedCiv);
    this.team1.splice(index, 1);
    return this.team1;
  }

//-----------------------------------------------------------------------------------------------
  addCivForComparing(selectedCiv, maxCivsNumber) {
    this.civsForComparing.push(selectedCiv);
    this.civsForComparingCount += 1;
    if (this.civsForComparingCount >= maxCivsNumber) {
      console.log('max civs number now');
      //start to show go button and then chart
    }
    //start to show go button

    if (this.civsForComparing.length === 1) {
      this.paragraph2.style.opacity = '0';
      setTimeout(() => {
        this.paragraph2.innerHTML = 'Click me to show stats';
        this.paragraph2.style.color = 'rgb(255, 251, 0)';
        this.paragraph2.style.opacity = '1';
        this.paragraph2.addEventListener('click', this.func2Callback
        )
      }, 400);
    }
    data.setAllCivs = this.civsForComparing;
    return this.civsForComparing;
  }

  removeFromCivsForComparing(selectedCiv) {
    if (this.civsForComparing.length === 1) {
      this.paragraph2.removeEventListener('click', this.func2Callback
      )
      this.paragraph2.style.opacity = '0';
      setTimeout(() => {
        this.paragraph2.innerHTML = 'To see stats of single civs, please, select them';
        this.paragraph2.style.color = '#ffffff';
        this.paragraph2.style.opacity = '1';
      }, 400);
    };

    this.civsForComparingCount -= 1;
    this.civsForComparing.pop(selectedCiv);
    return this.civsForComparing;
  }

//-----------------------------------------------------------------------------------------------
  selectCivForGovernor(selectedCiv, selectedHTMLelement) {
    if (this.civForGovernor !== '') {
      this.previousSelectedHTMLelement.classList.remove('selectedCiv');
    }
    this.civForGovernor = selectedCiv;
    this.previousSelectedHTMLelement = selectedHTMLelement;
    
    console.log('civ selected  this.civForGovernor--',this.civForGovernor);
    //start to show go button and then show governor use
  }

  removeCivForGovernor() {
    this.civForGovernor = '';
  }
}