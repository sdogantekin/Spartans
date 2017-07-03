/**
 * Created by omerkolkanat on 03/07/2017.
 */

$.ajaxSetup({complete: onRequestCompleted});

function onRequestCompleted(xhr,textStatus) {
    if (xhr.status == 302) {
        location.href = xhr.getResponseHeader("Location");
    }
}

function saveJob() {
    var job = {};

    job.department = [];
    $('#jobDepartment li').each(function()
    {
        if($(this).hasClass('active')){
            job.department.push($(this).text())
        }
    });

    job.type = [];
    $('#jobCategory li').each(function()
    {
        if($(this).hasClass('active')){
            job.type.push($(this).text())
        }
    });

    job.skills = [];
    $('#jobSkills li').each(function()
    {
        if($(this).hasClass('active')){
            job.skills.push($(this).text())
        }
    });

    job.perfection = [];
    $("#jobPerfection #perfection").each(function (index) {
        var $this = $(this);
        job.perfection.push($this.text());
    });

    job.qualification = [];
    $("#jobQualification #qualification").each(function (index) {
        var $this = $(this);
        job.qualification.push($this.text());
    });

    job.location = [];
    $('#jobLocation li').each(function () {
        if($(this).hasClass('active')){
            job.location.push($(this).text());
        }
    });

    var salary = {}

    salary.min = $("#jobSalary #minSalary").val();
    salary.max = $("#jobSalary #maxSalary").val();

    job.salary = salary;

    job.other = [];
    $('#jobOther li').each(function () {
        job.other.push($(this).text())
    });

    $.ajax({
        url: "/position",
        data: JSON.stringify(job),
        type: "post",
        contentType: "application/json",
        success: function (response) {
            if (response.status == "success") {
                alert("job created!");
            } else {
                alert("job creation failed : "+response.message);
            }
        }
    });
}

$(document).ready(function() {

    //Add Department
    $(document).on('keypress', '#inputDepartment', function(e) {
        var id = $("#inputDepartment").val()
        if ( e.keyCode == 13 ) {  // detect the enter key
            $("#jobDepartment").append($("<li id="+id+" class='active' onclick='changeStatus(id)'>").text($("#inputDepartment").val()));
        }

    });

    //Add Job Category
    $(document).on('keypress', '#inputCategory', function(e) {
        var id = $("#inputCategory").val()
        if ( e.keyCode == 13 ) {  // detect the enter key
            $("#jobCategory").append($("<li id="+id+"   class='active' onclick='changeStatus(id)'>").text($("#inputCategory").val()));
        }

    });

    //Add Skill
    $(document).on('keypress', '#inputSkills', function(e) {
        var id = "n" + $("#inputSkills").val()
        if ( e.keyCode == 13 ) {  // detect the enter key
            $("#jobSkills").append($("<li id="+id+"  class='active' onclick='changeStatus(id)'>").text($("#inputSkills").val()));
        }

    });

    //Add Location
    $(document).on('keypress', '#inputLocation', function(e) {
        var id = $("#inputLocation").val()
        if ( e.keyCode == 13 ) {  // detect the enter key
            $("#jobLocation").append($("<li id="+id+"  class='active' onclick='changeStatus(id)'>").text($("#inputLocation").val()));
        }

    });

});

function addPerfection() {
    $("#jobPerfection").append($("<li id=\"perfection\">").text($("#inputPerfection").val()));
}

function addQualification() {
    $("#jobQualification").append($("<li id=\"qualification\">").text($("#inputQualification").val()));
}

function addOther(){
    $("#jobOther").append($("<li id=\"other\" class='active'>").text($("#inputOther").val()));

}

function changeStatus(id){
    if($("#" + id).hasClass('active')){
        $("#" + id).removeClass('active')
    }
    else{
        $("#" + id).attr('class', 'active')
    }
}