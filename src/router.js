import StartPage from './pages/startpage/StartPage';
import SelectTeamCivs from './pages/selectteamcivs/SelectTeamCivs';
import ChartPage from './pages/chartpage/ChartPage';
import Utils from './utils/Utils';

const routes = {
  '/': StartPage ,
  '/selectteamcivs': SelectTeamCivs ,
  '/chartpage': ChartPage ,
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
