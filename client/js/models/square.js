define(['backbone', 'marionette'], function(Backbone, Marionette){

  var Square = Backbone.Model.extend({
    defaults: {
      row: 0,
      col: 0,
      val: '',
      classes: 'black'
    }
  });
  return Square;
});