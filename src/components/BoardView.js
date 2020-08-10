import React,{useState,useEffect,forwardRef, useImperativeHandle,useRef} from 'react'
import Konva from 'konva';

const getSkin=(ind)=>{
  switch (ind) {
    case 0:
      return require('./assets/skins/coin_skin_1.png');
      break;
    case 1:
      return require('./assets/skins/coin_skin_2.png');
      break;
    case 2:
      return require('./assets/skins/coin_skin_3.png');
      break;
    case 3:
      return require('./assets/skins/coin_skin_4.png');
      break;
    case 4:
      return require('./assets/skins/coin_skin_5.png');
      break;
    case 5:
      return require('./assets/skins/coin_skin_6.png');
      break;
    case 6:
      return require('./assets/skins/coin_skin_7.png');
      break;
    case 7:
      return require('./assets/skins/coin_skin_8.png');
      break;
    case 8:
      return require('./assets/skins/coin_skin_9.png');
      break;
    case 9:
      return require('./assets/skins/coin_skin_10.png');
      break;
    case 10:
      return require('./assets/skins/coin_skin_11.png');
      break;
    case 11:
      return require('./assets/skins/bird.png');
      break;
    case 12:
      return require('./assets/skins/fish.png');
      break;
    case 13:
      return require('./assets/skins/fire.png');
      break;
    case 14:
      return require('./assets/skins/a.png');
      break;
    case 15:
      return require('./assets/skins/b.png');
      break;
    case 16:
      return require('./assets/skins/c.png');
      break;
    case 17:
      return require('./assets/skins/d.png');
      break;
    case 18:
      return require('./assets/skins/e.png');
      break;
    case 19:
      return require('./assets/skins/f.png');
      break;
    case 20:
      return require('./assets/skins/g.png');
      break;
    case 21:
      return require('./assets/skins/h.png');
      break;
    case 22:
      return require('./assets/skins/i.png');
      break;
    case 23:
      return require('./assets/skins/j.png');
      break;
    case 24:
      return require('./assets/skins/k.png');
      break;
    case 25:
      return require('./assets/skins/l.png');
      break;
    case 26:
      return require('./assets/skins/m.png');
      break;
    case 27:
      return require('./assets/skins/n.png');
      break;
    case 28:
      return require('./assets/skins/o.png');
      break;
    case 29:
      return require('./assets/skins/p.png');
      break;
    case 30:
      return require('./assets/skins/q.png');
      break;
    case 31:
      return require('./assets/skins/r.png');
      break;
    case 32:
      return require('./assets/skins/s.png');
      break;
    case 33:
      return require('./assets/skins/t.png');
      break;
    case 34:
      return require('./assets/skins/u.png');
      break;
    case 35:
      return require('./assets/skins/v.png');
      break;
    case 36:
      return require('./assets/skins/w.png');
      break;
    case 37:
      return require('./assets/skins/x.png');
      break;
    case 38:
      return require('./assets/skins/y.png');
      break;
    case 39:
      return require('./assets/skins/z.png');
      break;
    default:
      return null;
  }
}

const stickColor='#e8b387'
const headColor='#A72513'
const parseColor=(string)=>{
  var color='#'+string.substr(2,6)
  return color
}

