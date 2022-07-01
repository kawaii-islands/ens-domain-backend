const express = require('express');
const identityRoute = require('./identity.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/identity',
    route: identityRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
