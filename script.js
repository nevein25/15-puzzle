document.querySelector(".control-buttons span").onclick = function () {

    let name = prompt("Whats Your Name?");

    if (name == null || name == "") {


        document.querySelector(".name span").innerHTML = 'Unknown';

    } else {


        document.querySelector(".name span").innerHTML = name;

    }
    document.querySelector(".control-buttons").remove();
};


var columns = 4;
var rows = 4;
var currentImage;
var blank;
var moves = 0;

//img 13 is the blank

var images = ["3","5","7","4","1","6","12","2","14","9","15","8","13","11","10","16"];
//var images = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "13", "15", "16"];


window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("img"); //create <img>
            tile.id = r.toString() + "-" + c.toString();//id will be img coordinate <img id="0-0">
            tile.src = "Pics/" + images.shift() + ".jpg";// <img src="Pics/1.jpg" shift:removes first element from the array and return it

           
            tile.addEventListener("dragstart", clickImg);  //click on image to drag, to know the image im moving around
            tile.addEventListener("dragover", movingImg);    //moving image around while clicking
            // tile.addEventListener("dragenter", dragImgIntoImg);  //dragging image into another one
            // tile.addEventListener("dragleave", leavingAway);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDropp);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", swaping);      //swap the two tiles

            document.getElementById("container").append(tile);


        }
    }

}


function won() {
    let imgNumber = [];
    let imgName = [];
    var im = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];

    var collection = document.getElementsByTagName("img");
    for (let i = 0; i < collection.length; i++) {

        imgName[i] = collection[i].src.split("/Pics/");   //['file:///S:/My%20Projects/Slide%20Puzzle', '1.jpg']
        //console.log(imgName[i]);  
                   
        imgNumber[i] = imgName[i][1].split(".jpg", 1);//['1']
       // console.log(imgNumber[i]);

    }
    let win = 0;//number if correct tile in place
    for (let i = 0; i < collection.length; i++) {
        if (imgNumber[i] != im[i]) {
            return;
        }
        else {
            win++;
           // console.log("win " + win);
            if (win === 16) { 
                //let theScript = document.querySelector("script");
                let winContainer = document.createElement("div");
                winContainer.className = "win";
                document.body.appendChild(winContainer);


                let winChild = document.createElement("span");
                let winText = document.createTextNode("You Won Using " + moves + " Moves!");
                winChild.appendChild(winText);
                winContainer.appendChild(winChild);

                let playAgain = document.createElement("span");
                playAgain.className = "play-again";
                let playAgainText = document.createTextNode("Play Again?");
                playAgain.appendChild(playAgainText);
                winContainer.appendChild(playAgain);

                document.querySelector(".play-again").onclick = function () {
                    location.reload();
                }
               
            }
        }
    }


}

function clickImg() {
    currentImage = this;
    console.log("drag start");
}
function movingImg(e) {
    e.preventDefault();
    console.log("drag over");
}
// function dragImgIntoImg(e) {
//     e.preventDefault();
//     console.log("drag enter");
// }
// function leavingAway() {
//     console.log("drag leave");
// }
function dragDropp() {
    blank = this;
    console.log("drag drop");
}
function swaping() {

    //moving only to the blank
    if (!blank.src.includes("13.jpg")) {
        return;
    }

    let currentCoordinates = currentImage.id.split("-");
    let r = parseInt(currentCoordinates[0]);
    let c = parseInt(currentCoordinates[1]);

    let otherCoordinates = blank.id.split("-");
    let r2 = parseInt(otherCoordinates[0]);
    let c2 = parseInt(otherCoordinates[1]);

    let moveUp = r - 1 == r2 && c == c2;
    let moveDown = r == r2 - 1 && c == c2;

    let moveRight = r == r2 && c == c2 + 1;
    let moveLeft = r == r2 && c == c2 - 1;


    let isLegalMove = moveDown || moveUp || moveLeft || moveRight;

    if (isLegalMove) {
        let currentImageSrc = currentImage.src;
        let blankSrc = blank.src;
        currentImage.src = blankSrc;
        blank.src = currentImageSrc;
        moves += 1;
        //  console.log(moves);
        document.querySelector(".moves span").innerText = moves;
        won();

    }


    // console.log(currentImage.src);
}


