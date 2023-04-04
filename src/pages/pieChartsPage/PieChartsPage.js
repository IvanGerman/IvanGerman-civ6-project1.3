import { PieChartsPageClass } from '../../components/piechartpage/PieChartsPageClass';
import './PieChartsPage.scss';

const PieChartsPage = {
  render: async () => {
    const view = `
    <div class="pieChartsPageWrapper">
      <p class="kind-of-stat">Population</p>
      <canvas class="myPieChart" id="myPieChart"></canvas>
      
    </div>
    <div class="teams-civs">
      <span class="team1Civs"></span>
      <span class="team2Civs"></span>
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
    </div>`;
    return view;
  },
  after_render: async () => {
    const pieChart = new PieChartsPageClass();
    pieChart.chartIt();
    console.log('PieChartsPage rendered');
  },
};

export default PieChartsPage;
