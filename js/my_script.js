/*jshint esversion: 6 */
/* jshint browser: true */

var myContent = document.getElementById("content");
var tileMap = tileMap01;
var personPos;

const classConvers = {
    " ": Tiles.Space,
    "W": Tiles.Wall,
    "G": Tiles.Goal,
    "P": Entities.Character,
    "B": Entities.Block,
};

function idConvers(i) {
    return "x"+i[0]+"y"+i[1];
}

for (let j = 0; j < tileMap.height; j++) {
    let newBlocks = document.createElement("TR");
    for (let i = 0; i < tileMap.width; i++) {
        let newBlock = document.createElement("TD");
        newBlock.id = idConvers([i,j]);
        newBlock.className=classConvers[tileMap.mapGrid[j][i]];
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
    if ([Tiles.Space, Tiles.Goal].includes(document.getElementById(idConvers(newPos)).className)) {
        document.getElementById(idConvers(personPos)).className=(tileMap.mapGrid[personPos[1]][personPos[0]]=="G")?Tiles.Goal:Tiles.Space;
        document.getElementById(idConvers(newPos)).className=Entities.Character;
        personPos = newPos;
    }
    else if ([Entities.Block,Entities.BlockDone].includes(document.getElementById(idConvers(newPos)).className)) {
        let newPos2 = [newPos[0]+diffPos[0], newPos[1]+diffPos[1]];
        if ([Tiles.Space,Tiles.Goal].includes(document.getElementById(idConvers(newPos2)).className)) {
            document.getElementById(idConvers(personPos)).className=(tileMap.mapGrid[personPos[1]][personPos[0]]=="G")?Tiles.Goal:Tiles.Space;
            document.getElementById(idConvers(newPos)).className=Entities.Character;
            document.getElementById(idConvers(newPos2)).className=(tileMap.mapGrid[newPos2[1]][newPos2[0]]=="G")?Entities.BlockDone:Entities.Block;
            personPos = newPos;
        }
    }
    checkGameFinished();
}

function checkGameFinished() {
    let numberOfBlocks = 0;
    let numberOfDoneBlocks = 0;
    for (let j = 0; j < tileMap.height; j++) {
        for (let i = 0; i < tileMap.width; i++) {
            if (document.getElementById(idConvers([i,j])).className == Entities.Block) {
                ++numberOfBlocks;
            }
            else if (document.getElementById(idConvers([i,j])).className == Entities.BlockDone) {
                ++numberOfDoneBlocks;
            }
        }
    }
    if ((numberOfBlocks==0)&&(numberOfDoneBlocks>0)) {
        alert("Game Complete!");
        window.location.reload();
    }
}
