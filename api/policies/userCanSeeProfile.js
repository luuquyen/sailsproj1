/**
 * Allow a logger-in user to see, edit and update her own profile
 * Allow admins to see everyone
 * 
 */
module.exports = function(req, res, ok) {

  var sessionUserMatchesID = req.session.User.id === req.param('id');
  var isAdmin = req.session.User.admin;
  // User is allowed, proceed to controller, 
  if (!(sessionUserMatchesID || isAdmin)) {
    res.end('You must be an admin.');
    res.redirect('/session/new');
    return;
  }
  ok();
};
