$(document).ready(function() {
    var inArmy = new Date(2019, 1, 11, 14, 0, 0);
    var outArmy = new Date(2020, 8, 16, 8, 0, 0);
    var curTime = new Date();

    var goalPeriod = outArmy - inArmy;
    var curPeriod = curTime - inArmy;

    var percentage = 100 * (curPeriod / goalPeriod);

    $(percent).html(percentage.toString());

    $(re-calculate).on("click", function (e) {
        percentage = 100 * (curPeriod / goalPeriod);
        $(percent).html(percentage.toString());
    })

    $(percent-bar).each(function (i) {
        if(i < 10) {
            $(this).css("background-color", "green");
        }
    })

    console.log("아무말");
})
