const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const satisfaction = clockContainer.querySelector("h3");

function dateInit() {
    const date = new Date();
    const y = date.getFullYear();
    const month = date.getMonth();
    const d = date.getDate();
    const h = date.getHours();
    const minutes = date.getMinutes();
    const s = date.getSeconds();
    let accumulatedSeconds = 0;
    let days = [18, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 29, 31, 30, 31, 30, 31, 30]; // 19년 2월 ~ 20년 8월
    clockTitle.innerText = `현재 시각 ${y}년 ${month+1}월 ${d}일 ${
        h < 10 ? `0${h}` : h}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        s < 10 ? `0${s}` : s}`;

    // 일 계산
    let i;
    let tempY = y;
    let tempM = month;
    for (i = 0; i < 19; ++i) {
        if (tempM == month) {
            if (tempY == y) break;
        }

        accumulatedSeconds += days[i];
        if (tempM == 11) {
            tempM = 0;
            ++tempY;
        }
        else {
            ++tempM;
        }
    }
    accumulatedSeconds += d - 11;
    accumulatedSeconds *= 24;

    // 시간, 분, 초 계산
    accumulatedSeconds += 60 * (60 * (h - 14) + minutes) + s;

    // 전역은 2020년 9월 16일 오후 2시로 가정하고 초 단위로 계산함.
    satisfaction.innerText = `입대후 지난 시간 : ${accumulatedSeconds}초\n할당률 : ${
        (accumulatedSeconds / 50371200) * 100}%`
}

function init() {
    setInterval(dateInit, 100);
}

init();