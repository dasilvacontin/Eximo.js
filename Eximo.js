window.jQuery || document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"><\/script>');
var Eximo = {};
Eximo.sprites = {};
Eximo.getSpriteInfo = function (spriteName) {
	var info = Eximo.sprites[spriteName];
	if (!info) console.log('(!) Eximo Error: sprite with name ' + spriteName + ' was not found.');
	return info;
};
Eximo.drawSprite = function (spriteName, context, x, y, w, h) {
	var spriteInfo = Eximo.getSpriteInfo(spriteName);
	if (!spriteInfo) return;
	var frame = spriteInfo.frame;
	x = x || 0;
	y = y || 0;
	w = w || frame.w;
	h = h || frame.h;
	context.drawImage(spriteInfo.sheet, frame.x, frame.y, frame.w, frame.h, x, y, w, h);
};
Eximo.getSprite = function (spriteName) {
	var spriteInfo = Eximo.getSpriteInfo(spriteName);
	if (!spriteInfo) return;
	var frame = spriteInfo.frame;
	var sprite = document.createElement('canvas');
	sprite.width = frame.w;
	sprite.height = frame.h;
	sprite.getContext('2d').drawImage(spriteInfo.sheet, frame.x, frame.y, frame.w, frame.h, 0, 0, frame.w, frame.h);
	return sprite;
};
Eximo.loadSheet = function (url, callback) {
	var sheet = new Image();
    sheet.onload = function(){callback(sheet);};
    sheet.src = url;
};
Eximo.loadSpriteSheet = function (url, callback) {
	$.getJSON(url, function(data) {
		Eximo.loadSheet(data.meta.image, function (img) {
			for (var spriteName in data.frames) {
				Eximo.sprites[spriteName] = data.frames[spriteName];
				Eximo.sprites[spriteName].sheet = img;
			}
			callback();
		});
	});
};
Eximo.loadSpriteSheets = function (sheetArray, callback) {
	var sheetsLeft = sheetArray.length;
	var spriteSheetLoaded = function () {if (--sheetsLeft <= 0) callback();};
	for (var i = 0; i < sheetArray.length; ++i) Eximo.loadSpriteSheet(sheetArray[i], spriteSheetLoaded);
};