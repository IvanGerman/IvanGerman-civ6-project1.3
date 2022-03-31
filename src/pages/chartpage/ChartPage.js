import './ChartPage.scss';

const ChartPage = {
  render: async () => {
    const view = `
      <div class="chart-div" style="position: absolute; top: 50%; left: 50%; font-size: 64px; transform: translate(-50%, -50%);">
        ChartPage
      </div>
    `;
    return view;
  },
  after_render: async () => {

  },
};

export default ChartPage;
