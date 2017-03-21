class ObjectTest extends Game {
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

	
		this.airboat=null;

		Models.load('obj/airboat.obj');
		this.spacedown=false;
		this.checker=false;
	}
	tick() {
		if(Models.models['airboat.obj'].raw.length>0 && !this.checker) {
			var airboat=Models.models['airboat.obj'];
			var vertNormals=new Array(airboat.verts.length);
			for(var i=0; i<airboat.verts.length;i++) {
				vertNormals[i]=i%3==2?1:0;
			}
			this.airboat=this.addChild(new Mesh(airboat.verts,airboat.faces,vertNormals));
			this.checker=true;
			this.airboat.scale=0.1;
			this.airboat.start();	
		}

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
