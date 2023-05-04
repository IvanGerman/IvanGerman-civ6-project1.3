import StartPage from './pages/startpage/StartPage';
import SelectTeamCivs from './pages/selectteamcivspage/SelectTeamCivsPage';
import ChartPage from './pages/chartpage/ChartPage';
import PieChartsPage from './pages/pieChartsPage/PieChartsPage';
import Utils from './utils/Utils';
import CheatingTemplePage from './pages/cheatingTemplePage/cheatingTemplePage';

const routes = {
  '/': StartPage ,
  '/selectteamcivs': SelectTeamCivs ,
  '/chartpage': ChartPage ,
  '/piecharts': PieChartsPage ,
  '/cheatingtemple': CheatingTemplePage ,
};

const router = async () => {
  const content = document.getElementById('root');

  const request = Utils.parseRequestURL();
  const parsedURL = request.resource ? `/${request.resource}` : '/';

  const page = routes[parsedURL];

  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
