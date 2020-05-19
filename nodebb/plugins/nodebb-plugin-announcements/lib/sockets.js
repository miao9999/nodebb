'use strict';

var async = require.main.require('async'),
	Categories = require.main.require('./src/categories'),
	Topics = require.main.require('./src/topics'),
	db = require.main.require('./src/database'),
	utils = require('./utils');

var Sockets = {};

Sockets.getGTAnnouncementsTopic = function(socket, data, callback) {
	async.parallel({
		// categories: function(next) {
		// 	Categories.getAllCategories(socket.uid, next);
		// },
		topics: function(next){
			Topics.getTopics(data.tid,socket.uid,next);
		},
		categoriesSelected: function(next) {
			db.getObjectFields("tid:"+data.tid+":announcement:cids", ['date_start', 'date_end', 'members'], next);
		},
	}, function(err, results) {
		if (err) {
			return callback(err);
		}
		var date_start = '';
		var date_end = '';
		if(results.categoriesSelected && results.categoriesSelected.members) {
			date_start = utils.dateTimeToString(results.categoriesSelected.date_start);
			date_end = utils.dateTimeToString(results.categoriesSelected.date_end);
			for(var i in results.categories) {
				if(results.categoriesSelected.members.indexOf(results.categories[i].cid.toString()) !== -1) {
					results.categories[i].announcement = true;
				} else {
					results.categories[i].announcement = false;
				}
			}
		}
		console.log('socket.js:---' + 'tategoryies:' + JSON.stringify(results.topics))
		return callback(null, {date_start:date_start, date_end:date_end, categories:results.topics});
	});
};

Sockets.setGTAnnouncementsTopic = function(socket, data, callback) {
	db.getObjectField("tid:"+data.tid+":announcement:cids", 'members', function(err, cids) {
		if(!Array.isArray(cids)) {
			cids = [];
		}
		if(!Array.isArray(data.connectannouncementsDataFrm.connectannouncements_categories) && data.connectannouncementsDataFrm.connectannouncements_categories=='') {
			data.connectannouncementsDataFrm.connectannouncements_categories = [];
		} else if(!Array.isArray(data.connectannouncementsDataFrm.connectannouncements_categories)) {
			data.connectannouncementsDataFrm.connectannouncements_categories = [data.connectannouncementsDataFrm.connectannouncements_categories];
		}
		var toRemove = utils.diffArray(cids, data.connectannouncementsDataFrm.connectannouncements_categories);
		var toAdd = utils.diffArray(data.connectannouncementsDataFrm.connectannouncements_categories, cids);
		for(var i in toRemove) {
			db.sortedSetRemove('cid:'+toRemove[i]+':announcement:tids', data.tid, function() {
				//TO DO?
			});
		}
		for(var i in toAdd) {
			db.sortedSetAdd('cid:'+toAdd[i]+':announcement:tids', 0, data.tid, function() {
				//TO DO?
			});
		}
		var date_start;
		var date_end;
		if(data.connectannouncementsDataFrm.date_start && utils.isValidDate(data.connectannouncementsDataFrm.date_start)) {
			date_start = utils.dateStringToTime(data.connectannouncementsDataFrm.date_start);
		}
		if(data.connectannouncementsDataFrm.date_end && utils.isValidDate(data.connectannouncementsDataFrm.date_end)) {
			date_end = utils.dateStringToTime(data.connectannouncementsDataFrm.date_end);
		}
		db.setObject("tid:"+data.tid+":announcement:cids", {tid:data.tid, date_start:date_start, date_end:date_end}, function(err) {
			db.setRemove("tid:"+data.tid+":announcement:cids", toRemove, function(err) {
				db.setAdd("tid:"+data.tid+":announcement:cids", toAdd, function(err) {
					callback(null, {result:true});
				});
			});
		});
	});
};

module.exports = Sockets;