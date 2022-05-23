import { allCityStates, data } from '../../state/data';
import { changeUrl } from '../../state/functions';
import './StartPage.scss';

const StartPage = {
  render: async () => {
    const view = `
      <div class="start-page-div">
        <p class="select-file-descr">Select "Player_Stats.csv" file from your</p>
        <p class="select-file-descr red-span">"Computer/Documents/My Games/Sid Meier's Civilization VI/Logs"</p>
        <p class="select-file-descr">folder  *</p>
        <input type="file" id="myfile" name="myfile" accept=".csv" placeholder="Player_Stats.csv">
      </div>
      <div class="enable-log">
        <p class="enable-log-p">* If you dont see the file "Player_Stats.csv" in your Logs directory, go to   the file "AppOptions.txt" following the path Computer/Documents/My Games/Sid Meier's Civilization VI/AppOptions.txt , open "AppOptions.txt" (with WordPad, for example), scroll down, until you see the option "Log all game core events." , now change "EnableGameCoreEventLog 0" to   EnableGameCoreEventLog 1"<p>
      </div>
    `;
    return view;
  },
  
  after_render: () => {
    const inputElement = document.getElementById('myfile');
    inputElement.addEventListener('change', handleFiles, false);

    function handleFiles() {
      const fileList = this.files; /* now you can work with the file list */
      console.log(fileList);
      console.log('fileList[0]--',fileList[0]);

      //  LATER TO UNCOMMENT
      //here we prove the correct file name
      // if (fileList[0].name !== 'Player_Stats.csv') {
      //   alert('wrong file');
      //   return;
      // }

      //asynchronous action
      async function getDataFromFile () {
        let reader = new FileReader();
        await reader.readAsText(fileList[0]);
        reader.onload = async () => {
        const rows = await reader.result.split('\n');
        const csvRowsToArray = [];
        rows.forEach((elem) => {
          csvRowsToArray.push(elem.split(','));
        });
        let result;

        //checking if there are 2 games stats in this file
        console.log('csvRowsToArray--',csvRowsToArray);
        
        
        //checking if there are 2 games stats in this file from end to begin
        console.log('(csvRowsToArray.length - 2)',(csvRowsToArray.length - 2),typeof((csvRowsToArray.length - 2)));

        for (let i = (csvRowsToArray.length - 2); i > 0; i -= 1) {
          console.log('csvRowsToArray[i][0]--',csvRowsToArray[i][0]);
          
          if ( Number(csvRowsToArray[i][0]) < Number(csvRowsToArray[i - 1][0]) ) {
    
            let edgeArrayElement = csvRowsToArray[i];
            console.log('edgeArrayElement--',edgeArrayElement);

            //find sameTurnSequenceLength----------------------------------------------
            let sameTurnSequenceLength = 1;
            for (let j = i; j < csvRowsToArray.length - 2; j += 1) {
              if ( Number(csvRowsToArray[j][0]) !== Number(csvRowsToArray[j + 1][0]) ) {
                break;
              };
              if ( Number(csvRowsToArray[j][0]) === Number(csvRowsToArray[j + 1][0]) ) {
                sameTurnSequenceLength += 1;
              };
            };
            console.log('sameTurnSequenceLength--',sameTurnSequenceLength);
            //--------------------------------------------------------------------------

            //compare edgeArrayElement with element with index -sameTurnSequenceLength
            if ( csvRowsToArray[i][1] === csvRowsToArray[i - sameTurnSequenceLength][1]) {
              console.log('its reload or remap case');

              //find out which part of csvRowsToArray to delete--------------------------
              for (let j = i - 1; j > 0; j -= 1) {
                console.log(csvRowsToArray[j][0]);
                console.log(csvRowsToArray[j][1]);
                console.log('--------',j);
                if (csvRowsToArray[j][0] === csvRowsToArray[i][0] & csvRowsToArray[j][1] === csvRowsToArray[i][1]) {
                  console.log('first above element to cut index---', j, csvRowsToArray[j]);

                  //here we delete obsolete stats from csvRowsToArray--------------------
                  result = [...csvRowsToArray];
                  console.log('result555--',result);
                  result.splice(j, i - j);
                  console.log('result after cut---',result);
                  //---------------------------------------------------------------------

                  //here we need to repeat the whole process using recursion, for the case
                  //there were many reloads/remaps and there is still a stat from another
                  //game in the file above

                  break;
                }
              }

              //-------------------------------------------------------------------------
            } else {
              console.log('its many games in 1 file case');
              console.log('inside if--',Number(csvRowsToArray[i][0]),'i--',i);
              result = [...csvRowsToArray].slice(i);//otrezaem poslednie massivi
              //how to handle case when there was a remap on turn 1?
              //how to handle case when there was a reload 47t crash / reload 46t and played on?
              result.unshift(csvRowsToArray[0]);// dobavlaem pervij massiv s imenami kolonok
              data.setCsvRowsToArray = [...result];
              console.log('data.csvRowsToArray---',data.csvRowsToArray );
              result = [];

              changeUrl('selectteamcivs');
              return;
            };
          }
        }

        result = [...csvRowsToArray];
        data.setCsvRowsToArray = [...result];
        result = [];

        changeUrl('selectteamcivs');
        };
      }
      getDataFromFile();
      
    }  
  },
};

export default StartPage;
