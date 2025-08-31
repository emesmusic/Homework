'use strict';


const dayOfWeek = (function () {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];

    return {
        getDayName: function (dayIndex) {
            return days[dayIndex - 1];
        },

        getDayNumber: function (dayName) {
            return days.findIndex(day => day.toLowerCase() === dayName.toLowerCase()) + 1;
        }

    };

})();



const interestCalculator = (function () {
    let rate = 0;
    let years = 1;

    return {

        setRate: function (newRate) {
            if (!isNaN(newRate)) {
                rate = newRate / 100;
            }
            else {
                console.log('Rate must be a number');
            }
        },
        setYears: function (newYears) {
            if (Number.isInteger(newYears) && newYears > 0) {
                years = newYears;
            }
            else {
                console.log('Years must be a positive amount of years');

            }
        },

        calculateInterest: function (principal) {
            return (principal * rate) * years;

        }


    };



}());