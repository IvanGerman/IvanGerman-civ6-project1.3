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
    `;
    return view;
  },
  after_render: async () => {
    new ChartPageClass(); //transfer data inside of ()
  },
};

export default ChartPage;
