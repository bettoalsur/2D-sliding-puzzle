// dimensiona o canvas

let dim1 = window.innerWidth;
let dim2 = window.innerHeight;
let res = Math.min(dim1,dim2);


// carrega a imagem
let numImg = 0;
while (numImg < 1 || numImg > 3) {
  numImg = parseInt(prompt("\nScar 1 -> 1 \nScar 2 - > 2 \nBeto - > 3"));
}

numImg--;

let img;
function preload() {
  img = loadImage('foto'+numImg+'.jpg');
}

// divide o canvas

let N = 0;
while (N < 2 || N > 6) {
  N = parseInt(prompt("Ingresse um numero entre 2 e 6"));
}

let w = res/N;

// variaveis jogo

let partes = [];
let blank = N*N-1;
let gameWin = false;


function setup() {
  
  createCanvas(res,res);
  
  // divisoes...
  
  let wImg = img.width/N;
  
  for (let j = 0 ; j < N ; j++) {
    for (let i = 0 ; i < N ; i++) {
      
      let id = i + j*N;
      
      let x = i*wImg;
      let y = j*wImg;
      
      let quad = createImage(wImg,wImg);
      quad.copy(img,x,y,wImg,wImg,0,0,wImg,wImg);
            
      partes.push( new parte(quad,id) );
      
    }
  }
  
  // shuffle images..
  
  for (let i = 0 ; i < 10000 ; i++) {
    let index = floor( random(N*N) );
    
    let i = index%N;
    let j = floor(index/N);
    
    move(i,j);
  }
  
}

function draw() {
  
  background(25);
  
  verifyWin();
  
  for (let i = 0; i < partes.length ; i ++ ) {
    
    if (!gameWin) {
      partes[i].show(i);
    } else {
      partes[i].showWin(i);
    }
    
  }
  
}

function mouseClicked(){
  
  if (!gameWin) {
    
    let i = floor(mouseX/w);
    let j = floor(mouseY/w);
    move(i,j);
    
  }
  
}

function move(i,j) {
  
  let posRef = i + j*N;
  
  if (partes[posRef].id != -1) {
    
    // espaco nao vazio...
    
    let i2 = blank%N;
    let j2 = floor(blank/N);
    
    if ( i==i2 ) { // mesma coluna
      
      if (j < j2) { 
        
        for (let pos = blank-N; pos >= posRef; pos-=N) {
          swapy(pos)
        }
        
      } else {
        
        for (let pos = blank+N; pos <= posRef; pos+=N) {
          swapy(pos)
        }
        
      }
      
    } // fim mesma coluna
    
    if ( j==j2 ) { // mesma fila
      
      if (i < i2) { 
        
        for (let pos = blank-1; pos >= posRef; pos-- ) {
          swapy(pos)
        }
        
      } else {
        
        for (let pos = blank+1; pos <= posRef; pos++ ) {
          swapy(pos)
        }
        
      }
      
    } // fim mesma fila
    
  } // fim se nao eh vazio
  
}

function swapy (pos) {
  
  let temp = partes[pos];
  partes[pos] = partes[blank];
  partes[blank] = temp;
  
  blank = pos;
  
}


function verifyWin() {
  
  let cont = 0;
  for (let i = 0; i < partes.length; i++) {
    if ( partes[i].id != -1 ) {
      if (partes[i].id == i){
        cont++
      }
    }
  }
  
  if (cont == N*N-1){
    gameWin = true;
  }
  
}


