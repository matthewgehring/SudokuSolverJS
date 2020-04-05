let grid = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0]];

function createGrid(grid){
	for(x=0; x<grid.length; x++){
		for(y=0; y<grid[x].length; y++){
			grid[x][y] = (getGridContent(x, y) == '') ? 0 : parseInt(getGridContent(x, y));
		}
	}
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

function checkIfValid(rowNumber, cellNumber, value){
	if(validInRow(rowNumber, value) && validInCol(cellNumber, value) && validInBox){
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
	for(i=0; i<grid.length; i++){
		if(v == grid[i][cn]){
			return false;
		}
		else{
			return true;
		}
	}
}

function validInBox(rn, cn, v){
	let boxR = Math.floor(rn/3);
	let boxC = Math.floor(cn/3);
	for(r=boxR*3; r<boxR*3+3; r++){
		for(c=boxC*3; c<boxC*3+3; c++){
			if(grid[r][c] == v && ([r, c] != [rn, cn])){
				return false;
			}
		}
	}
	return true;
}

createGrid(grid);
console.log(validInBox(0,0,1));
console.log(validInBox(0,0,8));