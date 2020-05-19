'use strict';

var Utils = {};

Utils.diffArray = function(a, b) {
  var seen = [], diff = [];
  for ( var i = 0; i < b.length; i++)
      seen[b[i]] = true;
  for ( var i = 0; i < a.length; i++)
      if (!seen[a[i]])
          diff.push(a[i]);
  return diff;
};

Utils.isValidDate = function(date) {
    var matches = /^(\d{4})[-\/](\d{2})[-\/](\d{2})$/.exec(date);
    if (!matches) { return false; }
    var d = matches[3].toString();
    if(d.length<2) { d = "0"+d; }
    var m = (matches[2] - 1).toString();
    if(m.length<2) { m = "0"+m; }
    var y = matches[1].toString();

    var composedDate = new Date(y, m, d);
    var d_c = composedDate.getDate().toString();
    if(d_c.length<2) { d_c = "0"+d_c; }
    var m_c = composedDate.getMonth().toString();
    if(m_c.length<2) { m_c = "0"+m_c; }
    var y_c = composedDate.getFullYear().toString();

    return d_c===d && m_c===m && y_c===y;
};

Utils.dateStringToTime = function(date) {
    var matches = /^(\d{4})[-\/](\d{2})[-\/](\d{2})$/.exec(date);
    if (!matches) { return false; }
    var d = matches[3].toString();
    if(d.length<2) { d = "0"+d; }
    var m = (matches[2] - 1).toString();
    if(m.length<2) { m = "0"+m; }
    var y = matches[1].toString();

    var composedDate = new Date(y, m, d);
    return composedDate.getTime();
};

Utils.dateTimeToString = function(time) {
	time = parseInt(time);
    if(!time) { return ''; }

    var composedDate = new Date(time);
    var d_c = composedDate.getDate().toString();
    if(d_c.length<2) { d_c = "0"+d_c; }
    var m_c = (composedDate.getMonth()+1).toString();
    if(m_c.length<2) { m_c = "0"+m_c; }
    var y_c = composedDate.getFullYear().toString();
    return y_c+'-'+m_c+'-'+d_c;
};

Utils.inDates = function(start, end) {
    var now = (new Date()).getTime();
    if(start && start>now) {
        return false;
    }
    if(end && end<now) {
        return false;
    }
    return true;
};

module.exports = Utils;