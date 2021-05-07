
document.addEventListener('DOMContentLoaded', () => {

  const spielfeldDisplay= document.querySelector('.spielfeld')
  const punktestandDisplay= document.getElementById('punktestand')
  const ergebnisDisplay = document.getElementById('ergebnis')
  let squares= []
  const width = 4 // number oder string funktioniert nicht 
  let score= 0 
  
  
  //wenn ich den variablen einen wert zuweise will das ganze spiel nicht mehr :(

// mein code ist mit EFP markiert
  function createBoard (){
 
       for (let i=0; i<width*width; i++) {
          var square= document.createElement('div')
          square.innerHTML= String(0)       //0 als string wegen compiler weil innerhtml string ist
          // object possibly null--> klar machen das nicht null
          if (spielfeldDisplay !=null ){          //EFP
            spielfeldDisplay.appendChild(square)  //EFP
          }                                       //EFP
          else{                                   //EFP
              window.alert("Error:/")             //EFP
          }
              // else muss noch hin der error abfängt
          squares.push(square)
        } 
      generate()
      generate()
  }     
  createBoard()



  //zufällige zahl erstellen 
  function generate(){

      let randomNumber= Math.floor(Math.random()*squares.length)
      if(squares[randomNumber].innerHTML== String(0)) {  // aus 0 wurden ""
          squares[randomNumber].innerHTML= String(2) //string statt number
          checkForGameOver()
          visControl()
      } else generate()
  }  
 
  //nach rechts wischen
  function moveRight(){

    for(let i=0;i<16;i++){
        if (i % 4 === 0){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+1].innerHTML
            let totalThree= squares[i+2].innerHTML
            let totalFour= squares[i+3].innerHTML
            let row= [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
            // nummern bewegen
            let filteredRow= row.filter(num => num)
            //herrausfinden welche felder leer sind
            let missing = 4 - filteredRow.length
            // leere Felder mit 0 füllen
            let zeros= Array(missing).fill(0) 
            
            let newRow= zeros.concat(filteredRow)
            
            squares[i].innerHTML= newRow[0]
            squares[i+1].innerHTML= newRow[1]
            squares[i+2].innerHTML = newRow[2]
            squares[i+3].innerHTML = newRow[3]
            
        }
    }
  } 
// nach links wischen

function moveLeft(){
  for(let i=0;i<16;i++){
      if (i % 4 === 0){

          let totalOne= squares[i].innerHTML
          let totalTwo = squares[i+1].innerHTML
          let totalThree= squares[i+2].innerHTML
          let totalFour= squares[i+3].innerHTML
          let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

          
          // nummern bewegen
          let filteredRow= row.filter(num => num)
          
          //herrausfinden welche felder leer sind
          let missing= 4 - filteredRow.length
          // leere Felder mir 0 füllen
          let zeros= Array(missing).fill(0) 
         
          let newRow = filteredRow.concat(zeros)
          
          squares[i].innerHTML= newRow[0]
          squares[i+1].innerHTML= newRow[1]
          squares[i+2].innerHTML = newRow[2]
          squares[i+3].innerHTML = newRow[3]
        }
    }
  }


// nach unten wischen 
  function moveDown(){
      for( let i=0; i<4;i++){
          let totalOne= squares[i].innerHTML
          let totalTwo= squares[i+width].innerHTML
          let totalThree= squares[i+(width*2)].innerHTML
          let totalFour= squares[i+(width*3)].innerHTML
          let column= [parseInt(totalOne),parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

          //nummer bewegen 
          let filteredColumn= column.filter(num => num)
          //herrausfinden welche felder leer sind
          let missing= 4 - filteredColumn.length
          // leere Felder mir 0 füllen
          let zeros= Array(missing).fill(0) 
          let newColumn=zeros.concat(filteredColumn)

          squares[i].innerHTML= newColumn[0]
          squares[i+width].innerHTML= newColumn[1]
          squares[i+(2*width)].innerHTML = newColumn[2]
          squares[i+(3*width)].innerHTML = newColumn[3]
      }

  }

  //nach oben wischen 
  function moveUp(){
    for(let i=0; i<4; i++){
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne),parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0) 
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i+width].innerHTML= newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

// 2 gleiche nummern nebeneinander verschmelzen

  function combineRow(){
    for(let i=0; i<15; i++){
      if (squares[i].innerHTML=== squares[i+1].innerHTML){
          let combinedTotal= parseInt (squares[i].innerHTML)+parseInt (squares[i+1].innerHTML)
          squares[i].innerHTML= combinedTotal
          squares[i+1].innerHTML= 0
          score += combinedTotal

          if(punktestandDisplay!=null){                   //EFP weil compiler sagt könnte null sein
            punktestandDisplay.innerHTML = String(score)  //EFP
          }else{                                          //EFP
            window.alert("Error:/")                       //EFP
          }
      }
    }
      checkForWin()
  }


  function combineColumn(){
    for(let i=0; i<12; i++){
      if (squares[i].innerHTML=== squares[i+width].innerHTML){
          let combinedTotal= parseInt (squares[i].innerHTML)+parseInt (squares[i+width].innerHTML)
          squares[i].innerHTML= combinedTotal
          squares[i+width].innerHTML = 0
          score += combinedTotal

        if(punktestandDisplay!=null){                             //EFP
          punktestandDisplay.innerHTML = String(score)            //EFP
        }                                                         //EFP
        else{                                                     //EFP
          window.alert("Error:/")                                 //EFP
        }

      }
    }
  
    checkForWin()
  }

// Steuerung
  function control (e) {
    if(e.keyCode === 39){
      keyRight()
    }else if(e.keyCode ===37){
      keyLeft()
    }else if (e.keyCode===38){
      keyUp() 
    }else if (e.keyCode===40){
      keyDown()  
  }
}

  document.addEventListener('keyup', control)
 

function keyRight(){
  moveRight()
  combineRow()
  myPlaykey() //EFP
  moveRight()
  generate()
}

function keyLeft(){
  moveLeft()
  combineRow()
  myPlaykey() //EFP
  moveLeft()
  generate()
}

function keyDown(){
  moveDown()
  combineColumn()
  myPlaykey() //EFP
  moveDown()
  generate()
}

function keyUp(){
      moveUp()
      combineColumn()
      myPlaykey()  //EFP
      moveUp()
      generate()
}
  //checken ob gewonnen oder verloren

  // ist zahl 2048 da


  function checkForWin(){
    function myPlayWin(){               //sound function ist von mir
      let audio = new Audio("win.wav");
      audio.play();}
    for(let i=0; i< squares.length; i++){
      if(squares[i].innerHTML == 2048)
      //EFP bzw das if/Else und der Sound
      if(ergebnisDisplay!= null){
        ergebnisDisplay.innerHTML = 'You win!'
        myPlayWin()
        document.removeEventListener('keyup', control)
      } else{
        window.alert("Error, ErgebnisDisplay is null!")
      }
    }
  }

      

  function checkForGameOver(){
    function myPlayLose(){              //EFP sound function ist von mir
      let audio = new Audio("Lose.wav");
      audio.play();
      }
    let zeros = 0
    for (let i=0; i<squares.length; i++){  
      if(squares[i].innerHTML == 0){
        zeros++
      }
    }
    if(zeros === 0){
      if(ergebnisDisplay!= null){       //If-bedingung ist von mir
        ergebnisDisplay.innerHTML = 'Loser!'
        document.removeEventListener('keyup', control)
        myPlayLose()
      }else{
        window.alert("Error: ErgebnisDisplay is null!")
      }
    }
  }



  //Ab hier Eigencode
  
  function visControl(){    //um visibility zu steuern
    for(let i=0; i<16; i++){
      if(i % 4 === 0){

        if(squares[i].innerHTML === "0"){
          squares[i].style.color = "#5F816B"
        }else{
          squares[i].style.color = 'black'
        }

        if(squares[i+1].innerHTML === "0"){
          squares[i+1].style.color = "#5F816B"
        }else{
          squares[i+1].style.color = 'black'
        }

        if(squares[i+2].innerHTML === "0"){
          squares[i+2].style.color = "#5F816B"
        }else{
          squares[i+2].style.color = 'black'
        }

        if(squares[i+3].innerHTML === "0"){
          squares[i+3].style.color = "#5F816B"
        }else{
          squares[i+3].style.color = 'black'
        }
      }
    }
  }


  function restart(){
    for(let i=0; i<16; i++){
      if(i % 4 === 0){
        for(let i=0; i<16; i++){
          if(i % 4 === 0){

              squares[i].innerHTML = String(0)
              squares[i+1].innerHTML = String(0)
              squares[i+2].innerHTML = String(0)
              squares[i+3].innerHTML = String(0)
              score = 0
              punktestandDisplay.innerHTML = String(0)
          }
        }
      }
    }
    visControl()
    generate()
    generate()
  }


  let restartBTN = document.getElementById('restart');
  if(restartBTN != null)
  restartBTN.addEventListener ('click', restart, true);

  function myPlaykey(){
    let audio = new Audio("key.wav");
    audio.play();
    }
  
})
