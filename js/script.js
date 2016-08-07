// JSON Http Request
function loadJSON(callback) {  
  var request = new XMLHttpRequest();
  request.open("GET","data/input-data.json");
  request.onreadystatechange = function() {
    if ((request.readyState == 4) && (request.status == "200")) {
      callback(request.responseText);
    }
  }
  request.send();
}

// JSON Http Response
function init() {
  loadJSON(function(response) {
    var status = JSON.parse(response).status;
    console.log("status: "+status);

    var priceIncreasesPercentage = JSON.parse(response).data.priceIncreasesPercentage;
    var priceIncreasesValue = JSON.parse(response).data.priceIncreasesValue;
    var priceDropsPercentage = JSON.parse(response).data.priceDropsPercentage;
    var priceDropsValue = JSON.parse(response).data.priceDropsValue;
    var priceNoChangePercentage = JSON.parse(response).data.priceNoChangePercentage;
    var priceNoChangeValue = JSON.parse(response).data.priceNoChangeValue;
    console.log(priceIncreasesPercentage+" "+priceIncreasesValue+" "+priceDropsPercentage+" "+priceDropsValue+" "+priceNoChangePercentage+" "+priceNoChangeValue);

    var label1 = JSON.parse(response).data.data[0].label;
    var data1 = JSON.parse(response).data.data[0].data;
    var color1 = JSON.parse(response).data.data[0].color;
    var label2 = JSON.parse(response).data.data[1].label;
    var data2 = JSON.parse(response).data.data[1].data;
    var color2 = JSON.parse(response).data.data[1].color;
    var label3 = JSON.parse(response).data.data[2].label;
    var data3 = JSON.parse(response).data.data[2].data;
    var color3 = JSON.parse(response).data.data[2].color;
    console.log(label1+" "+data1+" "+color1+" "+label2+" "+data2+" "+color2+" "+label3+" "+data3+" "+color3);

    // Get language parameter
    var GET = {};
    var query = window.location.search.substring(1).split("&");
    for (var i = 0, max = query.length; i < max; i++)
    {
        if (query[i] === "") // check for trailing & with no param
            continue;

        var param = query[i].split("=");
        GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
    }

    var language = GET["lang"];
    console.log(language);

    if (language == "en") {
      label1="Price increases";
      label2="Price drops";
      label3="No price changes";
    }
    if (language == "sr") {
      label1="Поскупљења";
      label2="Појефтињења";
      label3="Без промене цене";
    }

    var increasesStart = document.getElementsByClassName("increases-start")[0];
    var increasesAmount = document.getElementsByClassName("increases-amount")[0]; 
    var dropsStart = document.getElementsByClassName("drops-start")[0];
    var dropsAmount = document.getElementsByClassName("drops-amount")[0];
    var noChangeStart = document.getElementsByClassName("no-change-start")[0];
    var noChangeAmount = document.getElementsByClassName("no-change-amount")[0];

    var increasesColor = document.getElementsByClassName("increases-color")[0];
    var dropsColor = document.getElementsByClassName("drops-color")[0];
    var noChangeColor = document.getElementsByClassName("no-change-color")[0];

    var increases2ndHalf = document.getElementsByClassName("increases-color")[1]; 
    var drops2ndHalf = document.getElementsByClassName("drops-color")[1]; 
    var noChange2ndHalf = document.getElementsByClassName("no-change-color")[1]; 

    function fillChart(x1,x2,x3,y1,y2,y3){
      x1=x1/100*360;
      x2=x2/100*360;
      x3=x3/100*360;

      increasesAmount.style.webkitTransform = "rotate("+x1+"deg)";
      increasesAmount.style.MozTransform = "rotate("+x1+"deg)";
      increasesAmount.style.msTransform = "rotate("+x1+"deg)";
      increasesAmount.style.OTransform = "rotate("+x1+"deg)";
      increasesAmount.style.transform = "rotate("+x1+"deg)";

      dropsStart.style.webkitTransform = "rotate("+x1+"deg)";
      dropsStart.style.MozTransform = "rotate("+x1+"deg)";
      dropsStart.style.msTransform = "rotate("+x1+"deg)";
      dropsStart.style.OTransform = "rotate("+x1+"deg)";
      dropsStart.style.transform = "rotate("+x1+"deg)";

      dropsAmount.style.webkitTransform = "rotate("+x2+"deg)";
      dropsAmount.style.MozTransform = "rotate("+x2+"deg)";
      dropsAmount.style.msTransform = "rotate("+x2+"deg)";
      dropsAmount.style.OTransform = "rotate("+x2+"deg)";     
      dropsAmount.style.transform = "rotate("+x2+"deg)";

      noChangeStart.style.webkitTransform = "rotate("+(x1+x2)+"deg)";
      noChangeStart.style.MozTransform = "rotate("+(x1+x2)+"deg)";
      noChangeStart.style.msTransform = "rotate("+(x1+x2)+"deg)";
      noChangeStart.style.OTransform = "rotate("+(x1+x2)+"deg)";     
      noChangeStart.style.transform = "rotate("+(x1+x2)+"deg)";

      noChangeAmount.style.webkitTransform = "rotate("+x3+"deg)";
      noChangeAmount.style.MozTransform = "rotate("+x3+"deg)";
      noChangeAmount.style.msTransform = "rotate("+x3+"deg)";
      noChangeAmount.style.OTransform = "rotate("+x3+"deg)";    
      noChangeAmount.style.transform = "rotate("+x3+"deg)";

      increasesColor.style.backgroundColor = y1;
      dropsColor.style.backgroundColor = y2;
      noChangeColor.style.backgroundColor = y3;

      if(x1>180){
      increases2ndHalf.style.backgroundColor = y1;
      increases2ndHalf.style.display = "block";
      increasesStart.className += " square";
      increasesAmount.className += " move";
      }
      if(x2>180){
      drops2ndHalf.style.backgroundColor = y2;
      drops2ndHalf.style.display = "block";
      dropsStart.className += " square";
      dropsAmount.className += " move";
      }
      if(x3>180){
      noChange2ndHalf.style.backgroundColor = y3;
      noChange2ndHalf.style.display = "block";
      noChangeStart.className += " square";
      noChangeAmount.className += " move";
      }
    };    

    var text1 = document.getElementById("text1");
    var value1 = document.getElementById("value1");
    var percentageColor1 = document.getElementById("color1");
    var percentage1 = document.getElementById("percentage1");
    var text2 = document.getElementById("text2");
    var value2 = document.getElementById("value2");
    var percentageColor2 = document.getElementById("color2");
    var percentage2 = document.getElementById("percentage2");
    var text3 = document.getElementById("text3");
    var value3 = document.getElementById("value3");
    var percentageColor3 = document.getElementById("color3");
    var percentage3 = document.getElementById("percentage3");

    function populateList(){

      text1.innerHTML = label1;
      value1.innerHTML = priceIncreasesValue;
      percentageColor1.style.color = color1;
      percentage1.innerHTML = priceIncreasesPercentage;

      text2.innerHTML = label2;
      value2.innerHTML = priceDropsValue;
      percentageColor2.style.color = color2;
      percentage2.innerHTML = priceDropsPercentage;

      text3.innerHTML = label3;
      value3.innerHTML = priceNoChangeValue;
      percentageColor3.style.color = color3;
      percentage3.innerHTML = priceNoChangePercentage;
    };   

    fillChart(data1,data2,data3,color1,color2,color3);

    populateList();

  });
}

window.onload = function() {
  init();
};