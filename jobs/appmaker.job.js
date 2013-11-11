var request = require('request');
var app_count = 0;

setInterval(function() {
	var last_app_count = app_count;
	var counturl = "http://162.243.75.232/render?format=json&target=summarize(stats_counts.appmaker.app_published,'10year')"
	request.get({url:counturl, json:true}, function (e, r, data) {
		console.log(e,r,data);
		console.log(data['datapoints'][0][0]);
		send_event('app_count', {current: data['datapoints'][0][0],
			last: last_app_count});
	})
}, 2 * 1000);
