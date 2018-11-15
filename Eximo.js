let Eximo = {}
Eximo.sprites = {}

Eximo.getSpriteInfo = function (spriteName) {
  let info = Eximo.sprites[spriteName]
  if (!info) console.log('(!) Eximo Error: sprite with name ' + spriteName + ' was not found.')
  return info
}

Eximo.drawSprite = function (spriteName, context, x, y, w, h) {
  let spriteInfo = Eximo.getSpriteInfo(spriteName)
  if (!spriteInfo) return
  let frame = spriteInfo.frame
  x = x || 0
  y = y || 0
  w = w || frame.w
  h = h || frame.h
  context.drawImage(spriteInfo.sheet, frame.x, frame.y, frame.w, frame.h, x, y, w, h)
}

Eximo.getSprite = function (spriteName) {
  let spriteInfo = Eximo.getSpriteInfo(spriteName)
  if (!spriteInfo) return
  let frame = spriteInfo.frame
  let sprite = document.createElement('canvas')
  sprite.width = frame.w
  sprite.height = frame.h
  sprite.getContext('2d').drawImage(spriteInfo.sheet, frame.x, frame.y, frame.w, frame.h, 0, 0, frame.w, frame.h)
  return sprite
}

Eximo.loadSheet = function (url, callback) {
  let sheet = new Image()
  sheet.src = url
  sheet.onload = function () {
    callback(sheet)
  }
}

Eximo.loadSpriteSheet = function (url, callback) {
  let req = new XMLHttpRequest()
  req.addEventListener('load', function () {
    let data = JSON.parse(req.responseText)
    Eximo.loadSheet(data.meta.image, function (img) {
      for (let spriteName in data.frames) {
        Eximo.sprites[spriteName] = data.frames[spriteName]
        Eximo.sprites[spriteName].sheet = img
      }
      callback()
    })
  })
  req.open('GET', url)
  req.send()
}

Eximo.loadSpriteSheets = function (sheetArray, callback) {
  let sheetsLeft = sheetArray.length
  let spriteSheetLoaded = function () {
    if (--sheetsLeft <= 0) callback()
  }
  for (let i = 0; i < sheetArray.length; ++i) Eximo.loadSpriteSheet(sheetArray[i], spriteSheetLoaded)
}

if (typeof module === 'object') {
  module.exports = Eximo
}
