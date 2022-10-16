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


});