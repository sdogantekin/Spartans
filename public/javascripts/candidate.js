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

function addLanguage() {
    $("#resumeLanguage").append($("<li id=\"language\">").text($("#newLanguage").val()));
}