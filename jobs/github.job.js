var second = 1000;
var minute = 60 * second;
var hour = 60 * minute;

var github = require('octonode');
var token = process.env['GITHUB_TOKEN'] || '';
console.log("TOKEN =", token);
var client = github.client(token);

var ghme = client.me();
var repo = client.repo('mozilla/appmaker');

var contributors = 0;
var pulls = 0;
var forks = 0;
var open_issues = 0;
var watchers = 0;

function updateGithubMetrics() {
    var last_pulls = pulls;
    var last_watchers = watchers;
    var last_forks = forks;
    var last_contributors = contributors;
    var last_open_issues = open_issues;
    repo.contributors(function(err, data) {
        contributors = data.length;
        send_event('contributors', {current: contributors, last: last_contributors});
    });
    repo.info(function(err, data) {
        watchers = data['watchers'];
        open_issues = data['open_issues'];
        forks = data['forks'];
        send_event('watchers', {current: watchers, last: last_watchers});
        send_event('forks', {current: forks, last: last_forks});
        send_event('issues', {current: open_issues, last: last_open_issues});
    });
}
updateGithubMetrics();

setInterval(function() {
    updateGithubMetrics();
}, hour);
