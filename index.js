const theWholeMenu = document.getElementById("menu")
//VAboutMe
const aboutMeButton = document.getElementById('aboutMeBtn')
const aboutMe = document.getElementById("aboutMe")
const desc = document.getElementById("desc")
const myImage = document.getElementById("me")
const textToCover = document.getElementsByClassName("textCover")
const linksAboutMe = document.getElementById("links")
//VToolbox
const toolboxButton = document.getElementById('toolbox')
const techStack = document.getElementById("techStack")
const theLogos = document.getElementsByClassName("logo")
const logoDivs = document.getElementsByClassName("logodiv")
//VContact
const contactButton = document.getElementById("contact")
const sendButton = document.getElementById("sendButton")
const contactForm = document.getElementById("contactForm")
const formFields = document.getElementsByClassName("formFields")
//VProjects
const rotatingArrow = document.getElementsByClassName("rotatingarrow")[3]
const projectMenuButton = document.getElementById("menutitle")
const oldTownButton = document.getElementById("OTN")
const allSignButton = document.getElementById("AS")
const WCTButton = document.getElementById("WCT")
const hiddenPanels = document.getElementsByClassName("panelHidden")
const panels = document.getElementsByClassName("panel")
const mosaic = document.getElementById("mosaic_wrapper")
const behindMosaic = document.getElementById("behind-mosaic")
const projectLogos = document.querySelectorAll(".panelHidden img")
const projectDesc = document.querySelectorAll(".panelHidden ul")
const projectSubMenu = document.getElementById("submenu")
//VGlobalVars
let copyOfPanels = [].slice.call(panels)
let textCoverInterval;
let textCoverTimeout;
let contactFormTimeout;
let projectsTimeout;
let description;
let newDescription;
let hideTimeout;
let letterInterval;
let active = "aboutme";
let mosaicReturnTimeOut;
let mosaicReturnInterval;
let backgroundVar;
let logoArray;
let descArray;
let clickOccurred = false;
const resDict = {10: "370px 110px/1000px", 
9: "300px 100px/825px", 8:"260px 130px/600px", 7: "150px 170px/600px",
6: "100% 145px/375px"}
//FRuntimeFunc
splitDesc();
addAllEventListeners();
function splitDesc(){
    description = "<p><span class='singleLetter invisibleLetter'>"+desc.innerText.split("").join("</span><span class='singleLetter invisibleLetter'>").replace("\n", "</p><p>")+"</span></p>"
    desc.innerHTML = description
    newDescription = document.getElementsByClassName("singleLetter")
}
//FEventListeners
mosaic.addEventListener("mouseleave", ()=>bringBackBG())
theWholeMenu.addEventListener("click", ()=> clickedOnNavigation())
function addAllEventListeners(){
    let arr = ["mouseover", "click"]
    if (/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        arr=["click"]
        clickOccurred = true;
    }
    if(window.innerWidth<769) clickOccurred= true;
    arr.forEach(function(evntType){
    toolboxButton.addEventListener(evntType, ()=>bringTechStack(event))
    aboutMeButton.addEventListener(evntType, ()=>revealAboutMe(0, 0, event))
    contactButton.addEventListener(evntType, ()=>revealContactForm(event))
    projectMenuButton.addEventListener(evntType, ()=>revealProject(event))
    oldTownButton.addEventListener(evntType, ()=>revealProject(event))
    allSignButton.addEventListener(evntType, ()=>revealProject(event))
    WCTButton.addEventListener(evntType, ()=>revealProject(event))
  })
    contactButton.addEventListener("mouseleave", ()=>hideContactForm(event))
    aboutMeButton.addEventListener("mouseleave", ()=>hideAboutMe(1, event))
    toolboxButton.addEventListener("mouseleave", ()=> hideTechStack(event))
    
}
//FNonComponent
function clickedOnNavigation(){
    clickOccurred = true;
}
//FHideAll 
// eslint-disable-next-line complexity
function hideAll(active, source){    
    clearTOandINT()
    if(active === "aboutMeComplete") active = "aboutMe"
    switch(active){
        case "aboutMe":
            for(let i = 0; i<newDescription.length; i++){
                newDescription[i].classList.remove("visibleLetters")
                newDescription[i].classList.add("invisibleLetter")
            }
            for(let i = 0; i<textToCover.length; i++){
                textToCover[i].classList.remove('reveal-text-reverse')
            }
            myImage.classList.add("meBlur")
            myImage.classList.remove("meNoBlur")
            aboutMe.classList.remove("aboutMeOn")
            aboutMe.classList.add("aboutMeOff")
            linksAboutMe.classList.add("visibilityOff")
            break
        case "techStack":
            hideTechPanels(event);
            break
        case "contact":
            hideContactForm(event);
            break;
        case "projects":
            if(source!=="projectsHover"){
                mosaic.classList.add("visibilityOff")
              
            }
            if(clickOccurred && source!=="projects" && source!=="projectsHover"){
                projectSubMenu.style.maxHeight="0px"
                rotatingArrow.style.transform = "rotate(0deg)"
            }
            for(let i = 0; i<panels.length; i++){
                panels[i].classList.remove("restorePanels")
                if(source!=="projectsHover"){  
                    panels[i].classList.remove("hideThePanels")
                    hiddenPanels[i].classList.add("invisibleLetter")
                    
                }
             }
             
            break;
        default:
            return 0
    }
}

