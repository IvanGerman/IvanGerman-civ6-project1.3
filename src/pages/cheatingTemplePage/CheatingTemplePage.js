//import { CheatingTemplePageClass } from '../../components/cheatingTemplePage/CheatingTemplePageClass';
import './CheatingTemplePage.scss';

const CheatingTemplePage = {
  render: async () => {
    const view = `
    <div class="cheatingTempleWrapper">
      <img src="./../../assets/img/cheatingtemple-bg2.jpg" alt="" />
    <div>
    `;
    return view;
  },
  after_render: async () => {
    console.log('CheatingTemplePageClass rendered');
    //new CheatingTemplePageClass();  
  },
};

export default CheatingTemplePage;
