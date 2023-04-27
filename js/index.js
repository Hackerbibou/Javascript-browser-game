
const arrImages=["url('./images/goku.png')", "url('./images/gohan.png')", "url('./images/vegeta.png')",
                "url('./images/krillin.png')", "url('./images/picolo.png')", "url('./images/trunks.png')",
                "url('./images/yamcha.png')", "url('./images/tien.png')",
                "url('./images/goku.png')", "url('./images/gohan.png')", "url('./images/vegeta.png')",
                "url('./images/krillin.png')", "url('./images/picolo.png')", "url('./images/trunks.png')",
                "url('./images/yamcha.png')", "url('./images/tien.png')"
                ]
let v=[] 
let lock=false
let red="conic-gradient(from 179.9deg at 50% 50%, #EACB5F 0deg, rgba(18, 2, 2, 0.0260417) 350deg, rgba(72, 27, 27, 0) 360deg)"

function randomizeAlgo(array1){
    let array2=[]
    let size =array1.length
    function randomize(elem,arr2){
        let z=Math.floor(Math.random()*size)
        if( arr2[z]==null){
            arr2[z]=elem
            return z   
        }
        return randomize(elem,arr2)
    }
    for(let i=0;i<array1.length;i++){
        array2[randomize(array1[i],array2)]=array1[i]   
    }
    return array2
}

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
        this.id=id
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
    if(temporary.id==e.target.id)return
    turn++
    let d = ssplit(e.target.id)
    document.querySelector("#a-"+d).classList.remove("card-flip");
        setTimeout(()=>{
            document.querySelector("#a-"+d).classList.add("card-flip");
        },0)
    if(turn%2==0 && temporary.id!=e.target.id){
        lock=true
        setTimeout(()=>{
            lock=false
        },1200)
        guesses++
        if(e.target.style.backgroundImage==temporary.temp){
            document.querySelector("#a-"+d).style.pointerEvents = "none";
            document.querySelector("#a-"+ssplit(temporary.id)).style.pointerEvents = "none";
            rightGuess++
            document.querySelector(".guess-screen2").innerText=rightGuess
            if(rightGuess==8){ 
                document.querySelector(".wpopup").style.display="flex"
                document.querySelector('.timer-screen').innerText="00:00";
            }
        }
        else{
            document.querySelector("#a-"+ssplit(temporary.id)).classList.remove("card-flip")
            
            setTimeout(()=>{
                document.querySelector("#a-"+d).classList.remove("card-flip")
                setTimeout(()=>{document.querySelector("#a-"+d).classList.add("card-flip")},1)
                document.querySelector("#a-"+d).style.removeProperty("background")
                document.querySelector("#a-"+d).style.background=red
                document.querySelector("#a-"+ssplit(temporary.id)).classList.add("card-flip")
                document.querySelector("#a-"+ssplit(temporary.id)).style.removeProperty("background")
                document.querySelector("#a-"+ssplit(temporary.id)).style.background=red

            }, 1000)
            
        }
    }
    else{
        temporary.temp=e.target.style.backgroundImage
        temporary.id=e.target.id
    }

}

function clickFuntion(evt){
    if(lock==true)return
    evt.preventDefault()
    
    if(evt.target.style.background=red){
        evt.target.style.background=arrScores[ssplit(evt.target.id)].imageUrl
        evt.target.style.backgroundSize="9vmin 13vmin"  
    }
    checkSolution(evt)
    document.querySelector(".guess-screen1").innerText=guesses
}


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
            document.querySelectorAll(".cards").forEach(elem=>{elem.style.pointerEvents = "none"})
            document.querySelector('.timer-screen').innerText="00:00";
                if(rightGuess!==8){
                document.querySelector(".lpopup").style.display="flex"
               
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
      
        elem.classList.add("card-flip");
        elem.style.background=red 
        elem.addEventListener("click",clickFuntion)
    })
    
    var minutes = 59,
    display = document.querySelector('.timer-screen');
    startTimer(minutes, display);
})
document.querySelectorAll(".playagain").forEach(elem=>{
    elem.addEventListener("click",()=>{
        window.location.reload()
    })
})
