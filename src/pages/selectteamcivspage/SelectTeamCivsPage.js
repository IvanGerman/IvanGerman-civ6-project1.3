import SelectTeamCivs from "../../components/selectteamcivs/SelectTeamCivs";
import './SelectTeamCivs.scss';


const SelectTeamCivsPage = {
  render: async () => {
    const view = `
      <div class="select-team-civs-div">
        <div class="select-teams selection">
          <p class="paragraph1" >Select civs of team1 or team2 to see team stats</p>
          <div class="civs-wrapper" ></div>
        </div>
        <div class="select-civs selection">
          <p class="paragraph2" >To see stats of single civs, please, select them</p>
          <div class="civs-wrapper" ></div>
        </div>
        <div class="select-civ-for-governour selection">
          <p>Districts discount calculator (in progress...)</p>
        </div>
        <div class="temple-wrapper" >
          <img src="./../../assets/img/temple.jpg" alt="" usemap="#workmap" />
          <map name="workmap">
            <area shape="rect" coords="0,0,100,50" alt="temple" href="#cheatingtemple">
          </map>
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