const BoardView=forwardRef((props,ref)=>{

  useImperativeHandle(ref, () => ({

    getVerdict(){

      return checkAnswer()
    }

 }));

 const checkAnswer=()=>{
   var verdict="Correct"
   //console.log(props.data.sol_schema)
   //console.log(sortForEval(currentElements))
   //console.log(sortForEval(groomElements(props.data.sol_schema[0].elements)))
   for(var i=0;i<props.data.sol_schema.length;i++){
     if(evalElements(sortForEval(currentElements),sortForEval(groomElements(props.data.sol_schema[i].elements))))
      return true;
   }
   return false

 }

 function sortForEval(e1){
   var out=[]
   e1.map(e=>{
     if(!('cantMove' in e) && ('isMust' in e)){

       const ordered = {};
       Object.keys(e).sort().forEach(function(key) {
         ordered[key] = e[key];
       });
       if(ordered.type=='matchStick'){
         if(ordered.indTailX<ordered.indHeadX || (ordered.indTailX==ordered.indHeadX && ordered.indTailY<ordered.indHeadY)){
           var tmp=ordered.indHeadX
           ordered.indHeadX=ordered.indTailX
           ordered.indTailX=tmp

           tmp=ordered.indHeadY
           ordered.indHeadY=ordered.indTailY
           ordered.indTailY=tmp
         }
       }
      out.push(ordered)
    }
   })
   out.sort(
     function(a, b) {
        if (a.type ===b.type) {
          if(a.type==='coin'){
            if(a.indX==b.indX)
              return a.indY-b.indY
            else
              return a.indX-b.indX
          }else{
            if(a.indHeadX==b.indHeadX){
              if(a.indHeadY==b.indHeadY){
                if(a.indTailX==b.indTailX){
                  return a.indTailY-b.indTailY
                }else{
                  return a.indTailX-b.indTailX
                }
              }else{
                return a.indHeadY-b.indHeadY;
              }
            }else{
              return a.indHeadX-b.indHeadX
            }
          }
        }else{
          return a.type==='coin'?-1:1;
        }

     });


   return out
 }


 function evalElements(a1,a2){
   if(a1.length!=a2.length)return false
   for(var i=0;i<a1.length;i++){
     ////console.log(a1[i])
     ////console.log(a2[i])
      if(compareObjects(a1[i],a2[i])==false) return false
}
    return true
 }


 function compareObjects(o1,o2){
   var k1=Object.keys(o1).sort()
   var k2=Object.keys(o2).sort()
   if(k1.length!=k2.length)return false
   for(var i=0;i<k1.length;i++)
      if(k1[i]!=k2[i] || o1[k1[i]]!=o2[k1[i]])return false
    return true
 }


  var width=0,graphX=null,graphY=null
  const divRef = useRef(null)


  var prob_schema={},minIndX=0,minIndY=0,maxIndX=0,maxIndY=0,initialElements=[],currentElements=[],dimElements=[]


  const updateDimensions=()=>{
    if(divRef.current!=null){
      const newWidth=divRef.current.offsetWidth
      if(newWidth!=width){
        width=newWidth
        graphX=null;
        graphY=null;
        drawBoard()
      }
    }
  }

  const drawBoard=()=>{
    const stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: width
    });
    const layer = new Konva.Layer();
    stage.add(layer);

    var mainGroup=new Konva.Group()

    var graphGroup=new Konva.Group({
      draggable : true
    })


    var divSize=width/(Math.max(maxIndX-minIndX,maxIndY-minIndY)+1.2);

    var bgRect=new Konva.Rect({
      width:divSize*50,
      height:divSize*50,
      fill:parseColor(prob_schema.bgColor)
    })

    graphGroup.add(bgRect)

    for(var i=0;i<=50;i++){
      var lineV=new Konva.Line({
        points:[i*divSize,0,i*divSize,50*divSize],
        stroke:parseColor(prob_schema.lineColor),
        strokeWidth:1,
        opacity:prob_schema.lineOpacity+0.5
      })
      var lineH=new Konva.Line({
        points:[0,i*divSize,50*divSize,i*divSize],
        stroke:parseColor(prob_schema.lineColor),
        strokeWidth:1,
        opacity:prob_schema.lineOpacity+0.5
      })

      graphGroup.add(lineV)
      graphGroup.add(lineH)
    }


    var elementsGroup=new Konva.Group()




    currentElements.map((element,ind)=>{
      if(element.type==='coin'){
        if('useSkin' in element){
          var imageObj = new Image();
          if('text' in element)imageObj.src=require('./assets/skins/coin_skin_2.png')
          else imageObj.src = getSkin(element.skin)
          var image = new Konva.Image({
            x:element.indX*divSize-divSize/2,
            y:element.indY*divSize-divSize/2,
            image: imageObj,
            width: divSize,
            height: divSize
          });


          if(!('cantMove' in element))
            image.setAttrs({
              draggable:true
            })

          graphGroup.add(image)

          image.on('mouseover', function () {
              document.body.style.cursor = 'pointer';

          });
          image.on('mouseout', function () {
              document.body.style.cursor = 'default';
          });
          image.on('dragend', function () {
              var remX=(image.x()-divSize/2)%divSize;
              var coordX=image.x()-remX;
              var remY=(image.y()-divSize/2)%divSize;
              var coordY=image.y()-remY;
              if(remX>divSize/2)coordX+=divSize;
              if(remY>divSize/2)coordY+=divSize;
              image.setAttrs({
                x:coordX,
                y:coordY
              })
              var x=(coordX-(divSize/2))/divSize;
              if(x-parseInt(x)<0.5)x=parseInt(x)
              else x=parseInt(x)+1
              var y=(coordY-(divSize/2))/divSize;
              if(y-parseInt(y)<0.5)y=parseInt(y)
              else y=parseInt(y)+1
              currentElements[ind].indX=x+1;
              currentElements[ind].indY=y+1;
              drawBoard()
          });

          imageObj.onload = function() {
            layer.batchDraw()
          };

          if('text' in element){
            var simpleText = new Konva.Text({
              x:element.indX*divSize-divSize/4,
              y:element.indY*divSize-divSize/4,
              text: element.text,
              fontSize: 16,
              fontFamily: 'Calibri',
              fill: 'white'
            });

            if(!('cantMove' in element))
              simpleText.setAttrs({
                draggable:true
              })

            simpleText.on('mouseover', function () {
                document.body.style.cursor = 'pointer';

            });
            simpleText.on('mouseout', function () {
                document.body.style.cursor = 'default';
            });

            graphGroup.add(simpleText)



            image.on('dragmove', function () {
                simpleText.setAttrs({
                  x:image.x()+divSize/4,
                  y:image.y()+divSize/4
                })
            });
            simpleText.on('dragmove', function () {
                image.setAttrs({
                  x:simpleText.x()-divSize/4,
                  y:simpleText.y()-divSize/4
                })
            });
            simpleText.on('dragend', function () {
              image.setAttrs({
                x:simpleText.x()-divSize/4,
                y:simpleText.y()-divSize/4
              })
                var remX=(image.x()-divSize/2)%divSize;
                var coordX=image.x()-remX;
                var remY=(image.y()-divSize/2)%divSize;
                var coordY=image.y()-remY;
                if(remX>divSize/2)coordX+=divSize;
                if(remY>divSize/2)coordY+=divSize;
                image.setAttrs({
                  x:coordX,
                  y:coordY
                })
                var x=(coordX-(divSize/2))/divSize;
                if(x-parseInt(x)<0.5)x=parseInt(x)
                else x=parseInt(x)+1
                var y=(coordY-(divSize/2))/divSize;
                if(y-parseInt(y)<0.5)y=parseInt(y)
                else y=parseInt(y)+1
                currentElements[ind].indX=x+1;
                currentElements[ind].indY=y+1;
                drawBoard()
            });
          }


        }else{

        }
      }else if(element.type=='matchStick'){

          var line=new Konva.Line({
            points:[element.indHeadX*divSize,element.indHeadY*divSize,element.indTailX*divSize,element.indTailY*divSize],
            strokeWidth:16,
            lineCap:'round'
          })
          if(!('useSkin' in element))
            line.setAttrs({
              stroke:element.fillColor,
              strokeWidth:10,
            })
          else
          line.setAttrs({
            stroke:stickColor
          })

          var head=new Konva.Circle({
            x:element.indHeadX*divSize,
            y:element.indHeadY*divSize,
            radius:12,
            fill:headColor
          });

            var anchor1=new Konva.Circle({
              x:element.indHeadX*divSize,
              y:element.indHeadY*divSize,
              radius:16,
              fill:'transparent',
            });

            var anchor2=new Konva.Circle({
              x:element.indTailX*divSize,
              y:element.indTailY*divSize,
              radius:16,
              fill:'transparent',
            });

            if(!('cantMove' in element)){
              line.setAttrs({
                draggable:true
              })
              anchor1.setAttrs({
                draggable:true
              })
              anchor2.setAttrs({
                draggable:true
              })
            }

            line.on('mouseover', function () {
                document.body.style.cursor = 'pointer';

            });
            line.on('mouseout', function () {
                document.body.style.cursor = 'default';
            });
            anchor1.on('mouseover', function () {
                document.body.style.cursor = 'pointer';

            });
            anchor1.on('mouseout', function () {
                document.body.style.cursor = 'default';
            });
            anchor2.on('mouseover', function () {
                document.body.style.cursor = 'pointer';

            });
            anchor2.on('mouseout', function () {
                document.body.style.cursor = 'default';
            });

            anchor1.on('dragmove', function () {
                line.setAttrs({
                  points:[anchor1.x(),anchor1.y(),line.points()[2],line.points()[3]]
                })
                head.setAttrs({
                  x:anchor1.x(),
                  y:anchor1.y()
                })
            })

            anchor2.on('dragmove', function () {
                line.setAttrs({
                  points:[line.points()[0],line.points()[1],anchor2.x(),anchor2.y()]
                })
            })

            line.on('dragmove', function () {
                anchor1.setAttrs({
                  x:line.points()[0]+line.x(),
                  y:line.points()[1]+line.y()
                })
                head.setAttrs({
                  x:line.points()[0]+line.x(),
                  y:line.points()[1]+line.y()
                })
                anchor2.setAttrs({
                  x:line.points()[2]+line.x(),
                  y:line.points()[3]+line.y()
                })

            })

            anchor1.on('dragend',function(){
              var remX=(anchor1.x())%divSize;
              var coordX=anchor1.x()-remX;
              var remY=(anchor1.y())%divSize;
              var coordY=anchor1.y()-remY;
              if(remX>divSize/2)coordX+=divSize;
              if(remY>divSize/2)coordY+=divSize;
              var x=(coordX)/divSize;
              if(x-parseInt(x)<0.5)x=parseInt(x)
              else x=parseInt(x)+1
              var y=(coordY)/divSize;
              if(y-parseInt(y)<0.5)y=parseInt(y)
              else y=parseInt(y)+1
              currentElements[ind].indHeadX=x;
              currentElements[ind].indHeadY=y;

              drawBoard()
            })

            anchor2.on('dragend',function(){
              var remX=(anchor2.x())%divSize;
              var coordX=anchor2.x()-remX;
              var remY=(anchor2.y())%divSize;
              var coordY=anchor2.y()-remY;
              if(remX>divSize/2)coordX+=divSize;
              if(remY>divSize/2)coordY+=divSize;
              var x=(coordX)/divSize;
              if(x-parseInt(x)<0.5)x=parseInt(x)
              else x=parseInt(x)+1
              var y=(coordY)/divSize;
              if(y-parseInt(y)<0.5)y=parseInt(y)
              else y=parseInt(y)+1
              currentElements[ind].indTailX=x;
              currentElements[ind].indTailY=y;

              drawBoard()
            })

            line.on('dragend', function () {
              line.setAttrs({
                points:[line.points()[0]+line.x(),line.points()[1]+line.y(),line.points()[2]+line.x(),line.points()[3]+line.y()]
              })
              line.setAttrs({
                x:0,
                y:0
              })


              var remX=(line.points()[0])%divSize;
              var coordX=line.points()[0]-remX;
              var remY=(line.points()[1])%divSize;
              var coordY=line.points()[1]-remY;
              if(remX>divSize/2)coordX+=divSize;
              if(remY>divSize/2)coordY+=divSize;
              var x=(coordX)/divSize;
              if(x-parseInt(x)<0.5)x=parseInt(x)
              else x=parseInt(x)+1
              var y=(coordY)/divSize;
              if(y-parseInt(y)<0.5)y=parseInt(y)
              else y=parseInt(y)+1
              currentElements[ind].indHeadX=x;
              currentElements[ind].indHeadY=y;

              remX=(line.points()[2])%divSize;
              coordX=line.points()[2]-remX;
              remY=(line.points()[3])%divSize;
              coordY=line.points()[3]-remY;
              if(remX>divSize/2)coordX+=divSize;
              if(remY>divSize/2)coordY+=divSize;
              x=(coordX)/divSize;
              if(x-parseInt(x)<0.5)x=parseInt(x)
              else x=parseInt(x)+1
              y=(coordY)/divSize;
              if(y-parseInt(y)<0.5)y=parseInt(y)
              else y=parseInt(y)+1
              currentElements[ind].indTailX=x;
              currentElements[ind].indTailY=y;
              drawBoard()
            });


          graphGroup.add(line)
          if('useSkin' in element)
            graphGroup.add(head)
          graphGroup.add(anchor1)
          graphGroup.add(anchor2)


      }
    })





    graphGroup.add(elementsGroup)


    var diffX=maxIndX-minIndX;
    var diffY=maxIndY-minIndY;
    if(graphX!=null && graphY!=null){
      graphGroup.setAttrs({
        x:graphX,
        y:graphY
      })
    }else{
      if(diffX>diffY){
        graphGroup.setAttrs({
          x:-(minIndX-0.6)*divSize,
          y:-((minIndY-0.6)*divSize-((diffX-diffY)*divSize/2))
        })
      }else{
        graphGroup.setAttrs({
          x:-((minIndX-0.6)*divSize-((diffY-diffX)*divSize/2)),
          y:-(minIndY-0.6)*divSize
        })
      }
    }


    graphGroup.on('dragend', function () {
      graphX=graphGroup.x()
      graphY=graphGroup.y()
    });


    var btnGroup=new Konva.Group({
      x:width-60,
      y:width-110
    })


    mainGroup.add(graphGroup)
    layer.add(mainGroup)
    layer.draw()
  }

  const groomElements=elements=>{
    var output=[]
    elements.map(element=>{
      if(element.type=="coin"){
        if(('innerColor' in element) && element.innerColor.length>7)element['innerColor']=parseColor(element.innerColor)
        if(('outerColor' in element) && element.outerColor.length>7)element['outerColor']=parseColor(element.outerColor)
      }else if(element.type=="matchStick"){
        if(('fillColor' in element) && element.fillColor.length>7)element['fillColor']=parseColor(element.fillColor)
      }
      output.push(element)
    })
    output.sort(function(a,b){
        if(a.type==b.type){
          if('cantMove' in a)return -1;
          return 1;
        }else{
          if(a.type=='coin')return 1;
          return -1;
        }
    });
    ////console.log(output)
    return output
  }

  useEffect(() => {
    prob_schema=props.data.prob_schema
    dimElements=prob_schema.elements
    if(props.type==='eval')dimElements=props.data.sol_schema[0].elements
    initialElements=groomElements(prob_schema.elements)
    currentElements=initialElements
    if(props.type==='eval')
      currentElements=props.data.sol_schema[props.iEval].elements
    ////console.log(props.data.sol_schema.length)
    minIndX=minX()
    maxIndX=maxX()
    minIndY=minY()
    maxIndY=maxY()
    updateDimensions()
    window.addEventListener('resize',updateDimensions);
  },[]);



  const minX=()=>{
    var minX=100;
    for(var i=0;i<dimElements.length;i++){
      var element=dimElements[i];
      if(element.type=="coin"){
        if(element.indX<minX)minX=element.indX;
      }else if(element.type=="matchStick"){
        if(element.indHeadX<minX)minX=element.indHeadX;
        if(element.indTailX<minX)minX=element.indTailX;
      }
    }
    return minX;
  }

  const maxX=()=>{
    var maxX=-1;
    for(var i=0;i<dimElements.length;i++){
      var element=dimElements[i];
      if(element.type=="coin"){
        if(element.indX>maxX)maxX=element.indX;
      }else if(element.type=="matchStick"){
        if(element.indHeadX>maxX)maxX=element.indHeadX;
        if(element.indTailX>maxX)maxX=element.indTailX;
      }
    }
    return maxX;
  }

  const minY=()=>{
    var minY=100;
    for(var i=0;i<dimElements.length;i++){
      var element=dimElements[i];
      if(element.type=="coin"){
        if(element.indY<minY)minY=element.indY;
      }else if(element.type=="matchStick"){
        if(element.indHeadY<minY)minY=element.indHeadY;
        if(element.indTailY<minY)minY=element.indTailY;
      }
    }
    return minY;
  }

  const maxY=()=>{
    var maxY=-1;
    for(var i=0;i<dimElements.length;i++){
      var element=dimElements[i];
      if(element.type=="coin"){
        if(element.indY>maxY)maxY=element.indY;
      }else if(element.type=="matchStick"){
        if(element.indHeadY>maxY)maxY=element.indHeadY;
        if(element.indTailY>maxY)maxY=element.indTailY;
      }
    }
    return maxY;
  }



  return(
    <div ref={divRef} id="container"></div>
  )
})

export default BoardView
