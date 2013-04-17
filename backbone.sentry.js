/*!
 * backbone.sentry.js v0.1.1
 * A Backbone plugin to protect your routes.
 * Copyright 2013, Tom Spencer (@fiznool)
 * backbone.sentry.js may be freely distributed under the MIT license.
 */
 ;(function(global) {

  // Mix this into the options that are fed to a Backbone Router.
  // Example:
  //  var routerOptions = _.extend(Backbone.Sentry, {
  //    routes: { /* Backbone Routes go here */}
  //  });
  //  var Router = Backbone.Router.extend(routerOptions);
  //  var router = new Router();

  // Local copy of global variables
  var _ = global._;
  var Backbone = global.Backbone;

  // Listen to the global Backbone history router event,
  // so we can track the current route.
  Backbone.history.on('route', function(router, name, args) {
    router.currentRoute = {
      name: name,
      args: args
    };
  });

  Backbone.Sentry = {
    // Override this function to test whether user is authenticated or not.
    isAuthenticated: function() {
      return false;
    },

    // Override to handle a non-authenticated user.
    // This could be a redirect to a login page.
    authenticateHandler: function() {
      console.warn('You need to implement authenticateHandler.');
    },

    // Call this function to protect a route handler.
    // Pass in the function to run when the authentication
    // has succeeded - this is usually logic to display a view.
    protect: function(cb) {
      if (_.result(this, 'isAuthenticated')) {
          cb.call(this);
      } else {
        this.authenticateHandler.call(this, cb);
      }
    },

    // Reloads the current handler.
    // Useful when you have logged out - if the current handler
    // is protected, this should kick you to the authenticateHandler.
    reload: function() {
      if (_.isObject(this.currentRoute) && this[this.currentRoute.name]) {
        this[this.currentRoute.name].apply(this, this.currentRoute.args);
      }
    }
  };

  // Or, just extend the Backbone Router
  Backbone.SentryRouter = Backbone.Router.extend(Backbone.Sentry);

})(this);