// (function() {
//
//   var teams = {
//     'DEN': 'Denver Broncos',
//     'KC': 'Kansas City Chiefs',
//     'OAK': 'Oakland Raiders',
//     'SD': 'San Diego Chargers',
//     'BAL': 'Baltimore Ravens',
//     'CIN': 'Cincinnati Bengals',
//     'CLE': 'Cleveland Browns',
//     'PIT': 'Pitsburgh Steelers',
//     'CHI': 'Chicago Bears',
//     'DET': 'Detroit Lions',
//     'GB': 'Green Bay Packers',
//     'MIN': 'Minnesota Vikings',
//     'HOU': 'Houston Texans',
//     'IND': 'Indianapolis Colts',
//     'JAX': 'Jacksonvile Jaguars',
//     'TEN': 'Tennessee Titans',
//     'ATL': 'Atlanta Falcons',
//     'CAR': 'Carolina Panthers',
//     'NO': 'New Orleans Saints',
//     'TB': 'Tampa Bay Buccaneers',
//     'BUF': 'Buffalo Bills',
//     'MIA': 'Miami Dolphins',
//     'NE': 'New England Patriots',
//     'NYJ': 'New York Jets',
//     'DAL': 'Dallas Cowboys',
//     'NYG': 'New York Giants',
//     'PHI': 'Philadelphia Eagles',
//     'WAS': 'Washington Redskins',
//     'ARI': 'Arizona Cardinals',
//     'SF': 'San Francisco 49ers',
//     'SEA': 'Seattle Seahawks',
//     'STL': 'St. Louis Rams'
//   };
//
//   var ref = new Firebase(FBURL).child('teams');
//
//   for(var team in teams) {
//     var name = teams[team];
//     ref.child(team).set(name);
//   }
//
// }());
