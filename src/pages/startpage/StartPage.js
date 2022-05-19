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
        // for (let i = 1; i < csvRowsToArray.length - 2; i += 1) {
        //   console.log('csvRowsToArray[i][0]--',csvRowsToArray[i][0]);
          
        //   if ( Number(csvRowsToArray[i][0]) > Number(csvRowsToArray[i + 1][0]) ) {
            
        //     result = [...csvRowsToArray].slice(i + 1);//otrezaem pervie massivi
        //     result.unshift(csvRowsToArray[0]);// dobavlaem pervij massiv s imenami kolonok
        //     data.setCsvRowsToArray = [...result];
        //     console.log('data.csvRowsToArray---',data.csvRowsToArray );
        //     result = [];

        //     changeUrl('selectteamcivs');
        //     return;
        //   }
        // }
        
        //checking if there are 2 games stats in this file from end to begin
        console.log('(csvRowsToArray.length - 2)',(csvRowsToArray.length - 2),typeof((csvRowsToArray.length - 2)));

        for (let i = (csvRowsToArray.length - 2); i > 0; i -= 1) {
          console.log('csvRowsToArray[i][0]--',csvRowsToArray[i][0]);
          
          if ( Number(csvRowsToArray[i][0]) < Number(csvRowsToArray[i - 1][0]) ) {
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
