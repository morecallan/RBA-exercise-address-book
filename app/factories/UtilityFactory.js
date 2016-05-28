app.factory("utilityFactory", function(){

    var adjustTimeForDisplay = function(date){
        var month = date.getMonth();
        month++;
        month = month.toString();
        if (month.length < 2) {
            month = "0" + month;
        } else {
            month = month;
        }
        var day = date.getDate();
        day = day.toString();
        if (day.length < 2) {
            day = "0" + day;
        } else {
            day = day;
        }
        var year = date.getFullYear();
        var dateString = year + "-" + month + "-" + day;
        return dateString;
    };
      
    var adjustTimeForFillIn = function(date){
       dateArray = date.split("-");
       var month = parseInt(dateArray[1]);
       month --;
       month = month.toString();
       var fillInDate = new Date(dateArray[0], month, dateArray[2]);
       return fillInDate;
    };


    return {adjustTimeForDisplay:adjustTimeForDisplay, adjustTimeForFillIn: adjustTimeForFillIn};
});