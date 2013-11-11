var github = require('octonode');
var client = github.client('9e3b11400b3381b72522e477e41f838012492b16');
console.log('client', client);
var ghme = client.me()
console.log('ghme', ghme);
// var org = octonode.Organization('mozilla');
var repo = client.repo('mozilla/appmaker');
console.log('repo', repo);

var current_issues = 0;
var current_pulls = 0;


// function getAllIssues(url, callback) {
//     repo.issues(page, function(err, data) {
//         console.log("called page", page, "got data", data);
//         if (data
//     })

//     request.get({
//         url: url,
//         json: true
//     }, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             _.each(body.posts.data, function (post) {
//                 User.posts.push(post); //push some result
//             });
//             if (body.pagination.next) { // if set, this is the next URL to query
//                 getFacebookData(body.pagination.next, callback);
//             } else {
//                 callback(); //Call when we are finished
//             }
//         } else {
//             console.log(error);
//             throw error;
//         }

//     });
// }

setInterval(function() {
    var last_pulls = current_pulls;
    var last_issues = current_issues;
    // var current_pulls = ;
    // var current_issues = ;
    console.log('doing github calls');
    repo.issues(1, function(err, data) {
        console.log("got cb", err, data);
        current_issues = data.length
        console.log(data[0]);
        console.log(data[1]);
        send_event('issues', {current: current_issues, last: last_issues});
    })
    // send_event('contributors', {value: contribs}); // never goes down
    // send_event('pulls', {current: current_pulls, last: last_pulls});

}, 2 * 1000);
