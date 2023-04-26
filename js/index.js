
const arrImages=["url('./images/goku.png')", "url('./images/gohan.png')", "url('./images/vegeta.png')",
                "url('./images/krillin.png')", "url('./images/picolo.png')", "url('./images/trunks.png')",
                "url('./images/yamcha.png')", "url('./images/tien.png')",
                "url('./images/goku.png')", "url('./images/gohan.png')", "url('./images/vegeta.png')",
                "url('./images/krillin.png')", "url('./images/picolo.png')", "url('./images/trunks.png')",
                "url('./images/yamcha.png')", "url('./images/tien.png')"
                ]
let v=[]
 

    function randomize(urk,d){
        let z=Math.floor(Math.random()*16)
        
        if( v[z]==null){
            
            d[z]=urk
            return z
            
        }
        
        return randomize(urk,d)
    }
    for(let i=0;i<arrImages.length;i++){
        v[randomize(arrImages[i],v)]=arrImages[i]   
    }
console.table(v)
const arrScores=[]
let guesses=0
let rightGuess=0
let turn=0
class ImageClass{
    constructor(imageUrl,id){
        this.imageUrl=imageUrl
        this.isFlip=false
        this.id=id
    }
    setFlip(){
        this.isFlip=true
    }
}
let temporary={
    id:0,
    temp:""
}

v.forEach((elem, i)=>{
    arrScores.push(new ImageClass(elem,"a-"+i))
    if(document.querySelector("#a-"+i)!==null){
        document.querySelector("#a-"+i).style.backgroundImage=elem
        document.querySelector("#a-"+i).style.backgroundSize="9vmin 13vmin"
    }
})



function ssplit(t){
    return t.split("-")[1]
}

function checkSolution(e){
    e.preventDefault()
    let d = ssplit(e.target.id)
    if(turn%2==0){
        guesses++
        if(e.target.style.backgroundImage==temporary.temp){
            arrScores[d].isFlip=true;
            arrScores[ssplit(temporary.id)].isFlip=true;
            document.querySelector("#a-"+d).setAttribute("disabled","true")
            document.querySelector("#a-"+ssplit(temporary.id)).setAttribute("disabled","true")
            rightGuess++
            document.querySelector(".guess-screen2").innerText=rightGuess
            if(rightGuess==8){ 
                document.querySelector(".wpopup").style.display="flex"
                document.querySelector('.timer-screen').innerText="00:00";
            }

        }
        else{
          
            setTimeout(()=>{
                document.querySelector("#a-"+d).classList.toggle("card-flip")
                document.querySelector("#a-"+d).style.removeProperty("background")
                document.querySelector("#a-"+d).style.backgroundColor="red"
                document.querySelector("#a-"+ssplit(temporary.id)).classList.toggle("card-flip")
                document.querySelector("#a-"+ssplit(temporary.id)).style.removeProperty("background")
                document.querySelector("#a-"+ssplit(temporary.id)).style.backgroundColor="red"

            }, 1000)
            
        }
    }
    else{
        temporary.temp=e.target.style.backgroundImage
        temporary.id=e.target.id
    }
console.log(e.target.style.backgroundImage)
console.log(temporary.temp)

}



















let cards = document.querySelectorAll(".cards")
cards.forEach(elem=>{
    elem.addEventListener("click",function(e){
        e.preventDefault()
        turn++
        if(e.target.style.backgroundColor=="red"){
            e.target.classList.toggle("card-flip")
            
            e.target.style.background=arrScores[ssplit(e.target.id)].imageUrl

            e.target.style.backgroundSize="9vmin 13vmin"
        }
        else{
         
            e.target.classList.toggle("card-flip")
            e.target.style.backgroundColor="red" 
      

        }
        checkSolution(e)
        document.querySelector(".guess-screen1").innerText=guesses
    })
})










//countdown timer

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        
        
        if (--timer < 0) {
                if(rightGuess!==8){
                document.querySelector(".lpopup").style.display="flex"
                document.querySelector('.timer-screen').innerText="00:00";
                }
                else{
                    document.querySelector('.timer-screen').innerText="00:00";
                }
                
        }
        else{
            if(rightGuess==8){
                document.querySelector('.timer-screen').innerText="00:00";
            }
        }
    }, 1000);
}

document.querySelector(".start").addEventListener("click",function () {
    
    document.querySelectorAll(".cards").forEach(elem=>{
        elem.classList.toggle("card-flip")
        elem.style.background="red" 
    })
    
    var fiveMinutes = 59,
    display = document.querySelector('.timer-screen');
    startTimer(fiveMinutes, display);
})
document.querySelectorAll(".playagain").forEach(elem=>{
    elem.addEventListener("click",()=>{
        window.location.reload()
    })
})
