//import { CheatingTemplePageClass } from '../../components/cheatingTemplePage/CheatingTemplePageClass';
import { blueCityStates, data, goldCityStates, orangeCityStates, pinkCityStates, redCityStates, whiteCityStates } from '../../state/data';
import './CheatingTemplePage.scss';

const CheatingTemplePage = {
  render: async () => {
    const view = `
    <div class="cheatingTempleWrapper">
      <div class="csWrapper">
        <div class="goldcs citystates"></div>
        <div class="bluecs citystates"></div>
        <div class="pinkcs citystates"></div>
        <div class="redcs citystates"></div>
        <div class="whitecs citystates"></div>
        <div class="orangecs citystates"></div>
      </div>
      <img src="./../../assets/img/cheatingtemple-bg2.jpg" alt="" />
    <div>
    `;
    return view;
  },
  after_render: async () => {
    console.log('CheatingTemplePageClass rendered', data.allCityStates);
    //new CheatingTemplePageClass();  
    const allGoldCS = data.allCityStates.filter((elem) => {
      return (goldCityStates.includes(elem));
    });
    const goldcsWrapper = document.querySelector('.goldcs');
    goldcsWrapper.innerHTML = [...allGoldCS];
    console.log('allGoldCS--',allGoldCS);
    const allBlueCS = data.allCityStates.filter((elem) => {
      return (blueCityStates.includes(elem));
    });
    console.log('allBlueCS--',allBlueCS);
    const allRedCS = data.allCityStates.filter((elem) => {
      return (redCityStates.includes(elem));
    });
    console.log('allRedCS--',allRedCS);
    const allWhiteCS = data.allCityStates.filter((elem) => {
      return (whiteCityStates.includes(elem));
    });
    console.log('allWhiteCS--',allWhiteCS);
    const allOrangeCS = data.allCityStates.filter((elem) => {
      return (orangeCityStates.includes(elem));
    });
    const orangecsWrapper = document.querySelector('.orangecs');
    orangecsWrapper.innerHTML = [...allOrangeCS];
    console.log('allOrangeCS--',allOrangeCS);
    const allPinkCS = data.allCityStates.filter((elem) => {
      return (pinkCityStates.includes(elem));
    });
    console.log('allPinkCS--',allPinkCS);
  },
};

export default CheatingTemplePage;
