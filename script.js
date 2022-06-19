let trentKim;

let listOfTrentKim = [];
let listOfProjects = [];
let listOfNotes = [];
let listOfPlaces = [];
// let listOfAbout = [];

// DATA
$.getJSON("data.json", function(data){
    trentKim = data.trentKim;
    for(let i=0; i < trentKim.length; i++) {
        // append each number button for each item in data
        $("#numContainer").append(`<div id="${i + 1}" class="numButton hover" onclick="openPage(this.id)" onmouseover="numHover(this.id)" onmouseout="numHoverExit()">
                                        <div id="circle${i + 1}" class="circle"></div>
                                        <div id="num${i + 1}" class="num">${i + 1}</div>
                                    </div>`);

        // sort data into corresponding lists
        listOfTrentKim.push(trentKim[i].number);

        if (trentKim[i].type == "Projects") {
            listOfProjects.push(trentKim[i].number);
        } else if (trentKim[i].type == "Notes") {
            listOfNotes.push(trentKim[i].number);
        } else if (trentKim[i].type == "Places") {
            listOfPlaces.push(trentKim[i].number);
        // } else if (trentKim[i].type == "About") {
        //     listOfAbout.push(trentKim[i].number);
        };

        // create guide list
        $("#guide").append(`<div id="guide${trentKim[i].number}" class="guideText">
                <div>${trentKim[i].number}.&nbsp;</div>
                <div class="guideTitle" id="item${trentKim[i].number}">${trentKim[i].name}</div>
            </div>`);
    };
    $("#home").append(`1-${trentKim.length}`);
});


// HOVER FUNCTIONS: NUMBERS
function numHover(hoverNum) {
    let guideTextClasses= document.getElementsByClassName("guideText");

    // highlight corresponding item in list
    for (let i = 0, len = guideTextClasses.length; i < len; ++i) {
        if (guideTextClasses[i].innerHTML.indexOf(hoverNum) != -1){
            $("#guide" + hoverNum).css("font-size", "24px");
            $("#guide" + hoverNum).css("margin", "16px 0px 16px 0px");
        };
    };

    $("#item" + hoverNum).append(`<div class="itemInfo">
                                                <div class="selectedType">${trentKim[hoverNum - 1].type}</div>
                                                <div class="selectedDate">${trentKim[hoverNum - 1].date}</div>
                                            </div>`);

    // show content on hover
    $("#contentContainer").append(`
                        <div class="content">
                            <div class="pageDescription pageContent">${trentKim[hoverNum - 1].description}</div>
                            <div class="pageMedia"></div>
                        </div>`);

    $(".pageMedia").append(`${trentKim[hoverNum - 1].media}`);

    if (trentKim[hoverNum - 1].description == "") {
        $(".pageDescription").removeClass("pageContent");
    } else if (trentKim[hoverNum - 1].description != "") {
        $(".pageDescription").addClass("pageContent");
    };
};

function numHoverExit() {
    $(".guideText").css("font-size", "16px");
    $(".guideText").css("margin", "0px");
    $(".itemInfo").remove();

    // remove content on hover exit
    $("#contentContainer").empty();
};