function clearTOandINT(){
    clearTimeout(hideTimeout)
    clearInterval(letterInterval)
    clearTimeout(textCoverTimeout)
    clearInterval(textCoverInterval)
    clearTimeout(contactFormTimeout)
    clearTimeout(mosaicReturnTimeOut)
    clearInterval(mosaicReturnInterval)
    clearTimeout(projectsTimeout)
}
//End-NonComponent
//FContact
function revealContactForm(e){
    if(clickOccurred && e.type === "mouseover") return 0;
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

    if(clickOccurred && event.type === "mouseleave") return 0;
    if(!clickOccurred && event && event.pageX>119 && event.pageY<178) return 0;
    // else if(window.innerWidth<769 && event.pageY>92 || window.innerWidth<769 && event.pageY<72) return 0
    sendButton.classList.add("hideFormButton")
    for(let i = 0; i<formFields.length; i++){
        formFields[i].classList.add("hideForm")
        if(i%2===0) formFields[i].classList.remove("slideInLeft")
        else formFields[i].classList.remove("slideInRight")
    }
    
    if(!clickOccurred && event && event.pageY>178 || !clickOccurred && event && event.pageX<40){
    contactFormTimeout = setTimeout(function(){
        contactForm.classList.add("visibilityOff")
    }, 500)
    }
    else{
        contactForm.classList.add("visibilityOff")
    }   
}
//End-ConactForm
//FAboutMe
function revealAboutMe(hide, isOnLoad, event){
    if(clickOccurred && event && event.type === "mouseover") return 0;
    if(active === "aboutMeComplete" && event && event.type === "click") return 0;
    if(!isOnLoad) hideAll(active);
    clearTOandINT()
    let interval = 600;
    active = "aboutMe"
    linksAboutMe.classList.remove("visibilityOff")
    myImage.classList.remove("meBlur")
    myImage.classList.add("meNoBlur")
    aboutMe.classList.remove("aboutMeOff")
    aboutMe.classList.remove("fadeToBottom")
    aboutMe.classList.add("aboutMeOn")
    magicLetters(hide)
    if(!clickOccurred || isOnLoad){
        textCoverTimeout = setTimeout(function(){
            revealAboutMeMenu();
            active="aboutMeComplete"
        }, interval);
    }
    else{
        for(let i = 0; i<textToCover.length; i++){
            textToCover[i].style.color = "#000000"
        }
    }
    // }
}

function hideAboutMe(hide, event){
    
    if(clickOccurred && event.type === "mouseleave") return 0;
    if(!clickOccurred && event.pageX>110) return 0;
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
    let interval = 5;
    if(clickOccurred) inteval = 0.1;
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
    }, interval)   
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

//End-AboutMe
//FTechStack
function bringTechStack(event) {
    if(clickOccurred && event.type === "mouseover") return 0;
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
    if(clickOccurred && event.type === "mouseleave") return 0;
    clearTOandINT()
    if(!clickOccurred && event.pageX>110) return 0;
    hideTechPanels(event)
}
function hideTechPanels(event){
    if(clickOccurred && event.type === "mouseleave") return 0;
    for(let i = 0; i<theLogos.length; i++){
        theLogos[i].classList.remove("logo-animation")
        logoDivs[i].classList.remove("logo-slide")
    }
    techStack.classList.remove("techStackOn")
    techStack.classList.add("techStackOff")
}
//End-TechStack
//FProjects

