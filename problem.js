function makeTime() {
    var timeArray = [];
    for (var i = 1; i <= 23; i++) {
        timeArray.push(i)
    }
    ;
    console.log(timeArray)
    return timeArray
}


var times = makeTime();


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
        startMinute: parseInt(startTime[1]),
        endHour: parseInt(hourEnd),
        endMinute: parseInt(minuteEnd)
    };

    this.realTimes = timeObject;
    return this;
};

Clock.prototype.getRings = function () {
    var startHour = this.realTimes.startHour;
    var startMinute = this.realTimes.startMinute;
    var endHour = this.realTimes.endHour;
    var endMinute = this.realTimes.endMinute;
    var totalRings = 0;

    if (startMinute > 0) {
        if (startHour == 24) {
            startHour = 1
        } else {
            startHour = startHour + 1
        }
    }
    if (startHour < endHour) {
        for (var i = startHour; i <= endHour; i++) {
            if (i > 12) {
                var ampmHour = i - 12
                totalRings += ampmHour
            } else {
                totalRings += i;
            }

        }
    } else if (startHour > endHour) {
        //start at 22 == 10PM   go to 4AM
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
    this.totalRings = totalRings
    return this;
}

Clock.prototype.tellEveryone = function () {
    console.log(this.totalRings);
    return this.totalRings
}

var testClock = new Clock();
testClock.translateTime('14:00', '1:22').getRings().tellEveryone();
