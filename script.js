let container;
let containerheight=640;
let containerwidth=360;
let context;

let birdwidth=34;
let birdheight=24;
let birdx=containerwidth/8;
let birdy=containerheight/2;
let birdimage;

let bird = {
   x:birdx,
   y:birdy,
   width:birdwidth,
   height:birdheight

}

let pipearray=[];
let pipewidth=64;
let pipeheight=512;
let pipex=containerwidth;
let pipey=0;

let toppipeimage;
let bottompipeimage;

let movex=-2;
let gravityy=0;
let gravity=0.4;

let over=false;
let score=0;

 window.onload=function(){
    container=document.getElementById("container");
    container.height=containerheight;
    container.width=containerwidth;
    context=container.getContext("2d");

    context.fillStyle="transparent";
    context.fillRect(bird.x,bird.y,bird.width,bird.height);

    birdimage=new Image();
    birdimage.src="./flappybird.png";
    birdimage.onload = function() {
      context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);
  };

  toppipeimage=new Image();
  bottompipeimage=new Image();

  toppipeimage.src="./toppipe.png";
  bottompipeimage.src="./bottompipe.png";

  requestAnimationFrame(update);
  setInterval(placepipe,1500);
  document.addEventListener("keydown",movebird);
 }

 function update(){
   requestAnimationFrame(update);
   if(over){
      return;
   }
   context.clearRect(0,0,container.width,container.height);

   gravityy+=gravity;
   //bird.y+=gravityy;
   bird.y=Math.max(bird.y+gravityy,0);
   context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);

if(bird.y>container.height){
   over=true;
}


   for(let i=0;i<pipearray.length;i++){
      let pipe=pipearray[i];
      pipe.x+=movex;
      context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
      
      if(!pipe.passed&&bird.x>pipe.x+pipe.width){
         score+=0.5;
         pipe.passed=true;
      }
      
      
      if(collision(bird, pipe)){
         over=true;
      }
   }

   while(pipearray.length>0&&pipearray[0].x<-pipewidth){
      pipearray.shift();
   }
context.fillStyle="white";
context.font="40px sans-serif";
context.fillText("Score: ",5,44 );
context.fillText(score,120,45);

if(over){
   context.fillStyle="yellow";
   context.fillText("GAME OVER! ",55,310 );
   context.fillStyle="white";
   context.fillText("Press space", 70, 380);
   context.fillText(" to play again", 60, 420);
}

  
 }

 function placepipe(){
   if (over){
      return;
   }
let randompipey=pipey-pipeheight/4-Math.random()*(pipeheight/2);
let opening=container.height/4;

   let toppipe={
      img:toppipeimage,
      x:pipex,
      y:randompipey,
      width:pipewidth,
      height:pipeheight,
      pass:false
   }
   pipearray.push(toppipe);
   
   let bottompipe={
      img:bottompipeimage,
      x:pipex,
      y:randompipey+pipeheight+opening,
      width:pipewidth,
      height:pipeheight,
      pass:false
   }
   pipearray.push(bottompipe);

 }

 function movebird(e){
   if(e.code=="Space"||e.code=="ArrowUp"){
gravityy=-6;
 

if(over){
   bird.y=birdy;
   pipearray=[];
   score=0;
   over=false;
}


   }

 }


 function collision(a,b){
   return a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
 }
 