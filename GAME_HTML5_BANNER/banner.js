(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.button_1 = function() {
	this.initialize(img.button_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,282,64);


(lib.clikni = function() {
	this.initialize(img.clikni);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,250,136);


(lib.button_2 = function() {
	this.initialize(img.button_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,282,64);


(lib.gate = function() {
	this.initialize(img.gate);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,183,119);


(lib.el1 = function() {
	this.initialize(img.el1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,138,160);


(lib.arrows = function() {
	this.initialize(img.arrows);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,53,55);


(lib.Layer_2 = function() {
	this.initialize(img.Layer_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,600,1200);


(lib.Group = function() {
	this.initialize(img.Group);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,282,162);


(lib.result0 = function() {
	this.initialize(img.result0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,140,84);


(lib.result3 = function() {
	this.initialize(img.result3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,140,84);


(lib.Rectangle_4 = function() {
	this.initialize(img.Rectangle_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,10,80);


(lib.left = function() {
	this.initialize(img.left);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,50,56);


(lib.result_12 = function() {
	this.initialize(img.result_12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,140,84);


(lib.result6 = function() {
	this.initialize(img.result6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,140,84);


(lib.road = function() {
	this.initialize(img.road);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,600);


(lib.q1 = function() {
	this.initialize(img.q1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,282,175);


(lib.sneg = function() {
	this.initialize(img.sneg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,155,55);


(lib.snegovik = function() {
	this.initialize(img.snegovik);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,155,104);


(lib.toyo_tires_gift_box = function() {
	this.initialize(img.toyo_tires_gift_box);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,189,211);


(lib.deer = function() {
	this.initialize(img.deer);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,156);


(lib.warning = function() {
	this.initialize(img.warning);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,236,208);


(lib.wheel1 = function() {
	this.initialize(img.wheel1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,245,361);


(lib.wheel2 = function() {
	this.initialize(img.wheel2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,246,366);


(lib.result9 = function() {
	this.initialize(img.result9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,140,84);


(lib.driver = function() {
	this.initialize(img.driver);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,306,280);


(lib.right = function() {
	this.initialize(img.right);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,53,55);


(lib.el2 = function() {
	this.initialize(img.el2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,102);


(lib.broken = function() {
	this.initialize(img.broken);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,547,499);


(lib.led = function() {
	this.initialize(img.led);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,112,36);


(lib.Group_1 = function() {
	this.initialize(img.Group_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,10,440);


(lib.red = function() {
	this.initialize(img.red);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,140,84);


(lib.toyo_tires_logo = function() {
	this.initialize(img.toyo_tires_logo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,51);


(lib.road_wide = function() {
	this.initialize(img.road_wide);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,622,1200);


(lib.Group_4 = function() {
	this.initialize(img.Group_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,650,754);


(lib.buttontogame = function() {
	this.initialize(img.buttontogame);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,282,64);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween36 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.left();
	this.instance.setTransform(-22.5,-25.2,0.9,0.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.5,-25.2,45,50.4);


(lib.Tween35 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.left();
	this.instance.setTransform(-25,-28);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25,-28,50,56);


(lib.Tween34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.right();
	this.instance.setTransform(-38.1,-0.75,0.9983,0.9983,-44.8823);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.1,-38.1,76.30000000000001,76.30000000000001);


(lib.Tween33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.right();
	this.instance.setTransform(-34.3,-0.7,0.8985,0.8985,-44.9064);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.3,-34.3,68.69999999999999,68.6);


(lib.Tween32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.right();
	this.instance.setTransform(-38.2,-0.7,1,1,-44.9994);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.2,-38.2,76.4,76.4);


(lib.Tween30 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.driver();
	this.instance.setTransform(-153,-140);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-153,-140,306,280);


(lib.Tween29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.led();
	this.instance.setTransform(-68.4,-19.6,1.2214,1.0887);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-19.6,136.8,39.2);


(lib.Tween28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.led();
	this.instance.setTransform(-68.4,-19.6,1.2214,1.0887);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-19.6,136.8,39.2);


(lib.Tween27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.wheel2();
	this.instance.setTransform(-123,-183);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-123,-183,246,366);


(lib.Tween26 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.deer();
	this.instance.setTransform(-6.75,-10.8,0.1385,0.1385);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.7,-10.8,13.5,21.6);


(lib.Tween25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.deer();
	this.instance.setTransform(-6.75,-10.8,0.1385,0.1385);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.7,-10.8,13.5,21.6);


(lib.Tween24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.arrows();
	this.instance.setTransform(34.25,-2.5,0.8985,0.8985,0,41.8968,-138.1032);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.2,-34.3,68.5,68.6);


(lib.Tween23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.arrows();
	this.instance.setTransform(38.1,-2.7,1,1,0,41.9998,-138.0002);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.1,-38.1,76.2,76.30000000000001);


(lib.Tween22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.wheel2();
	this.instance.setTransform(-123,-183);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-123,-183,246,366);


(lib.Tween21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.toyo_tires_gift_box();
	this.instance.setTransform(-99.9,-100.4,1,1,-3.0001);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.9,-110.3,199.8,220.6);


(lib.Tween20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.toyo_tires_gift_box();
	this.instance.setTransform(-99.9,-100.4,1,1,-3.0001);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.9,-110.3,199.8,220.6);


(lib.Tween19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group();
	this.instance.setTransform(-141,-81);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-141,-81,282,162);


(lib.Tween18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group();
	this.instance.setTransform(-141,-81);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-141,-81,282,162);


(lib.Tween17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.snegovik();
	this.instance.setTransform(-13.55,-9.1,0.1752,0.1752);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.5,-9.1,27.1,18.2);


(lib.Tween16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.snegovik();
	this.instance.setTransform(-13.55,-9.1,0.1752,0.1752);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.5,-9.1,27.1,18.2);


(lib.Tween15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.q1();
	this.instance.setTransform(-141,-87.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-141,-87.5,282,175);


(lib.Tween14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.q1();
	this.instance.setTransform(-141,-87.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-141,-87.5,282,175);


(lib.Tween13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.toyo_tires_logo();
	this.instance.setTransform(-150,-25.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,-25.5,300,51);


(lib.Tween12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.toyo_tires_logo();
	this.instance.setTransform(-150,-25.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,-25.5,300,51);


(lib.Tween11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.wheel1();
	this.instance.setTransform(-122.5,-180.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.5,-180.5,245,361);


(lib.Tween10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.warning();
	this.instance.setTransform(-108.45,-113.85,1,1,5.0002);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-126.6,-113.8,253.3,227.7);


(lib.Tween9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.warning();
	this.instance.setTransform(-118,-104);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118,-104,236,208);


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_1();
	this.instance.setTransform(-5,-220);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-220,10,440);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_4();
	this.instance.setTransform(-139.25,-65.65,0.3093,0.3093,-24.0004);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-139.2,-147.4,278.5,294.8);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.road_wide();
	this.instance.setTransform(-311,-600);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-311,-600,622,1200);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_1();
	this.instance.setTransform(-5,-220);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-220,10,440);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.driver();
	this.instance.setTransform(-153,-140);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-153,-140,306,280);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Rectangle_4();
	this.instance.setTransform(-5,-40);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-40,10,80);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.wheel1();
	this.instance.setTransform(-122.5,-180.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.5,-180.5,245,361);


(lib.Symbol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.button_1();

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.8999,scaleY:0.8999,x:13.8,y:2.9},11,cjs.Ease.quadIn).to({scaleX:1,scaleY:1,x:0,y:0},12,cjs.Ease.quadOut).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.2,-0.2,282.2,64.2);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.button_2();

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.8999,scaleY:0.8999,x:13.8,y:2.9},11,cjs.Ease.quadIn).to({scaleX:1,scaleY:1,x:0,y:0},12,cjs.Ease.quadOut).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.2,-0.2,282.2,64.2);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.gate();
	this.instance.setTransform(-43,-68,0.3044,0.3045);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-43,-68,55.7,36.3), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.clikni();
	this.instance.setTransform(-125,-68);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-125,-68,250,136), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.buttontogame();
	this.instance.setTransform(-141,-32);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.8998,scaleY:0.8998,x:-127,y:-29},11,cjs.Ease.quadIn).to({scaleX:1,scaleY:1,x:-140.85,y:-31.8},12,cjs.Ease.quadOut).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.098)").s().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	this.shape.setTransform(-0.05,3.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(24));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,-296,300,600);


(lib.Snow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(222,222,222,0.875)").s().p("Ah3DwIAAgKIgKAAIAAgeIAKAAIAAgeIgyAAIAAgoIBQAAIAAgKIAKAAIAAgUIAKAAIAAgUIAKAAIAAgoIgKAAIAAgUIhaAAIAAAKIgKAAIAAAoIgKAAIAAAUIgKAAIAAAKIgeAAIAAgKIgKAAIAAgeIAKAAIAAgeIgyAAIAAgnIA8AAIAAgUIgKAAIAAgKIgKAAIAAgeIAKAAIAAgKIAUAAIAAAKIAKAAIAAAKIAKAAIAAAUIAKAAIAAAKIAKAAIAAAKIBQAAIAAgKIAKAAIAAgoIgKAAIAAgeIgKAAIAAgKIgKAAIAAgKIhaAAIAAgyIAyAAIAAgUIgKAAIAAgKIgKAAIAAgeIAoAAIAAAKIAKAAIAAAUIAUAAIAAgKIAKAAIAAgKIAKAAIAAgKIAeAAIAAAyIgKAAIAAAUIgKAAIAAAeIAKAAIAAAUIAKAAIAAAKIAKAAIAAAUIAxAAIAAgKIAKAAIAAgUIAKAAIAAgUIAKAAIAAgoIgKAAIAAgKIgKAAIAAgKIgKAAIAAgUIgKAAIAAgUIAKAAIAAgKIAeAAIAAAKIAKAAIAAAUIAKAAIAAAKIAKAAIAAgKIAKAAIAAgUIAKAAIAAgKIAoAAIAAAeIgKAAIAAAKIgKAAIAAAUIA8AAIAAAoIgKAAIAAAKIhQAAIAAAKIgKAAIAAAeIgKAAIAAAKIgKAAIAAAeIAKAAIAAAKIAKAAIAAAKIBQAAIAAgKIAKAAIAAgUIAKAAIAAgUIAKAAIAAgUIAeAAIAAAKIAKAAIAAAUIgKAAIAAAeIAyAAIAAAxIgyAAIAAAUIAKAAIAAAKIAKAAIAAAoIgoAAIAAgUIgKAAIAAgKIgKAAIAAgUIgKAAIAAgUIhaAAIAAAeIgKAAIAAAeIAKAAIAAAUIAKAAIAAAKIAKAAIAAAUIBaAAIAAAoIgyAAIAAAUIAKAAIAAAKIAKAAIAAAeIgKAAIAAAKIgUAAIAAgKIgKAAIAAgKIgKAAIAAgUIgUAAIAAAUIgKAAIAAAUIgeAAIAAgKIgKAAIAAgUIAKAAIAAgUIAKAAIAAgUIAKAAIAAgoIgKAAIAAgKIgKAAIAAgKIgKAAIAAgKIgKAAIAAgKIgxAAIAAAUIgKAAIAAAUIgKAAIAAAyIAKAAIAAAKIAKAAIAAAUIAKAAIAAAeIgoAAIAAgKIgKAAIAAgUIgUAAIAAAUIgKAAIAAAKIgKAAIAAAKgAgxAKIAKAAIAAAKIAKAAIAAAUIBFAAIAAgUIAKAAIAAgnIgKAAIAAgKIgKAAIAAgKIgKAAIAAgKIgxAAIAAAUIgKAAIAAAKIgKAAg");
	this.shape.setTransform(-1.0103,1.0103,0.7603,0.7603);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Snow, new cjs.Rectangle(-21.5,-17.2,41,36.5), null);


(lib.sneg_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.sneg();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sneg_1, new cjs.Rectangle(0,0,155,55), null);


(lib.sec = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// sec
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhQCFQgdgkgBhCIAAg6QAAhFAdgkQAcgjA1AAQA1AAAdAjQAcAjAABCIAAA7QAABEgbAkQgdAkg2AAQg1AAgbgjgAghhhQgLASAAAlIAABPQAAAoALATQAKATAXABQAYgBALgSQAKgSABgnIAAhNQgBgpgKgSQgMgTgXAAQgXAAgKASg");
	this.shape.setTransform(108.65,-67.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAGCkIAAj5IhMAYIAAg1ICGgxIAHAAIAAFHg");
	this.shape_1.setTransform(79.925,-67.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgZB1QgLgJAAgQQAAgQALgJQAKgKAPAAQAQAAAKAKQALAJAAAQQAAAQgLAJQgKAKgQAAQgPAAgKgKgAgZhCQgLgKAAgPQAAgPALgKQAKgJAPAAQAQAAAKAJQALAKAAAPQAAAPgLAKQgKAJgQAAQgPAAgKgJg");
	this.shape_2.setTransform(62.525,-63.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhQCFQgdgkgBhCIAAg6QAAhFAdgkQAcgjA1AAQA1AAAdAjQAcAjABBCIAAA7QAABEgcAkQgdAkg2AAQg0AAgcgjgAghhhQgLASAAAlIAABPQAAAoALATQAKATAXABQAYgBAKgSQALgSABgnIAAhNQAAgpgMgSQgLgTgXAAQgXAAgKASg");
	this.shape_3.setTransform(42.85,-67.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhRCFQgcgkAAhCIAAg6QAAhFAcgkQAcgjA1AAQA1AAAcAjQAcAjACBCIAAA7QAABEgdAkQgcAkg2AAQg1AAgcgjgAghhhQgLASgBAlIAABPQABAoAKATQALATAXABQAYgBAKgSQALgSAAgnIAAhNQAAgpgLgSQgLgTgXAAQgWAAgLASg");
	this.shape_4.setTransform(16.45,-67.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag9CnIAAg2IAPAAQBTgEAHhLQgZAYghAAQgrAAgagdQgagdAAgzQAAggAOgaQAOgbAZgPQAZgPAfAAQAgAAAZAQQAZAQAOAeQAOAfAAAnIAAAYQAABRgpAuQgoAvhKADgAgghgQgNASAAAbQAAAaANASQAMAQAVAAQAQAAALgIQALgHAGgMIAAgbQAAghgMgSQgNgSgUAAQgUAAgMASg");
	this.shape_5.setTransform(108.425,-67.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhRCFQgcgkgBhCIAAg6QABhFAcgkQAcgjA1AAQA1AAAcAjQAdAjABBCIAAA7QAABEgcAkQgdAkg2AAQg1AAgcgjgAghhhQgLASgBAlIAABPQAAAoAMATQAKATAXABQAYgBAKgSQALgSAAgnIAAhNQAAgpgLgSQgLgTgXAAQgWAAgLASg");
	this.shape_6.setTransform(82.25,-67.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhQCPQgegaAAgrQAAgcAOgTQAOgVAYgKQgVgLgMgTQgMgSAAgYQABgqAbgYQAcgZAvAAQAwAAAbAZQAcAYAAAqQABAYgMASQgMATgWALQAYAKAOAVQAOATAAAcQAAArgdAaQgeAZgzAAQgyAAgegZgAghAjQgLAMAAAWQAAAVALANQANANAUAAQAVAAAMgNQAMgMAAgWQAAgVgMgNQgNgNgUAAQgUAAgNANgAgbhoQgLAMAAAUQAAATALAMQAJAMASAAQATAAAKgMQAKgMgBgTQABgUgKgLQgKgMgTAAQgSAAgJALg");
	this.shape_7.setTransform(108.65,-67.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AhOCjIB+kRIiiAAIAAg0IDlAAIAAAkIh9Ehg");
	this.shape_8.setTransform(108.35,-67.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhQCDQgfgkAAg8IAAgWQgBg1AVgpQATgpAmgWQAlgWAyAAIAKAAIAAA1IgGAAQgsAAgZAXQgbAWgGAnQAagaAnAAQArAAAZAfQAZAdAAAyQAAAggOAaQgOAZgZAPQgZAOghAAQgyABggglgAgbAFQgOAIgFANIAAAUQgBAgANATQANASAWAAQAVAAANgQQANgRAAgaQAAgagNgRQgNgQgWAAQgPAAgMAIg");
	this.shape_9.setTransform(108.95,-67.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("Ag2CaQgZgMgPgWQgPgWgBgcIBBAAQACAVAMALQAMALATAAQAWAAAMgPQAMgQAAgdQAAgcgOgPQgOgOgYAAQgXAAgOALIgHAGIgzgNIATilIC2AAIAAA2IiBAAIgIBHQAXgNAZAAQAvAAAaAdQAbAcAAA0QAAAggOAZQgNAZgZAOQgZAOgiAAQgdAAgZgMg");
	this.shape_10.setTransform(108.875,-67.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AASCjIAAhHIiFAAIgEgoICIjWIBCAAIAADKIAkAAIAAA0IgkAAIAABHgAANhDIhDBrIBIAAIAAhyg");
	this.shape_11.setTransform(108.65,-67.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AhSCOQgegaAAgqIBBAAQAAASANAMQAOAMAUAAQAWAAANgNQAOgMAAgUQAAgxg1AAIgiAAIAAgyIAiAAQAYAAAMgMQAMgMgBgVQABgTgMgMQgMgLgUAAQgTAAgMAKQgNALAAAQIhBAAQABgaAOgUQANgUAZgMQAZgLAdAAQAzAAAeAZQAdAZAAArQAAAXgNASQgOAUgWAJQAcAKANATQAOAUAAAbQgBAsgfAaQggAag0AAQgxAAgfgag");
	this.shape_12.setTransform(108.25,-67.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AhsCmIAAgtIBqhwQAVgXALgSQAKgSAAgQQAAgWgLgMQgLgMgUAAQgWAAgNAPQgMAPAAAZIhBAAQAAgeAOgZQAOgZAbgOQAagOAgAAQAyAAAcAYQAcAZAAAsQAAAYgMAZQgNAZgfAhIhJBOICLAAIAAA1g");
	this.shape_13.setTransform(108.55,-67.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{x:79.925}},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_6},{t:this.shape_5}]},23).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_6},{t:this.shape_7}]},25).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_6},{t:this.shape_8}]},23).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_6},{t:this.shape_9}]},23).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_6},{t:this.shape_10}]},25).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_6},{t:this.shape_11}]},24).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_6},{t:this.shape_12}]},24).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_6},{t:this.shape_13}]},24).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_6},{t:this.shape_1,p:{x:106.325}}]},24).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_6},{t:this.shape}]},24).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{x:79.925}},{t:this.shape}]},23).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-97,125.1,59.2);


(lib.right_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.el1();
	this.instance.setTransform(2.15,77.25,1,1,-24.9571);

	this.instance_1 = new lib.el2();
	this.instance_1.setTransform(0,21.7,0.6101,0.6101,-24.7191);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.right_1, new cjs.Rectangle(0,0,194.8,222.3), null);


(lib.left_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.el1();
	this.instance.setTransform(49.7,16,0.2854,0.2854,-24.002);

	this.instance_1 = new lib.el1();
	this.instance_1.setTransform(0,78.8,0.4841,0.4841,-24.0004);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.left_1, new cjs.Rectangle(0,0,104.2,149.6), null);


(lib.elki_right_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.el2();
	this.instance.setTransform(71.4,-84.75,0.0817,0.0817,-26.1633);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.el1();
	this.instance_1.setTransform(71.4,-75.85,0.1049,0.1049,-21.7039);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.elki_right_3, new cjs.Rectangle(71.4,-87.8,19.69999999999999,27.599999999999994), null);


(lib.elki_right_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.el1();
	this.instance.setTransform(142.45,-233.05,0.1768,0.1768,-21.716);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.el1();
	this.instance_1.setTransform(117.75,-203.5,0.2165,0.2165,-21.7114);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.elki_right_2, new cjs.Rectangle(117.8,-242.1,57.8,70.79999999999998), null);


(lib.elki_left_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.el1();
	this.instance.setTransform(41.65,-124.45,0.0869,0.0869,-25.417);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.el1();
	this.instance_1.setTransform(47.25,-139.6,0.0785,0.0785,-25.4188);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.elki_left_3, new cjs.Rectangle(41.7,-144.2,20.799999999999997,32.29999999999998), null);


(lib.elki_left_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.el2();
	this.instance.setTransform(101.45,-47.4,0.3308,0.3308,-26.1727);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.el1();
	this.instance_1.setTransform(83.85,-21.7,0.2043,0.2043,-25.4207);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.elki_left_2, new cjs.Rectangle(83.9,-59.8,57.69999999999999,67.7), null);


(lib.btnLink = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C9FFFF").s().p("AyvfQMAAAg+fMAlfAAAMAAAA+fg");
	this.shape.setTransform(120,200);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,240,400);


(lib.Символ1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Rectangle_4
	this.instance = new lib.Tween2("synched",0);
	this.instance.setTransform(0,-342.6,1,0.4266,0,0,0,0,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:0,scaleY:1,y:-238.5},19).wait(1));

	// Layer_1
	this.instance_1 = new lib.Tween4("synched",0);
	this.instance_1.setTransform(0,-58.5);

	this.instance_2 = new lib.Tween8("synched",0);
	this.instance_2.setTransform(0,62);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},19).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,y:62},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-359.6,10,641.6);


(lib.timerNew = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// sec
	this.instance = new lib.sec();
	this.instance.setTransform(151,-109.45,1,1,0,0,0,94,85.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// red
	this.instance_1 = new lib.red();
	this.instance_1.setTransform(51,-303);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.timerNew, new cjs.Rectangle(51,-303,140,84), null);


(lib.Symbol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// lft
	this.instance = new lib.Tween23("synched",0);
	this.instance.setTransform(57.9,404.25);

	this.instance_1 = new lib.Tween24("synched",0);
	this.instance_1.setTransform(59.5,404.2,0.9,0.9);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,scaleX:0.9,scaleY:0.9,x:59.5,y:404.2},4).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},4).to({scaleX:1,scaleY:1,x:60.45,y:404},5).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.098)").s().p("EgenAz5MAAAhnxMA9PAAAMAAABnxg");
	this.shape.setTransform(149.9948,300.0303,0.7651,0.9033);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0.1,300,599.9);


(lib.road_compl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.Tween7("synched",0);
	this.instance.setTransform(307.3,917.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	// Layer_1
	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1.setTransform(307,597.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-2.7,622,1202.6000000000001);


(lib.road_ae = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// road_wide
	this.instance = new lib.road_compl();
	this.instance.setTransform(121.95,-178.35,1,1,0,0,0,311,600);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:126.95},23).to({x:118.95},24).to({x:126.95},24).to({x:118.95},25).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-196,-781.1,630,1200);


(lib.pressLeft = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// left
	this.instance = new lib.Tween35("synched",0);
	this.instance.setTransform(6,256);

	this.instance_1 = new lib.Tween36("synched",0);
	this.instance_1.setTransform(6.45,256.15,0.9,0.9);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,scaleX:0.9,scaleY:0.9,x:6.45,y:256.15},4).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},4).to({scaleX:1,scaleY:1,x:6.5,y:256.2},5).wait(1));

	// blck
	this.movieClip_5 = new lib.Symbol3();
	this.movieClip_5.name = "movieClip_5";
	this.movieClip_5.setTransform(108.65,147.5);

	this.timeline.addTween(cjs.Tween.get(this.movieClip_5).wait(1).to({scaleX:0.9493,scaleY:0.9493,x:108.6652,y:150.9476},0).wait(1).to({scaleX:0.9194,scaleY:0.9194,x:108.6741,y:152.9808},0).wait(1).to({scaleX:0.9042,scaleY:0.9042,x:108.6787,y:154.0083},0).wait(1).to({regX:0.2,regY:0.5,scaleX:0.8999,scaleY:0.8999,x:108.7,y:154.35},0).wait(1).to({regX:0,regY:0,scaleX:0.9424,scaleY:0.9424,x:108.6061,y:151.3117},0).wait(1).to({scaleX:0.9706,scaleY:0.9706,x:108.6766,y:149.5906},0).wait(1).to({scaleX:0.9881,scaleY:0.9881,x:108.7202,y:148.5263},0).wait(1).to({scaleX:0.9973,scaleY:0.9973,x:108.7432,y:147.9666},0).wait(1).to({regX:0.1,regY:0.4,scaleX:1,scaleY:1,x:108.95,y:148.3},0).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.098)").s().p("EgenAz5MAAAhnxMA9PAAAMAAABnxg");
	this.shape.setTransform(107.8448,152.4303,0.7651,0.9033);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.1,-147.5,300,599.9);


