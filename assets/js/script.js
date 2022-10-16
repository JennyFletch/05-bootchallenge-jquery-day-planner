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

    // Create timeblock structure dynamically 
    // .hour - Set time for each - 9 hours (9-5pm)
    // .description - Create onclick function for user to add/change text 
    //              - Check current time and add .past, .present or .future accordingly
    // .saveBtn - Create onclick event to save new description to localStorage (function call)



    // <div class="row timeblock">
    // <div class="hour col-2 p-3 text-right">9AM</div>
    // <div class="description col-9 present text-dark"> 
    //  Current Hour
    // </div>
    // <div class="saveBtn col-1 d-flex justify-content-center"><i class="fas fa-save align-self-center"></i></div>
    // </div>

    var newBlock = $("<div>");
    newBlock.addClass("row timeblock");
    $("#timeblocks").append(newBlock);
    
    // Create Hour Column
    var newBlockTime = $("<div>");
    newBlockTime.addClass("hour col-2 p-3 text-right");
    newBlockTime.text("9AM"); // Make dynamic in loop!
    $(".timeblock").append(newBlockTime);

    // Create Event Description Column
    var newBlockDescription = $("<div>");
    newBlockDescription.addClass("description col-9 p-3 present text-dark");
    newBlockDescription.text("FPO");
    $(".timeblock").append(newBlockDescription);

    // Create Save Button Column
    var newBlockSave = $("<div>");
    newBlockSave.addClass("saveBtn col-1 d-flex justify-content-center");
    $(".timeblock").append(newBlockSave);

    var newBlockSaveIcon = $("<i>");
    newBlockSaveIcon.addClass("fas fa-save align-self-center");
    $(".saveBtn").append(newBlockSaveIcon);

});