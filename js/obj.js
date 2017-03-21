class Model {
	constructor() {
		this.raw=""
		this.verts=[];
		this.vertNormals=[];
		this.faces=[];
		this.textures=[];
		this.unpacked=[];
	}

	fromFile(content) {
		this.raw=content;
		var FACE_RE=/^f\s+/;
		var VERTEX_RE=/^v\s+/;
		var VERTEX_NORMAL_RE=/^vn\s+/;
		
		var lines=content.split('\n');
		for(var i=0; i<lines.length; i++) {
			var line=lines[i].trim();
			var elements=line.split(/\s+/);
			elements.shift();
			if(FACE_RE.test(line)) {
				for(var j=0; j<elements.length;j++) {
					elements[j]=parseInt(elements[j])-1;
				}
				while(elements.length>=3) {
					elements.push(elements[0])
					this.faces.push.apply(this.faces,elements.slice(0,3));
					elements.splice(0,2);
				}
			} else if(VERTEX_RE.test(line)) {
				elements[0]=parseFloat(elements[0])
				elements[1]=parseFloat(elements[1])
				elements[2]=parseFloat(elements[2])
				this.verts.push.apply(this.verts,elements);
			} else if(VERTEX_NORMAL_RE.test(line)) {
				this.verts.push.apply(this.vertNormals,elements);
			}
		}
	}
}

var Models = {
	models:{},
	loader:new XMLHttpRequest(),
	onObjectLoaded:function() {
		var filepath=this.responseURL;
		var objContent=this.responseText;

		fileArray=filepath.split('/');
		filename=fileArray[fileArray.length-1];
		Models.models[filename]=new Model();
		Models.models[filename].fromFile(objContent);
	},
	load:function(file) {
		//Models.loader.setRequestHeaders('accept-encoding','gzip')
		fileArray=file.split('/');
		filename=fileArray[fileArray.length-1];
		Models.models[filename]=new Model();
		Models.loader.open("GET",file);
		Models.loader.send();
	},
}

Models.loader.addEventListener("load", Models.onObjectLoaded);
