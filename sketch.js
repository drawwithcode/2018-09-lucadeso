var mySong;
var analyzer;

var myLoc;
var myMap;
var canvas;

var mappa = new Mappa('MapboxGL', 'pk.eyJ1IjoibHVjYWRlc29ndXMiLCJhIjoiY2pvcjBqZHZjMGF0aDNwcWk2cmNqd29peCJ9.vJnpFGqxZ3k50dGWPCVpnA');

// villaggio di babbo natale
var lapponiaLat = 66.543303;
var lapponiaLng = 25.8410652;

//
options = {
  lat: 0,
  lng: 0,
  zoom: 0.5,
  style: 'mapbox://styles/lucadesogus/cjp0a7ft302kn2rpink224bmb'
}

var lapponia = {
	lat: lapponiaLat,
	lng: lapponiaLng,
	name: 'Santa Claus Village',
}

function preload(){
  mySong = loadSound("./assets/Snowman_Instrumental.mp3");
  myLoc = getCurrentPosition();
}


function setup() {

  canvas = createCanvas(windowWidth, windowHeight);

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

  mySong.loop();

  options.lat = myLoc.latitude;
  options.lng = myLoc.longitude;

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);



}

// Usare MapBox per scegliere una mappa personalizzata (i due url vanno uno vicino a new mappa e l'altro in style)

function draw() {

  var volume = 0;
  if (mouseX > -10) {
    if (mySong.isPlaying() == false) {
      mySong.play();
    }
    volume = analyzer.getLevel();
    volume = map(volume,0,1,0,height/10);
  } else {
    background(255,0,0);
    mySong.stop();
  }

  clear();


  // testo da usare fisso
  stroke('green');
  fill('white');
  textFont('Alegreya');
  strokeWeight(6);
  textSize(30);
  text('How far are you from Santa Claus?', 50, 50);

  // posizione tua
  fill('white');
  strokeWeight(3);
  textSize(14);
  textFont('Alegreya');
  var pointHere = myMap.latLngToPixel(myLoc.latitude, myLoc.longitude);

  // posizione babbo natale
  var distanceLapponia = calcGeoDistance(myLoc.latitude, myLoc.longitude, lapponiaLat, lapponiaLng, "km");
  fill('white');
  textSize(14);
  textFont('Alegreya');
  var pointLapponia = myMap.latLngToPixel(lapponiaLat, lapponiaLng);


  // elementi grafici
  stroke('#2E64FE');
  strokeWeight(3);
  line(pointHere.x, pointHere.y, pointLapponia.x, pointLapponia.y);
  ellipse(pointHere.x, pointHere.y, 15);
  ellipse(pointLapponia.x, pointLapponia.y, 15);
  strokeWeight(5);
  text('Here you are', pointHere.x -35, pointHere.y-15);
  text('Santa Claus is ' + Math.round(distanceLapponia) + 'km far' , pointLapponia.x - 80, pointLapponia.y-15);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
