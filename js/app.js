/* Ui */
let searchContry = document.querySelector("#_valueSearch");
let btnSearch = document.querySelector(".btnSearch");

let a = 0;
let b = 0;
let c = 0;
let d = 0;


btnSearch.addEventListener("click", fnSearch, false);
function fnSearch() {
   
    if (searchContry.value === "") {
        showData();
        return;
    }

    const data = countries.filter(country => country.name.toLowerCase() == searchContry.value.trim().toLowerCase());
    
    if (data.length === 0) {
        document.querySelector("#error").innerHTML = `<p class="p-4 bg-red-400 text-gray-100 m-2"> ${searchContry.value} is not a country name </p>`;
        setTimeout(() => document.querySelector("#error").innerHTML = "" , 2000);
       
        showData();
    }
  
   // const w = setTimeout(() => {
        
        document.querySelector(".output").innerHTML = `
        <div class="m-6 font-bold text-2xl mb-4 text-center">
       
        Total Global
    
    </div>
    
     <div class="m-4 bg-gray-100 shadow-ls hover:shadow-xl rounded-2xl">
     <!-- Four columns -->
     <div class="flex mb-4">
     <div class="w-1/4 bg-gray-400 h-12 text-center"> Confirmed </div>
     <div class="w-1/4 bg-gray-400 h-12 text-center"> Recovered </div>
     <div class="w-1/4 bg-gray-400 h-12 text-center"> Critical </div>
     <div class="w-1/4 bg-gray-400 h-12 text-center"> Deaths </div>
     </div>
    
     <div class="flex mb-4">
     <div class="w-1/4 bg-gray-100 h-12 text-center"> ${a} </div>
     <div class="w-1/4 bg-gray-100 h-12 text-center"> ${b} </div>
     <div class="w-1/4 bg-gray-100 h-12 text-center"> ${c} </div>
     <div class="w-1/4 bg-gray-100 h-12 text-center">${d} </div>
     </div>
     </div>
     
    
            <div class="text-left font-bold text-3xl ml-4 mt-4 mb-4" > Country </div>
    
            <div class="m-4">
    
            <div class="bg-gray-100  m-6 font-bold text-2xl mb-4 text-center">
             <p class="text-gray-700">
              ${data[0].name} 
             </p>
            </div>
    
            <!-- Four columns -->
            <div class="flex">
            <div class="w-1/4 bg-gray-400 h-12 text-center"> Confirmed </div>
            <div class="w-1/4 bg-gray-400 h-12 text-center"> Recovered </div>
            <div class="w-1/4 bg-gray-400 h-12 text-center"> Critical </div>
            <div class="w-1/4 bg-gray-400 h-12 text-center"> Deaths </div>
            </div>
    
            <div class="flex">
            <div class="w-1/4 bg-gray-100 h-12 text-center"> ${data[0].confirmed} </div>
            <div class="w-1/4 bg-gray-100 h-12 text-center"> ${data[0].recovered} </div>
            <div class="w-1/4 bg-gray-100 h-12 text-center"> ${data[0].critical} </div>
            <div class="w-1/4 bg-gray-100 h-12 text-center">${data[0].deaths} </div>
            </div>
    
           
       
    
            </div>
    
            
    
    
          
       
    
     </div>       
    
        `;

   // },300)

   
    
     
}


let country = {
    name: String,
    confirmed: String,
    recovered: String,
    critical: String,
    deaths: String
}
let totals = {
    confirmed: Number,
    recovered: Number,
    critical: Number,
    deaths: Number
}
let countries = [];

function getData() {
    fetch("https://covid-19-data.p.rapidapi.com/country/all?format=json", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": "a4d88542ddmsh83b0bba200cbeadp153617jsn8ecb1e30a036"
        }
    })
    .then(response => {
        return response.json();
        
    
    })
        .then((data) => {
            data.forEach(e => {
               // console.log(e.country, e.confirmed, e.recovered, e.critical, e.deaths);
                country = {
                    name: e.country,
                    confirmed: e.confirmed,
                    recovered: e.recovered,
                    critical: e.critical,
                    deaths: e.deaths
                };
                countries.push(country);
                return countries;
            });
    })
    .catch(err => {
        console.log(err);
    });
    return countries;
}

