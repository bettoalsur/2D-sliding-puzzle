// dimensiona o canvas

let dim1 = window.innerWidth;
let dim2 = window.innerHeight;
let res = Math.min(dim1,dim2);

let imgAll = [];

function preload() {
  imgAll[0] = loadImage('foto0.jpg');
  imgAll[1] = loadImage('foto1.jpg');
  imgAll[2] = loadImage('foto2.jpg');
  imgAll[3] = loadImage('foto3.jpg');
  imgAll[4] = loadImage('foto4.jpg');
  imgAll[5] = loadImage('foto5.jpg');
  imgAll[6] = loadImage('foto6.jpg');
  imgAll[7] = loadImage('foto7.jpg');
}


function comecarJogo() {
  
  w = res/N;
  blank = N*N-1;
  
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
  
  baralharQuadros();
  game = true;
  gameWin = false;
  
  menos.remove();
  plus.remove();
  ok.remove();
  
}


function baralharQuadros () {
  
  for (let i = 0 ; i < 7000 ; i++) {
    let index = floor( random(N*N) );
    
    let i = index%N;
    let j = floor(index/N);
    
    move(i,j);
  }
  
}


function mostrarImagens () {
  
  let M = ceil(sqrt(imgAll.length));
  let tamImg = res/M;
  let tamText = tamImg/10;
  
  textSize(tamText);
  fill(255,0,10);
  stroke(25);
  strokeWeight(2);
    
  for(let j = 0; j < M ; j++){
    for(let i = 0; i < M ; i++){
      
      let id = i + j*M;
      
      if (id < imgAll.length) {        
        image(imgAll[id],i*tamImg,j*tamImg,tamImg, tamImg);
        text( id + 1 , i*tamImg + 10 , j*tamImg + 3 + tamText);
      }
    }
  }
  
}

let plus, menos, ok;
function criarBotoes () {
  
  let tamBot = res*0.1;
  let tamFonte = tamBot*0.55;
  
  menos = createButton(' - ');
  menos.position(0,res*0.9);
  menos.style('width',tamBot+'px');
  menos.style('height',tamBot+'px');
  menos.style('font-size',tamFonte+'px');
  menos.style('align','center');
  menos.mousePressed(diminuir);
  
  plus = createButton(' + ');
  plus.position(tamBot,res*0.9);
  plus.style('width',tamBot+'px');
  plus.style('height',tamBot+'px');
  plus.style('font-size',tamFonte+'px');
  plus.style('text-align','center');
  plus.mousePressed(incrementar);
  
  ok = createButton('ok');
  ok.position(85,res*0.9);
  ok.position(2*tamBot,res*0.9);
  ok.style('width',tamBot+'px');
  ok.style('height',tamBot+'px');
  ok.style('font-size',tamFonte+'px');
  ok.style('text-align','center');
  ok.mousePressed(comecarJogo);
}

function mostrarImagem () {
  
  image(img,0,0,res*0.9,res*0.9);
  let tam = res*0.9/N;
  
  stroke(0);
  noFill();
  strokeWeight(1);
  
  for(let j = 0; j < N ; j++){
    for(let i = 0; i < N ; i++){
      
      rect(i*tam,j*tam,tam,tam);
      
    }
  }
  
}

function incrementar(){
  if (N<6) {
    N++;
  }
  
}

function diminuir(){
  if (N>2) {
    N--;
  }
}


// variaveis jogo

let img;

let N;
let w;

let partes = [];
let blank;
let game, gameWin;


function setup() {
  
  createCanvas(res,res);
  
}

function draw() {
  
  background(25);
  
  if (img == null) {
    mostrarImagens();
  } else if (w == null) {
    mostrarImagem();
  } else if (game && !gameWin) {
    
    verifyWin();
    
    for (let i = 0; i < partes.length ; i ++ ) {
      partes[i].show(i);
    }
    
  } else {
    
    for (let i = 0; i < partes.length ; i ++ ) {
      partes[i].showWin(i);
    }
    
  }
  
}

function mouseClicked(){
  
  if (game && !gameWin) {
    
    let i = floor(mouseX/w);
    let j = floor(mouseY/w);
    move(i,j);
    
  }
  
  if (img == null) {
    
    let M = ceil(sqrt(imgAll.length));
    let tamImg = res/M;
    let i = floor(mouseX/tamImg);
    let j = floor(mouseY/tamImg);
    let index = i + j*M;
    
    if (index < imgAll.length) {
      img = imgAll[index];
      N = 2;
      criarBotoes();
    }
    
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


