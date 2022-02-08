class drumkit{
    constructor(){
        this.pads=document.querySelectorAll(".pad")
        this.playBtn=document.querySelector(".play")
        this.kickAudio=document.querySelector(".kick-sound")
        this.snareAudio=document.querySelector(".snare-sound")
        this.hihatAudio=document.querySelector(".hihat-sound")
        this.currentKick='sounds/kick-classic.wav'
        this.currentSnare='sounds/snare-acoustic01.wav'
        this.currentKick='sounds/hihat-acoustic01.wav'
        this.isPlaying=null
        this.mutebtn=document.querySelectorAll(".mute")
        this.index=0
        this.bpm=150
        this.selects=document.querySelectorAll("select")
        this.tempo=document.querySelector(".temposlider")
    }
    activePad(){
        this.classList.toggle("active")
    }
    repeat()    {
        let step=this.index % 8
        const activebars=document.querySelectorAll(`.b${step}`)
        activebars.forEach(bar=> {
            bar.style.animation=`playTrack 0.3s alternate ease-in-out 2`
            if(bar.classList.contains("active")){
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.play()
                    this.kickAudio.currentTime=0
                }   if(bar.classList.contains("snare-pad")){
                    this.snareAudio.play()
                    this.snareAudio.currentTime=0

                }   if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.play()
                    this.hihatAudio.currentTime=0
                }
            }

        })
        this.index++
            }
            start(){
                
                const interval=(60/this.bpm)*1000
                if(!this.isPlaying){
                this.playBtn.classList.add("active")
                this.playBtn.innerText="Stop"
               this.isPlaying=setInterval(()=>{
                        this.repeat()
                },interval)
            }else{
                clearInterval(this.isPlaying)
                this.playBtn.classList.remove("active")
                this.playBtn.innerText="Play"
                this.isPlaying=null
            }
            }
            changesound(e){
                const selectName=e.target.name
                const selectValue=e.target.value
                console.log(selectValue)
                console.log(selectName)
                switch(selectName){
                    case "kick-track":
                        this.kickAudio.src=selectValue
                        break
                        case "snare-track":
                            this.snareAudio.src=selectValue
                            break
                            case "hihat-track":
                                this.hihatAudio.src=selectValue
                                break
                }

             
            }
            mute(e){
                const muteindex=e.target.getAttribute('data-track')
                e.target.classList.toggle("active")
                if(e.target.classList.contains("active")){
                    switch(muteindex){
                        case "0":
                            this.kickAudio.volume=0
                            break
                            case "1":
                            this.snareAudio.volume=0
                            break
                            case "2":
                            this.hihatAudio.volume=0
                            break
                    }
                }else{
                    switch(muteindex){
                    case "0":
                        this.kickAudio.volume=1
                        break
                        case "1":
                        this.snareAudio.volume=1
                        break
                        case "2":
                        this.hihatAudio.volume=1
                        break
                    }
                }
            
            }
            tempoupdate(e){
                console.log(e)
                const tempostep=document.querySelector(".tempo-nr")
                this.bpm=e.target.value
                tempostep.innerText=e.target.value
            }
            tempoinstantchange(e){
                clearInterval(this.isPlaying)
                this.isPlaying=0
                const playBtn=document.querySelector(".play")
                if(playBtn.classList.contains("active")){
                    this.start()
                }
            }
    }
    const Drumkit=new drumkit()

    Drumkit.pads.forEach(pad=>{
        pad.addEventListener("click",Drumkit.activePad)
        pad.addEventListener("animationend",function(){
            this.style.animation=""
        })
    })

    Drumkit.playBtn.addEventListener("click",function(){
        Drumkit.start()
    })
    Drumkit.selects.forEach(select=>{
        select.addEventListener("change",function(e){
            Drumkit.changesound(e)
        })
    })
    Drumkit.mutebtn.forEach(btn=>{
        btn.addEventListener("click",function(e){
            Drumkit.mute(e)
        })
    })
    Drumkit.tempo.addEventListener("input",function(e){
            Drumkit.tempoupdate(e)
    })
    Drumkit.tempo.addEventListener("change",function(e){
        Drumkit.tempoinstantchange(e)
})