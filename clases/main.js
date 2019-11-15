import {
    Board
} from './moduloBarcos.js';
document.body.onload = inicio;
var prepared1=false,prepared2=false;
var tablero1 = new Board;
var tablero2 = new Board;
var title,randomButton,confirmButton,restartButton,divTablero1,form,divTablero2, tabla1, tabla2,ships;
function inicio() {
    title=document.createElement("h1");
    title.innerText="Preparation time";
    document.body.appendChild(title);
    confirmButton=document.createElement("button");
    confirmButton.innerText="Confirm";
    confirmButton.type="button";
    confirmButton.onclick=confirm;
    randomButton=document.createElement("button");
    randomButton.innerText="Confirm";
    randomButton.type="button";
    randomButton.onclick=random;
    restartButton=document.createElement('button');
    restartButton.innerText="Restart";
    restartButton.type="button";
    restartButton.onclick=restart;
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
    document.body.appendChild(document.createElement("br"));
    form.style.display="inline";
    document.body.appendChild(form);
    divTablero1.style.float="left";
    divTablero1.style.marginRight="3em";
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
    
    let option0=document.createElement("option");
    option0.innerHTML="1";
    option0.value="1";
    let option1=document.createElement("option");
    option1.innerHTML="2";
    option1.value="2";
    let option2=document.createElement("option");
    option2.innerHTML="3";
    option2.value="3";
    let option3=document.createElement("option");
    option3.innerHTML="4";
    option3.value="4";
    direction.appendChild(option0);
    direction.appendChild(option1);
    direction.appendChild(option2);
    direction.appendChild(option3);
    form.appendChild(direccion);
    form.appendChild(life);
}
function restart(){
    prepared1=false;
    prepared2=false;
    tablero2=new Board;
    tablero1=new Board;
    console.log(testFull(tablero1));
    tablero2.fill();
    tablero1.fill();
    console.log(testFull(tablero1));
    divTablero1.removeChild(tabla1);
    divTablero2.removeChild(tabla2);
    createBoardP1();
    createBoardP2();
    divTablero1.appendChild(tabla1);
    divTablero2.appendChild(tabla2);
}
function random(){
    if(prepared1==false){
        tablero1.fill();
    } else if(prepared2==false){
        tablero2.fill();
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
function checkPrepared(){
    if(prepared1&&prepared2)
        return true;
    return false;
}
function confirm(){
    if(prepared1==false){
        if(testFull(tablero1))
            prepared1=true;
    }else if(prepared2==false){
        if(testFull(tablero2))
            prepared2=true;
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
    var result=tablero2.touch(event.target.parentElement.rowIndex,event.target.cellIndex);
    if (result==1){
        event.target.innerText="X";
        event.target.style.color="red";
    } else {
        event.target.innerText="O";
        event.target.style.color="black";
    }
    event.target.style.textDecorationStyle="bold";
    event.target.style.fontSize="2em";
    event.target.style.textAling="center";
    event.target.onclick="";
    if(tablero2.checkLose()==1){
        let message=document.createElement("h1");
        message.innerText="Player 1 won the game"
        document.body.appendChild(message);
    }
}
function touchP1() {
    var result=tablero1.touch(event.target.parentElement.rowIndex,event.target.cellIndex);
    if (result==1){
        event.target.innerText="X";
        event.target.style.color="red";
    } else {
        event.target.innerText="O";
        event.target.style.color="black";
    }
    event.target.style.textDecorationStyle="bold";
    event.target.style.fontSize="2em";
    event.target.style.textAling="center";
    event.target.onclick="";
    if(tablero1.checkLose()==1){
        let message=document.createElement("h1");
        message.innerText="Player 2 won the game"
        document.body.appendChild(message);
    }
}