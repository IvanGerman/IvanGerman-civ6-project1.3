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
    `;
    return view;
  },
  
  after_render: () => {
    const inputElement = document.getElementById('myfile');
    inputElement.addEventListener('change', handleFiles, false);
    const parseDataClassObj = new ParseDataClass();

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
  
        console.log('csvRowsToArray--',csvRowsToArray);
        //checking if there are 2 games stats in this file from end to begin
        console.log('(csvRowsToArray.length - 2)',(csvRowsToArray.length - 2),typeof((csvRowsToArray.length - 2)));

        //--------------ParseDataClass use
        parseDataClassObj.iterateArray(csvRowsToArray);

       };
      }
      getDataFromFile();
      
    }  
  },
};

export default StartPage;
