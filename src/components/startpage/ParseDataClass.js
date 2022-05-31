import { data } from "../../state/data";
import { changeUrl } from "../../state/functions";

export class ParseDataClass {

  sequencesMark = []

  iterateArray(csvArray) {
    console.log('ParseDataClass');

    let status;
    for (let i = (csvArray.length - 2); i > 0; i -= 1) {




      if ( Number(csvArray[i][0]) < Number(csvArray[i - 1][0]) ) {

        console.log('other game/reload/remap case ParseDataClass');

        let edgeArrayElement = csvArray[i];
        console.log('edgeArrayElement--  ParseDataClass',i,edgeArrayElement);


        status = 'otherGame';
        console.log('its otherGame case  ParseDataClass', i, 'status-',status);
        this.sequencesMark.push(['otherGame', i]);
        //--------------------------------------------------------------------------
        for (let j = i; j > 0; j -= 1) {
          if ( (csvArray[i][1] === csvArray[j - 1][1]) & (csvArray[i][0] === csvArray[j - 1][0]) ) {
            console.log('its reload case  ParseDataClass', i, j - 1, 'status-',status);
            status = 'reload';
            this.sequencesMark.pop();
            this.sequencesMark.push(['reload', i, j - 1]);
            break;
          }
        };
          
      //--------------------------------------------------------------------------  
      } else { //single game or many reloads/remaps at the same turn
        status = 'singleGame';
        console.log('its 1 game in 1 file case  ParseDataClass', 'status-',status);
          
      };
    }
    console.log('this.sequencesMark--',this.sequencesMark);
    //here we cut off the unnesserary part of csvArray on the base of this.sequencesMark
    let result = this.cutOffArrayPart(csvArray);
    data.setCsvRowsToArray = [...result];
    console.log('data.csvRowsToArray---',data.csvRowsToArray );
    result = [];

    changeUrl('selectteamcivs');
  }

  cutOffArrayPart(csvArray) {
    const newCsvArray = [...csvArray];
    for (let i = 0; i < this.sequencesMark.length; i += 1) {
      if ( this.sequencesMark[i][0] === 'reload' ) {
        newCsvArray.splice( this.sequencesMark[i][2], Number(this.sequencesMark[i][1] - this.sequencesMark[i][2]));
        console.log('newCsvArray---', i, newCsvArray);
      } 
      if ( this.sequencesMark[i][0] === 'otherGame' ) {
        //just cut off upper part of the array return / go to chart rendering
        //same with remap
        newCsvArray.splice( 1, Number(this.sequencesMark[i][1] - 1));
        console.log('newCsvArray---', i, newCsvArray);
        return newCsvArray;
      } 
    }
    console.log('cutOffArrayPart(csvArray)newCsvArray--',newCsvArray);
    return newCsvArray;
  }
}
