import { allCityStates, data } from "../../state/data";
import { changeUrl } from "../../state/functions";
import { SelectionLogic } from "./SelectionLogic";

class SelectTeamCivs {
  constructor() {
    console.log('SelectTeamCivs');
    console.log('data.csvRowsToArray-',data.csvRowsToArray);
    this.allCivs = this.getAllCivs(data.csvRowsToArray);
    //this.allCivs = ['HUNGARY', 'MACEDON', 'MONGOLIA', 'JAPAN', 'HUNGARY1', 'MACEDON1', 'MONGOLIA1', 'JAPAN1', 'HUNGARY2', 'MACEDON2', 'MONGOLIA2', 'JAPAN2'];
    data.setAllCivsForTeamSelection = this.allCivs;
    console.log('data.allCivsForTeamSelection----',data.allCivsForTeamSelection);
    this._selectionLogicObj = new SelectionLogic();
    this.render();
  }

  async render() {
    const civsButtonsBlock = this.createCivsButtons();
    const allCivsWrappers = document.querySelectorAll('.civs-wrapper');
    for (let i = 0; i < 3; i += 1) {
      const innerDiv = document.createElement('div');
      innerDiv.classList.add(`innerDiv${i + 1}`);
      innerDiv.innerHTML = civsButtonsBlock;
      allCivsWrappers[i].append(innerDiv);
      let element = document.querySelector(`.innerDiv${i + 1}`);
      this.addEventList(element);
    }
  }

  getAllCivs(csvRowsToArray) {
    //have to prove csv file for case of doubled civs because of remap
    const allCivsWithDoubledRaw = csvRowsToArray.filter((elem) => {
      return elem[0] === '1';
    });
    const allCivsWithDoubled = [];
    allCivsWithDoubledRaw.forEach((elem) => {
      allCivsWithDoubled.push(elem[1]);
    });
    const allCivs = allCivsWithDoubled.filter((elem) => {
      return !(allCityStates.includes(elem));
    })
    console.log('this._selectionLogicObj--',this._selectionLogicObj);//undefined
    //this._selectionLogicObj.civsFromBothTeams = [...allCivs];
    console.log('allCivs-',allCivs);
    return allCivs;
  }


  createCivsButtons() {
    let civsButtonsBlock = this.allCivs.map(function callback(civ) {
			
      return	`<div class="single-civ">${civ.substring(14)}</div>`
      }).join('');
    return civsButtonsBlock;
  }

  addEventList(element) {
    element.addEventListener('click', (event) => {
      if (event.target.classList[0] != 'single-civ') {
        return;
      };

      switch(event.target.parentElement.className) {
        case 'innerDiv1':
          console.log('innerDiv1');
          console.log('data.teamModeIsOn----------',data.teamModeIsOn);

          if ( data.isDiv2Selected === true ) {
            data.setIsDiv2Selected = false;
            data.setIsDiv1Selected = false;
            changeUrl('selectteamcivs__');
            changeUrl('selectteamcivs');
          }
          data.setIsDiv1Selected = true;

          if (event.target.classList[1] === 'selectedCiv') {
            event.target.classList.remove('selectedCiv');
            this._selectionLogicObj.removeFromTeam(event.target.innerHTML);
            if (this._selectionLogicObj.isTeamComplete === true) {
              this._selectionLogicObj.isTeamComplete = false;
              this._selectionLogicObj.paragraph1.removeEventListener('click', this._selectionLogicObj.func1Callback);
              this._selectionLogicObj.paragraph1.style.opacity = '0';
              setTimeout(() => {
                this._selectionLogicObj.paragraph1.innerHTML = 'Select civs of team1 or team2 to see team stats';
                this._selectionLogicObj.paragraph1.style.color = '#ffffff';
                this._selectionLogicObj.paragraph1.style.opacity = '1';
              }, 400);
            }
            return;
          };

          console.log('this._selectionLogicObj.isTeamComplete--',this._selectionLogicObj.isTeamComplete);
          if (this._selectionLogicObj.isTeamComplete === false) {
            event.target.classList.add('selectedCiv');

            this._selectionLogicObj.addToTeam(event.target.innerHTML, this.allCivs.length / 2);
            console.log('this._selectionLogicObj.team1--',this._selectionLogicObj.team1);
            console.log('this._selectionLogicObj.team2--',this._selectionLogicObj.team2);
          }

          break;

        case 'innerDiv2':
          console.log('innerDiv2');
          console.log('data.teamModeIsOn----------',data.teamModeIsOn);
          data.setTeamModeIsOn = false;

          if ( data.isDiv1Selected === true ) {
            data.setIsDiv1Selected = false;
            data.setIsDiv2Selected = false;
            changeUrl('selectteamcivs__');
            changeUrl('selectteamcivs');
          }
          data.setIsDiv2Selected = true;


          if (event.target.classList[1] === 'selectedCiv') {
            event.target.classList.remove('selectedCiv');
            this._selectionLogicObj.removeFromCivsForComparing(event.target.innerHTML);
            return;
          };
          event.target.classList.add('selectedCiv');

          this._selectionLogicObj.addCivForComparing(` CIVILIZATION_${event.target.innerHTML}`, this.allCivs.length);
          console.log('this._selectionLogicObj.civsForComparing--',this._selectionLogicObj.civsForComparing);

          break;

        case 'innerDiv3':
          console.log('innerDiv3');

          if (event.target.classList[1] === 'selectedCiv') {
            event.target.classList.remove('selectedCiv');
            this._selectionLogicObj.removeCivForGovernor();
            return;
          };

          event.target.classList.add('selectedCiv');
          this._selectionLogicObj.selectCivForGovernor(event.target.innerHTML, event.target);
          console.log('this._selectionLogicObj.civForGovernor--',this._selectionLogicObj.civForGovernor);break;

        default:
          return;
      }
      console.log('event.target', event.target);
      console.log(event.target.parentElement);
    })
  }

  createCivsArray(addCivFuncBody, removeCivFuncBody) {
    if (event.target.classList[1] === 'selectedCiv') {
      event.target.classList.remove('selectedCiv');
      this._selectionLogicObj.removeFromTeam(event.target.innerHTML);
      return;
    };
    event.target.classList.add('selectedCiv');

    this._selectionLogicObj.addToTeam(event.target.innerHTML, this.allCivs.length / 2);
  }
}

export default SelectTeamCivs;

//gaul,basil

