export const data = {
  csvRowsToArray: null,
  allCivs: null,
  allCivsForTeamSelection: null,
  team1Civs: [],
  team2Civs: [],
  teamModeIsOn: false,
  isDiv1Selected: false,
  isDiv2Selected: false,
  allCivsArrays: [],
  allCityStates: [],

  set setCsvRowsToArray(value) {
    this.csvRowsToArray = value;
  },
  set setAllCivs(value) {
    this.allCivs = value;
  },
  set setAllCivsForTeamSelection(value) {
    this.allCivsForTeamSelection = value;
  },
  set setTeamModeIsOn(value) {
    this.teamModeIsOn = value;
  },
  set setTeam1Civs(value) {
    this.team1Civs = value;
  },
  set setTeam2Civs(value) {
    this.team2Civs = value;
  }
  ,set setIsDiv1Selected(value) {
    this.isDiv1Selected = value;
  }
  ,set setIsDiv2Selected(value) {
    this.isDiv2Selected = value;
  },
  set setAllCivsArrays(value) {
    this.allCivsArrays = value;
  },
  set setAllCityStates(value) {
    this.allCityStates = value;
  },
};

export const allCityStates = [' CIVILIZATION_ARMAGH', ' CIVILIZATION_BOLOGNA', ' CIVILIZATION_VATICAN_CITY', ' CIVILIZATION_RAPA_NUI', ' CIVILIZATION_PALENQUE', ' CIVILIZATION_TARUGA', ' CIVILIZATION_LISBON', ' CIVILIZATION_MUSCAT', ' CIVILIZATION_KANDY', ' CIVILIZATION_ZANZIBAR', ' CIVILIZATION_NGAZARGAMU', ' CIVILIZATION_AYUTTHAYA', ' CIVILIZATION_BRUSSELS', ' CIVILIZATION_LAHORE', ' CIVILIZATION_NAZCA', ' CIVILIZATION_AUCKLAND', ' CIVILIZATION_ANTIOCH', ' CIVILIZATION_PRESLAV', ' CIVILIZATION_SINGAPORE', ' CIVILIZATION_MOHENJO_DARO', ' CIVILIZATION_AKKAD', ' CIVILIZATION_GRANADA', ' CIVILIZATION_LA_VENTA', ' CIVILIZATION_FEZ', ' CIVILIZATION_SAMARKAND', ' CIVILIZATION_WOLIN', ' CIVILIZATION_NALANDA', ' CIVILIZATION_BABYLON', ' CIVILIZATION_JOHANNESBURG', ' CIVILIZATION_ANTANANARIVO', ' CIVILIZATION_CAHOKIA', ' CIVILIZATION_YEREVAN', ' CIVILIZATION_JERUSALEM', ' CIVILIZATION_CAGUANA', ' CIVILIZATION_NAN_MADOL', ' CIVILIZATION_BUENOS_AIRES', ' CIVILIZATION_JAKARTA', ' CIVILIZATION_MEXICO_CITY', ' CIVILIZATION_VALLETTA', ' CIVILIZATION_HATTUSA', ' CIVILIZATION_GENEVA', ' CIVILIZATION_KUMASI', ' CIVILIZATION_HONG_KONG', ' CIVILIZATION_CARDIFF', ' CIVILIZATION_CHINGUETTI', ' CIVILIZATION_VILNIUS', ' CIVILIZATION_KABUL', ' CIVILIZATION_HUNZA', ' CIVILIZATION_FREE_CITIES'];

export const goldCityStates = ['LISBON', 'MUSCAT', 'ZANZIBAR', 'ANTIOCH', 'SAMARKAND', 'CAHOKIA', 'JAKARTA', 'HUNZA'];

export const blueCityStates = ['BOLOGNA', 'PALENQUE', 'TARUGA', 'FEZ', 'NALANDA', 'HATTUSA', 'GENEVA'];

export const redCityStates = ['NGAZARGAMU', 'PRESLAV', 'AKKAD', 'GRANADA', 'WOLIN', 'VALLETTA', 'KABUL'];

export const whiteCityStates = ['ARMAGH', 'VATICAN_CITY', 'KANDY', 'NAZCA', 'LA_VENTA', ' YEREVAN', ' JERUSALEM', 'CHINGUETTI'];

export const orangeCityStates = ['BRUSSELS', 'AUCKLAND', 'SINGAPORE', 'JOHANNESBURG', 'BUENOS_AIRES', 'MEXICO_CITY', 'HONG_KONG', 'CARDIFF'];

export const pinkCityStates = [ 'RAPA_NUI', 'AYUTTHAYA', 'MOHENJO_DARO', 'ANTANANARIVO', 'CAGUANA', 'NAN_MADOL', 'KUMASI', 'VILNIUS'];

export const backgroundColorsForChart = ['#fcf80d', '#ff5500', '#5bed00','#05f7d7',
'#05aff7', '#0045c4', '#c300ff', '#ff0000', '#8f8c03', '#f5a37a', '#ffffff', '#008200'];


//PALENQUE - MITLA, SEOUL - ANSHAN, JAKARTA - BANDAR_BRUNEI