var PINT = {};
PINT.sprites = {};
PINT.print = function (spriteName, context, x, y, w, h) {
	var spriteInfo = PINT.getSpriteInfo(spriteName);
	var frame = spriteInfo.frame;
	x = x || 0;
	y = y || 0;
	w = w || frame.w;
	h = h || frame.h;
	context.drawImage(spriteInfo.sheet, frame.x, frame.y, frame.w, frame.h, x, y, w, h);
};
PINT.getSpriteInfo = function (spriteName) {
	return PINT.sprites[spriteName];
};
PINT.loadSpriteSheet = function (url, callback) {
	$.getJSON(url, function(data) {
		PINT.loadSheet(data.meta.image, function (img) {
			for (var spriteName in data.frames) {
				PINT.sprites[spriteName] = data.frames[spriteName];
				PINT.sprites[spriteName].sheet = img;
			}
			callback();
		});
	});
};
PINT.loadSheet = function (url, callback) {
	var sheet = new Image();
    sheet.onload = function(){callback(sheet);};
    sheet.src = url;
};
PINT.load = function (sheetArray, callback) {
	//TO-DO
};