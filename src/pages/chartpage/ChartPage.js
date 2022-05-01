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
      <div class="statsButton">Food per Turn</div>
      <div class="statsButton">Production per Turn</div>
      <div class="statsButton">Science per Turn</div>
      <div class="statsButton">Culture per Turn</div>
      <div class="statsButton">Gold per Turn</div>
      <div class="statsButton">Faith per Turn</div>
      <div class="statsButton">Tiles</div>
      <div class="statsButton">Improved Tiles</div>
      <div class="statsButton">Land Units</div>
      <div class="statsButton">Naval Units</div>
      <div class="statsButton">Techs</div>
      <div class="statsButton">Civics</div>
    </div>
    `;
    return view;
  },
  after_render: async () => {
    new ChartPageClass(); //transfer data inside of ()
  },
};

export default ChartPage;
