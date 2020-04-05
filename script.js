// var grid = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 0],
// 			[0, 0, 0, 0, 0, 0, 0, 0, 0]];
var grid = [
    [2, 0, 3, 0, 0, 8, 6, 0, 7],
    [1, 4, 0, 7, 2, 6, 0, 0, 9],
    [5, 0, 7, 1, 3, 9, 4, 2, 8],
    [0, 2, 5, 0, 8, 1, 9, 0, 4],
    [4, 1, 0, 9, 0, 3, 2, 0, 5],
    [0, 7, 9, 2, 0, 5, 0, 3, 6],
    [6, 0, 2, 0, 1, 0, 0, 9, 3],
    [7, 0, 0, 5, 0, 2, 0, 0, 1],
    [0, 8, 1, 3, 6, 7, 0, 4, 0]
];

function createGrid(grid){
	for(x=0; x<grid.length; x++){
		for(y=0; y<grid[x].length; y++){
			grid[x][y] = (getGridContent(x, y) == '') ? 0 : parseInt(getGridContent(x, y));
		}
	}
	return grid;
}

function changeGridContent(rowNumber, cellNumber, value){  
	let element = document.getElementById('myTable').rows[rowNumber].cells;
	element[cellNumber].innerHTML = value;
}

function getGridContent(rowNumber, cellNumber){  
	let element = document.getElementById('myTable').rows[rowNumber].cells;
	return element[cellNumber].innerHTML;
}

function getChangeContentValues(){
	rn = parseInt(window.prompt("Input the Row number(0,1,2...)", "0"), 10);
	cn = parseInt(window.prompt("Input the Column number(0,1,2...)","0"), 10);
	content = parseInt(window.prompt("Input the Cell content"), 10);  
	changeGridContent(rn, cn, content);
}

function checkIfValid(rowNumber, colNumber, value){
	if(validInRow(rowNumber, value) && validInCol(colNumber, value) && validInBox(rowNumber, colNumber, value)){
		return true;
	}
	else {
		return false;
	}
}

function validInRow(rn, v){
	if(grid[rn].includes(v)){
		return false;
	}
	else{
		return true;
	}
}

function validInCol(cn, v){
	for(let i=0; i<grid.length; i++){
		if(v == grid[i][cn]){
			return false;
		}
	}
	return true;
}

function validInBox(rn, cn, v){
	let boxR = Math.floor(rn/3);
	let boxC = Math.floor(cn/3);
	for(let r=boxR*3; r<boxR*3+3; r++){
		for(let c=boxC*3; c<boxC*3+3; c++){
			if(grid[r][c] == v && ([r, c] != [rn, cn])){
				return false;
			}
		}
	}
	return true;
}

function findNextEmpty(grid){
	for(let r=0; r<grid.length; r++){
		for(let c=0; c<grid[r].length; c++){
			if(grid[r][c] == 0){
				return [r, c]; 
			}
		}
	}
	return false;


}

function solve(grid){
	let [row, col] = [];
	//Looks for next empty square, if cant find, returns true
	if (!findNextEmpty(grid)){
		return true;
	} else{
		//gets row and col of next empty square
		[row, col] = findNextEmpty(grid);
	}
	//attempts to put new value in square at given location
	for(let newVal=1; newVal<10; newVal++){
		//checks if value is valid
		if(checkIfValid(row, col, newVal)){
			//if valid puts value in location
			grid[row][col] = newVal;
			//checks to see if the last newVal added solves grid
			if (solve(grid)){
				return true;
			}
			//if it didn't it will reset last grid number to 0
		}
		grid[row][col] = 0;
	}
	return false;
}

solve(grid);