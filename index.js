const toolboxButton = document.getElementById('toolbox')
const aboutMeButton = document.getElementById('aboutMeBtn')
const techStack = document.getElementById("techStack")
const aboutMe = document.getElementById("aboutMe")
const theLogos = document.getElementsByClassName("logo")
const logoDivs = document.getElementsByClassName("logodiv")
const desc = document.getElementById("desc")
const myImage = document.getElementById("me")
const textToCover = document.getElementsByClassName("textCover")
const linksAboutMe = document.getElementById("links")
const contactButton = document.getElementById("contact")
const sendButton = document.getElementById("sendButton")
const contactForm = document.getElementById("contactForm")
const formFields = document.getElementsByClassName("formFields")
const hiddenPanels = document.getElementsByClassName("panelHidden")
const panels = document.getElementsByClassName("panel")
const oldTownButton = document.getElementById("OTN")
const projectMenuButton = document.getElementById("menutitle")
let textCoverInterval;
let textCoverTimeout;
let contactFormTimeout;
let description;
let newDescription;
let hideTimeout;
let letterInterval;
let active = "";
toolboxButton.addEventListener("mouseover", ()=> bringTechStack(event))
toolboxButton.addEventListener("mouseleave", ()=> hideTechStack(event))
aboutMeButton.addEventListener("mouseover", ()=>revealAboutMe(0))
aboutMeButton.addEventListener("mouseleave", ()=>hideAboutMe(1))
contactButton.addEventListener("mouseover", ()=>revealContactForm(event))
contactButton.addEventListener("mouseleave", ()=>hideContactForm(event))
projectMenuButton.addEventListener("mouseover", ()=>revealProject(event))
splitDesc();
//Main functions
function revealProject(e){
    primeThePanels();
}
function revealContactForm(e){
    hideAll(active)
    active="contact"
    contactForm.classList.remove("visibilityOff")
    sendButton.classList.remove("hideFormButton")
    for(let i = 0; i<formFields.length; i++){
        formFields[i].classList.remove("hideForm")
        if(i%2===0) formFields[i].classList.add("slideInLeft")
        else formFields[i].classList.add("slideInRight")
    }
}
// eslint-disable-next-line complexity
function hideContactForm(event){
    if(event && event.pageX>110) return 0;
    
    //contactForm.classList.add("slideInLeft")
    // contactForm.classList.add("techStackOff")
    sendButton.classList.add("hideFormButton")
    for(let i = 0; i<formFields.length; i++){
        formFields[i].classList.add("hideForm")
        if(i%2===0) formFields[i].classList.remove("slideInLeft")
        else formFields[i].classList.remove("slideInRight")
    }
    if(event && event.pageY>178){
    contactFormTimeout = setTimeout(function(){
        contactForm.classList.add("visibilityOff")
    }, 1000)
    }
    else{
        contactForm.classList.add("visibilityOff")
    }   
}
function revealAboutMe(hide, isOnLoad){
    if(!isOnLoad) hideAll(active);
    clearTOandINT()
    active = "aboutMe"
    linksAboutMe.classList.remove("visibilityOff")
    myImage.classList.remove("meBlur")
    myImage.classList.add("meNoBlur")
    aboutMe.classList.remove("aboutMeOff")
    aboutMe.classList.remove("fadeToBottom")
    aboutMe.classList.add("aboutMeOn")
    magicLetters(hide)
    textCoverTimeout = setTimeout(function(){
        revealAboutMeMenu();
    }, 600);
}

function bringTechStack() {
    hideAll(active)
    active = "techStack"
    techStack.classList.remove("techStackOff")
    techStack.classList.add("techStackOn")
    for(let i = 0; i<theLogos.length; i++){
        theLogos[i].classList.add("logo-animation")
        logoDivs[i].classList.add("logo-slide")
    }
}

function hideTechStack(event){
    clearTOandINT()
    if(event.pageX>110) return 0;
    hideTechPanels()
}

