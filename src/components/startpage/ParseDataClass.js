import { data } from "../../state/data";
import { changeUrl } from "../../state/functions";

export class ParseDataClass {

  sequencesMark = []

  iterateArray(csvArray) {

    let allCivsTurn1 = [];
    let allCivsTurn2Count = 0;
    let freeCitiesOccurCount = 0;
    let isMore1turnGames = false;

    for (let i = (csvArray.length - 2); i > 0; i -= 1) {

      //here we handle the case where "1 turn played, then new game with other civs", stats from game1 are to delete
      if ( Number(csvArray[i][0]) === 1) {
        allCivsTurn1.push(csvArray[i][1]);
        allCivsTurn1.push(i);
        if ( csvArray[i][1] === ' CIVILIZATION_FREE_CITIES' ) {
          freeCitiesOccurCount += 1;
          if ( freeCitiesOccurCount === 2 ) {
            freeCitiesOccurCount = 0;
            //find where to separate last game from previous one, get turn 2 array piece or length of this piece
            // if not .....
            isMore1turnGames = true;
          }
        }
      };


      if ( isMore1turnGames === true  ) {
        isMore1turnGames = false;

        if ( csvArray.length > Number(allCivsTurn1[1]) + 1 ) {
          for ( let i = Number(allCivsTurn1[1]) + 1; Number(csvArray[i][0]) === 2; i += 1 ) {
            allCivsTurn2Count += 1;
          };
          allCivsTurn2Count = 0;

          this.sequencesMark.push(['otherGame', i]);
          let result = this.cutOffArrayPart(csvArray);
          data.setCsvRowsToArray = [...result];
          result = [];

          changeUrl('selectteamcivs');
        }
      }

      if ( Number(csvArray[i][0]) < Number(csvArray[i - 1][0]) ) { //or turnnumbers are equal, but civs are different or the whole length of '1turn' is too long
  
        this.sequencesMark.push(['otherGame', i]);
        //--------------------------------------------------------------------------
        for (let j = i; j > 0; j -= 1) {
          if ( (csvArray[i][1] === csvArray[j - 1][1]) & (csvArray[i][0] === csvArray[j - 1][0]) & (csvArray[i + 1][1] === csvArray[j][1]) & (csvArray[i + 1][0] === csvArray[j][0]) ) {
            this.sequencesMark.pop();
            this.sequencesMark.push(['reload', i, j - 1]);
            break;
          }
        };
          
      //--------------------------------------------------------------------------  
      } else { //single game or many reloads/remaps at the same turn
        
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
