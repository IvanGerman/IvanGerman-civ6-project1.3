import { allCityStates, data } from "../../state/data";
import { changeUrl } from "../../state/functions";
import { SelectionLogic } from "./SelectionLogic";

class SelectTeamCivs {
  constructor() {
    this.allCivs = this.getAllCivs(data.csvRowsToArray);
    data.setAllCivsForTeamSelection = this.allCivs;
    this._selectionLogicObj = new SelectionLogic();
    const selectCivLink = document.querySelector('.sel-civ-li');
    selectCivLink.style.display = 'none';
    data.setIsDiv1Selected = false;
    data.setIsDiv2Selected = false;
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

          if (this._selectionLogicObj.isTeamComplete === false) {
            event.target.classList.add('selectedCiv');

            this._selectionLogicObj.addToTeam(event.target.innerHTML, this.allCivs.length / 2);
          }

          break;

        case 'innerDiv2':
          
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

          break;

        case 'innerDiv3':

          if (event.target.classList[1] === 'selectedCiv') {
            event.target.classList.remove('selectedCiv');
            this._selectionLogicObj.removeCivForGovernor();
            return;
          };

          event.target.classList.add('selectedCiv');
          this._selectionLogicObj.selectCivForGovernor(event.target.innerHTML, event.target);
          break;

        default:
          return;
      }
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
