
 var inp=document.getElementById('numbers');


 var canvas = new fabric.Canvas('canvas',{ selection: false });
var first=true;
var last=false;
var cord=document.getElementById('coord');
var inside=document.getElementById('inside');
var points=new Array();
var lines=new Array();
var horizontalLine;
var i=0;

var xCenter=700;       
var yCenter=325;
var isPoint=false;


function init()
{
	setTimeout("processPoint(rad, angle)", 2000);


// var peret= intersects(-5, 0,  5, 0,  5, 5, 5, -5);
// alert(peret);



}

function makePolygon()
{ resetField();
	lines=[];
	inside.innerHTML="";

var N=inp.value;

var n=N.toString().length;
 var R=300;
var t=10;
for(var q=0; q<n; q++)
{
	t=t*2;

}
var segmentsList=getRandomSegmants(N);

var radius;
for(var i=0; i<segmentsList.length; i++){
radius=Math.random() * R +(t);
points.push(processPoint(radius, segmentsList[i]));

}



 drawPoly();
 last=true;
 first=false;
 isPoint=false;


  

}

canvas.on('object:moving', function(e){
	isPointInside(e);
})

function isPointInside(options) {
	canvas.remove(horizontalLine);
    var object = options.target;


 var objectCenter = object.getCenterPoint();
//inside.innerHTML="inside x=";//+objectCenter.x+"  y="+objectCenter.y); 

horizontalLine =new fabric.Line([0, objectCenter.y, objectCenter.x, objectCenter.y], {
      fill:'transparent',
      stroke: 'transparent',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });
canvas.add(horizontalLine);

var countIntersects=0;


//alert(lines[0].get('x1'));//+" ,"+lines[0].coords[1] +" ,"+ lines[0].coords[3]+" ,"+lines[0].coords[4]+" ,"+ 0+" ,"+ objectCenter.y+" ,"+ objectCenter.x+" ,"+ objectCenter.y);



for (var i=0; i<lines.length; i++)
{
 //inside.innerHTML= "**"+lines[i].coords[0]+" ,"+lines[i].coords[1] +" ,"+ lines[i].coords[3]+" ,"+lines[i].coords[4]+" ,"+ 0+" ,"+ objectCenter.y+" ,"+ objectCenter.x+" ,"+ objectCenter.y;
if (!((lines[i].get('x1')>=objectCenter.x)&&(lines[i].get('x2')>=objectCenter.x)))
{
	//alert(lines[i].coords[0]+" ,"+lines[i].coords[1] +" ,"+ lines[i].coords[3]+" ,"+lines[i].coords[4]+" ,"+ 0+" ,"+ objectCenter.y+" ,"+ objectCenter.x+" ,"+ objectCenter.y);
if (intersects(lines[i].get('x1'),lines[i].get('y1') , lines[i].get('x2'), lines[i].get('y2'), 0, objectCenter.y, objectCenter.x, objectCenter.y  ))
{

// alert(lines[i].coords[0]+" ,"+lines[i].coords[1] +" ,"+ lines[i].coords[3]+" ,"+lines[i].coords[4]+" ,"+ 0+" ,"+ objectCenter.y+" ,"+ objectCenter.x+" ,"+ objectCenter.y)


	countIntersects++;
}


}





}

if(countIntersects%2==0)
inside.innerHTML="point is outside";
else
inside.innerHTML="point is inside";





}






function intersects(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};





function getRandomSegmants(N){
	var segments=[];


	var bound=(2*Math.PI)/N;

var s=bound;
//alert(s);
if(N%2==0){

for(var i=0; i<N; i++){
segments[i]=s*(i+1);


}

var r;

var q=bound;
var z=N.toString().length;
for(var y=0; y<z; y++)
{
	q=q/1.25;
}

var dif=Math.abs(bound-q);

for(var k=0; k<N-2; k++){
var sum=segments[k]+segments[k+1];

r=(Math.random() * (dif)); 
 
segments[k]-=r;
segments[k+1]+=r;

}
segments[N-1]=2*Math.PI;


return segments;


}
}


