import SelectTeamCivs from "../../components/selectteamcivs/SelectTeamCivs";
import './SelectTeamCivs.scss';


const SelectTeamCivsPage = {
  render: async () => {
    const view = `
      <div class="select-team-civs-div">
        <div class="select-teams selection">
          <p>To compare stats of team 1 and team 2, please, select civs of team 1 or team 2</p>
          <div class="civs-wrapper" ></div>
        </div>
        <div class="select-civs selection">
          <p class="paragraph2" >To see stats of some civs, please, select them</p>
          <div class="civs-wrapper" ></div>
        </div>
        <div class="select-civ-for-governour selection">
          <p>Select a civ, to see stats of governor use</p>
          <div class="civs-wrapper" ></div>
        </div>
      </div>
    `;
    return view;
  },
  after_render: async () => {
    new SelectTeamCivs ();
  },
};

export default SelectTeamCivsPage;
