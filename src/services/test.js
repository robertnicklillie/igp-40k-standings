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
        finalWeek = dayjs(`12/${dayFinalWeek--}/${weekOneYear}`).week();
    } while (finalWeek < 51)

    const yearWeekOffset = finalWeek - weekOne + 1;
    matchWeek = _matchDate.week() + yearWeekOffset;
  }
  return matchWeek;
};

console.info(getLeagueWeek("11/26/2023", "3/31/2024", "2/12/2024"));
