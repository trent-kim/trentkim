let trentKim;

let listOfTrentKim = [];
let listOfProjects = [];
let listOfNotes = [];
let listOfNearby = [];
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
        } else if (trentKim[i].type == "Nearby") {
            listOfNearby.push(trentKim[i].number);
        // } else if (trentKim[i].type == "About") {
        //     listOfAbout.push(trentKim[i].number);
        };

        // create guide list
        $("#guideContainer").append(`<div id="guide${trentKim[i].number}" class="guideText">
                <div>${trentKim[i].number}.&nbsp;</div>
                <div id="item${trentKim[i].number}">${trentKim[i].name}</div>
            </div>`);
    }; 
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
                        <div class="pageContentContainer">
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

    $(".numButton").addClass("hover");
    $(".num").removeClass("selected");
    $(".numButton").attr("onmouseover", "numHover(this.id)");
    $(".numButton").attr("onmouseout", "numHoverExit()");

    $("#prevNext").empty();

    $(".circle").css("border-color", "#F6F6F6");
    $(".circle").css("background-color", "");
    $(".num").css("color", "#515151");

    $(".guideText").css("font-size", "16px");
    $(".guideText").css("margin", "0px");

    // remove guide list
    $("#guideContainer").empty();
    
    // highlight clicked filter
    $(".nav").css("color", "#515151");
    $(".nav").removeClass("clickedNav");

    $("#" + clickedNavId).css("color", "#3444DE");
    $("#" + clickedNavId).addClass("clickedNav");
    
    // if 'Trent Kim' is selected, then append the full list
    if ("homeTrent" == clickedNavId) {
        for(let i=0; i < trentKim.length; i++) {
            $("#guideContainer").append(`<div id="guide${trentKim[i].number}" class="guideText">
                                            <div>${trentKim[i].number}.&nbsp;</div>
                                            <div id="item${trentKim[i].number}">${trentKim[i].name}</div>
                                        </div>`);
        };
    };

    // filter number buttons
    for(let j=0; j < trentKim.length; j++) {
        let idNum = j + 1;

        // if 'Trent Kim', allow functionality to all number buttons
        if ("homeTrent" == clickedNavId) {
            $("#" + idNum).attr("onclick", "openPage(this.id)");
            $("#" + idNum).removeClass("buttonDisabled");
            $("#" + idNum).addClass("hover");
        } else {
            // if an item equals the selected filter, then append that item to the guide list
            if (trentKim[j].type == clickedNavId) {
                $("#guideContainer").append(`<div id="guide${trentKim[j].number}" class="guideText">
                                                <div>${trentKim[j].number}.&nbsp;</div>
                                                <div id="item${trentKim[j].number}">${trentKim[j].name}</div>
                                            </div>`);
                // allow funcationality to items within the filter
                $("#" + idNum).attr("onclick", "openPage(this.id)");
                $("#" + idNum).removeClass("buttonDisabled");
                $("#" + idNum).addClass("hover");

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
                            <div class="pageContentContainer">
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
    $("#prevNext").append(`<div class="previous hover" onclick="previousPage()">&lt; Previous</div>
                            <div class="next hover" onclick="nextPage()">Next &gt;</div>`);

  
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
    } else if ($(".clickedNav").text() == "Nearby") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfNearby); 
        whichList = listOfNearby;
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
    if ($(".clickedNav").attr("id") == "homeTrent") {
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
    } else if ($(".clickedNav").text() == "Nearby") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfNearby); 
        whichList = listOfNearby;
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
    if ($(".clickedNav").attr("id") == "homeTrent") {
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
    $(".numButton").attr("onclick", "openPage(this.id)");
    
    // remove previous and next buttons
    $("#prevNext").empty();

    // return the corresponding item in list to its normal state
    $(".guideText").css("font-size", "16px");
    $(".guideText").css("margin", "0px");

    // if 'Trent Kim' is selected, then number buttons return to normal state. else, filtered number buttons return to highlighted state
    if ($(".clickedNav").attr("id") == "homeTrent") {
        $(".circle").css("border-color", "#F6F6F6");
        $(".circle").css("background-color", "");
        $(".num").css("color", "#515151");
    } else {
        $("#circle" + exitThisId).css("border-color", "#3444DE");
        $("#circle" + exitThisId).css("background-color", "");
        $("#num" + exitThisId).css("color", "#3444DE");
    }
};



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