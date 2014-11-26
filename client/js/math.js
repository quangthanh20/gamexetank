
// Assorted rendering utilities

function MakeColor(r,g,b) {
	return "rgb("+Math.floor(Clamp(r, 0, 255))+","+Math.floor(Clamp(g, 0, 255))+","+Math.floor(Clamp(b, 0, 255))+")";
}

// Assorted math utilities

function Pow2(v) {
	return v*v;
}

function Lerp(a,b,t) {
	return a+(b-a)*t;
}

function Clamp(v,a,b) {
	return Math.max(a,Math.min(v,b));
}

function RandomInt(v) {
	return Math.floor(Math.random()*v);
}

function RandomIntRange(a,b) {
	return Math.floor(Math.random()*(b-a)+a);
}

function RandomFloat(v) {
	return Math.random()*v;
}

function RandomFloatRange(a,b) {
	return Math.random()*(b-a)+a;
}

function RandomColor(min, max) {
	return MakeColor(RandomIntRange(min, max), RandomIntRange(min, max), RandomIntRange(min, max));
}

/*function distanceToPointer(displayObject, pointer) {

    this._dx = displayObject.x - pointer.x;
    this._dy = displayObject.y - pointer.y;
    
    return Math.sqrt(this._dx * this._dx + this._dy * this._dy);

};

function moveToXY(displayObject, x, y, speed) {

    var _angle = Math.atan2(y - displayObject.y, x - displayObject.x);
    
    var x = Math.cos(_angle) * speed;
    var y = Math.sin(_angle) * speed;

    return { x: x, y: y };       

};*/