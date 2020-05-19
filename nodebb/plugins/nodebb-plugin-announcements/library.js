"use strict";

var sockets = require('./lib/sockets'),
	async = require.main.require('async'),
	user = require.main.require('./src/user'),
	topics = require.main.require('./src/topics'),
	Categories = require.main.require('./src/categories'),
	SocketPlugins = require.main.require('./src/socket.io/plugins'),
	db = require.main.require('./src/database'),
	utils = require('./lib/utils'),

	plugin = {};

SocketPlugins.connectannouncements = sockets;

plugin.addThreadTools = function(data, callback) {
	// topicData
	user.isAdministrator(data.uid, function(err, isAdmin) {
		if (err) {
			callback(err, "An unexpected error has occurred");
		} else if (isAdmin) {
			data.tools.push({
				"title": "平台附加信息",
				"class": "connect-announcements",
				"icon": "fa-star-o"
			});
			callback(null, data);
		} else {
			callback(null, data);
		}
	});

};

plugin.addAnnouncements = function(data, callback) {
	plugin.getAnnouncementTopics({
		cid: data.category.cid,
		start: 0,
		stop: -1,
		uid: data.uid,
		//targetUid: data.targetUid
	}, function(err, announcements_topics) {
		if (err) {
			return callback(err);
		}
		var newarr = [];
		var unique = {};

		data.category.topics = announcements_topics.topics.concat(data.category.topics);
		data.category.topics.forEach(function(item) {
			if (!unique[item.tid]) {
				newarr.push(item);
				unique[item.tid] = item;
			}
		});
		data.category.topics = newarr;
		callback(null, data);
	});
};

plugin.getAnnouncementTopics = function(data, callback) {
	console.log("aaaaa");
	async.parallel({
		isAdmin: function(next) {
			user.isAdministrator(data.uid, next);
		},
		isModerator: function(next) {
			user.isModerator(data.uid, data.cid, next);
		},
		topics: function(next) {
			var tids;
			async.waterfall([
				/*function(next) {
					plugins.fireHook('filter:category.topics.prepare', data, next);
				},*/
				function(next) {
					//Categories.getTopicIds(data.targetUid ? 'cid:' + data.cid + ':uid:' + data.targetUid + ':tids' : 'cid:' + data.cid + ':tids', data.start, data.stop, next);
					//Categories.getTopicIds('cid:0:announcement:tids', false, data.start, data.stop, next);
					Categories.getTopicIds({
						cid: '0:announcement',
						start: data.start,
						stop: data.stop,
					}, next);
				},
				function(tids1, next) {
					//Categories.getTopicIds(data.targetUid ? 'cid:' + data.cid + ':uid:' + data.targetUid + ':tids' : 'cid:' + data.cid + ':tids', data.start, data.stop, next);
					tids = tids1;
					//Categories.getTopicIds('cid:'+data.cid+':announcement:tids', false, data.start, data.stop, next);
					Categories.getTopicIds({
						cid: data.cid+':announcement',
						start: data.start,
						stop: data.stop,
					}, next);
				},
				function(tids2, next) {
					tids = tids.concat(tids2);
					console.log("tids", tids);

					var keys = [];

					for (var x = 0, numTids = tids.length; x < numTids; ++x) {
						keys.push('tid:' + tids[x] + ':announcement:cids');
					}
					db.getObjects(keys, next);
				},
				function(taids, next) {
					for (var ia in taids) {
						if (taids[ia]) {
							if (!utils.inDates(taids[ia].date_start, taids[ia].date_end)) {
								tids.splice(tids.indexOf(taids[ia].tid.toString()), 1);
							}
						}
					}
					next();
				},
				function(next) {
					topics.getTopicsByTids(tids, data.uid, next);
				},
				function(topics, next) {
					if (!Array.isArray(topics) || !topics.length) {
						return next(null, {
							topics: [],
							uid: data.uid
						});
					}

					for (var i = 0; i < topics.length; ++i) {
						//topics[i].extraClass = 'connect-announcement';

						// topics[i].title = '<span class="connect-announcement">' + topics[i].title + '</span>';

						//topics[i].index = data.start + i;

						// topics[i].index = -i - 1;
					}
					next(null, {
						topics: topics,
						uid: data.uid
					});

					//plugins.fireHook('filter:category.topics.get', {topics: topics, uid: data.uid}, next);
				},
				function(results, next) {
					next(null, results.topics);
				}
			], next);
		}
	}, function(err, results) {
		if (err) {
			return callback(err);
		}
		var isAdminOrMod = results.isAdmin || results.isModerator;
		results.topics = results.topics.filter(function(topic) {
			return (!topic.deleted || isAdminOrMod || topic.isOwner);
		});
		callback(null, {
			topics: results.topics,
			nextStart: data.stop + 1
		});
	});
};

//Necessario per connect-moderators
plugin.create = function(data, callback) {
	db.getObjectField("tid:" + data.tid + ":announcement:cids", 'members', function(err, cids) {
		if (!Array.isArray(cids)) {
			cids = [];
		}
		if (!Array.isArray(data.cids)) {
			data.cids = [];
		}
		for (var i in data.cids) {
			db.sortedSetAdd('cid:' + data.cids[i] + ':announcement:tids', 0, data.tid, function() {
				//TO DO?
			});
		}
		var date_start;
		var date_end;
		if (data.date_start && utils.isValidDate(data.date_start)) {
			date_start = utils.dateStringToTime(data.date_start);
		}
		if (data.date_end && utils.isValidDate(data.date_end)) {
			date_end = utils.dateStringToTime(data.date_end);
		}
		db.setObject("tid:" + data.tid + ":announcement:cids", {
			tid: data.tid,
			date_start: date_start,
			date_end: date_end
		}, function(err) {
			db.setAdd("tid:" + data.tid + ":announcement:cids", data.cids, function(err) {
				callback(null, {
					result: true
				});
			});
		});
	});
};

module.exports = plugin;