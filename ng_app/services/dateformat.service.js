app.factory('dateformatService', function () {

  return {

    format: function (datetimeIn) {
      console.log(datetimeIn);
      var year, month, day, hour, min;
      var i = 0;
      while(datetimeIn.charAt(i) != '-'  && i < datetimeIn.length) {
        ++i;
      }
      year = datetimeIn.substr(0, i);
      ++i;
      var lastI = i;
      while(datetimeIn.charAt(i) != '-'  && i < datetimeIn.length) {
        ++i;
      }
      month = datetimeIn.substr(lastI, i - lastI);
      ++i;
      lastI = i;
      while(datetimeIn.charAt(i) != 'T'  && i < datetimeIn.length) {
        ++i;
      }
      day = datetimeIn.substr(lastI, i - lastI);
      ++i;
      lastI = i;
      while(datetimeIn.charAt(i) != ':' && i < datetimeIn.length) {
        ++i;
      }
      hour = datetimeIn.substr(lastI, i - lastI);
      ++i;
      min = datetimeIn.substr(i, 2);

      amOrPm = 'AM';
      if(parseInt(hour) >= 12) {
        amOrPm = 'PM';
      }

      var hourInt = (parseInt(hour) % 12);
      hour = hourInt.toString();

      return month + '/' + day + '/' + year.substr(2, 2) +
          ' at ' + hour + ':' + min + ' ' + amOrPm;
    }
  };
});