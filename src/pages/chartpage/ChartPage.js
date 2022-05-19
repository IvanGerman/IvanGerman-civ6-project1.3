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
    <div class="statsButtonsWrapper">
      <div class="statsButton" data-button-name="population">Population</div>
      <div class="statsButton" data-button-name="cities">Number of Cities</div>
      <div class="statsButton" data-button-name="food">Food per Turn</div>
      <div class="statsButton" data-button-name="production">Production per Turn</div>
      <div class="statsButton" data-button-name="science">Science per Turn</div>
      <div class="statsButton" data-button-name="culture">Culture per Turn</div>
      <div class="statsButton" data-button-name="gold">Gold per Turn</div>
      <div class="statsButton" data-button-name="faith">Faith per Turn</div>
      <div class="statsButton" data-button-name="tiles">Tiles</div>
      <div class="statsButton" data-button-name="improvedTiles">Improved Tiles</div>
      <div class="statsButton" data-button-name="landUnits">Land Units</div>
      <div class="statsButton" data-button-name="navalUnits">Naval Units</div>
      <div class="statsButton" data-button-name="techs">Techs</div>
      <div class="statsButton" data-button-name="civics">Civics</div>
    </div>
    <div class="remark-to-stats">ffdfdf<div>
    `;
    return view;
  },
  after_render: async () => {
    new ChartPageClass(); //transfer data inside of ()
  },
};

export default ChartPage;
