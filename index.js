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
const allSignButton = document.getElementById("AS")
const WCTButton = document.getElementById("WCT")
const projectMenuButton = document.getElementById("menutitle")
const mosaic = document.getElementById("mosaic_wrapper")
const behindMosaic = document.getElementById("behind-mosaic")
const projectLogos = document.querySelectorAll(".panelHidden img")
const projectDesc = document.querySelectorAll(".panelHidden ul")
let copyOfPanels = [].slice.call(panels)
let textCoverInterval;
let textCoverTimeout;
let contactFormTimeout;
let description;
let newDescription;
let hideTimeout;
let letterInterval;
let active = "";
let mosaicReturnTimeOut;
let mosaicReturnInterval;
const oldTownLogos = ["Assets/LOGOS/jslogo.png", "Assets/LOGOS/reactlogo2.png", "Assets/LOGOS/reduxlogo2.png", "Assets/LOGOS/postgreslogo.png", "Assets/LOGOS/expresslogo.png", "Assets/LOGOS/oauth.png", "Assets/LOGOS/mocha.png", "Assets/LOGOS/webpack.png", "Assets/LOGOS/heroku.png"]
const allSignLogos = ["Assets/LOGOS/tensorflow.png", "Assets/LOGOS/flask.png", "Assets/LOGOS/expresslogo.png", 
"Assets/LOGOS/reduxlogo2.png", "Assets/LOGOS/semantic.png", "Assets/LOGOS/reactlogo2.png", "Assets/LOGOS/postgreslogo.png", 
"Assets/LOGOS/webpack.png", "Assets/LOGOS/heroku.png"]
const WCTLogos = ["Assets/LOGOS/jslogo.png", "Assets/LOGOS/reactlogo2.png", "Assets/LOGOS/reduxlogo2.png",  "Assets/LOGOS/leaflet.png", "Assets/LOGOS/weathergov.png", "Assets/LOGOS/strava_logo_orange.png", 
"Assets/LOGOS/react-leaflet.jpg",  "Assets/LOGOS/bootstrap.png", 
"Assets/LOGOS/passportjs.png"]
const oldTownDesc = ["<li>JavaScript</li> <li>Ecommerce Website</li>", "<li>React based SPA</li>", 
"<li>State Management</li><li>using Redux</li>", "<li>PSQL Database</li> <li>Persistent Storage</li>", "<li> &nbsp; </li> <li>Express</li> <li>Server Framework</li>",
 "<li>OAuth</li><li>Authorization</li>", "<li>Mocha</li><li>Tested</li>", "<li>Webpack</li><li>Bundled</li>", "<li>Heroku</li><li>Deployed</li>" ]
const allSignDesc =["<li>Tensorflow</li> <li>Machine Learning Model</li>", "<li>Flask Server</li><li>Tensorflow Deployment</li>",
 "<li> &nbsp; </li> <li>Express</li> <li>Server Framework</li>", "<li>Redux </li><li>State Management</li>",
  "<li> Semantic Library</li><li>Styling</li>","<li>React based SPA</li>"
, "<li>PSQL Database</li> <li>Persistent Storage</li>", "<li>Webpack</li><li>Bundled</li>", "<li>Heroku</li><li>Deployed</li>" ]
const WCTDesc =["<li>JavaScript</li><li>Coordinates Dependant</li><li> Weather Forecast</li>",   "<li>React based SPA</li>", "<li>Redux </li><li>State Management</li>"
, "<li>Leaflet</li> <li>Map API</li>", "<li>Weather.gov</li><li>Weather API</li>",
 " <li>Strava Fitness</li> <li>GPS API</li>","<li> React Leaflet</li><li>React Components for Leaflet</li>",
  "<li>Styled In</li> <li>Bootstrap</li>", "<li>PassportJS</li><li>Authorization</li>" ]
