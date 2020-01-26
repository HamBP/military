var inArmy = new Date(2019, 1, 11, 14, 0, 0);
var outArmy = new Date(2020, 8, 16, 8, 0, 0);
var curTime = new Date();

var goalPeriod = outArmy - inArmy;
var curPeriod = curTime - inArmy;

var percent = curPeriod / goalPeriod;
$(percent).html(percent.toString());