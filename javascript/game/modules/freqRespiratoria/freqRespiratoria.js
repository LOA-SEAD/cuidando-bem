define(["require","text!../assets/html/freqRespiratoria/freqRespiratoria.html"],function(e){function a(){this.x,this.y,this.frameTime,this.accumulator=0,this.frameTotal,this.frameCounter=0,this.cyclesPerMinute,this.img=[],this.hasToDraw=!1,this.width,this.height,this.srWidth,this.srHeight,this.update=function(){this.accumulator+=o.time;while(this.accumulator>=this.frameTime)this.frameCounter++,this.frameCounter=this.frameCounter%this.frameTotal,this.hasToDraw=!0,this.accumulator-=this.frameTime},this.draw=function(e){if(this.hasToDraw){var t=e.getContext("2d"),n=this.frameCounter*this.width,r=this.img[this.frameCounter];t.drawImage(r,0,0,this.srWidth,this.srHeight,this.x,this.y,this.width,this.height)}}}function h(e){$(e).append(t);var r=$(n)[0];r.setAttribute("width",800),r.setAttribute("height",600)}function p(){$(n).show(),u.angle=-Math.PI/2,u.accumulator=0,f.frameCounter=0,o.accumulator=0,o.last=(new Date).getTime(),s=r.playing,g()}function d(){$(n).hide(),s=r.stopped}function v(){f.update(),u.accumulator+=o.time;while(u.accumulator>=u.time)u.angle+=Math.PI*2/1e3/60,u.accumulator-=u.time}function m(e){ctx=e.getContext("2d"),ctx.clearRect(0,0,800,600),f.draw(e),ctx.drawImage(u.img,0,0,350,600,601,135,200,330),ctx.beginPath(),ctx.moveTo(u.x,u.y-u.radius),ctx.lineTo(u.x,u.y-u.radius+u.line),ctx.moveTo(u.x,u.y+u.radius),ctx.lineTo(u.x,u.y+u.radius-u.line),ctx.moveTo(u.x-u.radius,u.y),ctx.lineTo(u.x-u.radius+u.line,u.y),ctx.moveTo(u.x+u.radius,u.y),ctx.lineTo(u.x+u.radius-u.line,u.y),ctx.lineWidth=2,ctx.strokeStyle="rgba(0,0,0,130)",ctx.stroke(),ctx.beginPath(),px=Math.cos(u.angle)*u.radius+u.x,py=Math.sin(u.angle)*u.radius+u.y,ctx.moveTo(u.x,u.y),ctx.lineTo(px,py),ctx.lineWidth=5,ctx.strokeStyle="rgba(0,0,0,255)",ctx.stroke()}function g(){o.now=(new Date).getTime(),o.passed=o.now-o.last,o.last=o.now,o.accumulator+=o.passed;while(o.accumulator>=o.time)v(),o.accumulator-=o.time;m($(n)[0]),s==r.playing&&window.requestAnimationFrame(g)}var t=e("text!../assets/html/freqRespiratoria/freqRespiratoria.html"),n="#freqRespiratoria",r={playing:0,stopped:1},s=r.stopped,o={last:undefined,passed:undefined,now:undefined,accumulator:0,time:undefined,rate:60},u={x:700,y:300,radius:60,angle:0,line:20,img:undefined,accumulator:0,time:1};o.time=1e3/o.rate;var f=new a;f.x=50,f.y=180,f.width=400,f.height=240,f.srWidth=1920,f.srHeight=1152,f.frameTotal=12,f.cyclesPerMinute=18,f.frameTime=6e4/f.cyclesPerMinute/f.frameTotal;var l=0;for(i=0;i<f.frameTotal;i++){f.img.push(new Image),f.img[i].onload=function(){l++};var c=f.img[i];i<10&&(i="0"+i),c.src="./assets/images/modalScenes/01_"+i+".png"}return u.img=new Image,u.img.src="./assets/images/modalScenes/relogioDigital.png",u.img.onLoad=function(){},{init:h,open:p,close:d}});