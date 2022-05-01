let trentKim;

let listOfTrentKim = [];
let listOfProjects = [];
let listOfNotes = [];
let listOfPlaces = [];
let listOfAbout = [];

$.getJSON("data.json", function(data){
    trentKim = data.trentKim;
    for(let i=0; i < trentKim.length; i++) {
        $("#numContainer").append(`<div id="${i + 1}" class="numButton hover" onclick="openPage(this.id)" onmouseover="matchGuide(this.id)" onmouseout="unmatchGuide()">
                                        <div id="circle${i + 1}" class="circle"></div>
                                        <div id="num${i + 1}" class="num">${i + 1}</div>
                                    </div>`);

        if (trentKim[i].type == "Projects") {
            listOfProjects.push(trentKim[i].number);
        } else if (trentKim[i].type == "Notes") {
            listOfNotes.push(trentKim[i].number);
        } else if (trentKim[i].type == "Places") {
            listOfPlaces.push(trentKim[i].number);
        } else if (trentKim[i].type == "About") {
            listOfAbout.push(trentKim[i].number);
        };

        listOfTrentKim.push(trentKim[i].number);
    }; 
    $("#guideContainer").append(`<div class="guideText"><em>1-${trentKim.length}. Browse in any direction or pattern, or use the filters to the left</em></div>`);
});

function matchGuide(hoverNum) {
    let guideTextClasses= document.getElementsByClassName("guideText");
    for (var l = 0, len = guideTextClasses.length; l < len; ++l) {
        if (guideTextClasses[l].innerHTML.indexOf(hoverNum) !== -1){
            $("#guide" + hoverNum).css("font-size", "30px");
            // $("#guide" + hoverNum).css("color", "blue");
        };
    };  
};

function unmatchGuide() {
    $(".guideText").css("font-size", "16px");
    // $(".guideText").css("color", "black");
}

function showGuide(clickedNavId) {
    console.log(clickedNavId);

    $("#guideContainer").empty();
    $(".nav").css("color", "black");
    $("#" + clickedNavId).css("color", "blue");
    $(".nav").removeClass("clickedNav");
    // $("#" + idNum).removeClass("buttonDisabled");
    // $("#" + idNum).addClass("hover");
    
    $(".circle").css("border-color", "white");
    $(".num").css("color", "black");
    // $(".circle").removeClass("hasCircle");
    // $(".circle").addClass("placeholder");
    $("#" + clickedNavId).addClass("clickedNav");
    
    if ("homeTrent" == clickedNavId) {
    $("#guideContainer").append(`<div class="guideText"><em>1-${trentKim.length}. Browse in any direction or pattern, or use the filters to the left</em></div>`);
    };

    for(let j=0; j < trentKim.length; j++) {
        let idNum = j + 1;
        if ("homeTrent" == clickedNavId) {
            $("#" + idNum).attr("onclick", "openPage(this.id)");
            $("#" + idNum).removeClass("buttonDisabled");
            $("#" + idNum).addClass("hover");
        } else {
            if (trentKim[j].type == clickedNavId) {
                $("#guideContainer").append(`<div id="guide${trentKim[j].number}" class="guideText">
                                                ${trentKim[j].number}. ${trentKim[j].name}
                                            </div>`);
                // $("#" + idNum).removeClass("placeholder");
                // $("#" + idNum).addClass("hasCircle");
                $("#" + idNum).attr("onclick", "openPage(this.id)");
                $("#" + idNum).removeClass("buttonDisabled");
                $("#" + idNum).addClass("hover");

                $("#circle" + idNum).css("border-color", "blue");
                $("#num" + idNum).css("color", "blue");
            } else {
                $("#" + idNum).removeAttr("onclick");
                $("#" + idNum).removeClass("hover");
                $("#" + idNum).addClass("buttonDisabled");
            };
        };
        
    };
};

let isPlaces = false;

