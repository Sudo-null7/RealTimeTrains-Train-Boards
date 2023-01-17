window.onload = function() {
    fetch('demo.json')
    // edit above
      .then(response => response.json())
      .then(trains => {
        const trainList = document.getElementById('train-list');
        const limitedTrains = trains.services;
        limitedTrains.forEach(train => {
          const row = document.createElement('tr');
  
          const letterCell = document.createElement('td');
          letterCell.textContent = train.atocName;
          row.appendChild(letterCell);
  
          const linesEnCell = document.createElement('td');
          linesEnCell.innerHTML = train.locationDetail.destination[0].description;
          linesEnCell.classList.add("trainMessages");
          row.appendChild(linesEnCell);
  
          const timeCell = document.createElement('td');
          timeCell.classList.add("trainTimes");
          const hour = train.locationDetail.realtimeArrival.slice(0, 2);
          const min = train.locationDetail.realtimeArrival.slice(2);
          timeCell.textContent = `${hour}:${min}`;
  
          if (train.atocCode == "ZZ") {
            timeCell.style.backgroundColor = "#e0e08d";
            timeCell.style.color = "black";
            linesEnCell.style.backgroundColor = "#e0e08d";
            linesEnCell.style.color = "black";
            letterCell.style.backgroundColor = "#e0e08d";
            letterCell.style.color = "black";
          }
  
          row.appendChild(timeCell);
  
          trainList.appendChild(row);
        });
      });
  }
  
  setInterval(function() {
    // code to refresh the page goes here
    location.reload();
  }, 30000); // 60000 milliseconds = 1 minute
  
  setInterval(showTime, 1000);
  function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";
  
    if (hour > 12) {
      hour -= 12;
      am_pm = " PM";
    }
    if (hour == 0) {
      hr = 12;
      am_pm = " AM";
    }
  
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
  
    let currentTime = hour + ":"
      + min + ":" + sec + am_pm;
  
    document.getElementById("clock").innerHTML = currentTime;
  }
  showTime();
  
