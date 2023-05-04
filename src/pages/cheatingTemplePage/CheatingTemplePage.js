//import { CheatingTemplePageClass } from '../../components/cheatingTemplePage/CheatingTemplePageClass';
import { data } from '../../state/data';
import './CheatingTemplePage.scss';

const CheatingTemplePage = {
  render: async () => {
    const view = `
    <div class="cheatingTempleWrapper">
      <div class="csWrapper">${data.allCityStates}</div>
      <img src="./../../assets/img/cheatingtemple-bg2.jpg" alt="" />
    <div>
    `;
    return view;
  },
  after_render: async () => {
    console.log('CheatingTemplePageClass rendered', data.allCityStates);
    //new CheatingTemplePageClass();  
  },
};

export default CheatingTemplePage;
