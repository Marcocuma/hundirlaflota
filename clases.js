class Barco{
    constructor(life){
        this.vida=life       
    }
    damage(x){
        this.vida=this.vida-x;
    }
}
class Tablero{
    constructor(){
        this.mar= new Array(10)
        for (let i = 0; i < this.mar.length; i++) {
            this.mar[i]=new Array(10);
        }
        for (let i = 0; i < this.mar.length; i++) {
            for (let j = 0; j < this.mar[0].length; j++) {
                this.mar[i][j]=0;
            }
        }
    }
    compruebaEspacio(alt,anch,dir,life){
        let espacio=true
        switch (dir) {
            case 1:
                for (let j = anch-1; j <= (anch+1); j++) {                
                    for (let i = alt; i > (alt-life); i--) {
                        console.log(i)
                        if (j<0||i<0||i>=10||j>=10||this.mar[i][j]==1)
                            espacio=false;
                    }
                }
                break;
            case 2:
                for (let j = alt-1; j <= (alt+1); j++) {
                    for (let i = anch; i < (anch+life); i++) {
                        if (i>=10||j>=10||this.mar[j][i]==1)
                            espacio=false;
                    }
                }
                break;
            case -1:
                for (let j = anch-1; j <= (anch+1); j++) {
                    for (let i = alt; i < (alt+life); i++) {
                        if (i>=10||j>=10||this.mar[i][j]==1)
                            espacio=false;
                    }
                }
                break;
            case -2:
                for (let j = alt-1; j <= (alt+1); j++) {
                    for (let i = anch; i > (anch-life); i--) {
                        if (i>=10||j>=10||this.mar[j][i]==1)
                            espacio=false;
                    }
                }
                break;
        
            default:
                break;
        }
        return espacio;
    }
    fill(){
        let contador=0;
        let espacio;
        while (contador<=5) {
            espacio=false;
            while (espacio==false) {
                let random=Math.round(Math.random()*10);
                let random2=Math.round(Math.random()*10);
                let vida=Math.round(Math.random()*4+1)
                let dir=0
                while (dir==0) {
                    dir=Math.trunc(Math.random()*5-2);
                }
                espacio=this.compruebaEspacio(random,random2,dir,vida)
                if (espacio==true){
                    this.setBarco(random,random2,dir,vida)
                }
            }
            contador++;
            this.draw();
        }
    }
    setBarco(alt, anch, dir, life){
        if(this.compruebaEspacio(alt,anch,dir,life)){
            switch (dir) {
                case 1:
                    for (let i = alt; i > (alt-life); i--) {
                        this.mar[i][anch]=1;
                    }
                    break;
                case 2:
                    for (let i = anch; i < (anch+life); i++) {
                        this.mar[alt][i]=1;
                    }
                    break;
                case -1:
                    for (let i = alt; i < (alt+life); i++) {
                        this.mar[alt][i]=1;
                    }
                    break;
                case -2:
                    for (let i = anch; i > (anch-life); i--) {
                        this.mar[alt][i]=1;
                    }
                    break;
            
                default:
                    break;
            }
        }

    }
    draw(){
        document.write("<table border=\"2\" width=\"100\">");
        for (let i = 0; i < this.mar.length; i++) {
            document.write("<tr>");
            for (let j = 0; j < this.mar[i].length; j++) {
                document.write("<td>"+this.mar[i][j]+"</td>");
            }
            document.write("</tr>");
        }
        document.write("</table>");
    }
}
var table=new Tablero;
table.fill()
table.draw();