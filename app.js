class Drumkit{
    constructor(){
        this.pad = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.playbutton = document.querySelector(".play");
        this.index = 0;
        this.bmp = 100;
        this.isPlaying = null;
        this.currentkick = "./kick-classic.wav";
        this.currentSnare = "./snare-acoustic01.wav";
        this.currentHihat = "./hihat-acoustic01.wav";
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.temposlider = document.querySelector(".tempo-slider");
    }
    activepad() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
   
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

            //chek if pad are acttive
            if (bar.classList.contains("active")) {
                //check each sound

                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
           
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }


            }
        });
        
        this.index++;
       
    }
    start() {
          debugger
        console.log(this.bmp);
        const interval = (60 / this.bmp) * 1000;
        console.log(interval);
       
        
    if (this.isPlaying) {
        //Clear the interval
        clearInterval(this.isPlaying);
        console.log(this.isPlaying);
        this.isPlaying = null;
      } else {
        this.isPlaying = setInterval(() => {
          this.repeat();
        }, interval);
      }
    }
     
    
    updateBtn() {
        if (this.isPlaying==null) {
            console.log(this.isPlaying);
            this.playbutton.innerText = "Stop";
            this.playbutton.classList.add('active');
        } else {
            console.log(this.isPlaying);
            this.playbutton.innerText = "Play";
            this.playbutton.classList.remove('active');
        } 
  
    }
    ChangeSound(e) {
        const selectName = e.target.name;
        console.log(selectName);
        const selectionvalue = e.target.value;
        switch (selectName) {
            case "kick-select":
                this.kickAudio.src = selectionvalue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionvalue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionvalue;
       }
    }
    mute(e) {
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                    case "2":
                        this.hihatAudio.volume = 0;
                        break;
            }
        } else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                    case "2":
                        this.hihatAudio.volume = 1;
                        break;
            }
        }
        //console.log(muteIndex);
    }
    changeTempo(e) {
        const TempoText = document.querySelector(".tempo-nr");
     
        TempoText.innerText = e.target.value;
        //console.log(this.bmp);
    }
    UpdateTempo(e) {
        debugger;
        this.bmp = e.target.value;
        console.log(this.bmp);
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playbtn = document.querySelector(".play");
        if (playbtn.classList.contains("active")) {
            this.start();
        }
        console.log(this.isPlaying);
    }
}
const drum = new Drumkit();
drum.playbutton.addEventListener("click", () => { 
    drum.updateBtn();
    drum.start();
});
//Events Listener
drum.pad.forEach((pad) => {

    pad.addEventListener("click", drum.activepad);
    pad.addEventListener("animationend", function () {
         this.style.animation = "";
    });
});

drum.selects.forEach(select => {
    select.addEventListener("change", function (e) {
        drum.ChangeSound(e);
    });
});

drum.muteBtns.forEach(btn => {
    
    btn.addEventListener("click", function (e) {
        drum.mute(e);
    })
});
drum.temposlider.addEventListener("input", function (e) {
    drum.changeTempo(e); 
});
drum.temposlider.addEventListener("change", function (e) {
    drum.UpdateTempo(e); 
});