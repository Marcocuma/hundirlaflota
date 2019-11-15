export class Board {
    constructor() {
        //Create an two dimensions array and fill it with 0 to indicate that it is empty
        this.board = new Array(10)
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(10);
        }
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                this.board[i][j] = 0;
            }
        }
    }
    checkSpace(alt, anch, dir, life) {
        //Check that it is that position and direction there is space to place the boat. 
        //Returns true if there is and false if not. i=y axis, j=x axis
        //Comprobar direccion con un switch pa que no se pase de largo 
        let space = true
        if((alt>9||alt<0||anch>9||anch<0)){
            space=false;
        } else {
            switch (dir) {
                //goes up
                case 1:
                    if ((alt-life)<0) {
                        space=false;
                    }else{
                        for (let j = anch - 1; j <= (anch + 1); j++) {
                            for (let i = alt+1; i >= (alt - life); i--) {
                                if (j >= 0 && i >= 0 && i < 10 && j < 10 )
                                    if(this.board[i][j] == 1)
                                        space = false;
                            }
                        }
                    }
                    break;
                //Goes to the right
                case 2:
                    if ((anch+life)>9) {
                        space=false;
                    }else{
                        for (let i = alt - 1; i <= (alt + 1); i++) {
                            for (let j = anch - 1; j <= (anch + life); j++) {
                                if (j >= 0 && i >= 0 && i < 10 && j < 10 )
                                    if(this.board[i][j] == 1)
                                        space = false;
                            }
                        }
                    }
                    break;
                //goes down
                case 3:
                    if ((alt+life)>9) {
                        space=false;
                    }else{
                        for (let j = anch - 1; j <= (anch + 1); j++) {
                            for (let i = alt - 1; i <= (alt + life); i++) {
                                if (j >= 0 && i >= 0 && i < 10 && j < 10 )
                                    if(this.board[i][j] == 1)
                                        space = false;
                            }
                        }
                    }
                    break;
                //goes to the left
                case 4:
                    if ((anch-life)<0) {
                        space=false;
                    }else{
                        for (let i = alt - 1; i <= (alt + 1); i++) {
                            for (let j = anch + 1; j >= (anch - life); j--) {
                                if (j >= 0 && i >= 0 && i < 10 && j < 10 )
                                    if(this.board[i][j] == 1)
                                        space = false;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        return space;
    }
    fill() {
        //Place ships on the board randomly
        //4 ships-1life; 3ships-2life; 2ships-3lifes; 1ships-4lifes
        let ships=new Array(4,3,2,1);
        for(let i=0;i<ships.length;i++) {
            var contador=ships[i];
            while(contador>0) {
                let random = Math.round(Math.random() * 10);
                let random2 = Math.round(Math.random() * 10);
                let life = i+1;
                let dir = Math.round(Math.random() * (4-1)+1);
                if (this.checkSpace(random, random2, dir, life) == true) {
                    contador--;
                    this.setBarco(random, random2, dir, life);
                }
            }
        }
    }
    setBarco(alt, anch, dir, life) {
        //Check if there is space in that position and place the ship changing the 0 by 1 in the array
        if (this.checkSpace(alt, anch, dir, life)) {
            switch (dir) {
                case 1:
                    for (let i = alt; i > (alt - life); i--) {
                        this.board[i][anch] = 1;
                    }
                    break;
                case 2:
                    for (let i = anch; i < (anch + life); i++) {
                        this.board[alt][i] = 1;
                    }
                    break;
                case 3:
                    for (let i = alt; i < (alt + life); i++) {
                        this.board[i][anch] = 1;
                    }
                    break;
                case 4:
                    for (let i = anch; i > (anch - life); i--) {
                        this.board[alt][i] = 1;
                    }
                    break;

                default:
                    break;
            }
        } else {
            console.log("Unexpected Error");
        }

    }
    touch(alt, anch) {
        //subtract a life point from the ship and return 1 if it has not failed and 3 if it has failed
        if (this.board[alt][anch] == 1) {
            this.board[alt][anch] = 2;
            return 1;
        }
        this.board[alt][anch] = 3;
        return 0;
    }
    checkLose() {
        //Check that there are no ships left without sinking on the board and return 1. If there is any ship, return 0
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == 1)
                    return 0;
            }
        }
        return 1;
    }
}