// ----------------------------------
// global

var flag = true,
    flagWin = false,
    flagLose = false,
    flagDie = false,
    flagCheck = false,
    tempTest = 0;

var flagConnect = false;
var flagPlayConnect = false;

//keyboard
var cursors;
var key_x;
//fire
var nextFire = 0;
var fireRate = 100;
var seedBullet = 600;

//game server
var gameInServer;

var locationMinister;
var minister;

// server
var socket;			// Socket connection

var score = 0;

// ----------------------------------
// background

var blockedLayer;
var backgroundlayer;
var map;


// ----------------------------------
// Player
var player;
var locationPlayer; // vi tri xuat hien
var playername;

var firePlayer;
var nextFirePlayer;
var fireFirePlayer;

var rotationPlayer = 0; 
var fireP = -1;

var level = 1;
var bulletsPlay = 1;

var bullets;

var playerRoom;
// ----------------------------------
// Player other

var	remotePlayers;	// Remote players
var numberPlayers;
var otherPlayers;


var playerId;

// ----------------------------------
// Enemies
var enemies;

var remoteEnemies = []; // array Enemies

var maxEnemies;      // number of loops of 1 screen


//var bulletTime = 0;
//var bullet;

var bulletsEnemies;
//var bulletTime = 0;
//var bulletEnemies;

//var nextFireEnemies = 0;
//var fireRateEnmies = 100;

// ----------------------------------
// explosions
var explosions;


// ----------------------------------
// bricks
var bricks;


