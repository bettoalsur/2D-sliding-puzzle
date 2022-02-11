class parte {
  
  constructor(img,index){
    
    this.quadro = img;
    
    if (index == N*N-1) {
      this.id = -1;
    } else {
      this.id = index;
    }
  
  }
  
  
  show(cont) {
    
    if (this.id != -1) {
      
      let i = cont%N;
      let j = floor(cont/N);

      let x = i*w;
      let y = j*w;

      image(this.quadro, x, y, w, w);

      stroke(0);
      noFill();
      strokeWeight(1);
      rect(x,y,w,w);
    }
    
  }
  
  showWin(cont) {
    
      
    let i = cont%N;
    let j = floor(cont/N);

    let x = i*w;
    let y = j*w;

    image(this.quadro, x, y, w, w);

    stroke(0,255,0);
    noFill();
    strokeWeight(2);
    rect(0,0,res,res);
    
  }
  
  
}