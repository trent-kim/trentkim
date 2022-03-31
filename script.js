let trentKim;

let listOfTrentKim = [];
let listOfProjects = [];
let listOfWriting = [];
let listOfPhotos = [];
let listOfAbout = [];
let listOfContact = [];

$.getJSON("data.json", function(data){
    trentKim = data.trentKim;
    for(let i=0; i < trentKim.length; i++) {
        $("#numContainer").append(`<div id="${i + 1}" class="numButton hover" onclick="openPage(this.id)">
                                         <div id="circle${i + 1}" class="circle"></div>
                                         <div id="num${i + 1}" class="num">${i + 1}</div>
                                    </div>`);

        if (trentKim[i].type == "Projects") {
            listOfProjects.push(trentKim[i].number);
        } else if (trentKim[i].type == "Writing") {
            listOfWriting.push(trentKim[i].number);
        } else if (trentKim[i].type == "Photos") {
            listOfPhotos.push(trentKim[i].number);
        } else if (trentKim[i].type == "About") {
            listOfAbout.push(trentKim[i].number);
        } else {
            listOfContact.push(trentKim[i].number);
        };

        listOfTrentKim.push(trentKim[i].number);
    }; 
});

function showGuide(clickedNavId) {
    console.log(clickedNavId);

    $("#guideContainer").empty();
    $(".nav").css("color", "black");
    $("#" + clickedNavId).css("color", "blue");
    $(".nav").removeClass("clickedNav");
    
    $(".circle").css("border-color", "black");
    $(".num").css("color", "black");
    $("#" + clickedNavId).addClass("clickedNav");

    for(let j=0; j < trentKim.length; j++) {
        let idNum = j + 1;
        if (trentKim[j].type == clickedNavId) {
            $("#guideContainer").append(`<div class="guideText">
                                            ${trentKim[j].number}. ${trentKim[j].name}
                                        </div>`);
            $("#circle" + idNum).css("border-color", "blue");
            $("#num" + idNum).css("color", "blue");
        };
    };
};

function openPage(clickedButtonId) {
    $("#mainContainer").prepend(`<div class="pageContainer">
                                    <div class="page">
                                        <div class="pageExit hover" onclick="exitPage()">X</div>
                                        <div class="pageContentContainer">
                                            <div class="titleContainer pageContent">
                                                <div class="pageNum">${trentKim[clickedButtonId - 1].number}</div>
                                                <div class="pageTitle">${trentKim[clickedButtonId - 1].name}</div>
                                            </div>
                                            <div class="pageDescription pageContent">${trentKim[clickedButtonId - 1].description}</div>
                                        </div>
                                    </div>
                                    <div class="pageNav">
                                        <div class="pageNavButton hover" onclick="previousPage()">
                                            <div class="circle pageNavCircle"></div>
                                            <div class="leftTri triangle"></div>
                                        </div>
                                        <div class="pageType">${trentKim[clickedButtonId - 1].type}</div>
                                        <div class="pageNavButton hover" onclick="nextPage()">
                                            <div class="circle pageNavCircle"></div>
                                            <div class="rightTri triangle"></div>
                                        </div>
                                    </div>
                                </div>`);
    $(".numButton").removeClass("hover");

    $(".page").append(`<div class="titleContainer">
                            <div class="pageNum>${clickedButtonId}</div>
                    </div>`)
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
    } else if ($(".clickedNav").text() == "Writing") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfWriting); 
        whichList = listOfWriting;
    } else if ($(".clickedNav").text() == "Photos") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfPhotos); 
        whichList = listOfPhotos;
    } else if ($(".clickedNav").text() == "About") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfAbout); 
        whichList = listOfAbout;
    } else if ($(".clickedNav").text() == "Contact") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfContact); 
        whichList = listOfContact;
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
    $(".pageNum").append(`${trentKim[nextPage - 1].number}`);
    $(".pageTitle").append(`${trentKim[nextPage - 1].name}`);
    $(".pageDescription").append(`${trentKim[nextPage - 1].description}`);
    $(".pageType").append(`${trentKim[nextPage - 1].type}`);
};

function previousPage() {
    let pageNum = $(".pageNum").text()
    let thisPageNum = pageNum.toString();
    let nextPage;
    let arrayPosition;
    let whichList;
    console.log(thisPageNum);

    if ($(".clickedNav").text() == "Projects") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfProjects); 
        whichList = listOfProjects;       
    } else if ($(".clickedNav").text() == "Writing") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfWriting); 
        whichList = listOfWriting;
    } else if ($(".clickedNav").text() == "Photos") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfPhotos); 
        whichList = listOfPhotos;
    } else if ($(".clickedNav").text() == "About") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfAbout); 
        whichList = listOfAbout;
    } else if ($(".clickedNav").text() == "Contact") {
        arrayPosition = jQuery.inArray(thisPageNum, listOfContact); 
        whichList = listOfContact;
    } else {
        arrayPosition = jQuery.inArray(thisPageNum, listOfTrentKim); 
        whichList = listOfTrentKim;
    };

    if (arrayPosition == 0) {
        nextPage = whichList[whichList.length - 1];
    } else {
        nextPage = whichList[arrayPosition - 1];
        console.log(nextPage);
    };

    $(".pageNum").empty();
    $(".pageTitle").empty();
    $(".pageDescription").empty();
    $(".pageType").empty();
    $(".pageNum").append(`${trentKim[nextPage - 1].number}`);
    $(".pageTitle").append(`${trentKim[nextPage - 1].name}`);
    $(".pageDescription").append(`${trentKim[nextPage - 1].description}`);
    $(".pageType").append(`${trentKim[nextPage - 1].type}`);
};

function exitPage() {
    $(".pageContainer").remove();
    $(".numButton").addClass("hover");
};
