
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
   sidebar.classList.toggle("active");
   if (sidebar.classList.contains("active")) {
      sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
   } else
      sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

function hide_dashboard() {
   let dashboard_slider = document.querySelector(".sidebar");
   dashboard_slider.classList.toggle("active");
}


function format_date_time(ufdt) {
   var ufdt_str = ufdt.toString()

   if (ufdt_str.includes(',') === true) {
      return ufdt_str;
   }

   if (ufdt_str.includes('/') === true) {
      var initial_date = ufdt_str.split(' ')[0].split('/')
      var sort_date_time = `${initial_date[2]}-${initial_date[1]}-${initial_date[0]}T${ufdt.split(' ')[1]}:00.000Z`;
      var ufdt = sort_date_time
      // console.log(ufdt)
   }

   if (ufdt_str.includes('T') === false && ufdt_str.includes('/') === false) {
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
   return `${f1[2]}/${f1[1]}/${f1[0]} ${hrs_part}:${min_part.toString().substr(0, 2)} ${am_or_pm}`
}


// Function to generate the dynamic sidebar
function generateDynamicSidebar(siteName) {
   const dynamicSidebar = document.getElementById('dynamic-sidebar');

   const li = document.createElement('li');
   const a = document.createElement('a');
   a.onclick = () => scrollToCard(`${siteName}-card`);
   a.className = 'cursor-pointer';
   const icon = document.createElement('i');
   icon.className = 'bx bx-box';
   const span = document.createElement('span');
   span.className = 'links_name';
   span.textContent = siteName;
   a.appendChild(icon);
   a.appendChild(span);
   li.appendChild(a);
   dynamicSidebar.appendChild(li);
}

function scrollToCard(cardId) {
   const cardElement = document.getElementById(cardId);
   if (cardElement) {
      // Calculate the offset from the top of the viewport
      const offset = cardElement.getBoundingClientRect().top + window.scrollY;

      // Use jQuery to scroll with custom speed
      $('html, body').animate({
         scrollTop: offset - 80,
      }, 500); // Adjust the duration (in milliseconds) for smoother scrolling

   }
}


//All Matches 
async function fetchMatchData(apiUrl, siteName) {
   try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return { siteName, data, apiUrl }; // Include apiUrl in the returned object
   } catch (error) {
      console.error(`Error fetching data from ${siteName}:`, error);
      return { siteName, error, apiUrl }; // Include apiUrl in the error object
   }
}

async function all_match_sites() {
   const match_info = {
      Crickbuzz: 'https://cricket-panel-backend.onrender.com/cbz',
      Espn: 'https://cricket-panel-backend.onrender.com/espn',
      NW18: 'https://cricket-panel-backend.onrender.com/nw18',
      Sportskeeda: 'https://cricket-panel-backend.onrender.com/sk',
      Cliclineguru: 'https://cricket-panel-backend.onrender.com/clg',
   };
   let dataReceived = false;

   try {
      const fetchPromises = Object.entries(match_info).map(([siteName, apiUrl]) => fetchMatchData(apiUrl, siteName));
      const siteDataList = await Promise.all(fetchPromises);

      const oldHomeCompoContent = document.getElementById('home-compo').innerHTML;

      const homeCompoContent = document.getElementById('home-compo');
      homeCompoContent.innerHTML = '';

      siteDataList.forEach(({ siteName, data, error, apiUrl }) => {
         if (error) {
            console.error(`Failed to fetch data from ${siteName}. Error:`, error);
            return; // This 'return' will exit the current iteration of the loop only.
         }

         if (data) {
            dataReceived = true;
            generateDynamicSidebar(siteName);
            var generated_html = generate_html(siteName, apiUrl, data);
            if (generated_html) {
               homeCompoContent.innerHTML += generated_html;
            }
         }
      });

      if (!dataReceived) {
         // No proper data received from any API,
         console.error("All API URLS have failed!");
         homeCompoContent.innerHTML = oldHomeCompoContent;
      }
   } catch (error) {
      console.error('Error fetching match data:', error);
   }
}

//Generating each website match card like cricbuzz, espn, etc
function generate_html(siteName, apiUrl, matchdata) {
   var matchHTMLStart = `
   <div class="py-2" id='${siteName}-card'>
   <div class="sales-boxes">
      <div class="recent-sales box">
         <div class="title"><a href='${apiUrl}'>${siteName}</a></div>
         <div class="sales-details">
            <table class="table">
               <tbody>
               <tr class="details">
                  <td class="topic">Date</td>
                  <td class="topic">Match Key</td>
                  <td class="topic">Match</td>
                  <td class="topic">Inns 1</td>
                  <td class="topic">Inns 2</td>
               </tr>`;

   var matchHTMLEnd = `
               </tbody>
               </table> 
            </div>
            <div class="button">
               <a href="#">See All</a>
            </div>
         </div>
      </div>
   </div>`;

   var matchDetailsHTML = '';

   for (let [matchId, matchData] of Object.entries(matchdata)) {
      if (matchData.t1 !== undefined) {
         let match_status_class = (matchData.match_status === 'Live' ? 'running-match' : '');
         matchDetailsHTML += `
               <tr class="match-details ${match_status_class}">
                  <td>${(matchData.start_date_time != undefined && matchData.start_date_time !== '' ? format_date_time(matchData.start_date_time) : '---')}</td>
                  <td class=''>${matchId}</td>
                  <td><a class='${match_status_class}' href="${(matchData.match_url ? matchData.match_url : '#')}">${(matchData.t1.n ? matchData.t1.n : '---')} v ${(matchData.t2.n ? matchData.t2.n : '---')}</a></td>
                  <td>${matchData.i1.sc ? matchData.i1.sc : '---'}/${matchData.i1.wk ? matchData.i1.wk : '---'}(${matchData.i1.ov ? matchData.i1.ov : '---'})</td>
                  <td>${matchData.i2.sc ? matchData.i2.sc : '---'}/${matchData.i2.wk ? matchData.i2.wk : '---'}(${matchData.i2.ov ? matchData.i2.ov : '---'})</td>
               </tr>`;
      }
   }
   var matchHTML = matchHTMLStart + matchDetailsHTML + matchHTMLEnd;
   return matchHTML;
}

all_match_sites();

//Reload page afer 30 min
// setTimeout(function() {
//   location.reload();
// }, 1000*60*30);








