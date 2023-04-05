import { ParseDataClass } from '../../components/startpage/ParseDataClass';
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
      <div class="dev-name">
        2022
        <a class="github-link" href="https://github.com/IvanGerman" target="_blank">Ivan German</a>
      </div>
    `;
    return view;
  },
  
  after_render: () => {
    const selectCivLink = document.querySelector('.sel-civ-li');
    selectCivLink.style.display = 'none';
    const pieChartsLink = document.querySelector('.pie-charts-li');
    pieChartsLink.style.display = 'none';
    
    const inputElement = document.getElementById('myfile');
    inputElement.addEventListener('change', handleFiles, false);
    const parseDataClassObj = new ParseDataClass();

    function handleFiles() {
      const fileList = this.files; /* now you can work with the file list */
      
      //here we prove the correct file name
      if (fileList[0].name !== 'Player_Stats.csv') {
        alert('wrong file, should be "Player_Stats.csv"');
        //return;
      }

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
          console.log('csvRowsToArray--',csvRowsToArray);
          parseDataClassObj.extractDataLevel1(csvRowsToArray);
        };
      }
      getDataFromFile();
      
    }  
  },
};

export default StartPage;


{/* <p class="select-file-descr red-span">"C:\Users\*UserName*\AppData\Local\Firaxis Games\Sid Meier's Civilization VI"</p> */}