toolboxButton.addEventListener("mouseover", ()=> bringTechStack(event))
toolboxButton.addEventListener("mouseleave", ()=> hideTechStack(event))
aboutMeButton.addEventListener("mouseover", ()=>revealAboutMe(0))
aboutMeButton.addEventListener("mouseleave", ()=>hideAboutMe(1))
contactButton.addEventListener("mouseover", ()=>revealContactForm(event))
contactButton.addEventListener("mouseleave", ()=>hideContactForm(event))
projectMenuButton.addEventListener("mouseover", ()=>revealProject(event))
oldTownButton.addEventListener("mouseover", ()=>revealProject(event))
allSignButton.addEventListener("mouseover", ()=>revealProject(event))
WCTButton.addEventListener("mouseover", ()=>revealProject(event))
mosaic.addEventListener("mouseleave", ()=>bringBackBG(event))
splitDesc();
//Main functions

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
function bringBackBG(e){
    //hideAll(active, "noswitch")
    let count = document.getElementsByClassName("hideThePanels")
    if(count.length<9) return 0;
    // for(let i = 0; i<panels.length; i++){
    //     panels[i].classList.remove("hideThePanels")
    //     panels[i].classList.add('invisibleLetter')
        
    // }
    let i = 0;
    let intervalTiming = 1000*Math.random()
    let idx=0;
    mosaicReturnTimeOut = setTimeout(function(){
        mosaicReturnInterval = setInterval(function(){
            if(i<panels.length){
                while(!panels[idx].classList.contains("hideThePanels")){
                    idx = Math.floor(Math.random()*panels.length)
                }
            panels[idx].classList.remove('hideThePanels')
            panels[idx].classList.add('restorePanels')
            hiddenPanels[copyOfPanels.indexOf(panels[idx])].classList.add("invisibleLetter")
            i++
            intervalTiming = 500+600*Math.random()
            }
    }, intervalTiming)

    }, 3000)
}
// textCoverInterval = setInterval(function(){
//     if(i<textToCover.length){
//         textToCover[i].classList.add('reveal-text-reverse')
//         i++
//     }
// }, 500)

function revealProject(e){
    hideAll(active)
    active="projects"
    mosaic.classList.remove("visibilityOff")
    primeThePanels(e);
}
function primeThePanels(e){
    let backgroundVar = "wct.jpg"
    let logoArray = WCTLogos
    let descArray = WCTDesc
    switch(e.target.id){
        case "AS":
            backgroundVar = "allsign.jpg";
            logoArray = allSignLogos;
            descArray=allSignDesc;
            break;
        case "OTN":
            backgroundVar = "oldtown.png";
            logoArray = oldTownLogos;
            descArray = oldTownDesc;
            break;
        case "WCT":
            backgroundVar = "wct.jpg";
            logosArray = WCTLogos;
            break;
        default:
            backgroundVar = "wct.jpg";
            logosArray = WCTLogos;
    }
    for(let i=0; i<panels.length; i++){
        projectLogos[i].src=logoArray[i];
        projectDesc[i].innerHTML=descArray[i];
        panels[i].addEventListener("mouseover", function(){
            panelHover(event, 0)});
        panels[i].style.background=`url("Assets/${backgroundVar}") no-repeat 350px 110px fixed`
    }
}
function panelHover(event, hide){
    let count = document.getElementsByClassName("hideThePanels")

    if(count.length===9) return 0;
    hideAll(active, "projects")
    
    behindMosaic.classList.remove("invisibleLetter")
    if(hide){
        event.target.classList.remove("hideThePanels")
        hiddenPanels[copyOfPanels.indexOf(event.target)].classList.add("invisibleLetter")
    }
    else{
        event.target.classList.add("hideThePanels")
        hiddenPanels[copyOfPanels.indexOf(event.target)].classList.remove("invisibleLetter")
    }
}
    //Helper function hideAll
// eslint-disable-next-line complexity
function hideAll(active, source){
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
        case "projects":
            if(source!=="projects"){
                mosaic.classList.add("visibilityOff")
            }
            for(let i = 0; i<panels.length; i++){
                panels[i].classList.remove("restorePanels")
                if(source!=="projects"){
                    panels[i].classList.remove("hideThePanels")
                    hiddenPanels[i].classList.add("invisibleLetter")
                }
             }
             
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
    clearTimeout(mosaicReturnTimeOut)
    clearInterval(mosaicReturnInterval)
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
