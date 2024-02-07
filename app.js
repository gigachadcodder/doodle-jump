document.addEventListener('DOMContentLoaded', ()=> {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 250
    let isGameOver = false
    let platformcount  = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = true

    function createDoodler (){
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    class platform{
        constructor(newPlatBottom){
            this.bottom = newPlatBottom
            this.left = Math.random() *315
            this.visual = document.createElement('div')

            const visual = this.visual 
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms(){
        for(let i=0 ; i < platformcount; i++){
            let platformGap = 600 / platformcount
            let newPlatBottom = 100 + i * platformGap
            let newplatform = new platform(newPlatBottom)
            platforms.push(newplatform)
            console.log(platforms)

        }
    }

    function movePlatforms(){
        if (doodlerBottomSpace > 200 ) {
            platforms.forEach(platform =>{
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
            })
            
        }
    }

    function jump(){ 
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function (){
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > 350) {
                fall()
            }
        },30)

    }

    function fall(){
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(function(){
        doodlerBottomSpace -= 5
        doodler.style.bottom = doodlerBottomSpace + 'px'
         if (doodlerBottomSpace <=0) {
            gameOver()
         }
         platforms.forEach(platform=> {
            if(
                (doodlerBottomSpace >= platform.bottom) &&
                (doodlerBottomSpace <= platform.bottom + 15)
            )
         })
        
        },30)
    }

    function gameOver(){
        console.log('game over')
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    function control(){
        if(e.key ==="Arrowleft"){
            //move left
        }
        else if (e.key ==="ArrowRight"){
            //move right
        }
        else if(e.key === " ArrowUp"){
            //moveStright
        }
    }

    function start (){
        if (!isGameOver) {
            createPlatforms()
            createDoodler() 
            setInterval(movePlatforms,30)
            jump()
        }
    }
    //button to start 
    start()
})