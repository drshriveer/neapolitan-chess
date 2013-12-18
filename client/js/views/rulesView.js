define(['backbone','marionette','hbs!templates/rules'], function(Backbone, Marionette, rules){

  var RulesView = Backbone.Marionette.ItemView.extend({
    template: rules
    // TODO: tie this in with markdown 
  });

  return RulesView;
  
});


