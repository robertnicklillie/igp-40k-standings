var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var dayjs = require("dayjs");
var weekYear = require("dayjs/plugin/weekYear");
var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
var getLeagueWeek = function (startDate, endDate, matchDate) {
    var _startDate = dayjs(startDate);
    var _endDate = dayjs(endDate);
    var _matchDate = dayjs(matchDate);
    if (_matchDate.week() < _startDate.week() &&
        _matchDate.year() === _startDate.year())
        throw Error("Match date ".concat(_matchDate, " cannot be before the league season start date ").concat(_startDate));
    if (_matchDate.week() > _endDate.week() &&
        _matchDate.year() === _endDate.year())
        throw Error("Match date ".concat(matchDate, " cannot be after the league season end date ").concat(endDate));
    var weekOne = _startDate.week();
    var weekOneYear = _startDate.year();
    var matchWeek = 0;
    if (_matchDate.year() === weekOneYear) {
        matchWeek = _matchDate.week() - weekOne + 1;
    }
    else {
        // get the final week of the year
        var finalWeek = 0;
        var dayFinalWeek = 31;
        do {
            finalWeek = dayjs("12/".concat(dayFinalWeek--, "/").concat(weekOneYear)).week();
        } while (finalWeek < 51);
        var yearWeekOffset = finalWeek - weekOne + 1;
        matchWeek = _matchDate.week() + yearWeekOffset;
    }
    return matchWeek;
};
var calcLeagueScore = function (playerScore, opponentScore) {
    return parseFloat(playerScore) + (100 - parseFloat(opponentScore));
};
var groupMatchesIntoLeagueWeeks = function (matches, leagueStartDate, leagueEndDate) {
    var weeklyMatches = {};
    for (var i = 0; i < matches.length; i++) {
        var match = matches[i];
        var leagueWeek = getLeagueWeek(leagueStartDate, leagueEndDate, match.date);
        if (!weeklyMatches.hasOwnProperty(leagueWeek)) {
            weeklyMatches[leagueWeek] = {};
        }
        if (!weeklyMatches[leagueWeek].hasOwnProperty(match.player1)) {
            weeklyMatches[leagueWeek][match.player1] = [];
        }
        weeklyMatches[leagueWeek][match.player1].push({
            isMatchEligible: true,
            leagueScore: calcLeagueScore(match.player1Score, match.player2Score),
            matchScore: parseFloat(match.player1Score),
            playerArmy: match.player1Army,
            opponent: match.player2,
            opponentArmy: match.player2Army,
            opponentScore: parseFloat(match.player2Score),
        });
        if (!weeklyMatches[leagueWeek].hasOwnProperty(match.player2)) {
            weeklyMatches[leagueWeek][match.player2] = [];
        }
        weeklyMatches[leagueWeek][match.player2].push({
            isMatchEligible: true,
            leagueScore: calcLeagueScore(match.player2Score, match.player1Score),
            matchScore: parseFloat(match.player2Score),
            playerArmy: match.player1Army,
            opponent: match.player1,
            opponentArmy: match.player1Army,
            opponentScore: parseFloat(match.player1Score),
        });
    }
    return weeklyMatches;
};
// const { match1: WeeklyMatch | undefined, match2: WeeklyMatch | undefined, match3: WeeklyMatch | undefined, match4: WeeklyMatch | undefined} =
//     getTop4MatchesForPlayer(matchesForCurrentWeek[player.name], standingsForPriorWeek[player.name]);
var determineTop4Matches = function (matches, standing) {
    var allMatches = __spreadArray([], matches, true);
    if (standing === null || standing === void 0 ? void 0 : standing.match1)
        allMatches.push(standing.match1);
    if (standing === null || standing === void 0 ? void 0 : standing.match2)
        allMatches.push(standing.match2);
    if (standing === null || standing === void 0 ? void 0 : standing.match3)
        allMatches.push(standing.match3);
    if (standing === null || standing === void 0 ? void 0 : standing.match4)
        allMatches.push(standing.match4);
    var sortedMatches = allMatches.sort(function (a, b) {
        if (a.leagueScore < b.leagueScore)
            return -1;
        if (a.leagueScore > b.leagueScore)
            return 1;
        return 0;
    });
    var new_standing = {
        match1: undefined,
        match2: undefined,
        match3: undefined,
        match4: undefined,
        leagueScore: 0.0,
    };
    var totalMatches = sortedMatches.length;
    var totalLeagueScore = 0.0;
    if (totalMatches > 0) {
        new_standing.match1 = sortedMatches[0];
        totalLeagueScore += new_standing.match1.leagueScore;
    }
    if (totalMatches > 1) {
        new_standing.match2 = sortedMatches[1];
        totalLeagueScore += new_standing.match2.leagueScore;
    }
    if (totalMatches > 2) {
        new_standing.match3 = sortedMatches[2];
        totalLeagueScore += new_standing.match3.leagueScore;
    }
    if (totalMatches > 3) {
        new_standing.match4 = sortedMatches[3];
        totalLeagueScore += new_standing.match4.leagueScore;
    }
    var leagueScore = totalMatches > 0 ? totalLeagueScore / Math.min(totalMatches, 4) : 0.0;
    return __assign(__assign({}, new_standing), { leagueScore: leagueScore });
};
var buildStandings = function (players, matches) {
    var leagueStartDate = "11/19/2023";
    var leagueEndDate = "3/31/2024";
    var matchesByWeek = groupMatchesIntoLeagueWeeks(matches, leagueStartDate, leagueEndDate);
    var standingsByWeek = {};
    var finalLeagueWeek = getLeagueWeek(leagueStartDate, leagueEndDate, leagueEndDate) + 1;
    for (var week = 1; week < finalLeagueWeek; week++) {
        var matchesForCurrentWeek = matchesByWeek[week];
        var standingsForPriorWeek = week > 1 ? standingsByWeek[week - 1] : undefined;
        console.info(standingsForPriorWeek);
        // if there are no matches this week, just copy the prior week's standings
        if (week > 1 && !matchesForCurrentWeek && standingsForPriorWeek) {
            standingsByWeek[week] = standingsForPriorWeek;
        }
        else {
            for (var index = 1; index < players.length; index++) {
                var player = players[index];
                var playerStanding = {
                    player: player.name,
                    army: player.army,
                    avgLeagueScore: 0.0,
                };
                if (matchesForCurrentWeek.hasOwnProperty(player.name)) {
                    var priorPlayerStanding = undefined;
                    if (standingsForPriorWeek)
                        priorPlayerStanding = standingsForPriorWeek[player.name];
                    var _a = determineTop4Matches(matchesForCurrentWeek[player.name], priorPlayerStanding), match1 = _a.match1, match2 = _a.match2, match3 = _a.match3, match4 = _a.match4, leagueScore = _a.leagueScore;
                    playerStanding = __assign(__assign({}, playerStanding), { match1: match1, match2: match2, match3: match3, match4: match4, avgLeagueScore: leagueScore });
                }
                standingsByWeek[week][player.name] = playerStanding;
            }
        }
    }
    return standingsByWeek;
};
var matches = [
    {
        key: "c31fd168-2a73-48b7-80f9-baefffe1e8a8",
        player1: "Nick L",
        player1IsNameValid: false,
        player1Army: "Black Templars",
        player1IsArmyValid: true,
        player1Score: "25",
        player2: "Rad",
        player2IsNameValid: false,
        player2Army: "Tau",
        player2IsArmyValid: true,
        player2Score: "46",
        date: "11/25/2023",
    },
    {
        key: "c31fd168-2a73-48b7-80f9-baefffe1e8a8",
        player1: "Nick L",
        player1IsNameValid: false,
        player1Army: "Black Templars",
        player1IsArmyValid: true,
        player1Score: "25",
        player2: "DJ",
        player2IsNameValid: false,
        player2Army: "Chaos Space Marines",
        player2IsArmyValid: true,
        player2Score: "49",
        date: "11/24/2023",
    },
    {
        key: "c24f8803-9ea8-4dc6-aa08-0ea97509c3ba",
        player1: "Will",
        player1IsNameValid: false,
        player1Army: "Tau",
        player1IsArmyValid: true,
        player1Score: "94",
        player2: "Brendan",
        player2IsNameValid: false,
        player2Army: "Aeldari",
        player2IsArmyValid: true,
        player2Score: "57",
        date: "12/3/2023",
    },
    {
        key: "ae60c472-a67d-41e8-97d8-aeabff7c5f50",
        player1: "Alex",
        player1IsNameValid: false,
        player1Army: "Chaos Knights",
        player1IsArmyValid: true,
        player1Score: "67",
        player2: "Morgan",
        player2IsNameValid: false,
        player2Army: "Grey Knights",
        player2IsArmyValid: true,
        player2Score: "36",
        date: "12/3/2023",
    },
    {
        key: "ec412e45-1a5f-4345-8723-4b7615b1916f",
        player1: "Rad",
        player1IsNameValid: false,
        player1Army: "Tau",
        player1IsArmyValid: true,
        player1Score: "85",
        player2: "DJ",
        player2IsNameValid: false,
        player2Army: "Chaos Space Marines",
        player2IsArmyValid: true,
        player2Score: "67",
        date: "12/7/2023",
    },
    {
        key: "e20cf647-f776-44fd-889c-29f43d6ad827",
        player1: "Morgan",
        player1IsNameValid: false,
        player1Army: "Grey Knights",
        player1IsArmyValid: true,
        player1Score: "83",
        player2: "Alex",
        player2IsNameValid: false,
        player2Army: "Chaos Knights",
        player2IsArmyValid: true,
        player2Score: "37",
        date: "12/10/2023",
    },
    {
        key: "71fd1853-c25e-4d8f-89dd-2f11b8dc11d1",
        player1: "Nick L",
        player1IsNameValid: false,
        player1Army: "Black Templars",
        player1IsArmyValid: true,
        player1Score: "63",
        player2: "Kai",
        player2IsNameValid: false,
        player2Army: "Blood Angels",
        player2IsArmyValid: true,
        player2Score: "38",
        date: "12/12/2023",
    },
    {
        key: "3bcf22ee-3753-461b-81bb-ce476a79574f",
        player1: "DJ",
        player1IsNameValid: false,
        player1Army: "Chaos Space Marines",
        player1IsArmyValid: true,
        player1Score: "25",
        player2: "Will",
        player2IsNameValid: false,
        player2Army: "Tau",
        player2IsArmyValid: true,
        player2Score: "37",
        date: "1/8/2024",
    },
    {
        key: "d4d92d1b-cd78-4614-b5ab-bcd39860cc88",
        player1: "Alex",
        player1IsNameValid: false,
        player1Army: "Chaos Knights",
        player1IsArmyValid: true,
        player1Score: "94",
        player2: "Brendan",
        player2IsNameValid: false,
        player2Army: "Aeldari",
        player2IsArmyValid: true,
        player2Score: "38",
        date: "2/25/2024",
    },
    {
        key: "917ef32e-4eea-4a08-8d07-38020062ede9",
        player1: "Will",
        player1IsNameValid: false,
        player1Army: "Tau",
        player1IsArmyValid: true,
        player1Score: "67",
        player2: "Rad",
        player2IsNameValid: false,
        player2Army: "Tau",
        player2IsArmyValid: true,
        player2Score: "83",
        date: "3/1/2024",
    },
    {
        key: "4c49c1bf-c18f-4eec-a780-283d45ac4dfe",
        player1: "Morgan",
        player1IsNameValid: false,
        player1Army: "Grey Knights",
        player1IsArmyValid: true,
        player1Score: "85",
        player2: "Brendan",
        player2IsNameValid: false,
        player2Army: "Aeldari",
        player2IsArmyValid: true,
        player2Score: "85",
        date: "1/15/2024",
    },
    {
        key: "771a7fb7-6eba-4ea2-8e44-eafeb46e221b",
        player1: "Kai",
        player1IsNameValid: false,
        player1Army: "Blood Angels",
        player1IsArmyValid: true,
        player1Score: "83",
        player2: "Nick L",
        player2IsNameValid: false,
        player2Army: "Black Templars",
        player2IsArmyValid: true,
        player2Score: "46",
        date: "1/19/2024",
    },
    {
        key: "f414caf6-e347-415b-83ff-cb6ca4fae321",
        player1: "DJ",
        player1IsNameValid: false,
        player1Army: "Chaos Space Marines",
        player1IsArmyValid: true,
        player1Score: "63",
        player2: "Brendan",
        player2IsNameValid: false,
        player2Army: "Aeldari",
        player2IsArmyValid: true,
        player2Score: "57",
        date: "1/6/2024",
    },
    {
        key: "e309404f-55ad-4ec0-96ee-8e3d6ca25b69",
        player1: "Kai",
        player1IsNameValid: false,
        player1Army: "Blood Angels",
        player1IsArmyValid: true,
        player1Score: "25",
        player2: "Alex",
        player2IsNameValid: false,
        player2Army: "Chaos Knights",
        player2IsArmyValid: true,
        player2Score: "36",
        date: "1/30/2024",
    },
    {
        key: "d0d2c1a8-c473-4089-aa56-93c562a92dfa",
        player1: "Brendan",
        player1IsNameValid: false,
        player1Army: "Aeldari",
        player1IsArmyValid: true,
        player1Score: "94",
        player2: "Kai",
        player2IsNameValid: false,
        player2Army: "Blood Angels",
        player2IsArmyValid: true,
        player2Score: "67",
        date: "2/14/2024",
    },
];
var players = [
    {
        key: "8a215fe4-55ca-4d3e-8ab0-5bf275a37310",
        name: "Nick L",
        army: "Black Templars",
        isArmyValid: true,
        isActive: true,
    },
    {
        key: "30e885f5-e905-4ee6-b7f0-35a61798fcaf",
        name: "Alex",
        army: "Chaos Knights",
        isArmyValid: true,
        isActive: true,
    },
    {
        key: "f95f1c56-1034-4f94-9524-a5cff964382d",
        name: "Rad",
        army: "Tau",
        isArmyValid: true,
        isActive: true,
    },
    {
        key: "c746592d-ebbd-475f-85e9-b8ae5ea2ff0b",
        name: "Will",
        army: "Tau",
        isArmyValid: true,
        isActive: true,
    },
    {
        key: "3113c5fb-f3d5-4d86-9b76-13784c6439e0",
        name: "Morgan",
        army: "Grey Knights",
        isArmyValid: true,
        isActive: true,
    },
    {
        key: "b54163d2-bba4-4cd8-9268-3f6ffb82c575",
        name: "DJ",
        army: "Chaos Space Marines",
        isArmyValid: true,
        isActive: true,
    },
    {
        key: "370c98e1-94a4-4a5b-9978-25e5ef2c7073",
        name: "Kai",
        army: "Blood Angels",
        isArmyValid: true,
        isActive: true,
    },
    {
        key: "1c4103c6-2802-40ca-824a-8a4ec943eb36",
        name: "Brendan",
        army: "Aeldari",
        isArmyValid: true,
        isActive: true,
    },
];
console.info(buildStandings(players, matches));
// const StandingsBuilder = {
//   BuildStandings: buildStandings,
// };
// export default StandingsBuilder;