(lib.press = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// right
	this.instance = new lib.Tween32("synched",0);
	this.instance.setTransform(240.6,404.3);

	this.instance_1 = new lib.Tween33("synched",0);
	this.instance_1.setTransform(240.55,404.35);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween34("synched",0);
	this.instance_2.setTransform(240.5,404.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance_2}]},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:240.55,y:404.35},4).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},4).to({_off:true,x:240.5,y:404.25},5).wait(1));

	// blck
	this.movieClip_5 = new lib.Symbol3();
	this.movieClip_5.name = "movieClip_5";
	this.movieClip_5.setTransform(153.8,295.05);

	this.timeline.addTween(cjs.Tween.get(this.movieClip_5).wait(1).to({scaleX:0.9493,scaleY:0.9493,x:154.1952,y:299.0295},0).wait(1).to({scaleX:0.9194,scaleY:0.9194,x:154.4282,y:301.3765},0).wait(1).to({scaleX:0.9042,scaleY:0.9042,x:154.546,y:302.5626},0).wait(1).to({regX:0.2,regY:0.5,scaleX:0.8999,scaleY:0.8999,x:154.6,y:302.95},0).wait(1).to({regX:0,regY:0,scaleX:0.9424,scaleY:0.9424,x:154.1878,y:299.4874},0).wait(1).to({scaleX:0.9706,scaleY:0.9706,x:154.0468,y:297.4842},0).wait(1).to({scaleX:0.9881,scaleY:0.9881,x:153.9595,y:296.2453},0).wait(1).to({scaleX:0.9973,scaleY:0.9973,x:153.9137,y:295.594},0).wait(1).to({regX:0.1,regY:0.4,scaleX:1,scaleY:1,x:154.1,y:295.9},0).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.098)").s().p("EgenAz5MAAAhnxMA9PAAAMAAABnxg");
	this.shape.setTransform(149.9948,298.9803,0.7651,0.9033);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1,300,600);


