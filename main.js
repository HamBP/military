$(document).ready(function() {
    var inArmy = new Date(2019, 1, 11, 14, 0, 0);
    var outArmy = new Date(2020, 8, 16, 8, 0, 0);

    var goalPeriod = outArmy - inArmy;
    var curPeriod = (new Date()) - inArmy;

    var percentage = 100 * (curPeriod / goalPeriod);

    // 초기 값
    $(percent).html(percentage.toFixed(6));
    $("#percent-bar td").each(function (i) {
        if((i+1) < percentage) {
            $(this).css("background-color", "#00FF00");
        }
    })

    // 재계산
    $("#re-calculate").on("click", function (e) {
        curPeriod = (new Date()) - inArmy;
        percentage = 100 * (curPeriod / goalPeriod);
        $(percent).html(percentage.toFixed(6));

        $("#percent-bar td").each(function (i) {
            if((i+1) < percentage) {
                $(this).css("background-color", "#00FF00");
            }
        })
    })

})
