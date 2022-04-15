import ChartPage from "../../pages/chartpage/ChartPage";
import { data } from "../../state/data";
import { changeUrl } from "../../state/functions";

export class SelectionLogic {

  completedTeamCount = 0;
  civsForComparingCount = 0;

  constructor(team1 = [], team2 = [], civsForComparing = [], civForGovernor = '') {
    this.team1 = team1;
    this.team2 = team2;
    this.civsForComparing = civsForComparing;
    this.civForGovernor = civForGovernor;
    this.previousSelectedHTMLelement = '';
    this.paragraph = document.querySelector('.paragraph2');
    this.func2Callback = function func2 (event)  {
      console.log('now show chart page');
      changeUrl('chartpage');
    };
  }

  addToTeam(selectedCiv, maxTeamMembers) {
    this.team1.push(selectedCiv);
    this.completedTeamCount += 1;
    if (this.completedTeamCount >= maxTeamMembers) {
      console.log('completedTeam');
      //start to show go button and then chart
      //need all civs to get team2
    
    }
    return this.team1;
  }

  removeFromTeam(selectedCiv) {
    this.completedTeamCount -= 1;
    this.team1.pop(selectedCiv);
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
      this.paragraph.style.opacity = '0';
      setTimeout(() => {
        this.paragraph.innerHTML = 'Click me to show stats';
        this.paragraph.style.color = 'gold';
        this.paragraph.style.opacity = '1';
        this.paragraph.addEventListener('click', this.func2Callback
        )
      }, 400);
    }
    data.setAllCivs = this.civsForComparing;
    return this.civsForComparing;
  }

  removeFromCivsForComparing(selectedCiv) {
    if (this.civsForComparing.length === 1) {
      this.paragraph.removeEventListener('click', this.func2Callback
      )
      this.paragraph.style.opacity = '0';
      setTimeout(() => {
        this.paragraph.innerHTML = 'To see stats of some civs, please, select them';
        this.paragraph.style.color = '#ffffff';
        this.paragraph.style.opacity = '1';
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