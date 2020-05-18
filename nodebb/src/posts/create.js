'use strict';

var _ = require('lodash');

var meta = require('../meta');
var db = require('../database');
var plugins = require('../plugins');
var user = require('../user');
var topics = require('../topics');
var categories = require('../categories');
var groups = require('../groups');
var utils = require('../utils');

// 断点不会进入这里，为什么
module.exports = function (Posts) {
	//data 来自于 topics/create 中
	Posts.create = async function (data) {
		console.log('posts/create.js------' + 'data1:' + JSON.stringify(data));

		// This is an internal method, consider using Topics.reply instead
		const uid = data.uid;
		const tid = data.tid;
		const content = data.content.toString();
		const timestamp = data.timestamp || Date.now();
		const isMain = data.isMain || false;





		if (!uid && parseInt(uid, 10) !== 0) {
			throw new Error('[[error:invalid-uid]]');
		}

		if (data.toPid && !utils.isNumber(data.toPid)) {
			throw new Error('[[error:invalid-pid]]');
		}

		const pid = await db.incrObjectField('global', 'nextPid');
		let postData = {
			pid: pid,
			uid: uid,
			tid: tid,
			content: content,
			timestamp: timestamp,

		};

		// 添加自定义的数据
		postData.others = data.others;



		if (data.toPid) {
			postData.toPid = data.toPid;
		}
		if (data.ip && meta.config.trackIpPerPost) {
			postData.ip = data.ip;
		}
		if (data.handle && !parseInt(uid, 10)) {
			postData.handle = data.handle;
		}

		// 上面操作后的 postData 包含发表的 content 不包含 title
		// 手动添加一个数据
		//  postData.other = 12333444;
		// 在这里添加数据才人有效
		console.log('posts/create.js------' + 'postData1:' + JSON.stringify(postData));

		// 这一步生成一个新的对象 里面包含 topic:数据就是 topicData中的数据，data：数据就是 data 中的数据
		let result = await plugins.fireHook('filter:post.create', { post: postData, data: data });

		console.log('posts/create.js------' + 'result0:' + JSON.stringify(result));

		postData = result.post;
		await db.setObject('post:' + postData.pid, postData);

		const topicData = await topics.getTopicFields(tid, ['cid', 'pinned']);
		postData.cid = topicData.cid;

		await Promise.all([
			db.sortedSetAdd('posts:pid', timestamp, postData.pid),
			db.incrObjectField('global', 'postCount'),
			user.onNewPostMade(postData),
			topics.onNewPostMade(postData),
			categories.onNewPostMade(topicData.cid, topicData.pinned, postData),
			groups.onNewPostMade(postData),
			addReplyTo(postData, timestamp),
			Posts.uploads.sync(postData.pid),
		]);

		result = await plugins.fireHook('filter:post.get', { post: postData, uid: data.uid });
		result.post.isMain = isMain;
		plugins.fireHook('action:post.save', { post: _.clone(result.post) });

		console.log('posts/create.js------' + 'result:' + JSON.stringify(result));

		return result.post;
	};

	async function addReplyTo(postData, timestamp) {
		if (!postData.toPid) {
			return;
		}
		await Promise.all([
			db.sortedSetAdd('pid:' + postData.toPid + ':replies', timestamp, postData.pid),
			db.incrObjectField('post:' + postData.toPid, 'replies'),
		]);
	}
};
