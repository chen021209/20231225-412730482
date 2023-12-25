function preload(){
  sound1 = loadSound("mixkit-deep-urban-623.mp3")
}
var face_colors = "ffb5a7-fcd5ce-f8edeb-f9dcc4-fec89af".split("-").map(a=>"#"+a)
var eye_colors = "251605-c57b57-f1ab86-f7dba7-9cafb7".split("-").map(a=>"#"+a)
//var pos_x=[200,500]
//var pos_y=[400,600]
//var sizes=[0.6,0.2]
//var colors=["#00b4d8","#edede9"]
var pos_x=[]  //產生物件的x軸位置
var pos_y=[]
var sizes=[]
var colors=[]
var v_y=[]     //移動速度
var v_x=[]
var txts
var face_move_var = false
//語音辨識的初始設定
var lang = navigator.language ||en-US  //瀏覽器的語系
var myRec = new p5.SpeechRec(lang)
var face_Rot_var = false
function setup() {
  createCanvas(windowWidth, windowHeight);
  analyzer=new p5.Amplitude();
  analyzer.setInput(sound1);
  inputElement = createInput("412730482")   //產生一個文字方塊
  inputElement.position(10,10)       //把把文字方塊放到(10,10)
  inputElement.size(140,20)
  //以下style,可以google搜尋html input css找到相關資料
  inputElement.style("font-size","20px")
  inputElement.style("color","#fff")   //文字框的背景顏色
  inputElement.style("background","#bde0fe")  //文字框的背景顏色
  inputElement.style("border","none")


  //"移動"按鈕設定
  btnMoveElement = createButton("移動")  //產生一個按鈕，按鈕上有"移動"字
  btnMoveElement.position(170,10)  //按鈕的位置
  btnMoveElement.size(80,40)   //按鈕的高與寬
  btnMoveElement.style("font-size","20px")  //按鈕內的文字大小
  btnMoveElement.style("color","#fff")   //按鈕內的文字顏色
  btnMoveElement.style("background","#2f3e46")
  btnMoveElement.mousePressed(face_move)

  //"暫停"按鈕設定
  btnStopElement = createButton("暫停")
  btnStopElement.position(270,10)  //按鈕的位置
  btnStopElement.size(80,40)
  btnStopElement.style("font-size","20px")
  btnStopElement.style("color","#fff")
  btnStopElement.style("background","#2f3e46")
  btnStopElement.mousePressed(face_stop)

  //radio的設定，多個選項，只能選一個(單選)
  radioElement = createRadio()
  radioElement.option("暫停")
  radioElement.option("旋轉")
  radioElement.option("移動")
  radioElement.position(370,10)  //選鈕的位置
  radioElement.size,(200,40)   //選鈕的高與寬
  radioElement.style("font-size","20px")  //選鈕內的文字大小
  radioElement.style("color","#fff")   //選鈕內的文字顏色
  radioElement.style("background-color","#2f3e46")
  radioElement.mousePressed(face_move)

//"語音"按鈕設定
btnVoiceElement = createButton("音樂")
btnVoiceElement.position(600,10)  //按鈕的位置
btnVoiceElement.size(80,40)
btnVoiceElement.style("font-size","20px")
btnVoiceElement.style("color","#fff")
btnVoiceElement.style("background","#2f3e46")
btnVoiceElement.mousePressed(voice_go)


  //checkBox的設定，多個選項，可以選多個(複選題)

  //for(var i=0;i<20;i=i+1){
  //drawface(face_colors[int(random(face_colors.length))],eye_colors[int(random(eye_colors.length))],random(0.3,1.2))
  //}
}

function draw() {
background("#bde0fe");
mode= radioElement.value();
for(var i=0;i<pos_x.length;i=i+1)
{
  push()
    txts = inputElement.value();
    translate(pos_x[i],pos_y[i])
    if(sound1.isPlaying()){
      AudioContext=getAudioContext();
      amplitude=map(analyzer.getLevel(),0,1,0,100)
      angle=sin(amplitude*v_y[i])
      rotate(angle)
      drawface(colors[i],0,sizes[i])
      }
    else{
      drawface(colors[i],0,sizes[i])
    }
     
     
    if(mode =="旋轉"  || face_Rot_var ){
     rotate(sin(frameCount/20*v_y[i]))
    }
    drawface(colors[i],0,sizes[i])
  pop()
  if(face_move_var ||mode =="移動" ){   //在face_move_var為ture的時候，臉物件會移動
    pos_y[i] = pos_y[i] + v_y[i]   //移動
  }
 
 
  if(pos_y[i]>height || pos_y[i]<0 )  //判斷有沒有碰到上邊
  {
   pos_x.splice(i,1)
   pos_y.splice(i,1)
   sizes.splice(i,1)
   colors.splice(i,1)
   v_y.splice(i,1)
  }
}
}

function drawface(face_clr=255,eye_clr=0,size=1){   //255與0為預設的值
  push()    //自行設定格式
    //translate(random(width),random(height))    //原點(0,0)移動到(200,200)
    scale(size) //先宣告放大縮小的比例尺
    //文字框的顯示格式
    fill("#023047")   //設定文字顏色
    textSize(50) //文字大小
    text(txts,-50,250)  //顯示文字，文字內容為txts，放在位置座標為(50,200)
   
    fill(face_clr)
  ellipse(360,242,200)  //臉
  ellipse(280,155,80)  //左耳
  fill("#fdf0d5")
  ellipse(280,155,40)
  fill("#ffd500")
  ellipse(440,155,80)  //右耳
  fill("#fdf0d5")
  ellipse(440,155,40)
  fill(eye_clr)
  ellipse(330,200,30)  //左眼
  ellipse(380,200,30)  //右眼
  line(230,230,290,230)  //左邊第一跟鬍子
  line(230,260,290,260)  //第二根
  line(230,290,290,290)  //第三根
  line(420,230,480,230)  //右邊第一跟鬍子
  line(420,260,480,260)  //第二根
  line(420,290,480,290)  //第三根
  fill("#bc6c25")
  ellipse(360,248,20)   //鼻子
  line(358,258,350,264) 
  line(362,258,370,264)
  fill("#e56b6f")
  ellipse(360,300,45,35)  //嘴巴
  

   
 pop()      //把原本設定全部取消
 }

function mousePressed(){
  if(mouseY>60){  //設定Y軸為0~60間的座標值都不會產生物件
pos_x.push(mouseX)
pos_y.push(mouseY)
sizes.push(random(0.5,0.3))
colors.push(face_colors[int(random(face_colors.length))])
v_y.push(random(-1,1))
print(pos_x)
  }
}

function face_move(){
  face_move_var = true
  sound1.play();
}


function face_stop(){
  face_move_var = false
  sound1.stop();
}

function voice_go(){
  myRec.onResult = showResult //取的語音辨識後去執行function
  myRec.start()  //開始辨識
 
}

function showResult(){
  if(myRec.resultValue == true)
{
    print(myRec.resultString)
    let lowStr = myRec.resultString.toLowerCase();
    let mostrecentword = lowStr.split(' ').pop();
    //
    if(myRec.resultString.indexOF("走") !== -1){
      face_move_var = true
}
    if(myRec.resultString.indexOF("停") !== -1){
      face_move_var = false
      face_Rot_var = false
}
    if(myRec.resultString.indexOF("轉") !== -1){
     face_Rot_var = true
}
    }
}
