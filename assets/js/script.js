$(function() {

    // Get current date and convert to user-friendly format
    // Display on page as #currentDay 

    var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dateString;

    var dateWeekdayNum = dayjs().day();
    var dateMonthNum = dayjs().month();
    var monthDateNum = dayjs().date();

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
        
        // Create Hour Column
        var newBlockTime = $("<div>");
        newBlockTime.addClass("hour col-2 p-3 text-right");
        var workdayStartTime = blockTime;
        newBlockTime.text(workdayStartTime + amPm); 
        $(nthIndex).append(newBlockTime);

        // Create Event Description Column
        var newBlockDescription = $("<div>");
        newBlockDescription.addClass("description col-9 p-3 text-dark");

        currentTime = 14; // FOR TESTING ONLY! - overwrite of Day.js object

        if(currentTime > (timeOffset + i)) {
            newBlockDescription.addClass("past");
        } else if ( currentTime === (timeOffset + i)) {
            newBlockDescription.addClass("present");
        } else { newBlockDescription.addClass("future"); }

        newBlockDescription.text("FPO");
        $(nthIndex).append(newBlockDescription);

        // Create Save Button Column
        var newBlockSave = $("<div>");
        newBlockSave.addClass("saveBtn col-1 d-flex justify-content-center");
        $(nthIndex).append(newBlockSave);

        var newBlockSaveIcon = $("<i>");
        newBlockSaveIcon.addClass("fas fa-save align-self-center");
        newBlockSaveIcon.attr("style", "cursor:pointer");
        var nthIndexWithBtn = nthIndex + " .saveBtn";
        $(nthIndexWithBtn).append(newBlockSaveIcon);

    }

});

$(".timeblock").on( "click", function() {
    // console.log( $( this ).text() );

    // if this == .description : allow user to change text
    if( $( this ).hasClass("description"))  { console.log("clicked: description"); }

    // if this == .saveBtn : save current line to localStorage
    if( $( this ).hasClass("saveBtn"))  { console.log("clicked: saveBtn"); }

  });