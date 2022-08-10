import { data } from "../../state/data";
import { changeUrl } from "../../state/functions";

export class ParseDataClass {

  sequencesMark = []
  sequencesMark2 = []

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
    }     console.log('allCivsTurn1--',allCivsTurn1);


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

  // extractDataLevel1 extracts data of the last played game(cutting off all previous data from csvArray)
  extractDataLevel1(csvArray) { 

    let extractedData1;
    let extractedData2;

    for (let i = (csvArray.length - 2); i > 0; i -= 1) {
      if (csvArray[i][0] === '1') {
        //console.log('csvArray[i]',csvArray[i]);
        if (csvArray[i - 1][0] !== '1') {
          console.log('csvArray[i - 1]',csvArray[i - 1], 'index from where to cut(including) is: ',i);
          extractedData1 = [...csvArray];
          extractedData1.splice(0, i);
          extractedData2 = this.extractDataLevel2(extractedData1);
          console.log('extractedData2--',extractedData2);
          return extractedData2;
        }
      }
    }
  }

  // extractDataLevel2 checks extractedData1 of possibility having 2 different games at turn 1 (first game was scraped at turn 1, second game was started after that, so we have to delete data of the first game to avoid getting civs from both games)
  extractDataLevel2(extractedData1) {
    let freeCitiesOccurCount = 0;
    for (let i = 0; i < extractedData1.length; i += 1) {

      if ( extractedData1[i][0] === '1' && extractedData1[i][1] === ' CIVILIZATION_FREE_CITIES' ) {
        freeCitiesOccurCount += 1;
        if ( freeCitiesOccurCount > 1 ) {
          console.log('2 civs turn 1');
          let turn2CivIndexes = [];
          let turn2Civs = extractedData1.filter( (elem, index) => { 
            if (elem[0] === '2') {
              turn2CivIndexes.push(index);
            }
            return elem[0] === '2';
          });
          console.log('turn2Civs--',turn2Civs);
          console.log('turn2CivIndex--',turn2CivIndexes[0]);
          let extractedData2 = extractedData1.slice( (turn2CivIndexes[0] - turn2Civs.length), (extractedData1.length - 1) );
          //console.log('extractedData2---',extractedData2);
          return extractedData2
        }  
      };
    
      if ( extractedData1[i][0] === '2' ) {
        console.log('all good, just 1 civ turn 1');
        extractedData1.pop();
        return extractedData1;
      };

    }
  }

  // extractDataLevel3 remove data from extractedData2-array, which are there because of previously turns reloads, for example played till turn 65, then reload turn 64 and played on)
  extractDataLevel3(extractedData2) { 
    
    for (let i = (extractedData2.length - 1); i > 0; i -= 1) {
      if (Number(extractedData2[i][0]) < Number(extractedData2[i - 1][0])) {
        let lastIndex = i;
        let firstIndex = 0;
        console.log('reload case, index till where to cut(not including)--', i );
        for ( let j = ( i - 1); j > 0; j -= 1) {
          if (Number(extractedData2[i][0]) === Number(extractedData2[j][0])) {
            console.log('reload case, index from where to cut(including)--', j + 1,);
            firstIndex = ( j + 1 );
            this.sequencesMark2.push( [ firstIndex, lastIndex] );
            break;
          }
        }
      }
    }

    console.log('this.sequencesMark2---',this.sequencesMark2);
    //here we cut off the unnesserary part of csvArray on the base of this.sequencesMark2
    const extractedData3 = [...extractedData2];
    for (let i = 0; i < this.sequencesMark2.length; i += 1) {
      extractedData3.splice( this.sequencesMark2[i][0], Number(this.sequencesMark2[i][1] - this.sequencesMark2[i][0]));
    }
    console.log('extractedData3---',extractedData3);
    return extractedData3;
  }


  // extractDataLevel4 removes double data from extractedData3-array, when there are repeating stats under same turn number, for example turn 64 stats are shown in the csv-file 2 times)
  extractDataLevel4(extractedData3) {
    let freeCitiesOccurCount = 0;
    let previousTurn = 1;
    for (let i = 0; i < extractedData3.length; i += 1) {
      //let currentTurn = extractedData3[i][0];
      if ( extractedData3[i][1] === ' CIVILIZATION_FREE_CITIES' ) {
        freeCitiesOccurCount += 1;
        if ( freeCitiesOccurCount > 1 && extractedData3[i][0] === previousTurn) {
          console.log('repeated data', 'turn number--', extractedData3[i][0]);
          
        };
          
      };
    }
  }

}

