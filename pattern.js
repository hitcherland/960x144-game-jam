class Pattern extends Game {
	start() {
		super.start();

		var this_=this;
		this.keydown={}
		this.period=6000;
		this.positional_period=30;
		this.positional_period_acceleration=0;
		addEventListener("keydown",function(ev) {
			this_.keydown[ev.key]=ev;
		});
		addEventListener("keyup",function(ev) {
			delete this_.keydown[ev.key];
		});

		this.directionalLightPosition=[0,1,1];

		this.width=960;
		this.height=144;

		
		this.grid=this.addChild(new Grid(Math.floor(1+this.width/5),Math.floor(1+this.height/5),5));
		this.mul = (Date.now()*9923123)%145231231;
		this.mod = (Date.now()*4561232)%4489713;
		//function(i) { return ((i*9923123)%1231231)/this_.positional_period; },
		this.positional_adjuster=function(i) { return ((i*this_.mul)%this_.mod)/this_.positional_period; }

		this.spacedown=false;
	}
	tick() {

		if(this.keydown[" "] && !this.spacedown) {
			this.spacedown=true;
			this.mul = (Date.now()*9923123)%145231231;
			this.mod = (Date.now()*4561232)%4489713;
			var scale = 10*Math.exp(Math.pow(Math.random()-0.5,2)*8);	
			this.grid.resize(Math.floor(1+this.width/scale),Math.floor(1+this.height/scale),scale);
			console.log(scale);
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

//		if(this.keydown["ArrowUp"]) {
//			this.positional_period_acceleration+=0.000001;
//		}
//		if(this.keydown["ArrowDown"]) {
//			this.positional_period_acceleration-=0.000001;
//		}
//
//		if(this.keydown["ArrowLeft"]) {
//			this.positional_period+=0.00001;
//		}
//		if(this.keydown["ArrowRight"]) {
//			this.positional_period-=0.00001;
//		}
	}
}
