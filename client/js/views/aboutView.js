define(['backbone','marionette', 'hbs!templates/about'], function(Backbone, Marionette, about){

  var AboutView = Backbone.Marionette.ItemView.extend({
    template: about
  });

  return AboutView;
});
