  openbtn.disabled = true
  
  
  var outsound = new Audio("out.wav")
  var resetsound = new Audio("reset.wav")
  var opencardsound = new Audio("opencard.wav")
  
  var can
var nowselect

var sude = new Array()
var allcards = new Array(44)
var allcardska = new Array(44)

for (var index = 0;index < 44;index = index + 1) {
    allcards[index] = new Array(3)
    allcards[index][0] = index * 11
    allcards[index][1] = 0
    allcards[index][2] = 0
}

var cardi = new Image()
cardi.src = "card.png"
// allcards[][0] = ｶｰﾄﾞX座標
// allcards[][1] = ｶｰﾄﾞY座標
// allcards[][2] = ｶｰﾄﾞの状態 (0 == 普通,1 == 選択,2 == 既に取った)
//If you are reading this,you need to die

can = document.getElementById("can")
var ctx
ctx = can.getContext("2d")
cardi.onload = function() {
gameloop()
}
function gameloop() {
    ctx.clearRect(0,0,537,300)
    for(var index = 0;index < 44;index = index + 1) {
        ctx.drawImage(cardi,allcards[index][0],allcards[index][1],64,94)

        var next = -1

for (var i = index + 1; i < 44; i++) {
    if (allcards[i][2] == 0) {   // まだ取っていないカード
        next = i
        break
    }
}
if (next == -1) {
    allcardska[index] = allcards[index][0] + 64
} else {
    allcardska[index] = allcards[next][0]
}
        
    }
    setTimeout(function(){gameloop()},20)
}
can.addEventListener("click",function(key){
var rect = can.getBoundingClientRect()
var x = key.clientX - rect.left
var y = key.clientY - rect.top
for (var index = 0;index < 44;index = index + 1) {
if (x > allcards[index][0] && allcardska[index] > x) {
    if (y < 95) {
    for (var index2 = 0;index2 < 44;index2 = index2 + 1) {
        if (allcards[index2][2] == 1) {
            allcards[index2][2] = 0
            allcards[index2][1] = 0
            
        }
    }
    outsound.play()
    openbtn.disabled = false
    allcards[index][1] = 100
    allcards[index][2] = 1
    nowselect = index
    }
}


}
})
function run() {
opencardsound.play()
openbtn.disabled = true
var random
do {
random = Math.floor(Math.random() * 44)
if (sude.length == 44) {
    alert("すべてのｶｰﾄﾞを取りました")
    return
}
} while (sude.indexOf(random) !== -1)
sude.push(random)
var cardimg = document.getElementById("cardimg")
cardimg.src = "cards/" + (random + 1) + ".png"
allcards[nowselect][2] = 2
allcards[nowselect][1] = 1000
}
function run2() {
    resetsound.play()
    cardimg.src = "a.bmp"
    sude.length = 0
    nowselect = ""
    allcards = new Array(44)
    allcardska = new Array(44)
    for (var index = 0;index < 44;index = index + 1) {
    allcards[index] = new Array(3)
    allcards[index][0] = index * 11
    allcards[index][1] = 0
    allcards[index][2] = 0
}
}
function back() {
    location.href = "home.htm"
}