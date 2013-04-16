/*!
 * backbone.sentry.js v0.1.0
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
    // Pass in the target route handler so that
    // the authenticate handler can call this
    // when authentication has succeeded.
    protect: function(targetRoute) {
      if (_.result(this, 'isAuthenticated')) {
          targetRoute.call(this);
      } else {
        this.authenticateHandler.call(this, targetRoute);
      }
    }
  };

  // Or, just extend the Backbone Router
  Backbone.SentryRouter = Backbone.Router.extend(Backbone.Sentry);

})(this);