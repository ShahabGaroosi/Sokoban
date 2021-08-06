/*jshint esversion: 6 */
/* jshint browser: true */

var myContent = document.getElementById("content");
var tileMap = tileMap01;
var personPos;

function idConvers(i) {
    return "x"+i[0]+"y"+i[1];
}

for (let j = 0; j < tileMap.height; j++) {
    let newBlocks = document.createElement("TR");
    for (let i = 0; i < tileMap.width; i++) {
        let newBlock = document.createElement("TD");
        newBlock.classList.add("block");
        newBlock.id = idConvers([i,j]);
        if (tileMap.mapGrid[j][i]!=" ") {
            newBlock.classList.add(tileMap.mapGrid[j][i]);
        }
        newBlocks.appendChild(newBlock);
        if (tileMap.mapGrid[j][i] == "P") {
            personPos = [i,j];
        }
    }
    myContent.appendChild(newBlocks);
}

window.addEventListener("keydown", updateTileMap);

function updateTileMap(event) {
    switch (event.key) {
        case "ArrowLeft":
            movePlayer(event, [-1,0]);
            break;
        case "ArrowRight":
            movePlayer(event, [1,0]);
            break;
        case "ArrowUp":
            movePlayer(event, [0,-1]);
            break;
        case "ArrowDown":
            movePlayer(event, [0,1]);
            break;
    }
}

function movePlayer(event, diffPos) {
    event.preventDefault();
    let newPos = [personPos[0]+diffPos[0], personPos[1]+diffPos[1]];
    if (["block G","block"].includes(document.getElementById(idConvers(newPos)).className)) {
        document.getElementById(idConvers(personPos)).classList.remove("P");
        document.getElementById(idConvers(newPos)).classList.add("P");
        personPos = newPos;
    }
    else if (document.getElementById(idConvers(newPos)).classList.contains("B")) {
        let newPos2 = [newPos[0]+diffPos[0], newPos[1]+diffPos[1]];
        if (["block G","block"].includes(document.getElementById(idConvers(newPos2)).className)) {
            document.getElementById(idConvers(personPos)).classList.remove("P");
            document.getElementById(idConvers(newPos)).classList.add("P");
            document.getElementById(idConvers(newPos)).classList.remove("B");
            document.getElementById(idConvers(newPos2)).classList.add("B");
            personPos = newPos;
        }
    }
}

