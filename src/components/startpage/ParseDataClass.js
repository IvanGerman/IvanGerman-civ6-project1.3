import { allCityStates, data } from "../../state/data";
import { changeUrl } from "../../state/functions";

export class ParseDataClass {

  sequencesMark = []

  // extractDataLevel1 extracts data of the last played game(cutting off all previous data from csvArray)
  extractDataLevel1(csvArray) { 

    let extractedData1;
    let extractedData2;

    for (let i = (csvArray.length - 2); i > 0; i -= 1) {
      if (csvArray[i][0] === '1') {
        if (csvArray[i - 1][0] !== '1') {
          extractedData1 = [...csvArray];
          extractedData1.splice(0, i);
          extractedData2 = this.extractDataLevel2(extractedData1);
          this.extractDataLevel3(extractedData2);
          break;
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
          let turn2CivIndexes = [];
          let turn2Civs = extractedData1.filter( (elem, index) => { 
            if (elem[0] === '2') {
              turn2CivIndexes.push(index);
            }
            return elem[0] === '2';
          });
          let extractedData2 = extractedData1.slice( (turn2CivIndexes[0] - turn2Civs.length), (extractedData1.length - 1) );
          return extractedData2
        }  
      };
    
      if ( extractedData1[i][0] === '2' ) {
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
        for ( let j = ( i - 1); j > 0; j -= 1) {
          if (Number(extractedData2[i][0]) === Number(extractedData2[j][0])) {
            firstIndex = ( j + 1 );
            this.sequencesMark.push( [ firstIndex, lastIndex] );
            break;
          }
        }
      }
    }

    //here we cut off the unnesserary part of csvArray on the base of this.sequencesMark
    let extractedData3 = [...extractedData2];
    for (let i = 0; i < this.sequencesMark.length; i += 1) {
      extractedData3.splice( this.sequencesMark[i][0], Number(this.sequencesMark[i][1] - this.sequencesMark[i][0]));
    };
    this.extractDataLevel4(extractedData3);
  }


  // extractDataLevel4 removes double data from extractedData3-array, when there are repeating stats under same turn number, for example turn 64 stats are shown in the csv-file 2 times)
  extractDataLevel4(extractedData3) {

    let mainArray = [];
    let subArray = [];
    for ( let i = 0; i < ( Number(extractedData3[extractedData3.length - 1][0]) ); i += 1) {
      subArray = extractedData3.filter( (elem) => { 
          return Number(elem[0]) === Number(i + 1);
        }
      );
      mainArray.push([...subArray]);
      subArray.length = 0;
    };

    for ( let i = 0; i < mainArray.length; i += 1) {
      let freeCitiesOccurCount = 0;
      for (let j = 0; j < mainArray[i].length; j += 1) {
        if ( mainArray[i][j][1] === ' CIVILIZATION_FREE_CITIES' ) {
          freeCitiesOccurCount += 1;
        }
      };
      if (freeCitiesOccurCount > 1) { 
        mainArray[i] = mainArray[i].slice(0, ( mainArray[i].length / freeCitiesOccurCount ))
      }
    }
    
    mainArray = Array.prototype.concat.apply([], mainArray);
    this.extractDataLevel5(mainArray);
  }


  // extractDataLevel5 checks extractedData4 for killed civs and adds to extractedData4 stats of those killed civs with the values of 0 for every parameter
  extractDataLevel5(extractedData4) {
  
    let mainArray = this.convertToTurnsArray(extractedData4);

    //remove city states
    mainArray = Array.prototype.concat.apply([], mainArray);

    let allCivs = mainArray.filter((elem) => {
      return !(allCityStates.includes(elem[1]));
    });
  
    //convert into "array of turns"
    let allCivsByTurns = this.convertToTurnsArray(allCivs);

    //check which civs (if any) were killed during the game
    let killedCivs = [];
    let civsFromFirstTurn = allCivsByTurns[0];
    let civsFromLastTurn = allCivsByTurns[allCivsByTurns.length - 1];

    for ( let i = 0; i < civsFromFirstTurn.length; i += 1 ) { 
      let currentCiv = civsFromFirstTurn[i][1];
      let wasCivKilled = true;
      for ( let j = 0; j < (civsFromLastTurn.length); j += 1 ) {
        if (civsFromLastTurn[j].includes(currentCiv)) {
          wasCivKilled = false;     
        }
      };
      if (wasCivKilled === true) {
        killedCivs.push(currentCiv);
      }
    };

    //find out turn by which civs were killed
    if (killedCivs.length !== 0) {
      for ( let n = 0; n < killedCivs.length; n += 1) {
        for ( let i = 0; i < allCivsByTurns.length; i += 1 ) {
          let isCivDead = true;
          for ( let j = 0; j < allCivsByTurns[i].length; j += 1) {
            if (allCivsByTurns[i][j].includes(killedCivs[n])) {
              isCivDead = false;
              break;
            };
          }
          if ( isCivDead === true ) {
            // here we paste killed civ 0 value data to every array beginning with array with index i
            this.pasteZeroData(killedCivs[n], i, allCivsByTurns);
            break;
          }
        };
      };
    }
    // get all civs
    let allCivsFromArray = [];
    for ( let i = 0; i < allCivsByTurns[0].length; i += 1) {
      allCivsFromArray.push(allCivsByTurns[0][i][1]);
    } ;
    data.setAllCivsArrays = allCivsFromArray;

    allCivsByTurns = Array.prototype.concat.apply([], allCivsByTurns);
    // put the final result of csv file parsing into data object from main state
    data.setCsvRowsToArray = [...allCivsByTurns];
    console.log('final allCivsByTurns',allCivsByTurns);
    changeUrl('selectteamcivs');
    return;
  }


  //convertToTurnsArray converts the "normal" to array ordered by turn numbers
  convertToTurnsArray(startArray) {
    let endArray = [];
    let subArray = [];
    for ( let i = 0; i < ( Number(startArray[startArray.length - 1][0]) ); i += 1) {
      subArray = startArray.filter( (elem) => { 
          return Number(elem[0]) === Number(i + 1);
        }
      );
      endArray.push([...subArray]);
      subArray.length = 0;
    };
    return endArray;
  }

  pasteZeroData(civ, index, array) {
    
    for ( let i = index; i < array.length; i += 1 ) {
      let dataArray = [String(i + 1), civ, ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0', ' 0'];
      array[i].push(dataArray);
    };   
  }
}