// NAVIGATION: FILTER CONTENT
function filterGuide(clickedNavId) {

    // remove content and reset state 
    $("#contentContainer").empty();

    // $(".numButton").addClass("hover");
    $(".num").removeClass("selected");
    $(".numButton").removeAttr("onmouseover");
    $(".numButton").removeAttr("onmouseout");
    

    $(".circle").css("border-color", "#F6F6F6");
    $(".circle").css("background-color", "");
    $(".num").css("color", "#515151");

    $(".guideText").css("font-size", "16px");
    $(".guideText").css("margin", "0px");

    // remove guide list
    $("#guide").empty();
    
    // highlight clicked filter
    $(".nav").css("color", "#515151");
    $(".nav").removeClass("clickedNav");

    $("#" + clickedNavId).css("color", "#3444DE");
    $("#" + clickedNavId).addClass("clickedNav");
    
    // if 'Trent Kim' is selected, then append the full list
    if ("home" == clickedNavId) {
        for(let i=0; i < trentKim.length; i++) {
            $("#guide").append(`<div id="guide${trentKim[i].number}" class="guideText">
                                            <div>${trentKim[i].number}.&nbsp;</div>
                                            <div id="item${trentKim[i].number}">${trentKim[i].name}</div>
                                        </div>`);
        };
    };

    // filter number buttons
    for(let j=0; j < trentKim.length; j++) {
        let idNum = j + 1;

        // if 'Trent Kim', allow functionality to all number buttons
        if ("home" == clickedNavId) {
            $("#" + idNum).attr("onclick", "openPage(this.id)");
            $("#" + idNum).removeClass("buttonDisabled");
            $("#" + idNum).addClass("hover");
            $("#" + idNum).attr("onmouseover", "numHover(this.id)");
            $("#" + idNum).attr("onmouseout", "numHoverExit()");
        } else {
            // if an item equals the selected filter, then append that item to the guide list
            if (trentKim[j].type == clickedNavId) {
                $("#guide").append(`<div id="guide${trentKim[j].number}" class="guideText">
                                                <div>${trentKim[j].number}.&nbsp;</div>
                                                <div id="item${trentKim[j].number}">${trentKim[j].name}</div>
                                            </div>`);
                // allow funcationality to items within the filter
                $("#" + idNum).attr("onclick", "openPage(this.id)");
                $("#" + idNum).removeClass("buttonDisabled");
                $("#" + idNum).addClass("hover");
                $("#" + idNum).attr("onmouseover", "numHover(this.id)");
                $("#" + idNum).attr("onmouseout", "numHoverExit()");

                // highlight number buttons within the filter
                $("#circle" + idNum).css("border-color", "#3444DE");
                $("#num" + idNum).css("color", "#3444DE");
            } else {
                // disable items outside of the filter
                $("#" + idNum).removeAttr("onclick");
                $("#" + idNum).removeClass("hover");
                $("#" + idNum).addClass("buttonDisabled");
            };
        };
    };

    previousButton = ""
};


// CONTENT: ON CLICK
let previousButton = "";

function openPage(clickedButtonId) {
    
    if (previousButton != "") {
        exitContent(previousButton);
        $(".itemInfo").remove();

        $("#item" + clickedButtonId).append(`<div class="itemInfo">
                                                <div class="selectedType">${trentKim[clickedButtonId - 1].type}</div>
                                                <div class="selectedDate">${trentKim[clickedButtonId - 1].date}</div>
                                            </div>`);

        // show content on hover
        $("#contentContainer").append(`
                            <div class="content">
                                <div class="pageDescription pageContent">${trentKim[clickedButtonId - 1].description}</div>
                                <div class="pageMedia"></div>
                            </div>`);
        $(".pageMedia").append(`${trentKim[clickedButtonId - 1].media}`);
    }

    // disable number buttons
    $(".numButton").removeAttr("onmouseover");
    $(".numButton").removeAttr("onmouseout");
    // $(".numButton").removeAttr("onclick");
    // $(".numButton").removeClass("hover");

    // enable functionality to only the selected item
    $("#" + clickedButtonId).addClass("hover");
    $("#num" + clickedButtonId).addClass("selected");
    $("#" + clickedButtonId).attr("onclick", "exitContent(this.id)");
    
    // hightlight the selected number button
    $("#circle" + clickedButtonId).css("border-color", "#3444DE");
    $("#circle" + clickedButtonId).css("background-color", "#3444DE");
    $("#num" + clickedButtonId).css("color", "#F6F6F6");

    // highlight corresponding item in list
    $("#guide" + clickedButtonId).css("font-size", "24px");
    $("#guide" + clickedButtonId).css("margin", "16px 0px 16px 0px");

    // append the previous and next buttons
    $(".previous").attr("onclick", "previousPage()");
    $(".previous").removeClass("buttonDisabled");
    $(".previous").addClass("hover");
    $(".next").attr("onclick", "nextPage()");
    $(".next").removeClass("buttonDisabled");
    $(".next").addClass("hover");

  
    if (trentKim[clickedButtonId - 1].description == "") {
        $(".pageDescription").removeClass("pageContent");
    } else if (trentKim[clickedButtonId - 1].description != "") {
        $(".pageDescription").addClass("pageContent");
    };

    previousButton = clickedButtonId;
};