(lib.gate_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_79 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(79).call(this.frame_79).wait(1));

	// Слой_1
	this.instance = new lib.Symbol4();
	this.instance.setTransform(-41.9,-189.6,0.3493,0.3493,0,0,0,8.3,5.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:7.9,regY:5.2,scaleX:1.5458,scaleY:1.5458,x:-14.1,y:-88.1},64).to({regX:7.8,regY:5.3,scaleX:2.234,scaleY:2.234,x:2.65,y:22.15,alpha:0},15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-110.8,-215.2,124.39999999999999,154.6);


(lib.game_go = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// buttontogame
	this.movieClip_4 = new lib.Symbol1();
	this.movieClip_4.name = "movieClip_4";
	this.movieClip_4.setTransform(140,28);

	this.timeline.addTween(cjs.Tween.get(this.movieClip_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.game_go, new cjs.Rectangle(-10,-268,300,600), null);


(lib.elki_right_compl_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// elki_right_2
	this.elki_right_2 = new lib.elki_right_2();
	this.elki_right_2.name = "elki_right_2";
	this.elki_right_2.setTransform(106.5,-57.7,0.5321,0.5321,0,0,0,75.7,89.8);

	this.instance = new lib.elki_right_2();
	this.instance.setTransform(56.1,599.55,2.3648,2.3648,0,0,0,75.2,90.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.elki_right_2).to({_off:true,regX:75.2,regY:90.1,scaleX:2.3648,scaleY:2.3648,x:56.1,y:599.55},79,cjs.Ease.sineIn).wait(106));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:false},79,cjs.Ease.sineIn).to({regX:75.5,regY:90,scaleX:4.9997,scaleY:4.9997,x:50.6,y:1568.85,alpha:0},15).to({_off:true},57).wait(34));

	// elki_right_3
	this.instance_1 = new lib.elki_right_3();
	this.instance_1.setTransform(130.55,-90.4,1,1,0,0,0,55.5,63.6);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(109).to({_off:false},0).to({scaleX:7.9998,scaleY:7.9998,x:15.6,y:1015},60).to({regX:55.4,scaleX:9.9999,scaleY:9.9999,x:118.3,y:1495.15,alpha:0},15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(128.8,-241.8,421.99999999999994,504.3);


(lib.elki_right_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_94 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(94).call(this.frame_94).wait(1));

	// right
	this.instance = new lib.right_1();
	this.instance.setTransform(92.75,70.35,1,1,0,0,0,-24.7,140.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:-24.4,regY:140.7,scaleX:1.2954,scaleY:1.2954,x:85.95,y:91.05},79,cjs.Ease.sineIn).to({regX:-24.2,regY:140.8,scaleX:1.9198,scaleY:1.9198,x:87.5,y:270.3,alpha:0},15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(117.5,-91.2,390.4,518);


(lib.elki_left_compl_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// elki_left_2
	this.elki_left_2 = new lib.elki_left_2();
	this.elki_left_2.name = "elki_left_2";
	this.elki_left_2.setTransform(98.25,-155.7,0.5707,0.5707,0,0,0,49.9,49.4);

	this.instance = new lib.elki_left_2();
	this.instance.setTransform(-81.05,122.95,2.0257,2.0257,0,0,0,49.5,50.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.elki_left_2).to({_off:true,regX:49.5,regY:50.1,scaleX:2.0257,scaleY:2.0257,x:-81.05,y:122.95},79,cjs.Ease.sineIn).wait(106));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:false},79,cjs.Ease.sineIn).to({regX:49.6,regY:50,scaleX:6.5623,scaleY:6.5623,x:-535.8,y:638.1,alpha:0},15).to({_off:true},1).wait(90));

	// elki_left_3
	this.instance_1 = new lib.elki_left_3();
	this.instance_1.setTransform(103.4,-161.95,0.571,0.571,0,0,0,29.5,-92.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(109).to({_off:false},0).to({regX:29.2,regY:-91.7,scaleX:5.3221,scaleY:5.3221,x:-62.1,y:141.05},60,cjs.Ease.sineIn).to({scaleX:6.5575,scaleY:6.5575,x:-221.4,y:422.4,alpha:0},15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-311,-218,461.6,579.5);


(lib.elki_left_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_93 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(93).call(this.frame_93).wait(1));

	// left
	this.instance = new lib.left_1();
	this.instance.setTransform(59.55,63.85,1,1,0,0,0,29.9,28.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:29.7,regY:28.6,scaleX:1.6898,scaleY:1.6898,x:18.9,y:40.6},79,cjs.Ease.sineIn).to({regX:29.8,regY:28.4,scaleX:2.5776,scaleY:2.5776,x:-168.45,y:340.6,alpha:0},14).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-245.2,-7.7,390,660.6);


