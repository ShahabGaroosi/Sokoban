/*jshint esversion: 6 */
/* jshint browser: true */

var myContent = document.getElementById("content");
var idCounter = 0;
var tileMap = tileMap01;
var personId;

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
            personId = idCounter;
        }
    }
    myContent.appendChild(newBlocks);
}



function reset(){
    let idCounter0=0;
    for (let i = 0; i < tileMap.height; i++) {
        for (let j = 0; j < tileMap.width; j++) {
            document.getElementById(++idCounter0).className="block "+tileMap.mapGrid[i][j];
        }
    }
}