function nextPage() {
    let thisPageNum = $(".selected").text();
    let nextPage;
    let arrayPosition;
    let whichList;

    // determine the filtered list and the position of the selected item within that list 
    if ($(".clickedNav").text() == "Projects") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfProjects); 
        whichList = listOfProjects;       
    } else if ($(".clickedNav").text() == "Notes") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfNotes); 
        whichList = listOfNotes;
    } else if ($(".clickedNav").text() == "Places") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfPlaces); 
        whichList = listOfPlaces;
    // } else if ($(".clickedNav").text() == "About") {
    //     arrayPosition = jQuery.inArray(thisPageNum, listOfAbout); 
    //     whichList = listOfAbout;
    } else {
        arrayPosition = jQuery.inArray(thisPageNum, listOfTrentKim); 
        whichList = listOfTrentKim;
    };

    // if it is the last item in the list, then the next item is the first in the list. else, next item is next in the list
    if (whichList.length - 1 == arrayPosition) {
        nextPage = whichList[0];
    } else {
        nextPage = whichList[arrayPosition + 1];
    };

    // remove content
    $(".pageDescription").empty();
    $(".pageMedia").empty();
    
    // append content for the next item
    $(".pageDescription").append(`${trentKim[nextPage - 1].description}`);
    $(".pageMedia").append(`${trentKim[nextPage - 1].media}`);


    if (trentKim[nextPage - 1].description == "") {
        $(".pageDescription").removeClass("pageContent");
    } else if (trentKim[nextPage - 1].description != "") {
        $(".pageDescription").addClass("pageContent");
    };

    // return the corresponding item in list to its normal state
    $("#guide" + thisPageNum).css("font-size", "16px");
    $("#guide" + thisPageNum).css("margin", "0px");
    $(".itemInfo").remove();
    
    // hightlight next corresponding item in list
    $("#guide" + nextPage).css("font-size", "24px");
    $("#guide" + nextPage).css("margin", "16px 0px 16px 0px");
    $("#item" + nextPage).append(`<div class="itemInfo">
                                            <div class="selectedType">${trentKim[nextPage - 1].type}</div>
                                            <div class="selectedDate">${trentKim[nextPage - 1].date}</div>
                                        </div>`);

    // if 'Trent Kim' is selected, then number buttons are not highlighted. else, number buttons are highlighted when filtered
    if ($(".clickedNav").attr("id") == "home") {
        $("#circle" + thisPageNum).css("border-color", "#F6F6F6");
        $("#circle" + thisPageNum).css("background-color", "");
        $("#num" + thisPageNum).css("color", "#515151");
        
        $("#circle" + nextPage).css("border-color", "#3444DE");
        $("#circle" + nextPage).css("background-color", "#3444DE");
        $("#num" + nextPage).css("color", "#F6F6F6");
    } else {
        $("#circle" + thisPageNum).css("border-color", "#3444DE");
        $("#circle" + thisPageNum).css("background-color", "");
        $("#num" + thisPageNum).css("color", "#3444DE");

        $("#circle" + nextPage).css("border-color", "#3444DE");
        $("#circle" + nextPage).css("background-color", "#3444DE");
        $("#num" + nextPage).css("color", "#F6F6F6");
    };

    // change selected item
    $(".num").removeClass("selected");
    $("#num" + nextPage).addClass("selected");

    $("#" + thisPageNum).removeAttr("onclick");
    $("#" + thisPageNum).attr("onclick", "openPage(this.id)");
    $("#" + nextPage).attr("onclick", "exitContent(this.id)");

    previousButton = nextPage;
};