function openPage(clickedButtonId) {

    $("body").append(`<div class="pageBackground"></div>
                    <div class="pageContainer">
                        <div class="pageExitBlack hover" onclick="exitPage()"></div>
                        <div class="pageNavButton">
                            <div class="pageArrow leftArrow hover" onclick="previousPage()"></div>
                        </div>
                        <div class="pageContentContainer">
                            <div class="pageType">${trentKim[clickedButtonId - 1].type}</div>
                            <div class="titleContainer">
                                <div class="pageNum">${trentKim[clickedButtonId - 1].number}</div>
                                <div class="pageTitle">. ${trentKim[clickedButtonId - 1].name}</div>
                            </div>
                            <div class="pageDescription pageContent">${trentKim[clickedButtonId - 1].description}</div>
                            <div class="pageMedia"></div>
                        </div>
                        <div class="pageNavButton">
                            <div class="pageArrow rightArrow hover" onclick="nextPage()"></div>
                        </div>   
                    </div>`);
    $(".numButton").removeClass("hover");
    $(".pageMedia").append(`${trentKim[clickedButtonId - 1].media}`);
    // $(".page").append(`<div class="titleContainer">
    //                         <div class="pageNum>${clickedButtonId}</div>
    //                 </div>`)

    if (trentKim[clickedButtonId - 1].type == "Places") {
            $(".pageBackground").animate({backgroundColor : "black"});
            $(".titleContainer").css("color", "white");
            $(".pageDescription").css("color", "white");
            $(".leftArrow").css("border-color", "white");
            $(".rightArrow").css("border-color", "white");
            $(".pageExitBlack").addClass("pageExitWhite");
            $(".pageExitWhite").removeClass("pageExitBlack");
    } else {
            $(".pageBackground").css("background-color", "white");
            $(".titleContainer").css("color", "black");
            $(".pageDescription").css("color", "black");
            $(".leftArrow").css("border-color", "black");
            $(".rightArrow").css("border-color", "black");
            $(".pageExitWhite").addClass("pageExitBlack");
            $(".pageExitBlack").removeClass("pageExitWhite");
    };
  
    if (trentKim[clickedButtonId - 1].description == "") {
        $(".pageDescription").removeClass("pageContent");
    } else if (trentKim[clickedButtonId - 1].description != "") {
        $(".pageDescription").addClass("pageContent");
    };

    // && $(".pageDescription").hasClass("pageContent")
};

function nextPage() {
    let pageNum = $(".pageNum").text()
    let thisPageNum = pageNum.toString();
    let nextPage;
    let arrayPosition;
    let whichList;
    console.log(thisPageNum);

    if ($(".clickedNav").text() == "Projects") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfProjects); 
        whichList = listOfProjects;       
    } else if ($(".clickedNav").text() == "Notes") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfNotes); 
        whichList = listOfNotes;
    } else if ($(".clickedNav").text() == "Places") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfPlaces); 
        whichList = listOfPlaces;
    } else if ($(".clickedNav").text() == "About") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfAbout); 
        whichList = listOfAbout;
    } else {
        arrayPosition = jQuery.inArray(thisPageNum, listOfTrentKim); 
        whichList = listOfTrentKim;
    };

    if (whichList.length - 1 == arrayPosition) {
        nextPage = whichList[0];
    } else {
        nextPage = whichList[arrayPosition + 1];
        console.log(nextPage);
    };

    $(".pageNum").empty();
    $(".pageTitle").empty();
    $(".pageDescription").empty();
    $(".pageType").empty();
    $(".pageMedia").empty();
    $(".pageNum").append(`${trentKim[nextPage - 1].number}`);
    $(".pageTitle").append(`. ${trentKim[nextPage - 1].name}`);
    $(".pageDescription").append(`${trentKim[nextPage - 1].description}`);
    $(".pageType").append(`${trentKim[nextPage - 1].type}`);
    $(".pageMedia").append(`${trentKim[nextPage - 1].media}`);

    if (trentKim[nextPage - 1].description == "") {
        $(".pageDescription").removeClass("pageContent");
    } else if (trentKim[nextPage - 1].description != "") {
        $(".pageDescription").addClass("pageContent");
    };

    if ($(".clickedNav").text() == "Places") {
        $(".pageBackground").css("background-color", "black");
        $(".titleContainer").css("color", "white");
        $(".pageDescription").css("color", "white");
        $(".leftArrow").css("border-color", "white");
        $(".rightArrow").css("border-color", "white");
        $(".pageExitBlack").addClass("pageExitWhite");
        $(".pageExitWhite").removeClass("pageExitBlack");
    };
    if ($(".clickedNav").text() == "") {
        if (trentKim[pageNum].type == "Places") {
            $(".pageBackground").animate({backgroundColor : "black"});
            $(".titleContainer").css("color", "white");
            $(".pageDescription").css("color", "white");
            $(".leftArrow").css("border-color", "white");
            $(".rightArrow").css("border-color", "white");
            $(".pageExitBlack").addClass("pageExitWhite");
            $(".pageExitWhite").removeClass("pageExitBlack");
        } else {
            $(".pageBackground").animate({backgroundColor : "white"});
            $(".titleContainer").css("color", "black");
            $(".pageDescription").css("color", "black");
            $(".leftArrow").css("border-color", "black");
            $(".rightArrow").css("border-color", "black");
            $(".pageExitWhite").addClass("pageExitBlack");
            $(".pageExitBlack").removeClass("pageExitWhite");
        };
    };
};

