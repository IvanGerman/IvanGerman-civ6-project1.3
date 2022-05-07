import { allCityStates, data } from '../../state/data';
import { changeUrl } from '../../state/functions';
import './StartPage.scss';

const StartPage = {
  render: async () => {
    const view = `
      <div class="start-page-div">
        <p class="select-file-descr">Select "Player_Stats.csv" file from your</p>
        <p class="select-file-descr red-span">"Computer/Documents/My Games/Sid Meier's Civilization VI/Logs"</p>
        <p class="select-file-descr">folder</p>
        <input type="file" id="myfile" name="myfile" accept=".csv" placeholder="Player_Stats.csv">
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
        for (let i = 1; i < csvRowsToArray.length - 2; i += 1) {
          console.log(csvRowsToArray[i][0]);
          
          if ( Number(csvRowsToArray[i][0]) > Number(csvRowsToArray[i + 1][0]) ) {
            
            result = [...csvRowsToArray].slice(i + 1);
            result.unshift(csvRowsToArray[0]);
            data.setCsvRowsToArray = [...result];
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
