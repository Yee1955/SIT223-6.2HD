const checkRole = (requiredRole) => {
    return (req, res, next) => {
        console.log('OIDC User:', req.oidc.user); // Check what the user object contains
        if (req.oidc.user && req.oidc.user['https://claims.example-app.com/roles']) {
            const roles = req.oidc.user['https://claims.example-app.com/roles'];
            console.log('User roles:', roles);
            if (roles.includes(requiredRole)) {
                next();
            } else {
                res.status(403).send('Access Denied: You do not have the necessary permissions.');
            }
        } else {
            console.log('No roles found or user object missing');
            res.status(403).send('Access Denied: Roles not found.');
        }
    };
};


module.exports = {
    checkRole
};