function previousPage() {
    let thisPageNum = $(".selected").text();
    let prevPage;
    let arrayPosition;
    let whichList;

    // determine the filtered list and the position of the selected item within that list 
    if ($(".clickedNav").text() == "Projects") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfProjects); 
        whichList = listOfProjects;       
    } else if ($(".clickedNav").text() == "Notes") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfNotes); 
        whichList = listOfNotes;
    } else if ($(".clickedNav").text() == "Places") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfPlaces); 
        whichList = listOfPlaces;
    // } else if ($(".clickedNav").text() == "About") {
    //     arrayPosition = jQuery.inArray(thisPageNum, listOfAbout); 
    //     whichList = listOfAbout;
    } else {
        arrayPosition = jQuery.inArray(thisPageNum, listOfTrentKim); 
        whichList = listOfTrentKim;
    };

    // if it is the first item in the list, then the next item is the last in the list. else, previous item is previous in the list
    if (arrayPosition == 0) {
        prevPage = whichList[whichList.length - 1];
    } else {
        prevPage = whichList[arrayPosition - 1];
    };

    // remove content
    $(".pageDescription").empty();
    $(".pageMedia").empty();
    
    // append content for the previous item
    $(".pageDescription").append(`${trentKim[prevPage - 1].description}`);
    $(".pageMedia").append(`${trentKim[prevPage - 1].media}`);

    if (trentKim[prevPage - 1].description == "") {
        $(".pageDescription").removeClass("pageContent");
    } else if (trentKim[prevPage - 1].description != "") {
        $(".pageDescription").addClass("pageContent");
    };

    // return the corresponding item in list to its normal state
    $("#guide" + thisPageNum).css("font-size", "16px");
    $("#guide" + thisPageNum).css("margin", "0px");
    $(".itemInfo").remove();
    
    // hightlight previous corresponding item in list
    $("#guide" + prevPage).css("font-size", "24px");
    $("#guide" + prevPage).css("margin", "16px 0px 16px 0px");
    $("#item" + prevPage).append(`<div class="itemInfo">
                                            <div class="selectedType">${trentKim[prevPage - 1].type}</div>
                                            <div class="selectedDate">${trentKim[prevPage - 1].date}</div>
                                        </div>`);

    // if 'Trent Kim' is selected, then number buttons are not highlighted. else, number buttons are highlighted when filtered
    if ($(".clickedNav").attr("id") == "home") {
        $("#circle" + thisPageNum).css("border-color", "#F6F6F6");
        $("#circle" + thisPageNum).css("background-color", "");
        $("#num" + thisPageNum).css("color", "#515151");
        
        $("#circle" + prevPage).css("border-color", "#3444DE");
        $("#circle" + prevPage).css("background-color", "#3444DE");
        $("#num" + prevPage).css("color", "#F6F6F6");
    } else {
        $("#circle" + thisPageNum).css("border-color", "#3444DE");
        $("#circle" + thisPageNum).css("background-color", "");
        $("#num" + thisPageNum).css("color", "#3444DE");

        $("#circle" + prevPage).css("border-color", "#3444DE");
        $("#circle" + prevPage).css("background-color", "#3444DE");
        $("#num" + prevPage).css("color", "#F6F6F6");
    };

    // change selected item
    $(".num").removeClass("selected");
    $("#num" + prevPage).addClass("selected");

    $("#" + thisPageNum).removeAttr("onclick");
    $("#" + thisPageNum).attr("onclick", "openPage(this.id)");
    $("#" + prevPage).attr("onclick", "exitContent(this.id)");

    previousButton = prevPage;
};

