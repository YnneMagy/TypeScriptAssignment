
document.addEventListener('DOMContentLoaded', () => {

  const spielfeldDisplay= document.querySelector(".spielfeld");
  const punktestandDisplay= document.getElementById("punktestand");
  const ergebnisDisplay= document.getElementById("ergebnis");
  let zellen: any[]=[];
  const width: number= 4;
  let nichtda: number;
  let zelle: any = document.createElement('div');
  
  

//erstellung des Spielbrett von einem Javascript tutorial, es kamen viele fehlermeldungen, musste umschreiben
  function createSpielfeld (): void{
 
       for (let i=0; i< width*width; i++) {
          let zelle: any = document.createElement('div')
          zelle.innerHTML=0
          // object possibly null--> klar machen das nicht null
          if (spielfeldDisplay != null )
          {spielfeldDisplay.appendChild(zelle)}

          else{ 
              window.alert("Error:/")
          }
              // else muss noch hin der error abfängt
          zellen.push(zelle)
      } 
      generate()
      generate()
  }     
  createSpielfeld()



  //zufällige zahl erstellen 
  function generate():void {

      let randomZahl= Math.floor(Math.random()*zellen.length);
      if(zellen [randomZahl].innerHTML==0) {

          zellen[randomZahl].innerHTML=2

          //verloren()
      } else generate()
  }   
  //nach rechts wischen
  function rechtsWisch():void{

    for( let i=0;i<16;i++){
        if (i %4===4){
            let eins = zellen[i].innerHTML
            let zwei = zellen[i+1].innerHTML
            let drei= zellen[i+2].innerHTML
            let vier= zellen[i+3].innerHTML
            let reihe= [parseInt(eins),parseInt(zwei),parseInt(drei),parseInt(vier)]

           
            // nummern bewegen
            let filterReihe= reihe.filter(number => number)
            
            //herrausfinden welche felder leer sind
            let leeresFeld= 4- filterReihe.length
            // leere Felder mir 0 füllen
            let nullen= Array(nichtda).fill(0)
            if (nullen!= null) {

            }
      
         
            let neueReihe= nullen.concat(filterReihe)
            
            zellen[i].innerHTML= neueReihe[0]
            zellen[i+1].innerHTML= neueReihe[1]
            zellen[i+2].innerHTML = neueReihe[2]
            zellen[i+3].innerHTML = neueReihe[3]
            


        }
    }
} rechtsWisch()
// nach links wischen

function linksWisch():void{

  for( let i=0;i<16;i++){
      if (i %4===4){

          let eins = zellen[i].innerHTML
          let zwei = zellen[i+1].innerHTML
          let drei= zellen[i+2].innerHTML
          let vier= zellen[i+3].innerHTML
          let reihe= [parseInt(eins),parseInt(zwei),parseInt(drei),parseInt(vier)]

          
          // nummern bewegen
          let filterReihe= reihe.filter(number => number)
          
          //herrausfinden welche felder leer sind
          let leeresFeld= 4- filterReihe.length
          // leere Felder mir 0 füllen
          let nullen= Array(nichtda).fill(0)
         
          let neueReihe= nullen.concat(nullen)
          
          zellen[i].innerHTML= neueReihe[0]
          zellen[i+1].innerHTML= neueReihe[1]
          zellen[i+2].innerHTML = neueReihe[2]
          zellen[i+3].innerHTML = neueReihe[3]
  

      }
  }
} 
// nach unten wischen 
  function untenWisch(): void{
      for( let i=0; i<4;i++){
          let eins= zellen[i].innerHTML
          let zwei= zellen[i+width].innerHTML
          let drei=zellen[i+(2*width)].innerHTML
          let vier= zellen[i+(3*width)].innerHTML
          let spalte= [parseInt(eins),parseInt(zwei), parseInt(drei), parseInt(vier)]

          //nummer bewegen 
          let filterSpalte= spalte.filter(number=> number)
          //herrausfinden welche felder leer sind
          let leeresFeld= 4- filterSpalte.length
          // leere Felder mir 0 füllen
          let nullen= Array(nichtda).fill(0)

          let neueSpalte=nullen.concat(filterSpalte)

          zellen[i].innerHTML= neueSpalte[0]
          zellen[i+width].innerHTML= neueSpalte[1]
          zellen[i+(2*width)].innerHTML = neueSpalte[2]
          zellen[i+(3*width)].innerHTML = neueSpalte[3]
  
  
    }

  }

  //nach oben wischen 
  function hochWisch(): void{
      for(let i=0; i<4;i++){
          let eins= zellen[i].innerHTML
          let zwei= zellen[i+width].innerHTML
          let drei=zellen[i+(2*width)].innerHTML
          let vier= zellen[i+(3*width)].innerHTML
          let spalte= [parseInt(eins),parseInt(zwei), parseInt(drei), parseInt(vier)]

          //nummer bewegen 
          let filterSpalte= spalte.filter(number=> number)
          //herrausfinden welche felder leer sind
          let leeresFeld= 4- filterSpalte.length
          // leere Felder mir 0 füllen
          let nullen= Array(nichtda).fill(0)

          let neueSpalte= filterSpalte.concat(nullen)

          zellen[i].innerHTML= neueSpalte[0]
          zellen[i+width].innerHTML= neueSpalte[1]
          zellen[i+(2*width)].innerHTML = neueSpalte[2]
          zellen[i+(3*width)].innerHTML = neueSpalte[3]
      }

}




// 2 gleiche nummern nebeneinander verschmelzen

  function verschmelzenReihe():void{
  for(let i=0; i<15; i++){
      if (zellen[i].innerHTML=== zellen[i+1].innerHTML){
          let verschmelzendeZahl= parseInt (zellen[i].innerHTML)+parseInt (zellen[i+1].innerHTML)
          zellen[i].innerHTML= verschmelzendeZahl
          zellen[i+1].innerHTML=0

      }
  }
  gewonnen()
}


  function verschmelzenSpalte():void{
  for(let i=0; i<12; i++){
      if (zellen[i].innerHTML=== zellen[i+width].innerHTML){
          let verschmelzendeZahl= parseInt (zellen[i].innerHTML)+parseInt (zellen[i+width].innerHTML)
          zellen[i].innerHTML= verschmelzendeZahl
          zellen[i+width].innerHTML=0

      }
  }
  gewonnen()
}
// Steuerung
function steuerung(e: { keyCode: number; }) {
  if(e.keyCode ===39){
      rechts()
  }
  else if(e.keyCode ===37){
      links()
  }
  else if (e.keyCode===38){
      hoch()
  }
  else if (e.keyCode===40){
      unten()
  }

  document.addEventListener("keyup", steuerung)
}   

function rechts():void{
  rechtsWisch()
  verschmelzenReihe()
  rechtsWisch()
  generate()
}

function links():void{
  linksWisch()
  verschmelzenReihe()
  linksWisch()
  generate()
}

function unten():void{
  untenWisch()
  verschmelzenSpalte()
  untenWisch()
  generate()
}

function hoch():void{
      hochWisch()
      verschmelzenReihe()
      hochWisch()
      generate()
}
  //checken ob gewonnen oder verloren

  // ist zahl 2048 da


  function gewonnen():void{
      for( let i = 0; i <length; i++ ){
          if(zellen[i].innerHTML==2048){
              //ergebnisDisplay.innerHTML="Glückwunsch!"
               document.removeEventListener("keyup", steuerung)
      }
  }
}

 function verloren():void{

     let nullen= null
     for (let i=0; i<zellen.length; i++){
        if(zellen[i].innerHTML==0){
            nullen ++
          // nullen ist possibly null--> sagen das es nicht null ist
            if (nullen != null ) {
              console.error();
            } else {window.alert("Error:/")}

             
       }
     }
     if (nullen===0){
        ergebnisDisplay.innerHTML="Looser!"

          if (ergebnisDisplay != null ) {
            ergebnisDisplay.appendChild(zelle)}

          else{ 
            window.alert("Error:/")
        }
        document.removeEventListener("keyup", steuerung)

      }
  

//} 


    } )