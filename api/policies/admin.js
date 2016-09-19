/**
 * Allow any authenticated user
 * 
 */
module.exports = function(req, res, ok) {

  // User is allowed, proceed to controller, 
  if (req.session.User && req.session.User.admin) {
    return ok();
  }
  //User is not allowed
  else {
  	res.redirect('/session/new');
  	return;
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
 
};
