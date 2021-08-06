/*jshint esversion: 6 */
/* jshint browser: true */

var myContent = document.getElementById("content");
var idCounter = 0;
var tileMap = tileMap01;
var personPos;

for (let i = 0; i < tileMap.height; i++) {
    let newBlocks = document.createElement("TR");
    for (let j = 0; j < tileMap.width; j++) {
        let newBlock = document.createElement("TD");
        newBlock.classList.add("block");
        newBlock.id = ++idCounter;
        if (tileMap.mapGrid[i][j]!=" ") {
            newBlock.classList.add(tileMap.mapGrid[i][j]);
        }
        newBlocks.appendChild(newBlock);
        if (tileMap.mapGrid[i][j] == "P") {
            personPos = [i,j];
        }
    }
    myContent.appendChild(newBlocks);
}

window.addEventListener("keydown", updateTileMap);

window.addEventListener("keydown", function(event){
    if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(event.key)) {
        event.preventDefault();
    }
  });

function indexPosConvers(i) {
    return i[0]*tileMap.width+i[1]+1;
}
function movePlayer(newPos) {
    if (["block","block G"].includes(document.getElementById(indexPosConvers(newPos)).className)) {
        document.getElementById(indexPosConvers(personPos)).classList.remove("P");
        if ((tileMap.mapGrid[personPos[0]][personPos[1]]!="P")&&(tileMap.mapGrid[personPos[0]][personPos[1]]!=" ")) {
            document.getElementById(indexPosConvers(personPos)).classList.add(tileMap.mapGrid[personPos[0]][personPos[1]]);
        }
        document.getElementById(indexPosConvers(newPos)).classList.remove("G");
        document.getElementById(indexPosConvers(newPos)).classList.add("P");
        personPos = newPos;
    }
    else if (document.getElementById(indexPosConvers(newPos)).className == "block B") {
        let newPos2 = [newPos[0] + (newPos[0]-personPos[0]), newPos[1] + (newPos[1]-personPos[1])];
        if (["block","block G"].includes(document.getElementById(indexPosConvers(newPos2)).className)) {
            document.getElementById(indexPosConvers(personPos)).classList.remove("P");
            if ((tileMap.mapGrid[personPos[0]][personPos[1]]!="P")&&(tileMap.mapGrid[personPos[0]][personPos[1]]!=" ")) {
                document.getElementById(indexPosConvers(personPos)).classList.add(tileMap.mapGrid[personPos[0]][personPos[1]]);
            }
            document.getElementById(indexPosConvers(newPos2)).classList.remove("G");
            document.getElementById(indexPosConvers(newPos2)).classList.add("B");
            document.getElementById(indexPosConvers(newPos)).classList.remove("B");
            document.getElementById(indexPosConvers(newPos)).classList.add("P");
            personPos = newPos;
        }
    }
}
function updateTileMap(event) {
    switch (event.key) {
        case "ArrowLeft":
            movePlayer([personPos[0],personPos[1]-1]);
            break;
        case "ArrowRight":
            movePlayer([personPos[0],personPos[1]+1]);
            break;
        case "ArrowUp":
            movePlayer([personPos[0]-1,personPos[1]]);
            break;
        case "ArrowDown":
            movePlayer([personPos[0]+1,personPos[1]]);
            break;
        default:
            break;
    }
}

function reset(){
    let idCounter0=0;
    for (let i = 0; i < tileMap.height; i++) {
        for (let j = 0; j < tileMap.width; j++) {
            document.getElementById(++idCounter0).className="block "+tileMap.mapGrid[i][j];
        }
    }
}