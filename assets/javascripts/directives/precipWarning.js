app.directive('precipWarning', function(){
    return {
        restrict: "E",
        replace: true,
        link: function(scope, element, attr, ctrl) {

            var obj = JSON.parse(attr.ngDataObj);
            var amt = obj[attr.ngDataType];
            var time_of_day = '.';
            
            var day = obj[attr.ngDataType + '_day'],
                night = obj[attr.ngDataType + '_night'];
           
            if (day === 0 && night === 0) time_of_day = '.';
                else if (day !== 0 && night === 0) time_of_day = ' during the day.';
                else if (night !== 0 && day === 0) time_of_day = ' during the night.';
                else if (day > (amt * 0.8) && night !== 0) time_of_day = ' mostly during the day.';
                else if (night > (amt * 0.8) && day !== 0) time_of_day = ' mostly during the night.';
                else time_of_day = ' throughout the day.';
            
            if (amt > 0 && amt <= 0.1) {
                var msg = attr.ngDataType == 'rain' ? 'Drizzle' : 'Dusting of snow';
            } else if (amt > 0.1 && amt <= 0.3) {
                var msg = attr.ngDataType == 'rain' ? 'Light accumulation' : 'Light accumulation';
            } else if (amt > 0.3 && amt <= 1.0) {
                var msg = attr.ngDataType == 'rain' ? 'Moderate accumulation' : 'Light accumulation';
            } else if (amt > 1.0 && amt <= 2.0) {
                var msg = attr.ngDataType == 'rain' ? 'Moderate to Heavy accumulation' : 'Light accumulation';
            } else if (amt > 2.0 && amt <= 4.0) {
                var msg = attr.ngDataType == 'rain' ? 'Heavy accumulation' : 'Light to Moderate accumulation';
            } else if (amt > 4.0 && amt <= 6.0) {
                var msg = attr.ngDataType == 'rain' ? 'Extremely heavy accumulation' : 'Moderate accumulation';
            } else if (amt > 6.0 && amt <= 12.0) {
                var msg = attr.ngDataType == 'rain' ? 'End of Days' : 'Moderate to Heavy accumulation';
            } else if (amt > 12.0 && amt <= 36.0) {
                var msg = attr.ngDataType == 'rain' ? 'End of Days' : 'Extremly Heavy accumulation';
            } else if (amt > 36.0 && amt <= 1000.0) {
                var msg = attr.ngDataType == 'rain' ? 'End of Days' : 'End of Days';
            }
            
            element.prepend('<div>' + msg + time_of_day + '</div>');
        }
    }
})