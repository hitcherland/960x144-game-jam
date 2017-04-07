function skipVideo() {
	window.removeEventListener('touchstart',touchy);
	window.removeEventListener('keydown',spacey);
	var jam_video=document.getElementById('jam_video');
	var jam_container=document.getElementById('jam_container');
	jam_video.pause();
	jam_video.style.opacity=0;
	jam_container.style.opacity=1;
	new Pattern('jam_container');
}
var touchy = window.addEventListener("touchstart",function(ev) { skipVideo(); },false);
var spacey = window.addEventListener("keydown",function(ev) { if(ev.key==" ") skipVideo(); },false);

function fadeOut() {
	var jam_video=document.getElementById('jam_video');
	var jam_container=document.getElementById('jam_container');
	if(!jam_video.style.opacity) {
		jam_video.style.opacity=1;	
		jam_container.style.opacity=0;	
	}
	if(jam_video.style.opacity>0) {
		requestAnimFrame(fadeOut.bind(this));
		jam_video.style.opacity-=0.01;
		jam_container.style.opacity=1-jam_video.style.opacity;
	} else {
		jam_container.style.opacity=1;
		new Pattern('jam_container');
	}
}

class Pattern extends Game {
	start() {
		super.start();

		var this_=this;
		this.keydown={}
		this.touchdown=0;
		this.period=6000;
		this.positional_period=30;
		this.positional_period_acceleration=0;
		addEventListener("keydown",function(ev) { this_.keydown[ev.key]=ev; });
		addEventListener("keyup",function(ev) { delete this_.keydown[ev.key]; });

		addEventListener("touchstart",function(ev) { this_.touchdown+=1 },false);
		addEventListener("touchend",function(ev) { this_.touchdown-=1 },false);
		addEventListener("touchcancel",function(ev) { this_.touchdown-=1 },false);

		this.directionalLightPosition=[0,1,1];

		this.width=960;
		this.height=144;

		this.grid=this.addChild(new Grid(Math.floor(1+this.width/5),Math.floor(1+this.height/5),5));
		this.mul = (Date.now()*9923123)%145231231;
		this.mod = (Date.now()*4561232)%4489713;
		this.positional_adjuster=function(i) { return ((i*this_.mul)%this_.mod)/this_.positional_period; }
		this.spacedown=false;
		this.fingerdown=false;
	}
	tick() {
		if(this.keydown[" "] && !this.spacedown) {
			this.spacedown=true;
			this.mul = (Date.now()*9923123)%145231231;
			this.mod = (Date.now()*4561232)%4489713;
			var scale = 10*Math.exp(Math.pow(Math.random()-0.5,2)*8);	
			this.grid.resize(Math.floor(1+this.width/scale),Math.floor(1+this.height/scale),scale);
		}
		if(this.touchdown>0 && !this.fingerdown) {
			this.fingerdown=true;
			this.mul = (Date.now()*9923123)%145231231;
			this.mod = (Date.now()*4561232)%4489713;
			var scale = 10*Math.exp(Math.pow(Math.random()-0.5,2)*8);	
			this.grid.resize(Math.floor(1+this.width/scale),Math.floor(1+this.height/scale),scale);
		}
		if(this.touchdown==0) {
			this.fingerdown=false;
		}

		if(!this.keydown[" "]) {
			this.spacedown=false;
		}

		this.positional_period+=this.positional_period_acceleration;
		var normals=this.grid.normals;
		for(var i=2; i<this.grid.normals.length; i+=3) {
			normals[i]=Math.cos(2 * Math.PI * (Date.now()/this.period)+this.positional_adjuster(i));
		}
		this.grid.normals=normals;
	}
}
