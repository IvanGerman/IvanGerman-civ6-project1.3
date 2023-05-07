//import { CheatingTemplePageClass } from '../../components/cheatingTemplePage/CheatingTemplePageClass';
import { blueCityStates, data, goldCityStates, orangeCityStates, pinkCityStates, redCityStates, whiteCityStates } from '../../state/data';
import './CheatingTemplePage.scss';

const CheatingTemplePage = {
  render: async () => {
    const view = `
    <div class="cheatingTempleWrapper">
      <div class="templeIntro">
        <p>After you prayed to the Gods of Civ, they revealed you all city states in the game</p>
      </div>
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
    
    const selectCivLink = document.querySelector('.sel-civ-li');
      selectCivLink.style.display = 'block';  

    const allGoldCS = data.allCityStates.filter((elem) => {
      return (goldCityStates.includes(elem));
    });
    const goldcsWrapper = document.querySelector('.goldcs');
    goldcsWrapper.innerHTML = makeInnerHtml(allGoldCS);

    const allBlueCS = data.allCityStates.filter((elem) => {
      return (blueCityStates.includes(elem));
    });
    const bluecsWrapper = document.querySelector('.bluecs');
    bluecsWrapper.innerHTML = makeInnerHtml(allBlueCS);

    const allRedCS = data.allCityStates.filter((elem) => {
      return (redCityStates.includes(elem));
    });
    const redcsWrapper = document.querySelector('.redcs');
    redcsWrapper.innerHTML = makeInnerHtml(allRedCS);

    const allWhiteCS = data.allCityStates.filter((elem) => {
      return (whiteCityStates.includes(elem));
    });
    const whitecsWrapper = document.querySelector('.whitecs');
    whitecsWrapper.innerHTML = makeInnerHtml(allWhiteCS);

    const allOrangeCS = data.allCityStates.filter((elem) => {
      return (orangeCityStates.includes(elem));
    });
    const orangecsWrapper = document.querySelector('.orangecs');
    orangecsWrapper.innerHTML = makeInnerHtml(allOrangeCS);
    
    const allPinkCS = data.allCityStates.filter((elem) => {
      return (pinkCityStates.includes(elem));
    });
    const pinkcsWrapper = document.querySelector('.pinkcs');
    pinkcsWrapper.innerHTML = makeInnerHtml(allPinkCS);

    function makeInnerHtml(cityStates) {
      let innerHtml = '';
      cityStates.forEach(element => {
        innerHtml += `<p>${element}</p>`
      });
      return innerHtml;
    }
  },
};

export default CheatingTemplePage;
