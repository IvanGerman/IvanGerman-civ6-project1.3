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
    </div>`;
    return view;
  },
  after_render: async () => {
    const pieChart = new PieChartsPageClass();
    pieChart.chartIt();
  },
};

export default PieChartsPage;
