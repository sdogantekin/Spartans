/**
 * Created by serkand on 20/05/2017.
 */
$.ajaxSetup({complete: onRequestCompleted});

function onRequestCompleted(xhr,textStatus) {
    if (xhr.status == 302) {
        location.href = xhr.getResponseHeader("Location");
    }
}

function saveResume() {
    var resume = {};
    resume.name     = $("#resumeBasics #name").val();
    resume.surname  = $("#resumeBasics #surname").val();
    resume.email    = $("#resumeBasics #email").val();
    resume.phone    = $("#resumeBasics #phone").val();
    resume.language = [];
    $("#resumeLanguage #language").each(function (index) {
        var $this = $(this);
        resume.language.push($this.text());
    });

    $.ajax({
        url: "/resume",
        data: JSON.stringify(resume),
        type: "post",
        contentType: "application/json",
        success: function (response) {
            if (response.status == "success") {
                alert("resume created!");
            } else {
                alert("resume creation failed : "+response.message);
            }
        }
    });
}

$(document).ready(function() {

    //Add Expert
    $(document).on('keypress', '#inputExpert', function(e) {

        if ( e.keyCode == 13 ) {  // detect the enter key
            $("#resumeExpert").append($("<li id=\"expert\" class='active'>").text($("#inputExpert").val()));
        }

    });

    //Add Skill
    $(document).on('keypress', '#inputSkill', function(e) {

        if ( e.keyCode == 13 ) {  // detect the enter key
            $("#resumeSkill").append($("<li id=\"skill\" class='active'>").text($("#inputSkill").val()));
        }

    });

    //Add Location
    $(document).on('keypress', '#inputLocation', function(e) {

        if ( e.keyCode == 13 ) {  // detect the enter key
            $("#resumeLocation").append($("<li id=\"location\" class='active'>").text($("#inputLocation").val()));
        }

    });

    //Add Prefer Location
    $(document).on('keypress', '#inputPreferLocation', function(e) {

        if ( e.keyCode == 13 ) {  // detect the enter key
            $("#resumePreferLocation").append($("<li id=\"preferLocation\" class='active'>").text($("#inputPreferLocation").val()));
        }

    });

});

function addLanguage() {
    $("#resumeLanguage").append($("<li id=\"language\">").text($("#newLanguage").val()));
}

function addOther(){
    $("#resumeOther").append($("<li id=\"other\" class='active'>").text($("#inputOther").val()));

}

