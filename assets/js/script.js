//HTML component references
var eventContainerEl = $(".container");
var currentDateEl = $("#currentDay");

//Array of events for saving and loading
var events = [];

//Variable used to determine if we can reload the app if the user is outside of editing
var bEventOpen = false;

//Display the current day at the top of the counter.
function displayDate(){
    var today = dayjs().format("dddd, MMMM D, YYYY");
    currentDateEl.text(today);
}

//Display time blocks for standard business hours
function displayEventBlocks(){

    //reset the event container
    eventContainerEl.text("");

    //Create an event block for every hour of standard business hours
    for(var hour = 0; hour < 9; hour++){

        //Create a time object to record the hour
        var workHour = 9 + hour;
        var today = dayjs("01-01-2021").hour(workHour).format("ha");

        //Create an event container to hold time, body, and button section
        eventBlock = $("<div>").addClass("row time-block");

        //Work hour element
        eventTime = $("<div>").addClass("col-1 hour pt-3").text(today);

        //Event description
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
        eventBody.append($("<p>").addClass("textarea").text(events[hour]));

        
        //Event save button
        eventButton = $("<div>").addClass("col-1 saveBtn d-flex align-items-center justify-content-center");
        eventButton.html("<i class='far fa-save display-6'></i>");

        //Append the blocks to the form
        eventBlock.append([eventTime, eventBody, eventButton]);
        eventContainerEl.append(eventBlock);
    }
}

//Save the events 
function saveEvent(text, index){
    events[index] = text;
    localStorage.setItem("events", JSON.stringify(events));
}

//Load the events
function loadEvents(){

    var storedEvents = JSON.parse(localStorage.getItem("events"));
    
    //if there are saved events then we store them back in our events array
    for(var i = 0; i < 9; i++){
        if(!storedEvents){
            events.push("");
        }
        else{
            events[i] = storedEvents[i]; 
        }
    }
}

//Main function to load the app and run it's features
function runApplication(){
    loadEvents();
    displayDate();
    displayEventBlocks();
}

//Click on a block to change the event and save it
eventContainerEl.on("click", ".description", function(event){
    
    //Get the text in the event currently present
    var startingText = $(this, ".textarea").text().trim();

    //Add a textarea that begins with the starting text
    var textAreaEl = $("<textarea>").addClass("textarea").val(startingText);
    $(this).html(textAreaEl);
    textAreaEl.trigger("focus");

    //Sets event open to true so we know if we can reload the app every min
    bEventOpen = true;
});

//Execute when clicking outside of an event description
eventContainerEl.on("blur", ".description", function(event){
    
    //Get the text from the textarea
    var text = $("textarea").val().trim();

    //Remove the textarea
    $("textarea").remove();

    //Create a paragraph and fill with the saved text
    var pAreaEl = $("<p>").addClass("textarea");
    pAreaEl.text(text);
    $(this).html(pAreaEl);

    //Sets event open to true so we know if we can reload the app every min
    bEventOpen = false;
});

//Execute when the save button is clicked
eventContainerEl.on("click", ".saveBtn", function(event){

    //Traverse to the parent time-block
    var timeBlockEl = $(this).closest(".time-block");

    //Get the event blocks text and index then save them
    var eventText = timeBlockEl.find(".textarea").text().trim();
    var eventIndex = timeBlockEl.index();
    saveEvent(eventText, eventIndex);
});

//Start the application on website open
runApplication();

//Reload the blocks every 1 min if there isnt an open event
setInterval(function(){
    if(!bEventOpen){
        displayEventBlocks();
    }
}, 1000 * 60);
