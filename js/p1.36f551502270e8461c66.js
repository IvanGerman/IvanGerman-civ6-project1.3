(()=>{"use strict";const e={csvRowsToArray:null,allCivs:null,allCivsForTeamSelection:null,team1Civs:[],team2Civs:[],teamModeIsOn:!1,isDiv1Selected:!1,isDiv2Selected:!1,allCivsArrays:[],set setCsvRowsToArray(e){this.csvRowsToArray=e},set setAllCivs(e){this.allCivs=e},set setAllCivsForTeamSelection(e){this.allCivsForTeamSelection=e},set setTeamModeIsOn(e){this.teamModeIsOn=e},set setTeam1Civs(e){this.team1Civs=e},set setTeam2Civs(e){this.team2Civs=e},set setIsDiv1Selected(e){this.isDiv1Selected=e},set setIsDiv2Selected(e){this.isDiv2Selected=e},set setAllCivsArrays(e){this.allCivsArrays=e}},t=[" CIVILIZATION_ARMAGH"," CIVILIZATION_BOLOGNA"," CIVILIZATION_VATICAN_CITY"," CIVILIZATION_RAPA_NUI"," CIVILIZATION_PALENQUE"," CIVILIZATION_TARUGA"," CIVILIZATION_LISBON"," CIVILIZATION_MUSCAT"," CIVILIZATION_KANDY"," CIVILIZATION_ZANZIBAR"," CIVILIZATION_NGAZARGAMU"," CIVILIZATION_AYUTTHAYA"," CIVILIZATION_BRUSSELS"," CIVILIZATION_LAHORE"," CIVILIZATION_NAZCA"," CIVILIZATION_AUCKLAND"," CIVILIZATION_ANTIOCH"," CIVILIZATION_PRESLAV"," CIVILIZATION_SINGAPORE"," CIVILIZATION_MOHENJO_DARO"," CIVILIZATION_AKKAD"," CIVILIZATION_GRANADA"," CIVILIZATION_LA_VENTA"," CIVILIZATION_FEZ"," CIVILIZATION_SAMARKAND"," CIVILIZATION_WOLIN"," CIVILIZATION_NALANDA"," CIVILIZATION_BABYLON"," CIVILIZATION_JOHANNESBURG"," CIVILIZATION_ANTANANARIVO"," CIVILIZATION_CAHOKIA"," CIVILIZATION_YEREVAN"," CIVILIZATION_JERUSALEM"," CIVILIZATION_CAGUANA"," CIVILIZATION_NAN_MADOL"," CIVILIZATION_BUENOS_AIRES"," CIVILIZATION_JAKARTA"," CIVILIZATION_MEXICO_CITY"," CIVILIZATION_VALLETTA"," CIVILIZATION_HATTUSA"," CIVILIZATION_GENEVA"," CIVILIZATION_KUMASI"," CIVILIZATION_HONG_KONG"," CIVILIZATION_CARDIFF"," CIVILIZATION_CHINGUETTI"," CIVILIZATION_VILNIUS"," CIVILIZATION_KABUL"," CIVILIZATION_HUNZA"," CIVILIZATION_FREE_CITIES"],s=["#fcf80d","#ff5500","#5bed00","#05f7d7","#05aff7","#0045c4","#c300ff","#ff0000","#8f8c03","#f5a37a","#ffffff","#008200"];function a(e){let t=new URL(document.URL);t.hash=e;let s=t.href;document.location.href=s}class i{sequencesMark=[];extractDataLevel1(e){let t,s;for(let a=e.length-2;a>0;a-=1)if("1"===e[a][0]&&"1"!==e[a-1][0]){t=[...e],t.splice(0,a),s=this.extractDataLevel2(t),this.extractDataLevel3(s);break}}extractDataLevel2(e){let t=0;for(let s=0;s<e.length;s+=1){if("1"===e[s][0]&&" CIVILIZATION_FREE_CITIES"===e[s][1]&&(t+=1,t>1)){let t=[],s=e.filter(((e,s)=>("2"===e[0]&&t.push(s),"2"===e[0])));return e.slice(t[0]-s.length,e.length-1)}if("2"===e[s][0])return e.pop(),e}}extractDataLevel3(e){for(let t=e.length-1;t>0;t-=1)if(Number(e[t][0])<Number(e[t-1][0])){let s=t,a=0;for(let i=t-1;i>0;i-=1)if(Number(e[t][0])===Number(e[i][0])){a=i+1,this.sequencesMark.push([a,s]);break}}let t=[...e];for(let e=0;e<this.sequencesMark.length;e+=1)t.splice(this.sequencesMark[e][0],Number(this.sequencesMark[e][1]-this.sequencesMark[e][0]));this.extractDataLevel4(t)}extractDataLevel4(e){let t=[],s=[];for(let a=0;a<Number(e[e.length-1][0]);a+=1)s=e.filter((e=>Number(e[0])===Number(a+1))),t.push([...s]),s.length=0;for(let e=0;e<t.length;e+=1){let s=0;for(let a=0;a<t[e].length;a+=1)" CIVILIZATION_FREE_CITIES"===t[e][a][1]&&(s+=1);s>1&&(t[e]=t[e].slice(0,t[e].length/s))}t=Array.prototype.concat.apply([],t),this.extractDataLevel5(t)}extractDataLevel5(s){let i=this.convertToTurnsArray(s);i=Array.prototype.concat.apply([],i);let r=i.filter((e=>!t.includes(e[1]))),l=this.convertToTurnsArray(r),n=[],o=l[0],c=l[l.length-1];for(let e=0;e<o.length;e+=1){let t=o[e][1],s=!0;for(let e=0;e<c.length;e+=1)c[e].includes(t)&&(s=!1);!0===s&&n.push(t)}if(0!==n.length)for(let e=0;e<n.length;e+=1)for(let t=0;t<l.length;t+=1){let s=!0;for(let a=0;a<l[t].length;a+=1)if(l[t][a].includes(n[e])){s=!1;break}if(!0===s){this.pasteZeroData(n[e],t,l);break}}let h=[];for(let e=0;e<l[0].length;e+=1)h.push(l[0][e][1]);e.setAllCivsArrays=h,l=Array.prototype.concat.apply([],l),e.setCsvRowsToArray=[...l],console.log("final allCivsByTurns",l),a("selectteamcivs")}convertToTurnsArray(e){let t=[],s=[];for(let a=0;a<Number(e[e.length-1][0]);a+=1)s=e.filter((e=>Number(e[0])===Number(a+1))),t.push([...s]),s.length=0;return t}pasteZeroData(e,t,s){for(let a=t;a<s.length;a+=1){let t=[String(a+1),e," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"," 0"];s[a].push(t)}}}const r={render:async()=>'\n      <div class="start-page-div">\n        <p class="select-file-descr">Select "Player_Stats.csv" file from your</p>\n        <p class="select-file-descr red-span">"Computer/Documents/My Games/Sid Meier\'s Civilization VI/Logs"</p>\n        <p class="select-file-descr">folder  *</p>\n        <input type="file" id="myfile" name="myfile" accept=".csv" placeholder="Player_Stats.csv">\n      </div>\n      <div class="enable-log">\n        <p class="enable-log-p">* If you dont see the file "Player_Stats.csv" in your Logs directory, go to   the file "AppOptions.txt" following the path Computer/Documents/My Games/Sid Meier\'s Civilization VI/AppOptions.txt , open "AppOptions.txt" (with WordPad, for example), scroll down, until you see the option "Log all game core events." , now change "EnableGameCoreEventLog 0" to   EnableGameCoreEventLog 1"<p>\n      </div>\n      <div class="dev-name">\n        2022\n        <a class="github-link" href="https://github.com/IvanGerman" target="_blank">Ivan German</a>\n      </div>\n    ',after_render:()=>{document.querySelector(".sel-civ-li").style.display="none",document.getElementById("myfile").addEventListener("change",(function(){const t=this.files;"Player_Stats.csv"!==t[0].name&&alert('wrong file, should be "Player_Stats.csv"'),async function(){let s=new FileReader;await s.readAsText(t[0]),s.onload=async()=>{const t=await s.result.split("\n"),a=[];t.forEach((e=>{a.push(e.split(","))})),console.log("csvRowsToArray--",a),e.extractDataLevel1(a)}}()}),!1);const e=new i}};class l{completedTeamCount=0;isTeamComplete=!1;civsForComparingCount=0;constructor(e=[],t=[],s=[],i=""){this.team1=e,this.team2=t,this.civsFromBothTeams=[],this.civsForComparing=s,this.civForGovernor=i,this.previousSelectedHTMLelement="",this.paragraph1=document.querySelector(".paragraph1"),this.paragraph2=document.querySelector(".paragraph2"),this.func1Callback=function(e){a("chartpage")},this.func2Callback=function(e){a("chartpage")}}getAllCivs(e){return e}addToTeam(t,s){if(!1===this.isTeamComplete&&(this.team1.push(t),this.completedTeamCount+=1,this.completedTeamCount>=s)){function t(e,t){return e.map((e=>e.slice(14))).filter((e=>!t.includes(e)))}e.setTeamModeIsOn=!0,e.setTeam1Civs=this.team1,this.team2=t(e.allCivsForTeamSelection,this.team1),e.setTeam2Civs=this.team2,this.isTeamComplete=!0,this.team2=t(e.allCivsForTeamSelection,this.team1),this.paragraph1.style.opacity="0",setTimeout((()=>{this.paragraph1.innerHTML="Click me to show stats",this.paragraph1.style.color="rgb(255, 251, 0)",this.paragraph1.style.opacity="1",this.paragraph1.addEventListener("click",this.func1Callback)}),400)}}removeFromTeam(e){this.completedTeamCount-=1;let t=this.team1.indexOf(e);return this.team1.splice(t,1),this.team1}addCivForComparing(t,s){return this.civsForComparing.push(t),this.civsForComparingCount+=1,this.civsForComparingCount,1===this.civsForComparing.length&&(this.paragraph2.style.opacity="0",setTimeout((()=>{this.paragraph2.innerHTML="Click me to show stats",this.paragraph2.style.color="rgb(255, 251, 0)",this.paragraph2.style.opacity="1",this.paragraph2.addEventListener("click",this.func2Callback)}),400)),e.setAllCivs=this.civsForComparing,this.civsForComparing}removeFromCivsForComparing(e){return 1===this.civsForComparing.length&&(this.paragraph2.removeEventListener("click",this.func2Callback),this.paragraph2.style.opacity="0",setTimeout((()=>{this.paragraph2.innerHTML="To see stats of single civs, please, select them",this.paragraph2.style.color="#ffffff",this.paragraph2.style.opacity="1"}),400)),this.civsForComparingCount-=1,this.civsForComparing.pop(e),this.civsForComparing}selectCivForGovernor(e,t){""!==this.civForGovernor&&this.previousSelectedHTMLelement.classList.remove("selectedCiv"),this.civForGovernor=e,this.previousSelectedHTMLelement=t}removeCivForGovernor(){this.civForGovernor=""}}const n={render:async()=>'\n      <div class="select-team-civs-div">\n        <div class="select-teams selection">\n          <p class="paragraph1" >Select civs of team1 or team2 to see team stats</p>\n          <div class="civs-wrapper" ></div>\n        </div>\n        <div class="select-civs selection">\n          <p class="paragraph2" >To see stats of single civs, please, select them</p>\n          <div class="civs-wrapper" ></div>\n        </div>\n        <div class="select-civ-for-governour selection">\n          <p>Select a civ, to see stats of governor use (in progress...)</p>\n          <div class="civs-wrapper" ></div>\n        </div>\n      </div>\n    ',after_render:async()=>{new class{constructor(){this.allCivs=e.allCivsArrays,e.setAllCivsForTeamSelection=this.allCivs,console.log("this.allCivs--",this.allCivs),this._selectionLogicObj=new l,document.querySelector(".sel-civ-li").style.display="none",e.setIsDiv1Selected=!1,e.setIsDiv2Selected=!1,this.render()}async render(){const e=this.createCivsButtons(),t=document.querySelectorAll(".civs-wrapper");for(let s=0;s<3;s+=1){const a=document.createElement("div");a.classList.add(`innerDiv${s+1}`),a.innerHTML=e,t[s].append(a);let i=document.querySelector(`.innerDiv${s+1}`);this.addEventList(i)}}createCivsButtons(){return this.allCivs.map((function(e){return`<div class="single-civ">${e.substring(14)}</div>`})).join("")}addEventList(t){t.addEventListener("click",(t=>{if("single-civ"==t.target.classList[0])switch(t.target.parentElement.className){case"innerDiv1":if(!0===e.isDiv2Selected&&(e.setIsDiv2Selected=!1,e.setIsDiv1Selected=!1,a("selectteamcivs__"),a("selectteamcivs")),e.setIsDiv1Selected=!0,"selectedCiv"===t.target.classList[1])return t.target.classList.remove("selectedCiv"),this._selectionLogicObj.removeFromTeam(t.target.innerHTML),void(!0===this._selectionLogicObj.isTeamComplete&&(this._selectionLogicObj.isTeamComplete=!1,this._selectionLogicObj.paragraph1.removeEventListener("click",this._selectionLogicObj.func1Callback),this._selectionLogicObj.paragraph1.style.opacity="0",setTimeout((()=>{this._selectionLogicObj.paragraph1.innerHTML="Select civs of team1 or team2 to see team stats",this._selectionLogicObj.paragraph1.style.color="#ffffff",this._selectionLogicObj.paragraph1.style.opacity="1"}),400)));!1===this._selectionLogicObj.isTeamComplete&&(t.target.classList.add("selectedCiv"),this._selectionLogicObj.addToTeam(t.target.innerHTML,this.allCivs.length/2));break;case"innerDiv2":if(e.setTeamModeIsOn=!1,!0===e.isDiv1Selected&&(e.setIsDiv1Selected=!1,e.setIsDiv2Selected=!1,a("selectteamcivs__"),a("selectteamcivs")),e.setIsDiv2Selected=!0,"selectedCiv"===t.target.classList[1])return t.target.classList.remove("selectedCiv"),void this._selectionLogicObj.removeFromCivsForComparing(t.target.innerHTML);t.target.classList.add("selectedCiv"),this._selectionLogicObj.addCivForComparing(` CIVILIZATION_${t.target.innerHTML}`,this.allCivs.length);break;case"innerDiv3":if("selectedCiv"===t.target.classList[1])return t.target.classList.remove("selectedCiv"),void this._selectionLogicObj.removeCivForGovernor();t.target.classList.add("selectedCiv"),this._selectionLogicObj.selectCivForGovernor(t.target.innerHTML,t.target);break;default:return}}))}}}};class o{getPopulation(){}getStat(e,t,a){let i={},r=[],l=[];return e.forEach(((e,n)=>{for(let s=0;s<t[e].length;s+=1)r.push(parseFloat(t[e][s][a]));i.label=e.slice(14),i.data=[...r],r.length=0,i.backgroundColor=s[n],i.borderColor=s[n],i.borderWidth=2,l.push({...i})})),l}getCities(e,t){let a={},i=[],r=[];return e.forEach(((e,l)=>{for(let s=0;s<t[e].length;s+=1)i.push(parseFloat(t[e][s].citiesNumber));a.label=e,a.data=[...i],i.length=0,a.backgroundColor=s[l],a.borderColor=s[l],a.borderWidth=2,r.push({...a})})),r}}class c{teamStats={CIVILIZATION__TEAM1:[],CIVILIZATION__TEAM2:[]};singleTurnStats={};getTeamStats(e,t,s,a){return this.getSingleTeamStats(e,t,"CIVILIZATION__TEAM1",a),this.getSingleTeamStats(e,s,"CIVILIZATION__TEAM2",a),this.teamStats}getSingleTeamStats(e,t,s,a){let i=["population","citiesNumber","foodPerTurn","productionPerTurn","sciencePerTurn","culturePerTurn","goldPerTurn","faithPerTurn","tiles","improvedTiles","landUnits","navalUnits","techs","civics"],r=[];for(let s=0;s<a;s+=1){let a=0;this.singleTurnStats={};for(let r=0;r<14;r+=1){for(let l=0;l<t.length;l+=1)a+=Number(e[` CIVILIZATION_${t[l]}`][s][i[r]]);this.singleTurnStats[i[r]]=a,a=0}r.push(this.singleTurnStats)}this.teamStats[s]=r}}class h{xLabels=[];yLabels=[];specCivArr=[];allStatsForOneCiv=[];allStatsForAllCivs={};datasetsArr=[];allCivs=e.allCivs;specCivArrAllCivs=[];gettingStatsObj=new o;gettingTeamStatsObj=new c;constructor(){if(this.team1Civs=document.querySelector(".team1Civs"),this.team2Civs=document.querySelector(".team2Civs"),this.yAxisTitle=document.querySelector(".kind-of-stat"),!0===e.teamModeIsOn){this.allCivs=e.allCivsForTeamSelection,this.getAllStatsForAllCivs(this.allCivs),this.getXLabelsValues(this.allCivs),this.allStatsForAllCivs=this.getTeamStats(this.allStatsForAllCivs,e.team1Civs,e.team2Civs),this.team1Civs.innerHTML=`TEAM1:   ${e.team1Civs}`,this.team2Civs.innerHTML=`TEAM2:   ${e.team2Civs}`,this.allCivs=["CIVILIZATION__TEAM1","CIVILIZATION__TEAM2"],this.getSpecialStat("population");const t=document.querySelector(".statsButtonsWrapper");return this.addEventListeners(t),e.setTeamModeIsOn=!1,void(document.querySelector(".sel-civ-li").style.display="block")}if(!1===e.teamModeIsOn){this.getAllStatsForAllCivs(this.allCivs),this.getXLabelsValues(this.allCivs),this.getSpecialStat("population");const e=document.querySelector(".statsButtonsWrapper");this.addEventListeners(e)}document.querySelector(".sel-civ-li").style.display="block"}getDataForOneCiv(t){return this.specCivArr=e.csvRowsToArray.filter((e=>e.includes(t))),this.specCivArr}getAllStatsForOneCiv(e){return this.getDataForOneCiv(e),this.specCivArr.forEach((e=>{const t={};t.citiesNumber=e[2],t.population=e[3],t.techs=e[4],t.civics=e[5],t.landUnits=e[6],t.navalUnits=e[9],t.tiles=e[10],t.improvedTiles=e[11],t.sciencePerTurn=e[14],t.culturePerTurn=e[15],t.goldPerTurn=e[16],t.faithPerTurn=e[17],t.productionPerTurn=e[18],t.foodPerTurn=e[19],this.allStatsForOneCiv.push(t)})),this.allStatsForOneCiv}getAllStatsForAllCivs(e){e.forEach((e=>{let t=[...this.getAllStatsForOneCiv(e)];this.allStatsForAllCivs[e]=t,this.allStatsForOneCiv.length=0}))}getXLabelsValues(e){for(let t=0;t<this.allStatsForAllCivs[e[0]].length;t+=1)this.xLabels.push(t+1)}chartIt(){const e=document.getElementById("myChart").getContext("2d");let t=null;Chart.getChart("myChart")&&Chart.getChart("myChart").destroy(),t=new Chart(e,{type:"line",data:{labels:this.xLabels,datasets:this.datasetsArr},options:{layout:{padding:0},plugins:{legend:{display:!0,onHover:()=>{document.querySelector(".myChart").style.cursor="pointer"},onLeave:()=>{document.querySelector(".myChart").style.cursor="default"},labels:{font:{size:15},color:["#ffffff"]},title:{font:{size:15}}}},scales:{x:{ticks:{color:"#ffffff"}},y:{ticks:{color:"#ffffff"}}}}})}getSpecialStat(e){this.datasetsArr=this.gettingStatsObj.getStat(this.allCivs,this.allStatsForAllCivs,e),this.chartIt(),this.yAxisTitle.innerHTML=e}getTeamStats(e,t,s){let a=e[` CIVILIZATION_${t[0]}`].length;return this.gettingTeamStatsObj.getTeamStats(e,t,s,a)}addEventListeners(e){e.addEventListener("click",(e=>{switch(e.target.dataset.buttonName){case"population":this.getSpecialStat("population");break;case"cities":this.getSpecialStat("citiesNumber");break;case"food":this.getSpecialStat("foodPerTurn");break;case"production":this.getSpecialStat("productionPerTurn");break;case"science":this.getSpecialStat("sciencePerTurn");break;case"culture":this.getSpecialStat("culturePerTurn");break;case"gold":this.getSpecialStat("goldPerTurn");break;case"faith":this.getSpecialStat("faithPerTurn");break;case"tiles":this.getSpecialStat("tiles");break;case"improvedTiles":this.getSpecialStat("improvedTiles");break;case"landUnits":this.getSpecialStat("landUnits");break;case"navalUnits":this.getSpecialStat("navalUnits");break;case"techs":this.getSpecialStat("techs");break;case"civics":this.getSpecialStat("civics");break;default:return}}))}}const v=()=>{const e=(document.location.hash.slice(1).toLowerCase()||"/").split("/"),t={resource:null};return t.resource=e[0],t},I={"/":r,"/selectteamcivs":n,"/chartpage":{render:async()=>'\n    <div class="chartWrapper">\n      <p class="kind-of-stat">Population</p>\n      <canvas class="myChart" id="myChart" width="400" height="180"></canvas>\n      <div class="turns-number">Turns</div>\n    </div>\n    <div class="teams-civs">\n      <span class="team1Civs"></span>\n      <span class="team2Civs"></span>\n    </div>\n    <div class="statsButtonsWrapper">\n      <div class="statsButton" data-button-name="population">Population</div>\n      <div class="statsButton" data-button-name="cities">Number of Cities</div>\n      <div class="statsButton" data-button-name="food">Food per Turn</div>\n      <div class="statsButton" data-button-name="production">Production per Turn</div>\n      <div class="statsButton" data-button-name="science">Science per Turn</div>\n      <div class="statsButton" data-button-name="culture">Culture per Turn</div>\n      <div class="statsButton" data-button-name="gold">Gold per Turn</div>\n      <div class="statsButton" data-button-name="faith">Faith per Turn</div>\n      <div class="statsButton" data-button-name="tiles">Tiles</div>\n      <div class="statsButton" data-button-name="improvedTiles">Improved Tiles</div>\n      <div class="statsButton" data-button-name="landUnits">Land Units</div>\n      <div class="statsButton" data-button-name="navalUnits">Naval Units</div>\n      <div class="statsButton" data-button-name="techs">Techs</div>\n      <div class="statsButton" data-button-name="civics">Civics</div>\n    </div>\n    <div class="remark-to-stats">The chart shows situation like it is at the beginning of the next turn, for example: its turn 1, you build a city this turn, this will be shown in the chart like: turn 2 - number of cities 1 (not like: turn 1 - number of cities 1)<div>\n    ',after_render:async()=>{new h}}},d=async()=>{const e=document.getElementById("root"),t=v(),s=t.resource?`/${t.resource}`:"/",a=I[s];e.innerHTML=await a.render(),await a.after_render()};window.addEventListener("hashchange",d),window.addEventListener("load",d)})();