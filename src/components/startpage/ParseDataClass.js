import { data } from "../../state/data";
import { changeUrl } from "../../state/functions";

export class ParseDataClass {

  sequencesMark = []

  iterateArray(csvArray) {

    let status;
    for (let i = (csvArray.length - 2); i > 0; i -= 1) {

      if ( Number(csvArray[i][0]) < Number(csvArray[i - 1][0]) ) {

        let edgeArrayElement = csvArray[i];
        status = 'otherGame';
  
        this.sequencesMark.push(['otherGame', i]);
        //--------------------------------------------------------------------------
        for (let j = i; j > 0; j -= 1) {
          if ( (csvArray[i][1] === csvArray[j - 1][1]) & (csvArray[i][0] === csvArray[j - 1][0]) ) {
            status = 'reload';
            this.sequencesMark.pop();
            this.sequencesMark.push(['reload', i, j - 1]);
            break;
          }
        };
          
      //--------------------------------------------------------------------------  
      } else { //single game or many reloads/remaps at the same turn
        status = 'singleGame';        
      };
    }
    //here we cut off the unnesserary part of csvArray on the base of this.sequencesMark
    let result = this.cutOffArrayPart(csvArray);
    data.setCsvRowsToArray = [...result];
    result = [];

    changeUrl('selectteamcivs');
  }

  cutOffArrayPart(csvArray) {
    const newCsvArray = [...csvArray];
    for (let i = 0; i < this.sequencesMark.length; i += 1) {
      if ( this.sequencesMark[i][0] === 'reload' ) {
        newCsvArray.splice( this.sequencesMark[i][2], Number(this.sequencesMark[i][1] - this.sequencesMark[i][2]));
      } 
      if ( this.sequencesMark[i][0] === 'otherGame' ) {
        //just cut off upper part of the array return / go to chart rendering
        //same with remap
        newCsvArray.splice( 1, Number(this.sequencesMark[i][1] - 1));
        return newCsvArray;
      } 
    }
    return newCsvArray;
  }
}
