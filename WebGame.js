
//canvas setup
const canvas = document.querySelector(".gameCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

//Card Class
//Card Class

class Card extends WebImage{
    constructor(type){
        //front image changes depending on type.
        //this.front = frontimage;
        super("https://static.codehs.com/img/library/characters/penguin.png");
        this.flipped = false;
        //true = back of card
        this.back = "https://static.codehs.com/img/library/characters/penguin.png";
        this.front = "https://static.codehs.com/img/library/characters/monkey.jpg";
        this.cardtype = type;
        add(this);
    }
}

var cardSlots = [1,2,3,4,5,6,7,8,9,10];
var cardTypeList = ["death", "coin", "stop", "draw", "swap", "coin", "stop", "draw", "swap", "coin"];
var cardType = 0;
var index;
for (let i=0; i<10; i++) {
    cardType = Randomizer.nextInt(0, cardTypeList.length - 1)
    cardSlots[i] = cardTypeList[cardType];
    cardTypeList = removeItemOnce(cardTypeList, cardTypeList[cardType]);
}
// Removes one item from the card pool
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
console.log(cardSlots.slice(0, 4));
console.log(cardSlots.slice(4, 6));
console.log(cardSlots.slice(6, 10));
var grid = [1,2,3,4,11,5,6,12,7,8,9,10];
//Add boxes and text
for (let i=0; i<4; i++){
    for(let a=0; a<3; a++){
        var spotNow = grid[i];
        //boxes
        var box = new Rectangle(getWidth()/4 - 10, getHeight()/3 - 10);
        box.setPosition(getWidth()/4*i,getHeight()/3*a);
        box.setColor("blue");
        box.setType(cardSlots[spotNow-1]);
        add(box);
        if(a==1){
            if(i==0){
                remove(box);
            }else if(i==3){
                remove(box);
            }
        }
        //texts
        var cardText = new Text("temp", "30pt Arial");
        cardText.setText(cardSlots[spotNow-1]);
        cardText.setPosition(getWidth()/4*i,getHeight()/3*a+80);
        add(cardText);
        if(a==1){
            if(i==0){
                remove(cardText);
            }else if(i==3){
                remove(cardText);
            }
        }
        
    }
}
// Makes the element where the mouse is turn red (can't undo yet)
mouseClickMethod(click);
var elem = 0;
var click1 = 0;
var click2 = 0;
function click(e){
    var elem = getElementAt(e.getX(), e.getY());
    if (elem != null) {
        if (elem.constructor == Rectangle){
            if(elem.color == "blue"){
                elem.setColor("red");
                console.log("red");
            }else if(elem.color == "red"){
                elem.setColor("blue");
                console.log("blue");
            }
        }
    }
    if (click1 == 0){
        click1 = elem.getType();
        console.log("click1 is " + click1);
    }else if(click1 != 0){
        click2 = elem.getType();
        console.log("click2 is " + click2);
        console.log("click1 is " + click1);
        mainGame(click1, click2);
    }
}
var playerWon;
var endFunction;
var coinWin = false;
function mainGame(click1, click2){
    if (click1 == click2){
        //flip both
        console.log("match!");
    }
    if (click1 == "death" || click2 == "death"){
        if (click1 == "death"){
            playerWon = "two"
        }else if (click2 = "death"){
            playerWon = "one"
        }
        endGame();
    }else if (click1 == "stop"){
        //flip both cards
        click1 = 0
        click2 = 0
        return;
    }else if (click1 == "coin" || click2 == "coin"){
        //flip the coin card(s)
        if (click1 == "coin" && click2 == "coin"){
            click1 = 0
            click2 = 0
            return;
        }
    }
    if (click1 == "swap" && click2 != "swap" || click1 != "swap" && click2 == "swap"){
        //run the swap function for that player
    }
    if (click1 == "draw" && click2 != "draw" || click1 != "draw" && click2 == "draw"){
        //run the draw action for that player, if the other player didn't do swap
    }else{
        //flip both, since both are the same
        click1 = 0
        click2 = 0
        return;
    }
    if (coinWin = true){
        endgame();
    }
    if(allCardsFlipped = true){
        finalRound();
    }else if(endFunction <= 10){
        endGame();
        endfunction += 1
    }
    click1 = 0
    click2 = 0
}
function finalRound(){
    var elem = getElementsAt(getWidth()/2, getHeight()/2);
    
}
function endGame(){
    removeAll();
    var gameOver = new Text("Player " + playerWon + " wins!", "30pt Arial");
    add(gameOver);
    gameOver.move(0, 100);
}