function exitContent(exitThisId) {

    // remove content
    $("#contentContainer").empty();

    // return number button to hover state
    $(".num").removeClass("selected");
    $(".numButton").addClass("hover");
    $(".numButton").attr("onmouseover", "numHover(this.id)");
    $(".numButton").attr("onmouseout", "numHoverExit()");
    
    // return number button to clickable state
    $("#" + exitThisId).removeAttr("onclick");
    $("#" + exitThisId).attr("onclick", "openPage(this.id)");
    $(".numButton").attr("onclick", "openPage(this.id)");
    $(".buttonDisabled").removeAttr("onclick");
    $(".buttonDisabled").removeClass("hover");


    // remove previous and next buttons
    $(".previous").removeAttr("onclick");
    $(".previous").removeClass("hover");
    $(".previous").addClass("buttonDisabled");
    $(".next").removeAttr("onclick");
    $(".next").removeClass("hover");
    $(".next").addClass("buttonDisabled");

    // return the corresponding item in list to its normal state
    $(".guideText").css("font-size", "16px");
    $(".guideText").css("margin", "0px");

    // if 'Trent Kim' is selected, then number buttons return to normal state. else, filtered number buttons return to highlighted state
    if ($(".clickedNav").attr("id") == "home") {
        $(".circle").css("border-color", "#F6F6F6");
        $(".circle").css("background-color", "");
        $(".num").css("color", "#515151");
    } else {
        $("#circle" + exitThisId).css("border-color", "#3444DE");
        $("#circle" + exitThisId).css("background-color", "");
        $("#num" + exitThisId).css("color", "#3444DE");
    };
};


function openAbout() {
    if ($(".aboutButton").hasClass("active")) {
        $(".about").remove();
        $(".aboutButton").removeClass("active");
        $(".aboutButton").css("color", "#515151");
        $(".aboutButtonContainer").css("border-bottom", "none");
        $("#directContainer").css("align-content", "space-between");
    } else {
        $(".aboutButton").addClass("active");
        $(".aboutButton").css("color", "#3444DE");
        $(".aboutButtonContainer").css("border-bottom", "solid");
        $(".aboutContainer").append(`<div class="about">I’m Trent Kim, an interdisciplinary designer and artist who values the ways that we can relate, reflect, and heal through stories.<br><br>
                            Born in Jeonju, South Korea, I was adopted and grew up on a small farm in New Jersey. These days I can be found taking photos, journaling, learning Korean, and fixing the code of this website.<br><br>
                            <a href="mailto:itstrentkiml@gmail.com">Email</a> / <a href="https://www.instagram.com/t.ks.k/">Instagram</a> / <a href="https://docs.google.com/document/d/1lB26zzVJ8Ni4yc9F2wuc2ut7OIViIkqHNGPv3X68hcQ/edit">Resume</a>
                            </div>`);
        $("#directContainer").css("align-content", "start");
    };
}



// REMOVED JSON DATA
// {
//     "number": "17",
//     "name": "Wecair University",
//     "type": "Projects",
//     "date": "2021",
//     "thumbnail": "",
//     "description": "Inspired by the <a href=\"https://www.youtube.com/watch?v=3ByxB-U5yD8&ab_channel=SwankyPsammead\">tonal dissonance</a> and deceptively simple mechanics of games such as <a href=\"https://www.klei.com/games/dont-starve-together\">Don’t Starve Together</a>, <a href=\"https://adarkroom.doublespeakgames.com/\">A Dark Room</a>, and <a href=\"https://candybox2.github.io/\">Candy Box 2</a>, <em>Wecair University</em> is a text-based single-player, role-play game based on the and interactions in order for an art student to survive a rigorous, unforgiving university environment. Beginning within the confines of an email inbox, the student is greeted with an email from the Office of the President welcoming them as a new student. Gaining newfound independence in university is perceived as a time for growth and exploration, but as the game progresses, survival becomes increasingly difficult as the student must confront the exploitative reality of a neo-liberal institution whilst maintaining the health of their mind, body, and wallet. <br><br><em>Wecair University</em> was a project I stopped after the beginnings of a story board and front-end code, as I realized the project was far outside my individual capabilities. If anyone is interested in this idea, I’d love to talk about it and see it be completed and/or adapted.",
//     "media": "<img src=\"assets/projects/wecair-university/2.png\"><img src=\"assets/projects/wecair-university/4.gif\"><img src=\"assets/projects/wecair-university/1.png\"><img src=\"assets/projects/wecair-university/5.gif\"><img src=\"assets/projects/wecair-university/3.png\">"
//   },

