'use strict';

/* globals app, socket, bootbox, ajaxify */

(function () {
	console.log('nodebb-plugin-connect-announcements loaded');

	$(window)
		.on('action:ajaxify.end', function (event, data) {
			console.log('AAAA0:' + 'data: ' + JSON.stringify(data));
			console.log('AAAA0:' + 'event: ' + event);
			if (data.url.match(/^category/)) {
				$('.connect-announcement')
					.parents('li')
					.addClass('connect-announcement-row');
			}
		});

	// $(window)
	// 	.on('action:topic.tools.load', function (event, data) {
	// 		console.log('AAAA1' + JSON.stringify(data)); // data:undefined
	// 		// if (data.url.match(/^topic/)) {
	// 		$('.thread-tools .connect-announcements')
	// 			.on('click', function (ev) {
	// 				console.log('AAAA2' + 'ajaxify:---' + JSON.stringify(ajaxify.data));
	// 				socket.emit('plugins.connectannouncements.getGTAnnouncementsTopic', { tid: ajaxify.data.tid }, function (err, connectannouncementsData) {
	// 					console.log('AAAA3' + 'connectannouncementsData:' + JSON.stringify(connectannouncementsData));
	// 					app.parseAndTranslate('modals/connectannouncements', { connectannouncementsData: connectannouncementsData }, function (html) {
	// 						console.log('AAAA4' + 'html::' + JSON.stringify(html));
	// 						if (err) {
	// 							app.alertError('Error loading data, try again');
	// 						} else {
	// 							console.log('AAAA5');
	//
	// 							var modal = bootbox.dialog({
	// 									message: html,
	// 									title: 'Announcement',
	// 									size: 'large',
	// 									// // buttons: {
	// 									// 	success: {
	// 									// 		// label: "Save",
	// 									// 		label: "",
	// 									// 		// className: "btn-primary save",
	// 									// 		callback: function() {
	// 									// 			var connectannouncementsDataFrm = serializeObjectGT($('.connectannouncements_topic_frm'));
	// 									//
	// 									// 			socket.emit('plugins.connectannouncements.setGTAnnouncementsTopic', {tid:ajaxify.data.tid, connectannouncementsDataFrm:connectannouncementsDataFrm}, function(err, returnData) {
	// 									// 				if(err)
	// 									// 					app.alertError(data.message);
	// 									// 				else {
	// 									// 					app.alertSuccess(returnData.message);
	// 									// 				}
	// 									// 			});
	// 									// 		}
	// 									// 	}
	// 									// }
	// 								}
	// 							);
	// 							modal.on('shown.bs.modal', function () {
	// 								$('.selectAll')
	// 									.on('click', function () {
	// 										$('.connect-announcement-categories-list input[type=checkbox]')
	// 											.each(function () {
	// 												$(this)
	// 													.prop('checked', true);
	// 											});
	// 									});
	// 								$('.deselectAll')
	// 									.on('click', function () {
	// 										$('.connect-announcement-categories-list input[type=checkbox]')
	// 											.each(function () {
	// 												$(this)
	// 													.prop('checked', false);
	// 											});
	// 									});
	// 							});
	// 						}
	// 					});
	// 				});
	// 				ev.preventDefault();
	// 				return false;
	// 			});
	// 		// }
	// 	});

	$(window)
		// .on('action:topic.loaded', function (event, data) {
		.on('action:topic.tools.load', function (event, data) {
			console.log('AAAAA6： ' + 'action:topic.loaded data: ' + JSON.stringify(data));
			//	 topicData

			$('.thread-tools .connect-announcements')
				.on('click', function (ev) {
					app.parseAndTranslate('modals/connectannouncements', { others: ajaxify.data.posts[0].others }, function (html) {

						console.log('AAAA6' + 'topicdata ----------:' + JSON.stringify(ajaxify.data.posts[0].others));
						// console.log('main.js:' + 'topicData.posts' + JSON.stringify(topicData.posts))
						// if (err) {
						// 	app.alertError('Error loading data, try again');
						// } else {
							console.log('AAAA6 ');

							var modal = bootbox.dialog({
								message: html,
								title: '平台附加信息',
								size: 'large',

							});

						// }
					});
					ev.preventDefault();
					return false;
				});

		});


	function serializeArrayGT(form) {
		var brokenSerialization = $.fn.serializeArray.apply(form);
		var checkboxValues = $(form)
			.find('input[type=checkbox]')
			.map(function () {
				if (this.checked) {
					return {
						'name': this.name,
						'value': (isNaN(this.value) ? this.value : parseInt(this.value))
					};
				} else {
					return;
				}
			})
			.get();
		var checkboxKeys = $.map(checkboxValues, function (element) {
			return element.name;
		});
		var withoutCheckboxes = $.grep(brokenSerialization, function (element) {
			return $.inArray(element.name, checkboxKeys) === -1;
		});

		return $.merge(withoutCheckboxes, checkboxValues);
	}

	function serializeObjectGT(form) {
		var o = {};
		var a = serializeArrayGT(form);
		$.each(a, function () {
			if (this.value == 'true') {
				this.value = true;
			} else if (this.value == 'false') {
				this.value = false;
			} else if (this.value == 'null') {
				this.value = null;
			}
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value);
			} else {
				o[this.name] = this.value;
			}
		});
		return o;
	}

	function modificaData(date) {
		var mm = date.getMonth() + 1; // getMonth() is zero-based
		var dd = date.getDate();
		var mese = '';
		var day = '';
		if (mm < 10) {
			mese = '0' + mm;
		} else {
			mese = '' + mm;
		}
		if (dd < 10) {
			day = '0' + dd;
		} else {
			day = '' + dd;
		}
		return date.getFullYear() + '-' + mese + '-' + day;

	}

	function verificaInput() {
		//verifica che ci sia almeno una checkbox selezionata
		var check_selezionata = false;
		var lista_checkbox = $('[id^="connectannouncements_categories_"]');
		for (var i = 0; i < lista_checkbox.length; i++) {
			//console.log("CHECKED " + lista_checkbox[i].checked);
			if (lista_checkbox[i].checked) {
				check_selezionata = true;
			}
		}
		if (!check_selezionata) {
			app.alertError('Selezionare almeno una categoria');
			return false;
		}
		//verifica che la data non è la stessa
		var dataFinale = $('#date_end')
			.val();
		if (!dataFinale) {
			app.alertError('Selezionare una data finale');
			return false;
		} else {
			var timestamp_iniziale = (new Date($('#date_start')
				.val())).getTime();
			var timestamp_finale = (new Date($('#date_end')
				.val())).getTime();
			if (timestamp_iniziale == timestamp_finale) {
				app.alertError('Selezionare una data finale diversa da quella iniziale');
				return false;
			}
			if (timestamp_finale < timestamp_iniziale) {
				app.alertError('Selezionare una data finale maggiore a quella iniziale');
				return false;
			}
			//console.log("DATA FINALE " + timestamp_iniziale + " timestamp finale " + timestamp_finale);
		}
		return true;
	}

}());