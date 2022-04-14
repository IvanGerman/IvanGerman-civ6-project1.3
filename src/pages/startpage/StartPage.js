import { allCityStates, data } from '../../state/data';
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
      console.log(fileList[0]);

      //here we prove the correct file name
      if (fileList[0].name !== 'Player_Stats.csv') {
        alert('wrong file');
        return;
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
        data.setCsvRowsToArray = csvRowsToArray;

        let url_ob = new URL(document.URL);
        url_ob.hash = 'selectteamcivs';
        // new url
        let new_url = url_ob.href;
        // change the current url
        document.location.href = new_url;
        };
      }
      getDataFromFile();
    }  
  },
};

export default StartPage;