function processPoint(rad, angle)
{
	// alert("radius:"+rad+" , angle="+angle);
	var obj;
	if((angle==0)||(angle==2*Math.PI)) {
		//alert(1);
		obj= {
	           X:xCenter+rad,
               Y:yCenter
               };
               // return obj;

         }
    else if((angle>0)&&(angle<0.5*Math.PI)){
    	// alert(2);
obj={
	           X:rad*(Math.cos(angle))+xCenter,
               Y:Math.sin(angle)*rad+yCenter
               };
               // return obj;


    }
    else if(angle==0.5*Math.PI){
    	// alert(3);
    	obj={
	           X:xCenter,
               Y:yCenter+rad
               };
               // return obj;

    }


     else if((angle>0.5*Math.PI)&&(angle<Math.PI)){
     	// alert(4);
     	angle=Math.PI-angle;
    	obj={
	           X:xCenter-rad*(Math.cos(angle)),
               Y:yCenter+rad*Math.sin(angle)
               };

    }
    else if(angle==Math.PI){
    	// alert(5);
obj= {
	           X:xCenter-rad,
               Y:yCenter
               };
               // return obj;

    }
       else if((angle>Math.PI)&&(angle<1.5*Math.PI)){
       	// alert(6);
angle=angle-Math.PI;
obj= {
	           X:xCenter-rad*(Math.cos(angle)),
               Y:yCenter-Math.sin(angle)*rad
               };
              


    }
     else if(angle==1.5*Math.PI){
     	// alert(7);
obj={
	           X:xCenter,
               Y:yCenter-rad
               };
               // return obj;

    }

      else if((angle>1.5*Math.PI)&&(angle<2*Math.PI)){
      	// alert(8);
      	angle=2*Math.PI-angle;
          obj= {
	           X:xCenter+Math.cos(angle)*rad,
               Y:yCenter-rad*(Math.sin(angle))
               };
               // return obj;

    }

    markPoint(obj.X, obj.Y);
    return obj;
}







function resetField(){
	
	canvas.clear();
	points=[];
	first=true;
	last=false;

}

			


function markPoint(x, y){


 var circle = new fabric.Circle({
  radius: 3, fill: 'red', left: x-4, top: y-4
});
canvas.add(circle);
  
}




 function makeLine(coords) {
   var line =new fabric.Line(coords, {
      fill: 'black',
      stroke: 'black',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });
   canvas.add(line);
   lines.push(line);
  }







function LastPoint(){
	
	var ourX=event.offsetX;
	var ourY=event.offsetY;
	


makeLine([ourX, ourY, points[0].X, points[0].Y]);
makeLine([ourX, ourY, points[points.length-1].X, points[points.length-1].Y]);
addPoint(ourX, ourY);
 markPoint(ourX, ourY);
last=true;

}



canvas.on('mouse:move', function() {
  var ourX=event.offsetX;
	var ourY=event.offsetY;
	cord.innerHTML="("+ourX+ "; "+ ourY+")";
});

function drawPoint(){

if(isPoint==false){
	
	canvas.add(
    makeCircle());
last=true;
isPoint=true;
first=false;
}
}
 
function makeCircle( ) {
    var c = new fabric.Circle({
      left: xCenter,
      top: yCenter,
      strokeWidth: 3,
      radius: 7,
      fill: '#fff',
      stroke: '#666'
    });
    c.hasControls = c.hasBorders = false;

    c.lines=lines;
    return c;
  }

 canvas.on('mouse:down', function() { 
    
	var ourX=event.offsetX;
	var ourY=event.offsetY;


	if(first)
	{
		points=[];
		addPoint(ourX, ourY);
		
		


        first=false;
markPoint(ourX, ourY);
	}
	else if(!last)
	{




makeLine([points[points.length-1].X, points[points.length-1].Y, ourX, ourY]);
addPoint(ourX, ourY);
markPoint(ourX, ourY);



}
});



function addPoint(ourX, ourY){
	coord.innerHTML="("+ourX+ "; "+ ourY+")";

	points.push({
	X:ourX ,
Y:ourY
});
}






function drawPoly( ) 
{ 
   
           for (var i = 1; i < points.length; i++)
            { 
                  makeLine([points[i].X, points[i].Y, points[i-1].X, points[i-1].Y]); 

             } 
 makeLine([points[points.length-1].X, points[points.length-1].Y, points[0].X, points[0].Y]); 
             
} 








 