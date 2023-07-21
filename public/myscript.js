
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function() {
   sidebar.classList.toggle("active");
   if(sidebar.classList.contains("active")){
      sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
   }else
      sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}


function format_date_time(ufdt){
   var ufdt_str = ufdt.toString()
   
   if (ufdt_str.includes(',') === true){
      return ufdt_str;
   }

   if(ufdt_str.includes('/') === true){
      var initial_date = ufdt_str.split(' ')[0].split('/')
      var sort_date_time = `${initial_date[2]}-${initial_date[1]}-${initial_date[0]}T${ufdt.split(' ')[1]}:00.000Z`;
      var ufdt = sort_date_time
      // console.log(ufdt)
   }

   if (ufdt_str.includes('T') === false && ufdt_str.includes('/') === false){
      var ufdt = new Date(ufdt).toISOString();
   }

   // ISO_to_date_time_obj
   var e = new Date(ufdt);

   // GMT_to_IST
   var hrs_part = e.getHours(); 
   var am_or_pm = hrs_part >= 12 ? 'pm' : 'am';
   hrs_part = (hrs_part % 12) || 12;
   var min_part = e.getMinutes();

   var f = e.toISOString().split('T');
   var f1 = f[0].split('-')
   return `${f1[2]}/${f1[1]}/${f1[0]} ${hrs_part}:${min_part.toString().substr(0,2)} ${am_or_pm}`
}

//---------------(cb-section-only)---------------//
   // async function cb_api_to_html(){
   //    var api_url = "https://us-central1-punterguru-com.cloudfunctions.net/CricBuzz";
   //    let response = await fetch(api_url)
   //    var data = await response.json();
   //    console.log('out:', data)

   //    var cb = `<tr class="details">
   //                <td class="topic">Date</td>
   //                <td class="topic">Match Key</td>
   //                <td class="topic">Match</td>
   //                <td class="topic">Inns 1</td>
   //                <td class="topic">Inns 2</td>
   //             </tr>` 

   //    for (let [r,v] of Object.entries(data)) {
   //       cb += `<tr class="match-details">
   //                <td>${format_date_time(v.start_date_time)}</td>
   //                <td>${r}</td>
   //                <td>${v.t1.f} vs ${v.t2.f}</td>
   //                <td>${v.i1.sc}/${v.i1.wk}(${v.i1.ov})</td>
   //                <td>${v.i2.sc}/${v.i2.wk}(${v.i2.ov})</td>
   //             </tr>` 
   //    }
   //    document.getElementById("cb").innerHTML = cb;            
   // }
   // cb_api_to_html()
//---------------(cb-section-only)---------------//


//All Matches 
async function all_match_sites(){
   var match_info = {
      Crickbuzz : {
         api_url: 'https://us-central1-punterguru-com.cloudfunctions.net/CbTest',
      },
      Espn : {
         api_url : 'https://us-central1-punterguru-com.cloudfunctions.net/espn_score',
      },
      Criclive : {
         api_url : 'https://us-central1-punterguru-com.cloudfunctions.net/CricApi/criclive',
      }, 
      NW18 : {
         api_url : 'https://us-central1-punterguru-com.cloudfunctions.net/nw18',
      }, 
      
      // Sportskeeda : {
      //    api_url : 'http://157.245.98.82:3011/sportskeeda',
      // },

      // Cricketmazza : {
      //    api_url : 'http://157.245.98.82:3008/cricketmazza',
      // }, 
   }
   var all_match_sec ='';

   for(let [kk , val] of Object.entries(match_info)){
      // console.log(val.api_url)
      let response = await fetch(val.api_url)
      // console.log(response);
      var data =  await response.json();   

      if(kk === 'Criclive'){
         // console.log(kk);
         var data = data.criclive;
      }
      
      console.log(kk,'-->', data)
      
      var match_start_sec =  `<div class="py-2">
               <div class="sales-boxes">
                  <div class="recent-sales box">
                     <div class="title"><a href='${val.api_url}'>${kk}</a></div>
                     <div class="sales-details">
                        <table class="table">
                           <tbody id="">
                           <tr class="details">
                              <td class="topic">Date</td>
                              <td class="topic">Match Key</td>
                              <td class="topic">Match</td>
                              <td class="topic">Inns 1</td>
                              <td class="topic">Inns 2</td>
                           </tr>`
                           
      var match_end_sec =  `</tbody>
                        </table> 
                     </div>
                     <div class="button">
                        <a href="#">See All</a>
                     </div>
                  </div>
               </div>
            </div>`

   
      for (let [r,v] of Object.entries(data)) {
         if(v.t1 != undefined){
            console.log(`ID >-->${r} >-->${v.match_state} >-->${kk}`);
            match_start_sec += `<tr class="match-details ${(v.match_state === 'L' || v.match_state === 'RUNNING' || v.match_state === 'In Progress' ? 'running-match' : '')}">
                     <td>${(kk=='Criclive' ? (v.con ? v.con.mtm : '---') : (v.start_date_time != undefined && v.start_date_time !== '' ? format_date_time(v.start_date_time) : '---'))}</td>
                     <td class=''>${r}</td>
                     <td><a class='${(v.match_state === 'L' || v.match_state === 'RUNNING' || v.match_state === 'In Progress' ? 'running-match' : '')}' href="${(v.match_url ? v.match_url : '#')}">${(v.t1.f ? v.t1.f : '---')} v ${(v.t2.f ? v.t2.f : '---')}</a></td>
                     <td>${v.i1.sc ? v.i1.sc : '---'}/${v.i1.wk ? v.i1.wk : '---'}(${v.i1.ov ? v.i1.ov : '---'})</td>
                     <td>${v.i2.sc ? v.i2.sc : '---'}/${v.i2.wk ? v.i2.wk : '---'}(${v.i2.ov ? v.i2.ov : '---'})</td>
                  </tr>`
         }          
      }
      match_start_sec = match_start_sec + match_end_sec;
      all_match_sec = all_match_sec + match_start_sec;
   }
   if (all_match_sec) {
      document.getElementById("home-compo").innerHTML = all_match_sec;  
   }else{
      document.getElementById("home-compo").innerHTML = 'No Data!!';        
   }                      
}
all_match_sites();


// function combine_api(){
//    if($('#cricbuzz-input').val() !== ''){
//       console.log($('#cricbuzz-input').val());  
//    }
//    if($('#cricexc-input').val() !== ''){
//       console.log($('#cricexc-input').val());  
//    }
//    if($('#espn-input').val() !== ''){
//       console.log($('#espn-input').val());  
//    }
//    if($('#criclive-input').val() !== ''){
//       console.log($('#criclive-input').val());  
//    }  
// }

function hide_dashboard(){
   let dashboard_slider = document.querySelector(".sidebar");
   dashboard_slider.classList.toggle("active");
}

//Reload page afer 30 min
setTimeout(function() {
  location.reload();
}, 1000*60*30);









