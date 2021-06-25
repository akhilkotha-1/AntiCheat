var hidden, visibilityChange;
var tswcounter = 0;
var eventtimeArray = [];
var eventwidthArray = [];
eventwidthArray.push(window.innerWidth);

function handlenew(eventdescription) {
  var entry = document.createElement("tr");

  var dt = new Date();
  if (parseInt(dt.getMinutes()) < 10) {
    minutes = "0" + dt.getMinutes();
  } else minutes = dt.getMinutes();
  if (parseInt(dt.getSeconds()) < 10) {
    seconds = "0" + dt.getSeconds();
  } else seconds = dt.getSeconds();
  var time = dt.getHours() + ":" + minutes + ":" + seconds;

  eventtimeArray.push(time);
  var entry = document.createElement("tr");
  var span = document.createElement("td");
  var txt = document.createTextNode(time);
  span.className = "text-secondary";
  span.appendChild(txt);
  entry.appendChild(span);
  entry.appendChild(document.createTextNode(eventdescription));
  list.appendChild(entry);
}

var list = document.getElementById("demo");

if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

var videoElement = document.getElementById("tabswitchescounter");
function handleVisibilityChange() {
  if (document[hidden]) {
    tswcounter = tswcounter + 1;
  } else {
    videoElement.innerHTML = tswcounter;
    handlenew("Tab Switched");
  }
}

if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log(
    "This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
  );
} else {
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}

var counter = 0;
var tabswitch = 0;
var resizeId;
const old = 0;
$(window).resize(function () {
  clearTimeout(resizeId);
  resizeId = setTimeout(doneResizing, 500);
});

function doneResizing() {
  counter = counter + 1;

  // console.log(window.outerWidth);
  var inner_width = window.innerWidth;
  var inner_height = window.innerHeight;

  var total_width = screen.width;
  var total_height = screen.height;
  var change = total_width - inner_width;
  eventwidthArray.push(inner_width);

  $("#screenwidth").text(total_width);
  $("#resize").text(inner_width);
  $("#count").text(counter);

  var string =
    "Window Resized " +
    eventwidthArray[eventwidthArray.length - 2] +
    " → " +
    eventwidthArray[eventwidthArray.length - 1];

  handlenew(string);
}
$(document).ready(function () {
  let apiKey = "1be9a6884abd4c3ea143b59ca317c6b2";
  $.getJSON(
    "https://ipgeolocation.abstractapi.com/v1/?api_key=" + apiKey,
    function (data) {
      let ip = data.ip_address;
      let region = data.region;
      let city = data.city;
      let timestart = data.timezone.current_time;
      $("#ip").text(ip);
      $("#location").text(`${city}, ${region}`);
      $("#timestart").text(timestart);
      var total_width = screen.width;
      var total_height = screen.height;

      $("#screenwidth").text(screen.width);
      $("#resize").text(window.innerWidth);

      // console.log(JSON.stringify(data, null, 2));
    }
  );

  var ctrlDown = false,
    ctrlKey = 17,
    cmdKey = 91,
    vKey = 86,
    cKey = 67;

  $(document)
    .keydown(function (e) {
      if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    })
    .keyup(function (e) {
      if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
    });
  // Document Ctrl + C/V
  $(document).keydown(function (e) {
    if (ctrlDown && e.keyCode == cKey) {
      handlenew("Copy Detected");
    }
    if (ctrlDown && e.keyCode == vKey) {
      handlenew("Paste Detected");
    }
  });
});

$(document).ready(function () {
  // Set the date we're counting down to

  // var countDownDate = new Date("2021-04-20T09:30:51.01").getTime();
  var countDownDate = new Date();
  countDownDate.setMinutes(countDownDate.getMinutes() + 11); // timestamp

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds

    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML =
      hours + "h " + minutes + "m " + seconds + "s ";

    if (minutes <= 5) {
      document.getElementById("timedcolor").style.background = "#FF5216";
    }

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);

  $("#btnShowHide").click(function () {
    $("#divShowHide").toggle();
    if ($(this).text() == "Hide Timer") {
      $(this).text("Show Timer");
    } else {
      $(this).text("Hide Timer");
    }
  });
});