function previousPage() {
    let pageNum = $(".pageNum").text();
    let thisPageNum = pageNum.toString();
    let pageMinus = pageNum - 2;
    let nextPage;
    let arrayPosition;
    let whichList;
    // console.log(pageNum);

    if ($(".clickedNav").text() == "Projects") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfProjects); 
        whichList = listOfProjects;       
    } else if ($(".clickedNav").text() == "Notes") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfNotes); 
        whichList = listOfNotes;
    } else if ($(".clickedNav").text() == "Places") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfPlaces); 
        whichList = listOfPlaces;
    } else if ($(".clickedNav").text() == "About") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfAbout); 
        whichList = listOfAbout;
    } else {
        arrayPosition = jQuery.inArray(thisPageNum, listOfTrentKim); 
        whichList = listOfTrentKim;
    };

    if (arrayPosition == 0) {
        nextPage = whichList[whichList.length - 1];
    } else {
        nextPage = whichList[arrayPosition - 1];
        // console.log(nextPage);
    };

    $(".pageNum").empty();
    $(".pageTitle").empty();
    $(".pageDescription").empty();
    $(".pageType").empty();
    $(".pageMedia").empty();
    $(".pageNum").append(`${trentKim[nextPage - 1].number}`);
    $(".pageTitle").append(`. ${trentKim[nextPage - 1].name}`);
    $(".pageDescription").append(`${trentKim[nextPage - 1].description}`);
    $(".pageType").append(`${trentKim[nextPage - 1].type}`);
    $(".pageMedia").append(`${trentKim[nextPage - 1].media}`);

    if (trentKim[nextPage - 1].description == "") {
        $(".pageDescription").removeClass("pageContent");
    } else if (trentKim[nextPage - 1].description != "") {
        $(".pageDescription").addClass("pageContent");
    };

    if (trentKim[nextPage - 1].description == "") {
        $(".pageDescription").removeClass("pageContent");
    } else if (trentKim[nextPage - 1].description != "") {
        $(".pageDescription").addClass("pageContent");
    };

    if ($(".clickedNav").text() == "Places") {
        $(".pageBackground").css("background-color", "black");
        $(".titleContainer").css("color", "white");
        $(".pageDescription").css("color", "white");
        $(".leftArrow").css("border-color", "white");
        $(".rightArrow").css("border-color", "white");
        $(".pageExitBlack").addClass("pageExitWhite");
        $(".pageExitWhite").removeClass("pageExitBlack");
    };
    if ($(".clickedNav").text() == "") {
        if (trentKim[pageMinus].type == "Places") {
            console.log("itsame: " + pageMinus)
            $(".pageBackground").animate({backgroundColor : "black"});
            $(".titleContainer").css("color", "white");
            $(".pageDescription").css("color", "white");
            $(".leftArrow").css("border-color", "white");
            $(".rightArrow").css("border-color", "white");
            $(".pageExitBlack").addClass("pageExitWhite");
            $(".pageExitWhite").removeClass("pageExitBlack");
        } else {
            $(".pageBackground").animate({backgroundColor : "white"});
            $(".titleContainer").css("color", "black");
            $(".pageDescription").css("color", "black");
            $(".leftArrow").css("border-color", "black");
            $(".rightArrow").css("border-color", "black");
            $(".pageExitWhite").addClass("pageExitBlack");
            $(".pageExitBlack").removeClass("pageExitWhite");
        };
    };
    
};

function exitPage() {
    $(".pageContainer").remove();
    $(".pageBackground").remove();
    $(".numButton").addClass("hover");
};



      // {
      //   "number": "24",
      //   "name": "Blackstone Park",
      //   "type": "Places",
      //   "description": "",
      //   "media": "<img src=\"assets/photos/22-2-14/1.jpg\"><img src=\"assets/photos/22-2-14/2.jpg\"><img src=\"assets/photos/22-2-14/3.jpg\"><img src=\"assets/photos/22-2-14/4.jpg\"><img src=\"assets/photos/22-2-14/5.jpg\">"
      // },