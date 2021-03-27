//HTML component references
var eventContainerEl = $(".container");
var currentDateEl = $("#currentDay");

//Array of events for saving and loading
var events = [];

//Display the current day at the top of the counter.
function displayDate(){
    var today = dayjs().format("dddd, MMMM D, YYYY");
    currentDateEl.text(today);
}

//Display time blocks for standard business hours
function displayEventBlocks(){

    //Create an event block for every hour of standard business hours
    for(var hour = 0; hour < 9; hour++){

        //Create a time object to record the hour
        var workHour = 9 + hour;
        var today = dayjs("01-01-2021").hour(workHour).format("ha");

        //Create an event container to hold time, body, and button section
        eventBlock = $("<div>").addClass("row my-1 time-block");

        //Work hour element
        eventTime = $("<div>").addClass("col-1 hour pt-3").text(today);

        //Event to list 
        eventBody = $("<div>").addClass("col-10 p-0 description");

        //Color code the time blocks: past present or future
        if(dayjs().hour() > workHour){
            eventBody.addClass("past");
        }
        else if(dayjs().hour() < workHour){
            eventBody.addClass("future");
        }
        else{
            eventBody.addClass("present");
        }

        //Give the event body a starting paragraph holder
        eventBody.append($("<p>").addClass("textarea"));

        //Event save button
        eventButton = $("<div>").addClass("col-1 saveBtn d-flex align-items-center justify-content-center");
        eventButton.html("<i class='far fa-save display-6'></i>");

        //Append the blocks to the form
        eventBlock.append([eventTime, eventBody, eventButton]);
        eventContainerEl.append(eventBlock);
    }
}

//Save the events 
function saveEvent(event){
    
}

//Load the events
function loadEvents(){
    for(var i = 0; i < 9; i++){
        events.push("");
    }
}

//Click on a block to change the event and save it
eventContainerEl.on("click", ".description", function(event){
    
    //Get the text in the event currently present
    var startingText = $(this, ".textarea").text().trim();

    //Add a textarea that begins with the starting text
    var textAreaEl = $("<textarea>").addClass("textarea").val(startingText);
    $(this).html(textAreaEl);
    textAreaEl.trigger("focus");
});

eventContainerEl.on("blur", ".description", function(event){
    
    //Get the text from the textarea
    var text = $("textarea").val().trim();

    //Remove the textarea
    $("textarea").remove();

    //Create a paragraph and fill with the saved text
    var pAreaEl = $("<p>").addClass("textarea");
    pAreaEl.text(text);
    $(this).html(pAreaEl);
});

eventContainerEl.on("click", ".saveBtn", function(event){
    var timeBlockEl = $(this).closest(".time-block");
    var eventText = timeBlockEl.find(".textarea").text().trim();
    var eventIndex = timeBlockEl.index();
    console.log(eventText);
    console.log(eventIndex);
});

loadEvents();
displayDate();
displayEventBlocks();
console.log(events);