(lib.driver_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween3("synched",0);
	this.instance.setTransform(153,140);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:-0.1,regY:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-4.9938,x:152.55,y:139.85},25,cjs.Ease.quadOut).to({regX:0.2,regY:0.6,scaleX:0.9998,scaleY:0.9998,rotation:4.9967,x:152.45},22,cjs.Ease.quadOut).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.3,-13.5,329.5,306.1);


(lib.dr_rght = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween3("synched",0);
	this.instance.setTransform(25,209.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:0.1,regY:0.4,scaleX:0.9997,scaleY:0.9997,rotation:29.9994,x:22.5,y:209.6},19,cjs.Ease.sineIn).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-179.8,11.5,404.9,395.4);


(lib.dr_left = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween30("synched",0);
	this.instance.setTransform(316,366);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:-29.9999,x:309},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(106.5,168.3,405,395.49999999999994);


(lib.click_snow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.press();
	this.instance.setTransform(129,64.85,1,1,0,0,0,150,299.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.click_snow, new cjs.Rectangle(-21,-236,300,599.9), null);


(lib.click_snegovik = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.press();
	this.instance.setTransform(129,64.85,1,1,0,0,0,150,299.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.click_snegovik, new cjs.Rectangle(-21,-236,300,599.9), null);


(lib.click_led = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.pressLeft();
	this.instance.setTransform(177.95,202.05,1,1,0,0,0,112.7,112.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.click_led, new cjs.Rectangle(23.1,-58.2,300,600), null);


(lib.click_deer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.Symbol7();
	this.instance.setTransform(171.95,237.8,1,1,0,0,0,150,300);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.click_deer, new cjs.Rectangle(22,-62.1,300,599.9), null);


(lib.button2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol5();
	this.instance.setTransform(141,32,1,1,0,0,0,141,32);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgXSAu5MAAAhdxMAukAAAMAAABdxg");
	this.shape.setTransform(141.05,2.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-298,298.1,600.1);


(lib.button1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol6();
	this.instance.setTransform(141,32,1,1,0,0,0,141,32);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgXSAu5MAAAhdxMAukAAAMAAABdxg");
	this.shape.setTransform(141.05,2.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-298,298.1,600.1);


(lib.accidentcollect = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ad
	this.instance = new lib.Tween9("synched",0);
	this.instance.setTransform(528,330);
	this.instance._off = true;

	this.instance_1 = new lib.Tween10("synched",0);
	this.instance_1.setTransform(527.9,329.95);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({_off:false},0).to({_off:true,x:527.9,y:329.95},10).wait(31));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9).to({_off:false},10).to({rotation:-9.9999},10).to({rotation:0,x:527.95},10).to({rotation:-9.9999,x:527.9},10).wait(1));

	// broken
	this.instance_2 = new lib.broken();
	this.instance_2.setTransform(234,210);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9).to({_off:false},0).wait(41));

	// elka
	this.instance_3 = new lib.Tween6("synched",0);
	this.instance_3.setTransform(511.75,504.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleX:2.7368,scaleY:2.7368,x:479.75},9,cjs.Ease.sineIn).to({scaleX:2.7366,scaleY:2.7366,rotation:-1.9987,x:479.65,y:504.15},5).to({scaleX:2.7364,scaleY:2.7364,rotation:2.0014},5).to({scaleX:2.7366,scaleY:2.7366,rotation:-2.0007,x:479.7},5).to({rotation:1.9991},5).to({rotation:-1.9984,x:479.65,y:504.1},5).to({scaleX:2.7365,scaleY:2.7365,rotation:1.9994},5).to({rotation:-1.9982,x:479.6},5).to({regX:0.1,regY:0.1,scaleX:2.7364,scaleY:2.7364,rotation:1.9995,x:479.85,y:504.3},5).wait(1));

	// bg
	this.instance_4 = new lib.Layer_2();
	this.instance_4.setTransform(212,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(92.5,0,774.3,1200);


(lib.accident = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// warning
	this.instance = new lib.accidentcollect();
	this.instance.setTransform(468,581,1,1,0,0,0,468,600);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.accident, new cjs.Rectangle(212,-19,600,1200), null);


// stage content:
(lib.banner = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{result6:1271,result3:1250,result0:1229,result9:1136,result12:1116,accident1:576,accident2:740,accident3:902,accident4:1066,noClickLed:980,noClickSnegovik:811,clickLed:952,noClickSneg:646,clickSnegovik:790,clickSneg:625,roadMove:263});

	this.actionFrames = [0,1,261,494,575,624,625,687,739,789,849,901,951,1013,1065,1115,1116,1135,1136,1155,1229,1249,1250,1270,1271,1291];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.game_go.addEventListener("click", clickPlay.bind(this));
		
		function clickPlay()
		{
			this.gotoAndPlay("roadMove");
		}
		var _this = this;
		
		this.mOver = true;
		
		_this.btnLink.alpha=0.01;
		
		//Mouse.hide();
		//_this.btnLink.cursor = "none";
		
		
		//listContainer is for snow
		
		
		var frequency = 3;
		stage.enableMouseOver(frequency);
		
		
		this.addEventListener("tick", fl_EnterFrame02);
		
		function fl_EnterFrame02()
		{
			
				//console.log("Enter Frame");
				if(_this.listContainer.numChildren<25
					&& _this.mOver == true){
					addList();
				}
		}
		
		
		function addList() {
			var adSnow = new lib.Snow();
					
			adSnow.x=Math.random()*stage.canvas.width+adSnow.nominalBounds.height;
			
			//console.log(adSnow.x);
			
			adSnow.y = 0;
			
			adSnow.scaleX = adSnow.scaleY = Math.random();
			
			adSnow.alpha=Math.random();
				
			adSnow.addEventListener("tick", animateSnow);
			
			_this.listContainer.addChild(adSnow);
			
		};
		
		
		function animateSnow(e)
		{
			
			e.target.y += 3*e.target.scaleX;
			
			if (e.target.y >= stage.canvas.height) {
				e.target.y = -e.target.nominalBounds.height;
			}
			
			
			if(_this.mOver == false){
				e.target.removeEventListener("tick", animateSnow);
				//e.target.removeAllEventListeners();		
			}
			
		}
		
		function f_timer() {
			//alert("time")
			_this.mOver = false;
			_this.mc01.stop();
		}
				
		setTimeout(f_timer, 25000);
	}
	this.frame_1 = function() {
		window.buttons.push(
		//Пропишите через запятую пути кнопок, добавив вначале this
		this.button1, this.button2
		//Конец места для кнопок
		);
		setAdfox();
	}
	this.frame_261 = function() {
		/* Остановить на этом кадре
		Если вставить этот код в кадр, то остановит/приостановит воспроизведение на нем.
		Также может использоваться для остановки/приостановки воспроизведения фрагментов ролика.
		*/
		
		this.gotoAndPlay("result0");
	}
	this.frame_494 = function() {
		count = 0;
		click=0;
		this.click_snow.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_4.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_4()
		{
			this.gotoAndPlay("clickSneg");
			click++;
		}
	}
	this.frame_575 = function() {
		count++;
		this.gotoAndPlay("accident1");
	}
	this.frame_624 = function() {
		this.gotoAndPlay("noClickSneg");
	}
	this.frame_625 = function() {
		/* Code to get the frame number of the current frame
		*/
		
		var clickSneg = this.currentFrame;
	}
	this.frame_687 = function() {
		this.click_snegovik.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_5.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_5()
		{
			this.gotoAndPlay("clickSnegovik");
			click++;
		}
	}
	this.frame_739 = function() {
		count++;
		if (count >= 2) {
			this.gotoAndPlay("result0");
			}
		else {
			this.gotoAndPlay("accident2");
			}
	}
	this.frame_789 = function() {
		this.gotoAndPlay("noClickSnegovik");
	}
	this.frame_849 = function() {
		this.click_led.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_6.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_6()
		{
			this.gotoAndPlay("clickLed");
			click++;
		}
	}
	this.frame_901 = function() {
		count++;
		if (count >= 2) {
			this.gotoAndPlay("result3");
			}
		else {
			this.gotoAndPlay("accident3");
			}
	}
	this.frame_951 = function() {
		this.gotoAndPlay("noClickLed");
	}
	this.frame_1013 = function() {
		this.click_deer.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_7.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_7()
		{
			click++;
			if (count == 1) {
			this.gotoAndPlay("result9");
			}
		else {
			this.gotoAndPlay("result12");
			}
		}
	}
	this.frame_1065 = function() {
		count++;
		if (count >= 2) {
			this.gotoAndPlay("result6");
			}
		else {
			this.gotoAndPlay("accident4");
			}
	}
	this.frame_1115 = function() {
		if (count==1) {
			this.gotoAndPlay("result9");
			}
	}
	this.frame_1116 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.button2.addEventListener("click", click2);
		
		function click2() {
			window.open("https://www.toyotire.ru/tire/pattern/observe-ice-freezer?utm_source=5koleso&utm_medium=banner&utm_campaign=game&utm_content=observe-ice-freezer", "_blank");
		}
	}
	this.frame_1135 = function() {
		this.stop();
		this.stop();
		this.stop();
		this.stop();
		this.stop();
	}
	this.frame_1136 = function() {
		this.button2.addEventListener("click", click2);
		
		function click2() {
			window.open("https://www.toyotire.ru/tire/pattern/observe-ice-freezer?utm_source=5koleso&utm_medium=banner&utm_campaign=game&utm_content=observe-ice-freezer", "_blank");
		}
	}
	this.frame_1155 = function() {
		this.stop();
		this.stop();
		this.stop();
		this.stop();
		this.stop();
	}
	this.frame_1229 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.button1.addEventListener("click", click1);
		
		function click1() {
			window.open("https://www.toyotire.ru/tire/pattern/observe-ice-freezer?utm_source=5koleso&utm_medium=banner&utm_campaign=game&utm_content=observe-ice-freezer", "_blank");
		}
	}
	this.frame_1249 = function() {
		this.stop();
		this.stop();
		this.stop();
		this.stop();
		this.stop();
	}
	this.frame_1250 = function() {
		this.button1.addEventListener("click", click1);
		
		function click1() {
			window.open("https://www.toyotire.ru/tire/pattern/observe-ice-freezer?utm_source=5koleso&utm_medium=banner&utm_campaign=game&utm_content=observe-ice-freezer", "_blank");
		}
	}
	this.frame_1270 = function() {
		this.stop();
		this.stop();
		this.stop();
		this.stop();
		this.stop();
	}
	this.frame_1271 = function() {
		this.button1.addEventListener("click", click1);
		
		function click1() {
			window.open("https://www.toyotire.ru/tire/pattern/observe-ice-freezer?utm_source=5koleso&utm_medium=banner&utm_campaign=game&utm_content=observe-ice-freezer", "_blank");
		}
	}
	this.frame_1291 = function() {
		this.stop();
		this.stop();
		this.stop();
		this.stop();
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(260).call(this.frame_261).wait(233).call(this.frame_494).wait(81).call(this.frame_575).wait(49).call(this.frame_624).wait(1).call(this.frame_625).wait(62).call(this.frame_687).wait(52).call(this.frame_739).wait(50).call(this.frame_789).wait(60).call(this.frame_849).wait(52).call(this.frame_901).wait(50).call(this.frame_951).wait(62).call(this.frame_1013).wait(52).call(this.frame_1065).wait(50).call(this.frame_1115).wait(1).call(this.frame_1116).wait(19).call(this.frame_1135).wait(1).call(this.frame_1136).wait(19).call(this.frame_1155).wait(74).call(this.frame_1229).wait(20).call(this.frame_1249).wait(1).call(this.frame_1250).wait(20).call(this.frame_1270).wait(1).call(this.frame_1271).wait(20).call(this.frame_1291).wait(1));

	// button_2
	this.button2 = new lib.button2();
	this.button2.name = "button2";
	this.button2.setTransform(150,332,1,1,0,0,0,141,32);
	this.button2._off = true;
	new cjs.ButtonHelper(this.button2, 0, 1, 2, false, new lib.button2(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button2).wait(1116).to({_off:false},0).wait(39).to({_off:true},1).wait(136));

	// button_1
	this.button1 = new lib.button1();
	this.button1.name = "button1";
	this.button1.setTransform(151,332.15,1,1,0,0,0,141,32);
	this.button1._off = true;
	new cjs.ButtonHelper(this.button1, 0, 1, 2, false, new lib.button1(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button1).wait(1229).to({_off:false},0).wait(63));

	// timer
	this.instance = new lib.timerNew();
	this.instance.setTransform(138.5,445.95,1,1,0,0,0,109.5,99);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(261).to({_off:true},1).wait(1030));

	// buttontogame
	this.game_go = new lib.game_go();
	this.game_go.name = "game_go";
	this.game_go.setTransform(151,308,1,1,0,0,0,141,39);
	new cjs.ButtonHelper(this.game_go, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.game_go).to({_off:true},262).wait(1030));

	// btnLink
	this.btnLink = new lib.btnLink();
	this.btnLink.name = "btnLink";
	this.btnLink.setTransform(0,0,1.25,1);
	this.btnLink.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.btnLink).to({_off:true},261).wait(1031));

	// listContainer
	this.listContainer = new lib.Символ1();
	this.listContainer.name = "listContainer";
	this.listContainer.setTransform(68.5,68.5,1,1,0,0,0,68.5,68.5);

	this.timeline.addTween(cjs.Tween.get(this.listContainer).to({_off:true},261).wait(1031));

	// result_6
	this.instance_1 = new lib.result6();
	this.instance_1.setTransform(80,40);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1271).to({_off:false},0).wait(21));

	// result_3
	this.instance_2 = new lib.result3();
	this.instance_2.setTransform(80,40);

	this.instance_3 = new lib.result0();
	this.instance_3.setTransform(80,40);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},1250).to({state:[{t:this.instance_3}]},20).to({state:[]},1).wait(21));

	// result0
	this.instance_4 = new lib.result0();
	this.instance_4.setTransform(80,40);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1229).to({_off:false},0).wait(20).to({_off:true},1).wait(42));

	// q2
	this.instance_5 = new lib.Tween18("synched",0);
	this.instance_5.setTransform(-141,211);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.instance_6 = new lib.Tween19("synched",0);
	this.instance_6.setTransform(151,211);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5}]},1229).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1229).to({_off:false},0).wait(1).to({x:-105.4402,alpha:0.1218},0).wait(1).to({x:-73.0868,alpha:0.2326},0).wait(1).to({x:-43.7101,alpha:0.3332},0).wait(1).to({x:-17.1003,alpha:0.4243},0).wait(1).to({x:6.9349,alpha:0.5066},0).wait(1).to({x:28.5717,alpha:0.5807},0).wait(1).to({x:47.9717,alpha:0.6472},0).wait(1).to({x:65.2837,alpha:0.7065},0).wait(1).to({x:80.6445,alpha:0.7591},0).wait(1).to({x:94.1804,alpha:0.8054},0).wait(1).to({x:106.0079,alpha:0.8459},0).wait(1).to({x:116.2347,alpha:0.8809},0).wait(1).to({x:124.9605,alpha:0.9108},0).wait(1).to({x:132.2776,alpha:0.9359},0).wait(1).to({x:138.2718,alpha:0.9564},0).wait(1).to({x:143.0227,alpha:0.9727},0).wait(1).to({x:146.6044,alpha:0.9849},0).wait(1).to({x:149.0857,alpha:0.9934},0).wait(1).to({x:150.5309,alpha:0.9984},0).to({_off:true},1).wait(1).to({_off:false,x:-141,alpha:0},0).wait(1).to({x:-105.4402,alpha:0.1218},0).wait(1).to({x:-73.0868,alpha:0.2326},0).wait(1).to({x:-43.7101,alpha:0.3332},0).wait(1).to({x:-17.1003,alpha:0.4243},0).wait(1).to({x:6.9349,alpha:0.5066},0).wait(1).to({x:28.5717,alpha:0.5807},0).wait(1).to({x:47.9717,alpha:0.6472},0).wait(1).to({x:65.2837,alpha:0.7065},0).wait(1).to({x:80.6445,alpha:0.7591},0).wait(1).to({x:94.1804,alpha:0.8054},0).wait(1).to({x:106.0079,alpha:0.8459},0).wait(1).to({x:116.2347,alpha:0.8809},0).wait(1).to({x:124.9605,alpha:0.9108},0).wait(1).to({x:132.2776,alpha:0.9359},0).wait(1).to({x:138.2718,alpha:0.9564},0).wait(1).to({x:143.0227,alpha:0.9727},0).wait(1).to({x:146.6044,alpha:0.9849},0).wait(1).to({x:149.0857,alpha:0.9934},0).wait(1).to({x:150.5309,alpha:0.9984},0).to({_off:true},1).wait(1).to({_off:false,x:-141,alpha:0},0).wait(1).to({x:-105.4402,alpha:0.1218},0).wait(1).to({x:-73.0868,alpha:0.2326},0).wait(1).to({x:-43.7101,alpha:0.3332},0).wait(1).to({x:-17.1003,alpha:0.4243},0).wait(1).to({x:6.9349,alpha:0.5066},0).wait(1).to({x:28.5717,alpha:0.5807},0).wait(1).to({x:47.9717,alpha:0.6472},0).wait(1).to({x:65.2837,alpha:0.7065},0).wait(1).to({x:80.6445,alpha:0.7591},0).wait(1).to({x:94.1804,alpha:0.8054},0).wait(1).to({x:106.0079,alpha:0.8459},0).wait(1).to({x:116.2347,alpha:0.8809},0).wait(1).to({x:124.9605,alpha:0.9108},0).wait(1).to({x:132.2776,alpha:0.9359},0).wait(1).to({x:138.2718,alpha:0.9564},0).wait(1).to({x:143.0227,alpha:0.9727},0).wait(1).to({x:146.6044,alpha:0.9849},0).wait(1).to({x:149.0857,alpha:0.9934},0).wait(1).to({x:150.5309,alpha:0.9984},0).to({_off:true},1).wait(1));

	// toyo_tires_gift_box
	this.instance_7 = new lib.Tween20("synched",0);
	this.instance_7.setTransform(200.1,710.3);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween21("synched",0);
	this.instance_8.setTransform(211.5,530.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7}]},1229).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1229).to({_off:false},0).wait(1).to({x:201.4883,y:688.3979,alpha:0.1218},0).wait(1).to({x:202.7514,y:668.4706,alpha:0.2326},0).wait(1).to({x:203.8983,y:650.3768,alpha:0.3332},0).wait(1).to({x:204.9372,y:633.9871,alpha:0.4243},0).wait(1).to({x:205.8755,y:619.1832,alpha:0.5066},0).wait(1).to({x:206.7203,y:605.8566,alpha:0.5807},0).wait(1).to({x:207.4777,y:593.9077,alpha:0.6472},0).wait(1).to({x:208.1535,y:583.2448,alpha:0.7065},0).wait(1).to({x:208.7532,y:573.7837,alpha:0.7591},0).wait(1).to({x:209.2817,y:565.4466,alpha:0.8054},0).wait(1).to({x:209.7435,y:558.1617,alpha:0.8459},0).wait(1).to({x:210.1427,y:551.8628,alpha:0.8809},0).wait(1).to({x:210.4834,y:546.4884,alpha:0.9108},0).wait(1).to({x:210.7691,y:541.9816,alpha:0.9359},0).wait(1).to({x:211.0031,y:538.2896,alpha:0.9564},0).wait(1).to({x:211.1886,y:535.3634,alpha:0.9727},0).wait(1).to({x:211.3284,y:533.1574,alpha:0.9849},0).wait(1).to({x:211.4253,y:531.6291,alpha:0.9934},0).wait(1).to({x:211.4817,y:530.7389,alpha:0.9984},0).to({_off:true},1).wait(1).to({_off:false,x:200.1,y:710.3,alpha:0},0).wait(1).to({x:201.4883,y:688.3979,alpha:0.1218},0).wait(1).to({x:202.7514,y:668.4706,alpha:0.2326},0).wait(1).to({x:203.8983,y:650.3768,alpha:0.3332},0).wait(1).to({x:204.9372,y:633.9871,alpha:0.4243},0).wait(1).to({x:205.8755,y:619.1832,alpha:0.5066},0).wait(1).to({x:206.7203,y:605.8566,alpha:0.5807},0).wait(1).to({x:207.4777,y:593.9077,alpha:0.6472},0).wait(1).to({x:208.1535,y:583.2448,alpha:0.7065},0).wait(1).to({x:208.7532,y:573.7837,alpha:0.7591},0).wait(1).to({x:209.2817,y:565.4466,alpha:0.8054},0).wait(1).to({x:209.7435,y:558.1617,alpha:0.8459},0).wait(1).to({x:210.1427,y:551.8628,alpha:0.8809},0).wait(1).to({x:210.4834,y:546.4884,alpha:0.9108},0).wait(1).to({x:210.7691,y:541.9816,alpha:0.9359},0).wait(1).to({x:211.0031,y:538.2896,alpha:0.9564},0).wait(1).to({x:211.1886,y:535.3634,alpha:0.9727},0).wait(1).to({x:211.3284,y:533.1574,alpha:0.9849},0).wait(1).to({x:211.4253,y:531.6291,alpha:0.9934},0).wait(1).to({x:211.4817,y:530.7389,alpha:0.9984},0).to({_off:true},1).wait(1).to({_off:false,x:200.1,y:710.3,alpha:0},0).wait(1).to({x:201.4883,y:688.3979,alpha:0.1218},0).wait(1).to({x:202.7514,y:668.4706,alpha:0.2326},0).wait(1).to({x:203.8983,y:650.3768,alpha:0.3332},0).wait(1).to({x:204.9372,y:633.9871,alpha:0.4243},0).wait(1).to({x:205.8755,y:619.1832,alpha:0.5066},0).wait(1).to({x:206.7203,y:605.8566,alpha:0.5807},0).wait(1).to({x:207.4777,y:593.9077,alpha:0.6472},0).wait(1).to({x:208.1535,y:583.2448,alpha:0.7065},0).wait(1).to({x:208.7532,y:573.7837,alpha:0.7591},0).wait(1).to({x:209.2817,y:565.4466,alpha:0.8054},0).wait(1).to({x:209.7435,y:558.1617,alpha:0.8459},0).wait(1).to({x:210.1427,y:551.8628,alpha:0.8809},0).wait(1).to({x:210.4834,y:546.4884,alpha:0.9108},0).wait(1).to({x:210.7691,y:541.9816,alpha:0.9359},0).wait(1).to({x:211.0031,y:538.2896,alpha:0.9564},0).wait(1).to({x:211.1886,y:535.3634,alpha:0.9727},0).wait(1).to({x:211.3284,y:533.1574,alpha:0.9849},0).wait(1).to({x:211.4253,y:531.6291,alpha:0.9934},0).wait(1).to({x:211.4817,y:530.7389,alpha:0.9984},0).to({_off:true},1).wait(1));

	// wheel2
	this.instance_9 = new lib.Tween22("synched",0);
	this.instance_9.setTransform(150,783);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.instance_10 = new lib.Tween27("synched",0);
	this.instance_10.setTransform(150,565);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9}]},1229).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1229).to({_off:false},0).wait(1).to({y:756.4519,alpha:0.1218},0).wait(1).to({y:732.2977,alpha:0.2326},0).wait(1).to({y:710.3658,alpha:0.3332},0).wait(1).to({y:690.4995,alpha:0.4243},0).wait(1).to({y:672.5554,alpha:0.5066},0).wait(1).to({y:656.402,alpha:0.5807},0).wait(1).to({y:641.9184,alpha:0.6472},0).wait(1).to({y:628.9937,alpha:0.7065},0).wait(1).to({y:617.5257,alpha:0.7591},0).wait(1).to({y:607.4201,alpha:0.8054},0).wait(1).to({y:598.59,alpha:0.8459},0).wait(1).to({y:590.9549,alpha:0.8809},0).wait(1).to({y:584.4405,alpha:0.9108},0).wait(1).to({y:578.9777,alpha:0.9359},0).wait(1).to({y:574.5025,alpha:0.9564},0).wait(1).to({y:570.9556,alpha:0.9727},0).wait(1).to({y:568.2817,alpha:0.9849},0).wait(1).to({y:566.4292,alpha:0.9934},0).wait(1).to({y:565.3502,alpha:0.9984},0).to({_off:true},1).wait(1).to({_off:false,y:783,alpha:0},0).wait(1).to({y:756.4519,alpha:0.1218},0).wait(1).to({y:732.2977,alpha:0.2326},0).wait(1).to({y:710.3658,alpha:0.3332},0).wait(1).to({y:690.4995,alpha:0.4243},0).wait(1).to({y:672.5554,alpha:0.5066},0).wait(1).to({y:656.402,alpha:0.5807},0).wait(1).to({y:641.9184,alpha:0.6472},0).wait(1).to({y:628.9937,alpha:0.7065},0).wait(1).to({y:617.5257,alpha:0.7591},0).wait(1).to({y:607.4201,alpha:0.8054},0).wait(1).to({y:598.59,alpha:0.8459},0).wait(1).to({y:590.9549,alpha:0.8809},0).wait(1).to({y:584.4405,alpha:0.9108},0).wait(1).to({y:578.9777,alpha:0.9359},0).wait(1).to({y:574.5025,alpha:0.9564},0).wait(1).to({y:570.9556,alpha:0.9727},0).wait(1).to({y:568.2817,alpha:0.9849},0).wait(1).to({y:566.4292,alpha:0.9934},0).wait(1).to({y:565.3502,alpha:0.9984},0).to({_off:true},1).wait(1).to({_off:false,y:783,alpha:0},0).wait(1).to({y:756.4519,alpha:0.1218},0).wait(1).to({y:732.2977,alpha:0.2326},0).wait(1).to({y:710.3658,alpha:0.3332},0).wait(1).to({y:690.4995,alpha:0.4243},0).wait(1).to({y:672.5554,alpha:0.5066},0).wait(1).to({y:656.402,alpha:0.5807},0).wait(1).to({y:641.9184,alpha:0.6472},0).wait(1).to({y:628.9937,alpha:0.7065},0).wait(1).to({y:617.5257,alpha:0.7591},0).wait(1).to({y:607.4201,alpha:0.8054},0).wait(1).to({y:598.59,alpha:0.8459},0).wait(1).to({y:590.9549,alpha:0.8809},0).wait(1).to({y:584.4405,alpha:0.9108},0).wait(1).to({y:578.9777,alpha:0.9359},0).wait(1).to({y:574.5025,alpha:0.9564},0).wait(1).to({y:570.9556,alpha:0.9727},0).wait(1).to({y:568.2817,alpha:0.9849},0).wait(1).to({y:566.4292,alpha:0.9934},0).wait(1).to({y:565.3502,alpha:0.9984},0).to({_off:true},1).wait(1));

	// result_9
	this.instance_11 = new lib.result9();
	this.instance_11.setTransform(80,40);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1136).to({_off:false},0).wait(19).to({_off:true},1).wait(136));

	// result_12
	this.instance_12 = new lib.result_12();
	this.instance_12.setTransform(80,39);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1116).to({_off:false},0).wait(19).to({_off:true},1).wait(156));

	// q1
	this.instance_13 = new lib.Tween14("synched",0);
	this.instance_13.setTransform(-122.05,216.5);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.instance_14 = new lib.Tween15("synched",0);
	this.instance_14.setTransform(152,216.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_13}]},1116).to({state:[{t:this.instance_14}]},19).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},19).to({state:[]},1).wait(136));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1116).to({_off:false},0).to({_off:true,x:152,alpha:1},19).wait(1).to({_off:false,x:-122.05,alpha:0},0).to({_off:true,x:152,alpha:1},19).wait(137));

	// toyo_tires_logo
	this.instance_15 = new lib.Tween12("synched",0);
	this.instance_15.setTransform(151,790.5);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.instance_16 = new lib.Tween13("synched",0);
	this.instance_16.setTransform(151,574.5);

	this.instance_17 = new lib.toyo_tires_logo();
	this.instance_17.setTransform(1,549);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_15}]},1116).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_17}]},1).to({state:[]},1).wait(136));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1116).to({_off:false},0).wait(1).to({y:762.8783,alpha:0.1279},0).wait(1).to({y:737.8745,alpha:0.2436},0).wait(1).to({y:715.2919,alpha:0.3482},0).wait(1).to({y:694.9514,alpha:0.4424},0).wait(1).to({y:676.6898,alpha:0.5269},0).wait(1).to({y:660.3583,alpha:0.6025},0).wait(1).to({y:645.8205,alpha:0.6698},0).wait(1).to({y:632.9519,alpha:0.7294},0).wait(1).to({y:621.638,alpha:0.7818},0).wait(1).to({y:611.7738,alpha:0.8274},0).wait(1).to({y:603.2626,alpha:0.8668},0).wait(1).to({y:596.0154,alpha:0.9004},0).wait(1).to({y:589.9501,alpha:0.9285},0).wait(1).to({y:584.9907,alpha:0.9514},0).wait(1).to({y:581.0672,alpha:0.9696},0).wait(1).to({y:578.1145,alpha:0.9833},0).wait(1).to({y:576.0724,alpha:0.9927},0).wait(1).to({y:574.8849,alpha:0.9982},0).to({_off:true},1).wait(1).to({_off:false,y:790.5,alpha:0},0).wait(1).to({y:762.8783,alpha:0.1279},0).wait(1).to({y:737.8745,alpha:0.2436},0).wait(1).to({y:715.2919,alpha:0.3482},0).wait(1).to({y:694.9514,alpha:0.4424},0).wait(1).to({y:676.6898,alpha:0.5269},0).wait(1).to({y:660.3583,alpha:0.6025},0).wait(1).to({y:645.8205,alpha:0.6698},0).wait(1).to({y:632.9519,alpha:0.7294},0).wait(1).to({y:621.638,alpha:0.7818},0).wait(1).to({y:611.7738,alpha:0.8274},0).wait(1).to({y:603.2626,alpha:0.8668},0).wait(1).to({y:596.0154,alpha:0.9004},0).wait(1).to({y:589.9501,alpha:0.9285},0).wait(1).to({y:584.9907,alpha:0.9514},0).wait(1).to({y:581.0672,alpha:0.9696},0).wait(1).to({y:578.1145,alpha:0.9833},0).wait(1).to({y:576.0724,alpha:0.9927},0).wait(1).to({y:574.8849,alpha:0.9982},0).to({_off:true},1).wait(137));

	// wheel1
	this.instance_18 = new lib.Tween1("synched",0);
	this.instance_18.setTransform(151.5,780.5);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.instance_19 = new lib.Tween11("synched",0);
	this.instance_19.setTransform(151.5,564.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_18}]},1116).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[]},1).wait(136));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1116).to({_off:false},0).wait(1).to({y:752.8783,alpha:0.1279},0).wait(1).to({y:727.8745,alpha:0.2436},0).wait(1).to({y:705.2919,alpha:0.3482},0).wait(1).to({y:684.9514,alpha:0.4424},0).wait(1).to({y:666.6898,alpha:0.5269},0).wait(1).to({y:650.3583,alpha:0.6025},0).wait(1).to({y:635.8205,alpha:0.6698},0).wait(1).to({y:622.9519,alpha:0.7294},0).wait(1).to({y:611.638,alpha:0.7818},0).wait(1).to({y:601.7738,alpha:0.8274},0).wait(1).to({y:593.2626,alpha:0.8668},0).wait(1).to({y:586.0154,alpha:0.9004},0).wait(1).to({y:579.9501,alpha:0.9285},0).wait(1).to({y:574.9907,alpha:0.9514},0).wait(1).to({y:571.0672,alpha:0.9696},0).wait(1).to({y:568.1145,alpha:0.9833},0).wait(1).to({y:566.0724,alpha:0.9927},0).wait(1).to({y:564.8849,alpha:0.9982},0).to({_off:true},1).wait(1).to({_off:false,y:780.5,alpha:0},0).wait(1).to({y:752.8783,alpha:0.1279},0).wait(1).to({y:727.8745,alpha:0.2436},0).wait(1).to({y:705.2919,alpha:0.3482},0).wait(1).to({y:684.9514,alpha:0.4424},0).wait(1).to({y:666.6898,alpha:0.5269},0).wait(1).to({y:650.3583,alpha:0.6025},0).wait(1).to({y:635.8205,alpha:0.6698},0).wait(1).to({y:622.9519,alpha:0.7294},0).wait(1).to({y:611.638,alpha:0.7818},0).wait(1).to({y:601.7738,alpha:0.8274},0).wait(1).to({y:593.2626,alpha:0.8668},0).wait(1).to({y:586.0154,alpha:0.9004},0).wait(1).to({y:579.9501,alpha:0.9285},0).wait(1).to({y:574.9907,alpha:0.9514},0).wait(1).to({y:571.0672,alpha:0.9696},0).wait(1).to({y:568.1145,alpha:0.9833},0).wait(1).to({y:566.0724,alpha:0.9927},0).wait(1).to({y:564.8849,alpha:0.9982},0).to({_off:true},1).wait(137));

	// click
	this.click_snow = new lib.click_snow();
	this.click_snow.name = "click_snow";
	this.click_snow.setTransform(117.4,335,1,1,0,0,0,100.6,100.6);

	this.click_snegovik = new lib.click_snegovik();
	this.click_snegovik.name = "click_snegovik";
	this.click_snegovik.setTransform(147.6,339.55,1,1,0,0,0,130.4,106.2);

	this.instance_20 = new lib.press();
	this.instance_20.setTransform(150.2,300.2,1,1,0,0,0,150,299.9);

	this.click_led = new lib.click_led();
	this.click_led.name = "click_led";
	this.click_led.setTransform(96.8,127.2,1,1,0,0,0,119.2,68.8);

	this.click_deer = new lib.click_deer();
	this.click_deer.name = "click_deer";
	this.click_deer.setTransform(70.1,111.6,1,1,0,0,0,91.4,51.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.click_snow}]},494).to({state:[{t:this.click_snow}]},81).to({state:[]},1).to({state:[{t:this.click_snegovik}]},111).to({state:[{t:this.instance_20}]},52).to({state:[]},1).to({state:[{t:this.click_led}]},109).to({state:[{t:this.click_led}]},52).to({state:[]},1).to({state:[{t:this.click_deer,p:{y:111.6}}]},111).to({state:[{t:this.click_deer,p:{y:111}}]},52).to({state:[]},1).wait(226));

	// accident
	this.instance_21 = new lib.accident();
	this.instance_21.setTransform(90,299.05,1,1,0,0,0,468,481.6);

	this.accident2 = new lib.accident();
	this.accident2.name = "accident2";
	this.accident2.setTransform(90,299.05,1,1,0,0,0,468,481.6);

	this.accident3 = new lib.accident();
	this.accident3.name = "accident3";
	this.accident3.setTransform(90,299.05,1,1,0,0,0,468,481.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_21}]},576).to({state:[{t:this.instance_21}]},48).to({state:[]},1).to({state:[{t:this.accident2}]},115).to({state:[{t:this.accident2}]},49).to({state:[]},1).to({state:[{t:this.accident3}]},112).to({state:[{t:this.accident3}]},49).to({state:[]},1).to({state:[{t:this.accident3}]},114).to({state:[{t:this.accident3}]},49).to({state:[]},1).wait(176));

	// deeer
	this.instance_22 = new lib.deer();
	this.instance_22.setTransform(153,49,0.1385,0.1385);

	this.instance_23 = new lib.Tween25("synched",0);
	this.instance_23.setTransform(159.75,59.8);
	this.instance_23._off = true;

	this.instance_24 = new lib.Tween26("synched",0);
	this.instance_24.setTransform(206.35,327.35,5.4439,5.4439,0,0,0,0.2,0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_22}]},880).to({state:[{t:this.instance_23}]},72).to({state:[{t:this.instance_23}]},28).to({state:[{t:this.instance_24}]},33).to({state:[]},53).wait(226));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(952).to({_off:false},0).to({scaleX:3.0398,scaleY:3.0398,x:181.15,y:182.75},28).to({_off:true,regX:0.2,regY:0.2,scaleX:5.4439,scaleY:5.4439,x:206.35,y:327.35},33).wait(279));

	// led
	this.instance_25 = new lib.led();
	this.instance_25.setTransform(151,21,0.1091,0.1091);
	this.instance_25._off = true;

	this.instance_26 = new lib.Tween28("synched",0);
	this.instance_26.setTransform(227.4,208.6);
	this.instance_26._off = true;

	this.instance_27 = new lib.Tween29("synched",0);
	this.instance_27.setTransform(223.4,399.6);
	this.instance_27.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_25}]},714).to({state:[{t:this.instance_25}]},76).to({state:[{t:this.instance_25}]},21).to({state:[{t:this.instance_25}]},38).to({state:[{t:this.instance_26}]},103).to({state:[{t:this.instance_27}]},27).to({state:[]},1).wait(312));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(714).to({_off:false},0).wait(76).to({scaleX:0.109,scaleY:0.109,x:150.95},0).to({scaleX:0.5049,scaleY:0.4577,x:154.2,y:81.1},21).to({scaleX:1.2214,scaleY:1.0887,x:159,y:189},38).to({_off:true},103).wait(340));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(952).to({_off:false},0).to({_off:true,x:223.4,y:399.6,alpha:0},27).wait(313));

	// snegovik
	this.instance_28 = new lib.snegovik();
	this.instance_28.setTransform(124,16,0.1752,0.1752);

	this.instance_29 = new lib.Tween16("synched",0);
	this.instance_29.setTransform(137.55,25.1);
	this.instance_29._off = true;

	this.instance_30 = new lib.Tween17("synched",0);
	this.instance_30.setTransform(71.95,183.5,4.8257,4.8257);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_28}]},550).to({state:[{t:this.instance_29}]},75).to({state:[{t:this.instance_29}]},21).to({state:[{t:this.instance_30}]},41).to({state:[{t:this.instance_30}]},103).to({state:[{t:this.instance_30}]},20).to({state:[]},1).to({state:[]},169).wait(312));
	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(625).to({_off:false},0).to({scaleX:2.2958,scaleY:2.2958,x:115.35,y:78.75},21).to({_off:true,scaleX:4.8257,scaleY:4.8257,x:71.95,y:183.5},41).wait(605));
	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(646).to({_off:false},41).wait(103).to({startPosition:0},0).to({regX:0.1,regY:0.1,scaleX:9.9898,scaleY:9.9898,x:-1.1,y:342.5,alpha:0},20).to({_off:true},1).wait(481));

	// sneg
	this.sneg = new lib.sneg_1();
	this.sneg.name = "sneg";
	this.sneg.setTransform(143.8,22.5,0.0849,0.0849,0,0,0,77.7,27.7);
	this.sneg._off = true;

	this.movieClip_6 = new lib.sneg_1();
	this.movieClip_6.name = "movieClip_6";
	this.movieClip_6.setTransform(61.6,215.65,1.0057,1.0057,0,0,0,70.8,44.4);
	this.movieClip_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.sneg).wait(431).to({_off:false},0).to({_off:true,regX:70.8,regY:44.4,scaleX:1.0057,scaleY:1.0057,x:61.6,y:215.65},62).wait(799));
	this.timeline.addTween(cjs.Tween.get(this.movieClip_6).wait(431).to({_off:false},62).wait(132).to({x:22.9,y:421.7,alpha:0},20).to({_off:true},1).wait(646));

	// dr_lft
	this.instance_31 = new lib.dr_left();
	this.instance_31.setTransform(75.1,349.1,1,1,0,0,0,235.1,143);
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(952).to({_off:false},0).to({_off:true},28).wait(87).to({_off:false},0).to({_off:true},19).wait(206));

	// dr_rght
	this.dr_rght = new lib.dr_rght();
	this.dr_rght.name = "dr_rght";
	this.dr_rght.setTransform(187.55,417.55,1,1,0,0,0,59.5,59.5);
	this.dr_rght._off = true;

	this.timeline.addTween(cjs.Tween.get(this.dr_rght).wait(625).to({_off:false},0).to({_off:true},21).wait(144).to({_off:false},0).to({_off:true},21).wait(481));

	// driver
	this.instance_32 = new lib.driver();
	this.instance_32.setTransform(4,431);

	this.instance_33 = new lib.driver_1();
	this.instance_33.setTransform(156,571,1,1,0,0,0,153,140);

	this.driver = new lib.driver_1();
	this.driver.name = "driver";
	this.driver.setTransform(156,571,1,1,0,0,0,153,140);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_32}]}).to({state:[{t:this.instance_33}]},262).to({state:[{t:this.driver}]},99).to({state:[]},264).to({state:[{t:this.driver}]},21).to({state:[]},144).to({state:[{t:this.driver}]},21).to({state:[]},141).to({state:[{t:this.driver}]},28).to({state:[]},86).wait(226));

	// gate
	this.instance_34 = new lib.gate_1();
	this.instance_34.setTransform(307.7,575.5,2.5431,2.5431,0,0,0,11.6,7.7);
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(349).to({_off:false},0).to({_off:true},82).wait(253).to({_off:false},0).to({_off:true},64).wait(544));

	// elki_right_2
	this.instance_35 = new lib.elki_right_compl_2();
	this.instance_35.setTransform(124,307.1,1,1,0,0,0,98,111);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(349).to({_off:false},0).to({_off:true},734).wait(209));

	// elki_left_2
	this.instance_36 = new lib.elki_left_compl_2();
	this.instance_36.setTransform(127,262.05,1,1,0,0,0,123,114);
	this.instance_36._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(349).to({_off:false},0).to({_off:true},734).wait(209));

	// elki_right
	this.instance_37 = new lib.elki_right_1();
	this.instance_37.setTransform(149.2,185.75,1,1,0,0,0,92.8,70.3);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(263).to({_off:false},0).to({_off:true},106).wait(923));

	// elki_left
	this.instance_38 = new lib.elki_left_1();
	this.instance_38.setTransform(34.25,69.05,1,1,0,0,0,59.6,63.9);
	this.instance_38._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(263).to({_off:false},0).to({_off:true},106).wait(923));

	// elki_right_1
	this.instance_39 = new lib.el1();
	this.instance_39.setTransform(175.9,121.2,1,1,-24.9571);

	this.instance_40 = new lib.el2();
	this.instance_40.setTransform(173.75,65.65,0.6101,0.6101,-24.7191);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_40},{t:this.instance_39}]}).to({state:[]},263).to({state:[]},717).wait(312));

	// elki_left_1
	this.instance_41 = new lib.el1();
	this.instance_41.setTransform(54.2,56.5,0.2854,0.2854,-24.002);

	this.instance_42 = new lib.el1();
	this.instance_42.setTransform(4.5,119.3,0.4841,0.4841,-24.0004);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_42},{t:this.instance_41}]}).to({state:[]},263).to({state:[]},717).wait(312));

	// road
	this.instance_43 = new lib.road_ae();
	this.instance_43.setTransform(141.3,368.55,1,1,0,0,0,109.2,128.2);
	this.instance_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(263).to({_off:false},0).to({_off:true},820).wait(209));

	// roadline
	this.instance_44 = new lib.Group_1();
	this.instance_44.setTransform(145,157);

	this.timeline.addTween(cjs.Tween.get(this.instance_44).to({_off:true},263).wait(820).to({_off:false},0).wait(209));

	// road_state
	this.instance_45 = new lib.road();

	this.timeline.addTween(cjs.Tween.get(this.instance_45).to({_off:true},263).wait(820).to({_off:false},0).wait(209));

	// Pixel
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.098)").s().p("AgEAFIAAgJIAJAAIAAAJg");
	this.shape.setTransform(0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1292));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-132,-240.7,593.1,1239.2);
