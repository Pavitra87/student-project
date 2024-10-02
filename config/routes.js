/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "POST /user/register": "UserController.register",
  "POST/user/login": "UserController.login",

  //role
  "POST /role/create": "RoleController.create",

  "/": { view: "pages/homepage" },
};
