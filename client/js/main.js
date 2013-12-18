require(["app", "router"], function(app, Router){

  app.start();
  app.router = new Router();
  Backbone.history.start();


  // Backbone.Layout.configure({
  //   manage: true,
  //   fetch: function(path){
  //     if(!Templates[path]){
  //       console.error("unknown template " + path);
  //     }else{
  //       return Templates[path];
  //     }
  //   }
  // }); //end layout configure

  // app.router = new Router();
  // Backbone.history.start({
  //   root: app.root
  // });

  // //This should catch all relative navagation and send it to backbone's router
  // $(document).on("click", "a:not([data-bypass])", function(event){
  //   var href = $(this).attr("href");
  //   if(href && href.indexOf("#") === 0){
  //     event.preventDefault(); //prevent page refresh
  //     Backbone.history.navigate(href, true);
  //   }
  // });

});

