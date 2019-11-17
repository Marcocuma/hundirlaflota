import {
    Board
} from './moduloBarcos.js';
document.body.onload = inicio;
var prepared1=false,prepared2=false;
var tablero1 = new Board;
var tablero2 = new Board;
var title,stateTitle,randomButton,turn, confirmButton, restartButton,cleanButton, divTablero1, form, divTablero2, tabla1, tabla2, ships1,message, ships2;
function inicio() {
    title=document.createElement("h1");
    title.innerText="Preparation time";
    document.body.appendChild(title);
    stateTitle=document.createElement("h1");
    stateTitle.innerText="Player 1 turn";
    document.body.appendChild(stateTitle);
    confirmButton=document.createElement("button");
    confirmButton.innerText="Confirm";
    confirmButton.type="button";
    confirmButton.onclick=confirm;
    randomButton=document.createElement("button");
    randomButton.innerText="Random";
    randomButton.type="button";
    randomButton.onclick=random;
    restartButton=document.createElement('button');
    restartButton.innerText="Restart";
    restartButton.type="button";
    restartButton.onclick=restart;
    cleanButton=document.createElement('button');
    cleanButton.innerText="Clean";
    cleanButton.type="button";
    cleanButton.onclick=clean;
    divTablero1 = document.createElement("div");
    divTablero1.id = "tablero1";
    createBoardP1();
    divTablero1.appendChild(tabla1);
    document.body.appendChild(divTablero1);
    divTablero2 = document.createElement("div");
    divTablero2.id = "tablero2";
    createBoardP2();
    createForm();
    divTablero2.appendChild(tabla2);
    document.body.appendChild(divTablero2);
    document.body.appendChild(restartButton);
    document.body.appendChild(confirmButton);
    document.body.appendChild(randomButton);
    document.body.appendChild(cleanButton);
    document.body.appendChild(document.createElement("br"));
    form.style.display="inline";
    document.body.appendChild(form);
    divTablero1.style.float="left";
    divTablero1.style.marginRight="3em";
    message=document.createElement("h1");
    document.body.appendChild(message);
    ships1=[4,3,2,1];
    ships2=[4,3,2,1];
}
function createForm(){
    form=document.createElement("form");
    //direction of the boat
    let direction=document.createElement("select");
    direction.id="direction";
    let option0=document.createElement("option");
    option0.innerHTML="Up";
    option0.value="1";
    let option1=document.createElement("option");
    option1.innerHTML="Right";
    option1.value="2";
    let option2=document.createElement("option");
    option2.innerHTML="Down";
    option2.value="3";
    let option3=document.createElement("option");
    option3.innerHTML="Left";
    option3.value="4";
    direction.appendChild(option0);
    direction.appendChild(option1);
    direction.appendChild(option2);
    direction.appendChild(option3);
    //life of the boat
    let life=document.createElement("select");
    life.id="life";
    option0=document.createElement("option");
    option0.innerHTML="1";
    option0.value="1";
    option1=document.createElement("option");
    option1.innerHTML="2";
    option1.value="2";
    option2=document.createElement("option");
    option2.innerHTML="3";
    option2.value="3";
    option3=document.createElement("option");
    option3.innerHTML="4";
    option3.value="4";
    life.appendChild(option0);
    life.appendChild(option1);
    life.appendChild(option2);
    life.appendChild(option3);
    form.appendChild(direction);
    form.appendChild(life);
}
function restart(){
    title.innerText="Preparation time";
    stateTitle.innerText="Player 1 turn";
    prepared1=false;
    prepared2=false;
    tablero2=new Board;
    tablero1=new Board;
    console.log(testFull(tablero1));
    console.log(testFull(tablero1));
    divTablero1.removeChild(tabla1);
    divTablero2.removeChild(tabla2);
    createBoardP1();
    createBoardP2();
    divTablero1.appendChild(tabla1);
    divTablero2.appendChild(tabla2);
    message.innerText='';
    ships1=[4,3,2,1];
    ships2=[4,3,2,1];
}
function clean(){
    if(prepared1==false){
        tablero1.cleanBoard();
        modtablero(tabla1,tablero1,touchP1);
        ships1=[4,3,2,1];
    } else if(prepared2==false){
        tablero2.cleanBoard();
        modtablero(tabla2,tablero2,touchP2);
        ships2=[4,3,2,1];
    }
}
function random(){
    if(prepared1==false){
        tablero1.cleanBoard();
        tablero1.fill();
        modtablero(tabla1,tablero1,touchP1);
    } else if(prepared2==false){
        tablero2.cleanBoard();
        tablero2.fill();
        modtablero(tabla2,tablero2,touchP2);
    }
}
function testFull(board){
    let counter=0;
    board.board.forEach(element => {
        element.forEach(element2 => {
            if(element2==1)
                counter++
        });
    });
    if(counter==20)
        return true;
    return false;
}
function confirm(){
    if(prepared1==false){
        if(testFull(tablero1)){
            prepared1=true;
            stateTitle.innerText="Player 2 turn";
            hideShips();
        }
    }else if(prepared2==false){
        if(testFull(tablero2)){
            prepared2=true;
            stateTitle.innerText="Player 1 turn";
            title.innerText="Play Round";
            turn=2;
            hideShips();
        }
    }
}
function createBoardP1(){
    tabla1 = document.createElement("table");
    tabla1.style.borderCollapse = "collapse";
    var fila, columna;
    for (let i = 0; i < tablero1.board.length; i++) {
        fila = document.createElement("tr");
        fila.style.height="50px";
        for (let j = 0; j < tablero1.board[i].length; j++) {
            columna = document.createElement("td");
            columna.style.border = "2px solid black";
            columna.style.width="50px";
            columna.onclick = touchP1;
            if (tablero1.board[i][j]==1) {
                columna.style.backgroundColor='grey';
            }
            //columna.innerText = tablero1.board[i][j];
            fila.appendChild(columna)
        }
        tabla1.appendChild(fila);
    }
}
function createBoardP2(){
    tabla2 = document.createElement("table");
    tabla2.style.borderCollapse = "collapse";
    var fila, columna;
    for (let i = 0; i < tablero1.board.length; i++) {
        fila = document.createElement("tr");
        fila.style.height="50px";
        for (let j = 0; j < tablero2.board[i].length; j++) {
            columna = document.createElement("td");
            columna.style.border = "2px solid black";
            columna.style.width="50px";
            columna.onclick = touchP2;
            //columna.innerText = tablero1.board[i][j];
            fila.appendChild(columna)
        }
        tabla2.appendChild(fila);
    }
}
function touchP2(event) {
    if(prepared1&&prepared2&&turn==2){
        var result=tablero2.touch(event.target.parentElement.rowIndex,event.target.cellIndex);
        if (result==1){
            event.target.innerText="X";
            event.target.style.color="red";
        } else {
            event.target.innerText="O";
            event.target.style.color="black";
            turn=1;
            stateTitle.innerText="Player 2 turn";
        }
        event.target.style.textDecorationStyle="bold";
        event.target.style.fontSize="2em";
        event.target.style.textAling="center";
        event.target.onclick="";
        if(tablero2.checkLose()==1){
            message.innerText="Player 1 won the game"
        }
    }else if(prepared2==false&&prepared1==true){
        let dir=parseInt(document.getElementById("direction").value);
        let life=parseInt(document.getElementById("life").value);
        let row=parseInt(event.target.parentElement.rowIndex);
        let cell=parseInt(event.target.cellIndex);
        if(ships2[life-1]!=0){
            if(tablero2.checkSpace(row,cell,dir,life)){
                console.log(row+''+cell+''+dir+''+life);
                console.log(tablero2.setBarco(row,cell,dir,life));
                ships2[life-1]--;
                console.log(tablero2.board);
                modtablero(tabla2,tablero2,touchP2);
            }
        }
    }
}
function touchP1(event) {
    if(prepared1&&prepared2&&turn==1){
        var result=tablero1.touch(event.target.parentElement.rowIndex,event.target.cellIndex);
        if (result==1){
            event.target.innerText="X";
            event.target.style.color="red";
        } else {
            event.target.innerText="O";
            event.target.style.color="black";
            turn=2;
            stateTitle.innerText="Player 1 turn";
        }
        event.target.style.textDecorationStyle="bold";
        event.target.style.fontSize="2em";
        event.target.style.textAling="center";
        event.target.onclick="";
        if(tablero1.checkLose()==1){
            message.innerText="Player 2 won the game"
        }
    }else if(prepared1==false){
        let dir=parseInt(document.getElementById("direction").value);
        let life=parseInt(document.getElementById("life").value);
        let row=parseInt(event.target.parentElement.rowIndex);
        let cell=parseInt(event.target.cellIndex);
        if(ships1[life-1]!=0){
            if(tablero1.checkSpace(row,cell,dir,life)){
                console.log(row+' '+cell+' '+dir+' '+life);
                console.log(tablero1.setBarco(row,cell,dir,life));
                ships1[life-1]--;
                console.log(tablero1.board);
                modtablero(tabla1,tablero1,touchP1);
            }
        }
    }
}
function modtablero(tabla,tablero,event){
    for (let i = 0; i < tablero.board.length; i++) {
        for (let j = 0; j < tablero.board[i].length; j++) {
            if (tablero.board[i][j]==1) {
                tabla.rows[i].cells[j].style.backgroundColor='grey';
                tabla.rows[i].cells[j].onclick=event;
            } else {
                tabla.rows[i].cells[j].style.backgroundColor='white';
                tabla.rows[i].cells[j].onclick=event;
            }
        }
    }
}
function hideShips(){
    for (let i = 0; i < tablero1.board.length; i++) {
        for (let j = 0; j < tablero1.board[i].length; j++) {
                tabla1.rows[i].cells[j].style.backgroundColor='white';
        }
    }
    for (let i = 0; i < tablero2.board.length; i++) {
        for (let j = 0; j < tablero2.board[i].length; j++) {
                tabla2.rows[i].cells[j].style.backgroundColor='white';
        }
    }
}
