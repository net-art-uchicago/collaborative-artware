/* global */
function removeNotepad(){
    const notepad = document.getElementsByClassName("notepad")[0];
    notepad.remove();
    console.log("should have closed notepad");
}

function removeMyBrushes(){
    var myBrushes = document.getElementsByClassName("my-brushes-app")[0];
    myBrushes.style.display = "none";
    var starterBrushIcon = document.getElementsByClassName("starter-app-icon")[0];
    starterBrushIcon.style.display = "none";
    console.log("should have closed my brushes app");
}

function showMyBrushes(){
    var brushApp = document.getElementsByClassName("my-brushes-app")[0];
    brushApp.style.display = "block";
    var starterBrushIcon = document.getElementsByClassName("starter-app-icon")[0];
    starterBrushIcon.style.display = "block";
}

function showLogOff(){
    var logOff = document.getElementsByClassName("log-off")[0];
    if (logOff.style.display == "none") {
        logOff.style.display = "block";
    } else {
        logOff.style.display = "none";
    }
}