function revealProject(e){
    if(clickOccurred && e.type === "mouseover") return 0;
    if(e.type==="click"){
         projectSubMenu.style.maxHeight="70px"
         rotatingArrow.style.transform = "rotate(90deg)"
    }
    let delay = 0;
    if(active==="contact" || active==="techStack") delay = 520;
   
    hideAll(active, "projects")
    projectsTimeout = setTimeout(function(){ 
        mosaic.classList.remove("visibilityOff")
        active="projects"
    primeThePanels(e);
}, delay)
}
function primeThePanels(e){
    // if(e.target.id[0]WCT" && backgroundVar ==="wct.jpg") return 0;
    switch(e.target.id){
        case "AS":
            WCTButton.style.fontWeight ="normal"
            oldTownButton.style.fontWeight ="normal"
            allSignButton.style.fontWeight = "bold"
            backgroundVar = "allsign.jpg";
            logoArray = allSignLogos;
            descArray=allSignDesc;
            break;
        case "OTN":
            WCTButton.style.fontWeight ="normal"
            oldTownButton.style.fontWeight ="bold"
            allSignButton.style.fontWeight = "normal"
            backgroundVar = "oldtown.png";
            logoArray = oldTownLogos;
            descArray = oldTownDesc;
            break;
        case "WCT":
            WCTButton.style.fontWeight ="bold"
            oldTownButton.style.fontWeight ="normal"
            allSignButton.style.fontWeight = "normal"
            backgroundVar = "wct.jpg";
            logoArray = WCTLogos;
            descArray = WCTDesc;
            break;
        default:
            break;
            
    }
    let key = Math.floor(window.innerWidth/100);
    if(key>10) key = 10;
    else if(key<6) key = 6;
    else if(key===7 && window.innerWidth>768) key = 8;
    for(let i=0; i<panels.length; i++){
        if(e.target.id!=="menutitle"){
            projectLogos[i].src=logoArray[i];
            projectDesc[i].innerHTML=descArray[i];
            panels[i].style.background=`url("Assets/${backgroundVar}") ${resDict[key]} repeat fixed`
        }
        panels[i].addEventListener("mouseover", function(){
            panelHover(event, 0)});
       
    }
}
function panelHover(event, hide){
    if(window.innerWidth<=700) return 0;
    let count = document.getElementsByClassName("hideThePanels")

    if(count.length===9) return 0;
    hideAll(active, "projectsHover")
    
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

function bringBackBG(e){
    
    let count = document.getElementsByClassName("hideThePanels")
    if(count.length<9 && !e) return 0;
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
//End-Projects


 


const oldTownLogos = ["Assets/LOGOS/jslogo.png", "Assets/LOGOS/reactlogo2.png", "Assets/LOGOS/reduxlogo2.png", "Assets/LOGOS/postgreslogo.png", "Assets/LOGOS/expresslogo.png", "Assets/LOGOS/oauth.png", "Assets/LOGOS/mocha.png", "Assets/LOGOS/webpack.png", "Assets/LOGOS/heroku.png"]
const allSignLogos = ["Assets/LOGOS/tensorflow.png", "Assets/LOGOS/flask.png", "Assets/LOGOS/expresslogo.png", 
"Assets/LOGOS/reduxlogo2.png", "Assets/LOGOS/semantic.png", "Assets/LOGOS/reactlogo2.png", "Assets/LOGOS/postgreslogo.png", 
"Assets/LOGOS/webpack.png", "Assets/LOGOS/heroku.png"]
const WCTLogos = ["Assets/LOGOS/jslogo.png", "Assets/LOGOS/reactlogo2.png",
 "Assets/LOGOS/reduxlogo2.png",  "Assets/LOGOS/leaflet.png", 
 "Assets/LOGOS/weathergov.png", "Assets/LOGOS/strava_logo_orange.png", 
"Assets/LOGOS/react-leaflet.jpg",  "Assets/LOGOS/bootstrap.png", 
"Assets/LOGOS/passportjs.png"]
const oldTownDesc = ["<li>JavaScript</li> <li>Ecommerce Website</li>", "<li>React based SPA</li>", 
"<li>State Management</li><li>using Redux</li>", "<li>PSQL Database</li> <li>Persistent Storage</li>", "<li> &nbsp; </li> <li>Express</li> <li>Server Framework</li>",
 "<li>OAuth</li><li>Authorization</li>", "<li>Mocha</li><li>Tested</li>", "<li>Webpack</li><li>Bundled</li>", "<li>Heroku</li><li>Deployed</li>" ]
const allSignDesc =["<li>Tensorflow</li> <li>Machine Learning Model</li>", "<li>Flask Server</li><li>Tensorflow Deployment</li>",
 "<li> &nbsp; </li> <li>Express</li> <li>Server Framework</li>", "<li>Redux </li><li>State Management</li>",
  "<li> Semantic Library</li><li>Styling</li>","<li>React based SPA</li>"
, "<li>PSQL Database</li> <li>Persistent Storage</li>", "<li>Webpack</li><li>Bundled</li>", "<li>Heroku</li><li>Deployed</li>" ]
const WCTDesc =["<li>JavaScript</li><li> Weather Forecast App</li>",  
"<li>React based SPA</li>", "<li>Redux </li><li>State Management</li>", 
"<li>Leaflet</li> <li>Map API</li>", "<li>Weather.gov</li><li>Weather API</li>",
" <li>Strava Fitness</li> <li>GPS API</li>",
"<li> React Leaflet</li><li>React Components for Leaflet</li>",
"<li>Styled In</li> <li>Bootstrap</li>", 
"<li>PassportJS</li><li>Authorization</li>" ]