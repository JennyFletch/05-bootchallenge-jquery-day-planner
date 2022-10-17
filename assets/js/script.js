$(function() {

    // Set Global Variables
    // var scheduleForTheDay = { hour1: "Do something", hour2: "Do another thing" };
    var scheduleForTheDay = {};

    // Get current date and convert to user-friendly format
    // Display on page as #currentDay 

    var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dateString;

    var dateWeekdayNum = dayjs().day();
    var dateMonthNum = dayjs().month();
    var monthDateNum = dayjs().date();

    // Get an appropriate suffix for the date string
    switch(monthDateNum) {
    case 1:
    case 21:
    case 31:
        dateString = monthDateNum + "st";
        break;
    case 2:
    case 22:
        dateString = monthDateNum + "nd";
        break;
    case 3:
    case 23:
        dateString = monthDateNum + "rd";
        break;
    default:
        dateString = monthDateNum + "th";
    }

    var dateWeekday = weekDays[dateWeekdayNum];
    var dateMonth = monthsOfYear[dateMonthNum];
    
    $('#currentDay').text(dateWeekday + ', ' + dateMonth + ' ' + dateString);

    var currentTime = dayjs().hour(); 
    var amPm = "AM"; // Gets reset when loop reaches noon block
    var timeOffset = 9; // Workday start time - use Military time for past-noon start time

    // Check for previously saved events in localStorage
    var jsonSchedule = JSON.parse(localStorage.getItem('scheduleForTheDay'));

    // Build out the on-page calendar structure with click events
    for (var i=0; i < 9; i++) { // Assuming an 8-hour workday, daylight hours
        
        var blockTime = timeOffset + i; // Hour for the timeblock being created
        var nthNum = i + 1;
        var nthIndex = "#timeblocks .timeblock:nth-child(" + nthNum + ")"; // Dynamic reference to current timeblock div

        if (blockTime === 12) {
            amPm = "PM";
        } else if (blockTime >= 12) {
            amPm = "PM";
            blockTime -= 12; // Convert to non-military hours
        } else { amPm = "AM"; }

        var newBlock = $("<div>");
        newBlock.addClass("row timeblock");
        $("#timeblocks").append(newBlock);
        
        // -- CREATE HOUR COLUMN -------------------------------------------- //
        var newBlockTime = $("<div>");
        newBlockTime.addClass("hour col-2 p-3 text-right");
        var workdayStartTime = blockTime;
        newBlockTime.text(workdayStartTime + amPm); 
        $(nthIndex).append(newBlockTime);

        // -- CREATE EVENT DESCRIPTION COLUMN ------------------------------- //
        var newBlockDescription = $("<textarea>");
        var txtareaID = "txtArea" + i;
        newBlockDescription.attr("id", txtareaID);

        // Check localStorage for an event at this time
        if (jsonSchedule) {
            var jsonVar = "hour" + i;
            if(jsonSchedule[jsonVar]) {
                var storedEvent = jsonSchedule[jsonVar];
                newBlockDescription.val(storedEvent);
                // re-add to localStorage to be sure it persists
                scheduleForTheDay[jsonVar] = storedEvent;
                window.localStorage.setItem("scheduleForTheDay", JSON.stringify(scheduleForTheDay));
            }
        }
    
        newBlockDescription.addClass("description col-9 p-3 text-dark");

        if(currentTime > (timeOffset + i)) {
            newBlockDescription.addClass("past");
        } else if ( currentTime === (timeOffset + i)) {
            newBlockDescription.addClass("present");
        } else { newBlockDescription.addClass("future"); }

        $(nthIndex).append(newBlockDescription);

        // -- CREATE SAVE BUTTON COLUMN ------------------------------------- //
        var newBlockSave = $("<div>");
        newBlockSave.addClass("saveBtn col-1 d-flex justify-content-center");

        newBlockSave.on('click', function() {

            var siblingID = $(this).closest('.timeblock').children('.description').attr("id");
            var currentID = siblingID.charAt(siblingID.length - 1); 
            var rowBlock = "hour" + currentID;
            scheduleForTheDay[rowBlock] = $(this).closest('.timeblock').children('.description').val();
            
            // Save to localStorage
            window.localStorage.setItem("scheduleForTheDay", JSON.stringify(scheduleForTheDay));
        });

        $(nthIndex).append(newBlockSave);

        var newBlockSaveIcon = $("<i>");
        newBlockSaveIcon.addClass("fas fa-save align-self-center");
        newBlockSaveIcon.attr("style", "cursor:pointer");
        var nthIndexWithBtn = nthIndex + " .saveBtn";
        $(nthIndexWithBtn).append(newBlockSaveIcon);

    }

});