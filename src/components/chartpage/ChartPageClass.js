import { data } from "../../state/data";
import { changeUrl } from "../../state/functions";

export class ChartPageClass {

  xLabels = [];
  yLabels = [];

  constructor(allCivs = data.allCivs) {
    this.allCivs = allCivs;
    console.log('allCivs--',this.allCivs);
    this.getDataForOneCiv(` CIVILIZATION_${this.allCivs[0]}`);
  }   

  getDataForOneCiv(civ) {
    let specCivArr = data.csvRowsToArray.filter((elem) => {
      return elem.includes(civ)
    });
    console.log('specCivArr-',specCivArr);
  }

  method1() {
    return;
  }
}
