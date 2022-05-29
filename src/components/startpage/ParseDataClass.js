export class ParseDataClass {

  iterateArray(csvArray) {
    console.log('ParseDataClass');

    for (let i = (csvArray.length - 2); i > 0; i -= 1) {




      if ( Number(csvArray[i][0]) < Number(csvArray[i - 1][0]) ) {

        console.log('other game/reload/remap case ParseDataClass');

        let edgeArrayElement = csvArray[i];
        console.log('edgeArrayElement--  ParseDataClass',i,edgeArrayElement);


        //--------------------------------------------------------------------------
        for (let j = i; j > 0; j -= 1) {
          if ( (csvArray[i][1] === csvArray[j - 1][1]) & (csvArray[i][0] === csvArray[j - 1][0]) ) {
            console.log('its reload case  ParseDataClass', i, j - 1);
            break;
          }
        };




        
      //--------------------------------------------------------------------------  
      } else {
        console.log('its 1 game in 1 file case  ParseDataClass');
          
      };
    }
  }
}