// {
//     "number": "1",
//     "name": "College Hill",
//     "type": "Places",
//     "date": "2021",
//     "thumbnail": "",
//     "description": "",
//     "media": "<img src=\"assets/photos/college-hill/1.jpeg\"><img src=\"assets/photos/college-hill/2.jpeg\"><img src=\"assets/photos/college-hill/3.jpeg\"><img src=\"assets/photos/college-hill/4.jpeg\"><img src=\"assets/photos/college-hill/5.jpeg\"><img src=\"assets/photos/college-hill/6.jpeg\"><img src=\"assets/photos/college-hill/7.jpeg\">"
//   },

// {
//     "number": "3",
//     "name": "College Hill",
//     "type": "Places",
//     "date": "2021",
//     "thumbnail": "",
//     "description": "",
//     "media": "<img src=\"assets/photos/college-hill-2/1.jpg\">"
//   },




// var coll = document.getElementsByClassName("collapsible");
// var x;

// for (x = 0; x < coll.length; x++) {
//   coll[x].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var contentColl = this.nextElementSibling;
//     if (contentColl.style.maxHeight){
//       contentColl.style.maxHeight = null;
//       console.log("working");
//     } else {
//       contentColl.style.maxHeight = contentColl.scrollHeight + "px";
//       console.log("working");
//     } 
//   });
// }


// if (trentKim[clickedButtonId - 1].type == "Nearby") {
//         $(".pageBackground").animate({backgroundColor : "#151515"});
//         $(".titleContainer").css("color", "#F6F6F6");
//         $(".pageDescription").css("color", "#F6F6F6");
//         $(".leftArrow").css("border-color", "#F6F6F6");
//         $(".rightArrow").css("border-color", "#F6F6F6");
//         $(".pageExitBlack").addClass("pageExitWhite");
//         $(".pageExitWhite").removeClass("pageExitBlack");
// } else {
//         $(".pageBackground").css("background-color", "#F6F6F6");
//         $(".titleContainer").css("color", "#515151");
//         $(".pageDescription").css("color", "#515151");
//         $(".leftArrow").css("border-color", "#515151");
//         $(".rightArrow").css("border-color", "#515151");
//         $(".pageExitWhite").addClass("pageExitBlack");
//         $(".pageExitBlack").removeClass("pageExitWhite");
// };

// if ($(".clickedNav").text() == "Nearby") {
//     $(".pageBackground").css("background-color", "#151515");
//     $(".titleContainer").css("color", "#F6F6F6");
//     $(".pageDescription").css("color", "#F6F6F6");
//     $(".leftArrow").css("border-color", "#F6F6F6");
//     $(".rightArrow").css("border-color", "#F6F6F6");
//     $(".pageExitBlack").addClass("pageExitWhite");
//     $(".pageExitWhite").removeClass("pageExitBlack");
// };
// if ($(".clickedNav").text() == "") {
//     if (trentKim[pageMinus].type == "Nearby") {
//         $(".pageBackground").animate({backgroundColor : "#151515"});
//         $(".titleContainer").css("color", "#F6F6F6");
//         $(".pageDescription").css("color", "#F6F6F6");
//         $(".leftArrow").css("border-color", "#F6F6F6");
//         $(".rightArrow").css("border-color", "#F6F6F6");
//         $(".pageExitBlack").addClass("pageExitWhite");
//         $(".pageExitWhite").removeClass("pageExitBlack");
//     } else {
//         $(".pageBackground").animate({backgroundColor : "#F6F6F6"});
//         $(".titleContainer").css("color", "#515151");
//         $(".pageDescription").css("color", "#515151");
//         $(".leftArrow").css("border-color", "#515151");
//         $(".rightArrow").css("border-color", "#515151");
//         $(".pageExitWhite").addClass("pageExitBlack");
//         $(".pageExitBlack").removeClass("pageExitWhite");
//     };
// };