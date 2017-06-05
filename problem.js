//Imposed an time limit. Would have refactor the AM PM in the tranlsate time function. And used AM PM times.



var Clock = function () {
    this.realTimes;
    this.totalRings
}


Clock.prototype.translateTime = function (start, end) {
    var startTime = start.split(':');
    var hourStart = startTime[0];
    var minuteStart = startTime[1];
    var endTime = end.split(':');
    var hourEnd = endTime[0];
    var minuteEnd = endTime[1];

    var timeObject = {
        startHour: parseInt(hourStart),
        startMinute: parseInt(minuteStart),
        endHour: parseInt(hourEnd),
        endMinute: parseInt(minuteEnd)
    };

    this.realTimes = timeObject;
    return this;
};

Clock.prototype.getRings = function () {
    var startHour = this.realTimes.startHour;
    var originalHour = this.realTimes.startHour
    var startMinute = this.realTimes.startMinute;
    var endHour = this.realTimes.endHour;
    var endMinute = this.realTimes.endMinute;
    var totalRings = 0;

    //Restarts time to the next Day there is no 25 Hour
    //modified WILL ALWAYS BE COMPARED
    //start WILL ALWAYS BE IN THE COMPARED
    if (startMinute > 0) {
        if (startHour == 24) {
            startHour = 1
        } else {
            startHour = startHour + 1
        }
    }

    //Standard time no bleed into the next day
    if (originalHour < endHour) {
        for (var i = startHour; i <= endHour; i++) {
            if (i > 12) {
                var ampmHour = i - 12
                totalRings += ampmHour
            } else {
                totalRings += i;
            }

        }
        //Bleed into the next Day
    } else if (originalHour > endHour) {
        for (var i = startHour; i <= 24; i++) {
            if (i > 12) {
                var ampmHour = i - 12
                totalRings += ampmHour
            } else {
                totalRings += i;
            }
        }
        for (var j = 1; j <= endHour; j++) {
            if (j > 12) {
                var ampmHour = j - 12
                totalRings += ampmHour
            } else {
                totalRings += j;
            }
        }

    }
    //24 HOUR SPAN
    if(originalHour == endHour){
        var hours = 0
       for(var i = 0; i <= 12;i++){
            hours += i;
       }
       totalRings = hours * 2
    }
    this.totalRings = totalRings
    return this;
}

Clock.prototype.tellEveryone = function () {
    console.log(this.totalRings);
    return this.totalRings
}

var testClock = new Clock();
// Test Cases
testClock.translateTime('2:00', '3:00').getRings().tellEveryone();
testClock.translateTime('14:00', '15:00').getRings().tellEveryone();
testClock.translateTime('14:23', '15:42').getRings().tellEveryone();
testClock.translateTime('23:00', '1:00').getRings().tellEveryone();