let data = getData();





function totalConfirmed() {
    let initialValue = 0
    let sum = data.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.confirmed
    }, initialValue);
    totals.confirmed = sum;
    return sum;
}
function totalRecovered() {
    let initialValue = 0
    let sum = data.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.recovered
    }, initialValue);
    totals.recovered = sum;
    return sum;
}
function totalCritical() {
    let initialValue = 0
    let sum = data.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.critical
    }, initialValue);
    totals.critical = sum;
    return sum;
}
function totalDeaths() {
    let initialValue = 0
    let sum = data.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.deaths
    }, initialValue);
    totals.deaths = sum;
    return sum;

}

const esperar = setTimeout(showData, 300);


function showData(){
    const confirmed = totalConfirmed();
    const recovered = totalRecovered();
    const critical = totalCritical();
    const deaths = totalDeaths();

    let conf = new Intl.NumberFormat('de-DE').format(confirmed);
    let reco = new Intl.NumberFormat('de-DE').format(recovered);
    let criti = new Intl.NumberFormat('de-DE').format(critical);
    let death = new Intl.NumberFormat('de-DE').format(deaths);

    a = conf;
    b = reco;
    c = criti;
    d = death;

    let lista = "";
    countries.map( country => {
             
        lista += `<div class="m-4">

        <div class="bg-gray-100  m-6 font-bold text-2xl mb-4 text-center">
         <p class="text-gray-700">
          ${country.name} 
         </p>
        </div>

        <!-- Four columns -->
        <div class="flex">
        <div class="w-1/4 bg-gray-400 h-12 text-center"> Confirmed </div>
        <div class="w-1/4 bg-gray-400 h-12 text-center"> Recovered </div>
        <div class="w-1/4 bg-gray-400 h-12 text-center"> Critical </div>
        <div class="w-1/4 bg-gray-400 h-12 text-center"> Deaths </div>
        </div>

        <div class="flex">
        <div class="w-1/4 bg-gray-100 h-12 text-center"> ${country.confirmed} </div>
        <div class="w-1/4 bg-gray-100 h-12 text-center"> ${country.recovered} </div>
        <div class="w-1/4 bg-gray-100 h-12 text-center"> ${country.critical} </div>
        <div class="w-1/4 bg-gray-100 h-12 text-center">${country.deaths} </div>
        </div>

       
   

        </div>
        
       `;
        
        
      

    });
    

    google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
    google.charts.setOnLoadCallback(drawRegionsMap);
  

    function drawRegionsMap() {
     
        let arr = ["Country", "Confirmed"];
        let objs = [];
        objs.push(arr);
        countries.forEach(elem => {
            let obj = [`${elem.name}`, `${elem.confirmed}`];
            objs.push(obj);
            
        });
      
        var data = google.visualization.arrayToDataTable(objs);
    
        var options = {};
    
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    
        chart.draw(data, options);
    }
    
    document.querySelector(".output").innerHTML = `

  

    <div class="m-6 font-bold text-2xl mb-4 text-center">
   
       Total Global
 
   </div>

    <div class="m-4 bg-gray-100 shadow-ls hover:shadow-xl rounded-2xl">
    <!-- Four columns -->
    <div class="flex mb-4">
    <div class="w-1/4 bg-gray-400 h-12 text-center"> Confirmed </div>
    <div class="w-1/4 bg-gray-400 h-12 text-center"> Recovered </div>
    <div class="w-1/4 bg-gray-400 h-12 text-center"> Critical </div>
    <div class="w-1/4 bg-gray-400 h-12 text-center"> Deaths </div>
    </div>

    <div class="flex mb-4">
    <div class="w-1/4 bg-gray-100 h-12 text-center"> ${conf} </div>
    <div class="w-1/4 bg-gray-100 h-12 text-center"> ${reco} </div>
    <div class="w-1/4 bg-gray-100 h-12 text-center"> ${criti} </div>
    <div class="w-1/4 bg-gray-100 h-12 text-center">${death} </div>
    </div>
    </div>
    
   
           <div class="text-left font-bold text-3xl ml-4 mt-4 mb-4" > Countries </div>
           ${lista}
      

    </div> 

  
  
 
    `;

}