function hideAboutMe(hide){
    if(event.pageX>110) return 0;
    else clearTOandINT()
    magicLetters(hide)
    myImage.classList.remove("meNoBlur")
    myImage.classList.add("meBlur")
    for(let i = 0; i<newDescription.length; i++){
        newDescription[i].classList.remove("visibleLetter")
        newDescription[i].classList.add("invisibleLetter")
    }
    for(let i = 0; i<textToCover.length; i++){
        textToCover[i].classList.remove('reveal-text-reverse')
    }
    linksAboutMe.classList.add("visibilityOff")
    hideTimeout = setTimeout(function(){
        aboutMe.classList.remove("aboutMeOn")
        aboutMe.classList.add("aboutMeOff")
    }, 1000)
  
}

//Helper functions
//Helper functions for projects 
function primeThePanels(e){
    console.log(1)
  
    for(let i=0; i<panels.length; i++){
        
        panels[i].addEventListener("mouseover", function(){
            panelHover(event, 0)})
        // panels[i].addEventListener("mouseleave", function(){
        //     panelHover(event, 1)})
    }
    
}
function panelHover(event, hide){
    if(hide)event.target.classList.remove("hideThePanels")
    else event.target.classList.add("hideThePanels")
}
    //Helper function hideAll
function hideAll(active){
    clearTOandINT()
    switch(active){
        case "aboutMe":
            for(let i = 0; i<newDescription.length; i++){
                newDescription[i].classList.remove("visibleLetters")
                newDescription[i].classList.add("invisibleLetter")
            }
            for(let i = 0; i<textToCover.length; i++){
                textToCover[i].classList.remove('reveal-text-reverse')
            }
            aboutMe.classList.remove("aboutMeOn")
            aboutMe.classList.add("aboutMeOff")
            linksAboutMe.classList.add("visibilityOff")
            break
        case "techStack":
            hideTechPanels();
            break
        case "contact":
            hideContactForm();
            break;
        default:
            return 0
    }
}

    //Helper functions revealAboutMe

function clearTOandINT(){
    clearTimeout(hideTimeout)
    clearInterval(letterInterval)
    clearTimeout(textCoverTimeout)
    clearInterval(textCoverInterval)
    clearTimeout(contactFormTimeout)
}
function revealAboutMeMenu(){
    let i = 0
    textCoverInterval = setInterval(function(){
        if(i<textToCover.length){
            textToCover[i].classList.add('reveal-text-reverse')
            i++
        }
    }, 500)
}
function magicLetters(hide){
    let randomBreakPoints = [0];
    let i = 5
    while(i>0){
        let randBP = randomIntFromInterval(randomBreakPoints[randomBreakPoints.length-1]+i*10, randomBreakPoints[randomBreakPoints.length-1]+(622-randomBreakPoints[randomBreakPoints.length-1])/i)
        randomBreakPoints.push(randBP)
        i--;
    }
    let rBP = randomBreakPoints;
    letterInterval = setInterval(function(){
        if(i<=rBP[1])  letterReveal(newDescription[rBP[0]+i], hide);
        if(rBP[1]+i<=rBP[2])  letterReveal(newDescription[rBP[1]+i], hide);
        if(rBP[2]+i<=rBP[3])  letterReveal(newDescription[rBP[3]-i], hide);
        if(rBP[3]+i<=rBP[4])  letterReveal(newDescription[rBP[3]+i], hide);
        if(rBP[4]+i<=rBP[5])  letterReveal(newDescription[rBP[4]+i], hide);
        if(rBP[5]+i<629)  letterReveal(newDescription[628-i], hide);
        i++;
    }, 5)   
}
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
function letterReveal(letterIn, hide){
    let remove = "invisibleLetter"
    let add = "visibleLetters"
    if(hide){
        remove = "visibleLetters"
        add="invisibleLetter"
    }
    letterIn.classList.remove(remove)
    letterIn.classList.add(add)
}

    //Helper functions hide tech stack
function hideTechPanels(){
    for(let i = 0; i<theLogos.length; i++){
        theLogos[i].classList.remove("logo-animation")
        logoDivs[i].classList.remove("logo-slide")
    }
    techStack.classList.remove("techStackOn")
    techStack.classList.add("techStackOff")
}

//runtime functions 

function splitDesc(){
    description = "<p><span class='singleLetter invisibleLetter'>"+desc.innerText.split("").join("</span><span class='singleLetter invisibleLetter'>").replace("\n", "</p><p>")+"</span></p>"
    desc.innerHTML = description
    newDescription = document.getElementsByClassName("singleLetter")
}
