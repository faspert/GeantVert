// app/routes/routes.js
module.exports = function (app, passport) {

    // Session Routes API
    var session = require('../controller/session');

    app.get('/auth/session', session.ensureAuthenticated);

    app.post('/auth/session', function handleLocalAuthentication(req, res, next) {

        passport.authenticate('local-login', function (err, user, info) {
            if (err)
                return next(err);
            if (!user) {                
                return res.json(403, info);
            }

            // Manually establish the session...
            req.login(user, function (err) {
                if (err)
                    return next(err);
                console.log('User authenticated successfully');
                //res.redirect('/users/' + user);
            });

        })(req, res, next);
    });
    
    
    app.del('/auth/session', session.logout);



    // Angular Routes
    app.get('/partials/*', function (req, res) {
        console.log('serving partial view');
        //var requestedView = path.join('./', req.url);
        res.render('partials/' + req.params.name);
    });

    app.get('/dashboard/*', function (req, res) {
    });

    app.get('/*', function (req, res) {
        if (req.user) {
            res.cookie('user', JSON.stringify(req.user.user_info));
        }
        console.log('serving index');
        res.render('index.html');
    });



};