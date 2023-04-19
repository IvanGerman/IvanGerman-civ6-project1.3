import { ChartPageClass } from '../../components/chartpage/ChartPageClass';
import './ChartPage.scss';

const ChartPage = {
  render: async () => {
    const view = `
    <div class="chartWrapper">
      <p class="kind-of-stat">Population</p>
      <canvas class="myChart" id="myChart" width="400" height="180"></canvas>
      <div class="turns-number">Turns</div>
    </div>
    <div class="teams-civs">
      <span class="team1Civs"></span>
      <span class="team2Civs"></span>
    </div>
    <div class="statsButtonsWrapper">
      <div class="statsButton" data-button-name="population">
        <p class="statsButton-p" data-button-name="population">Population</p>
      </div>
      <div class="statsButton" data-button-name="cities">
        <p class="statsButton-p" data-button-name="cities">Number of Cities</p>
      </div>
      <div class="statsButton" data-button-name="food">
        <p class="statsButton-p" data-button-name="food">Food per Turn</p>
      </div>
      <div class="statsButton" data-button-name="production">
        <p class="statsButton-p" data-button-name="production">Production per Turn</p>
      </div>
      <div class="statsButton" data-button-name="science">
        <p class="statsButton-p" data-button-name="science">Science per Turn</p>
      </div>
      <div class="statsButton" data-button-name="culture">
        <p class="statsButton-p" data-button-name="culture">Culture per Turn</p>
      </div>
      <div class="statsButton" data-button-name="gold">
        <p class="statsButton-p" data-button-name="gold">Gold per Turn</p>
      </div>
      <div class="statsButton" data-button-name="faith">
        <p class="statsButton-p" data-button-name="faith">Faith per Turn</p>
      </div>
      <div class="statsButton" data-button-name="tiles">
        <p class="statsButton-p" data-button-name="tiles">Tiles</p>
      </div>
      <div class="statsButton" data-button-name="improvedTiles">
        <p class="statsButton-p" data-button-name="improvedTiles">Improved Tiles</p>
      </div>
      <div class="statsButton" data-button-name="landUnits">
        <p class="statsButton-p" data-button-name="landUnits">Land Units</p>
      </div>
      <div class="statsButton" data-button-name="navalUnits">
        <p class="statsButton-p" data-button-name="navalUnits">Naval Units</p>
      </div>
      <div class="statsButton" data-button-name="techs">
        <p class="statsButton-p" data-button-name="techs">Techs</p>
      </div>
      <div class="statsButton" data-button-name="civics">
        <p class="statsButton-p" data-button-name="civics">Civics</p>
      </div>
    </div>
    <div class="remark-to-stats">The chart shows situation like it is at the beginning of the next turn, for example: its turn 1, you build a city this turn, this will be shown in the chart like: turn 2 - number of cities 1 (not like: turn 1 - number of cities 1)<div>
    `;
    return view;
  },
  after_render: async () => {
    new ChartPageClass(); //transfer data inside of ()
  },
};

export default ChartPage;
