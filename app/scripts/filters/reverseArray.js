'use strict'

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.filter('reverseArrayOnly', function() {
  return function(items) {
    if(!angular.isArray(items)) { return items; }
    return items.slice().reverse();
  };
});

app.filter('reverseAnything', function() {
  return function(items) {
    if(typeof items === 'undefined') { return; }
    return angular.isArray(items) ? 
      items.slice().reverse() : // If it is an array, split and reverse it
      (items + '').split('').reverse().join(''); // else make it a string (if it isn't already), and reverse it
  };
});
