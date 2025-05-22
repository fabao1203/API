// middleware/auth.js
function authenticateAdmin(req, res, next) {
  if (req.session && req.session.adminLoggedIn) {
      return next();
  }
  res.status(401).json({ error: 'Acesso não autorizado' });
}

module.exports = { authenticateAdmin };