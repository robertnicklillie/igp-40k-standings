const dayjs = require("dayjs");
var weekYear = require("dayjs/plugin/weekYear");
var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const getLeagueWeek = (startDate, endDate, matchDate) => {
  const _startDate = dayjs(startDate);
  const _endDate = dayjs(endDate);
  const _matchDate = dayjs(matchDate);

  if (
    _matchDate.week() < _startDate.week() &&
    _matchDate.year() === _startDate.year()
  )
    throw Error(
      `Match date ${_matchDate} cannot be before the league season start date ${_startDate}`
    );

  if (
    _matchDate.week() > _endDate.week() &&
    _matchDate.year() === _endDate.year()
  )
    throw Error(
      `Match date ${matchDate} cannot be after the league season end date ${endDate}`
    );

  const weekOne = _startDate.week();
  const weekOneYear = _startDate.year();
  let matchWeek = 0;

  if (_matchDate.year() === weekOneYear) {
    matchWeek = _matchDate.week() - weekOne + 1;
  } else {
    // get the final week of the year
    let finalWeek = 0;
    let dayFinalWeek = 31;
    do {
        finalWeek = dayjs(`12/${(`12/30/${weekOneYear}`);
    } while ()

    const yearWeekOffset = dayjs(`12/31/${weekOneYear}`).week() - weekOne + 1;
    console.info(`12/31/${weekOneYear}`);
    console.info(dayjs(`12/30/${weekOneYear}`).weekYear());
    matchWeek = _matchDate.week() + 1 + yearWeekOffset;
  }

  console.info(matchWeek);
  return matchWeek;
};

getLeagueWeek("11/30/2023", "3/31/2024", "1/14/2024");
