const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const satisfaction = clockContainer.querySelector("h3");

const millisec_in_sec = 1000;
const millisec_in_min = 1000 * 60;
const millisec_in_hour = 1000 * 60 * 60;
const millisec_in_day = 1000 * 60 * 60 * 24;

// 제가 수정한 이 구현에는 결함이 있습니다!!!!!!!!!! dateInit2를 쓰세욧!!!
function dateInit() {
    const date = new Date();
    const y = date.getFullYear();
    const month = date.getMonth();
    const d = date.getDate();
    const h = date.getHours();
    const minutes = date.getMinutes();
    const s = date.getSeconds();
    let accumulatedSeconds = 0;
    let elapsed_days = 0; /* 새로 추가했어요 */
    let days = [18, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
      31, 29, 31, 30, 31, 30, 31, 30]; // 19년 2월 ~ 20년 9월
    clockTitle.innerText = `현재 시각 ${y}년 ${month+1}월 ${d}일 ${
        h < 10 ? `0${h}` : h}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        s < 10 ? `0${s}` : s}`;

    // 일 계산
    let i;
    let tempY = 2019; // 입대 year
    let tempM = 1; // 입대 month
    let tempD = 11; // 입대 day

    for (i = 0; i < 19; ++i) {
        if (tempM == month && tempY == y) {
            // 이 친구는 여기에 있어야 할 것 같습네다
            if (i == 0) {
              // 첫 달에는 입대일로부터 지난 일자만 더해주고
              elapsed_days = d - tempD;
            }
            else {
              // 아닌 달에는 그 달 시작부터 지난 일자를 더해주고 끝냅니다
              elapsed_days += d;
            }
            break;
        }

        elapsed_days += days[i];

        if (tempM == 11) {
            // 12월이 되면은 다음 해로 넘어간드아
            tempM = 0;
            ++tempY;
        }
        else {
            // 12월 아니면 다음달로 넘어간드아
            ++tempM;
        }
    }

    // 루프가 끝난 시점에서 elapsed_days에는 지나간 일자가 들어있습네다
    // 하지만 일자로는 n일이 지났지만 실제로 24n시간이 지나지는 않았쵸
    //
    // 예를 들어 2월 11일 오후 11시 59분에서 2월 12일 오전 12시 01분까지는
    // 날짜가 넘어갔지만 2분밖에 지나지 않았...
    //
    // 따라서 이러케 계산해줍니다
    // (지나간 날짜 - 1) * 24 에다가 (24 - 시작 시간) + (종료 시간)을 더해줌니다
    //
    // 예시: 1월 1일 오후 3시부터 1월 3일 오전 10시까지는 순수 1일 경과하였고
    // 따라서 일단 ((3 - 1) - 1) * 24 = 24시간이 흘렀습니다
    // 그리고 (24 - 15) + (10) = 19시간이 더 흘러서 총 43시간 경과!!
    //
    // 예시2: 12월 1일 오후 3시부터 12월 1일 오후 5시까지는
    // 0일이 흘렀고, (24 - 15) + (17) = 26시간인데 여기에 % 24 해줍시다!
    // 그러면 2시간!!
    //
    // 시간을 구하고 24로 나머지 연산을 해줍니다

    // 여기서 초를 계산해야 하는데...
    // 초단위로 가려면 이렇게 합시다
    //
    // 이것부터 정합시다
    // 아는 것: 입대 시점과 전역 시점.
    // 입대 시점은 2019-2-11 2:00 PM,
    // 전역 시점은 2020-9-16 2:00 PM.
    //
    // accumulatedSeconds는 지나간 날짜 + 지나간 시간 + 지나간 초로
    // 정의가 된 것 같습네다


    elapsed_days -= 1 /* 순수 지나간 날짜 */;
    elapsed_hours = ((24 - 14) + (h)) % 24 /* 14는 입대 시각 시간 */
    const elapsed_minutes = ((60 - 0) + (minutes)) % 60 /* 0은 입대 시각 분 */
    const elapsed_seconds = ((60 - 0) + (s)) % 60 /* 0은 입대 시각 초 */

    accumulatedSeconds =  elapsed_days * (24 * 60 * 60) +
                          elapsed_hours * (60 * 60) +
                          elapsed_minutes * (60) +
                          elapsed_seconds;

    // 시간, 분, 초 계산
    // accumulatedSeconds += 60 * (60 * (h - 14) + minutes) + s;
    // 안녕 잘가..

    // 전역은 2020년 9월 16일 오후 2시로 가정하고 초 단위로 계산함.
    satisfaction.innerText = `입대후 지난 시간 : ${accumulatedSeconds}초\
    \n(${elapsed_days}일 ${elapsed_hours}시간 ${elapsed_minutes}분 ${elapsed_seconds}초)\
    \n\n할당률 : ${(accumulatedSeconds / 50371200) * 100}%`
}


// 써놓고보니 코드가 어지러워져서 새로 씁니다,,,,,,, 이거 추천해요...
function dateInit2() {
  const now = new Date(); /* 오늘 */
  const now_year = now.getFullYear();
  const now_month = now.getMonth();
  const now_day = now.getDate();
  const now_hour = now.getHours();
  const now_min = now.getMinutes();
  const now_sec = now.getSeconds();

  const start = new Date(2019, 1, 11, 14, 0 ,0);
  const end = new Date(2020, 8, 16, 14, 0, 0); /* 전역 2020년 9월 16일 14시 */

  const dif = now - start; /* 입대부터 지금까지 지난 시간을 밀리세컨드로 */

  const elapsed_days = Math.floor(dif / (millisec_in_day));
  const elapsed_hours = Math.floor(dif % (millisec_in_day) / (millisec_in_hour));
  const elapsed_mins = Math.floor(dif % (millisec_in_hour) / (millisec_in_min));
  const elapsed_secs = Math.floor(dif % (millisec_in_min) / (millisec_in_sec));

  const total_secs = Math.floor(dif / (millisec_in_sec));
  const progress = (total_secs / ((end - start) / millisec_in_sec));

  clockTitle.innerText = `현재 시각 ${now_year}년 ${now_month+1}월 ${now_day}일\
  ${now_hour < 10 ? `0${now_hour}` : now_hour}:\
  ${now_min < 10 ? `0${now_min}` : now_min}:\
  ${now_sec < 10 ? `0${now_sec}` : now_sec}`;

  satisfaction.innerText = `입대후 지난 시간 : ${total_secs}초\
  \n(${elapsed_days}일 ${elapsed_hours}시간 ${elapsed_mins}분 ${elapsed_secs}초)\
  \n\n할당률 : ${progress * 100}%`
}

function init() {
    setInterval(dateInit2, 100);
}

init();