// library properties:
lib.properties = {
	id: '3F8DDAA194DCE04AA931BBEB44E3633C',
	width: 300,
	height: 600,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/button_1.png?1640780658102", id:"button_1"},
		{src:"images/clikni.png?1640780658102", id:"clikni"},
		{src:"images/button_2.png?1640780658102", id:"button_2"},
		{src:"images/gate.png?1640780658102", id:"gate"},
		{src:"images/el1.png?1640780658102", id:"el1"},
		{src:"images/arrows.png?1640780658102", id:"arrows"},
		{src:"images/Layer_2.png?1640780658102", id:"Layer_2"},
		{src:"images/Group.png?1640780658102", id:"Group"},
		{src:"images/result0.png?1640780658102", id:"result0"},
		{src:"images/result3.png?1640780658102", id:"result3"},
		{src:"images/Rectangle_4.png?1640780658102", id:"Rectangle_4"},
		{src:"images/left.png?1640780658102", id:"left"},
		{src:"images/result_12.png?1640780658102", id:"result_12"},
		{src:"images/result6.png?1640780658102", id:"result6"},
		{src:"images/road.png?1640780658102", id:"road"},
		{src:"images/q1.png?1640780658102", id:"q1"},
		{src:"images/sneg.png?1640780658102", id:"sneg"},
		{src:"images/snegovik.png?1640780658102", id:"snegovik"},
		{src:"images/toyo_tires_gift_box.png?1640780658102", id:"toyo_tires_gift_box"},
		{src:"images/deer.png?1640780658102", id:"deer"},
		{src:"images/warning.png?1640780658102", id:"warning"},
		{src:"images/wheel1.png?1640780658102", id:"wheel1"},
		{src:"images/wheel2.png?1640780658102", id:"wheel2"},
		{src:"images/result9.png?1640780658102", id:"result9"},
		{src:"images/driver.png?1640780658102", id:"driver"},
		{src:"images/right.png?1640780658102", id:"right"},
		{src:"images/el2.png?1640780658102", id:"el2"},
		{src:"images/broken.png?1640780658102", id:"broken"},
		{src:"images/led.png?1640780658103", id:"led"},
		{src:"images/Group_1.png?1640780658103", id:"Group_1"},
		{src:"images/red.png?1640780658103", id:"red"},
		{src:"images/toyo_tires_logo.png?1640780658103", id:"toyo_tires_logo"},
		{src:"images/road_wide.png?1640780658103", id:"road_wide"},
		{src:"images/Group_4.png?1640780658103", id:"Group_4"},
		{src:"images/buttontogame.png?1640780658103", id:"buttontogame"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['3F8DDAA194DCE04AA931BBEB44E3633C'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;