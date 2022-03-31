import SelectTeamCivs from "../../components/selectteamcivs/SelectTeamCivs";
import './SelectTeamCivs.scss';


const SelectTeamCivsPage = {
  render: async () => {
    const view = `
      <div class="select-team-civs-div" style="position: absolute; top: 50%; left: 50%; font-size: 64px; transform: translate(-50%, -50%);">
        SelectTeamCivs
      </div>
    `;
    return view;
  },
  after_render: async () => {
    new SelectTeamCivs ();
  },
};

export default SelectTeamCivsPage;
