// app/routes/routes.js
module.exports = function (app, passport) {

    // Session Routes API
    var session = require('../controller/session');


    app.post('/registration', passport.authenticate('local-signup'));

    //app.post('/registration2', function handleRegistration(req, res, next) {
    //    passport.authenticate('local-signup', function (err, user, info) {
    //
    //        if (err)
    //            return next(err);
    //        if (!user) {
    //            return res.status(403).json(info);
    //        }
    //
    //            //redirect user to its dashboard page
    //            res.render('dashboardShell.html');
    //
    //            console.log('User  : %s registered successfully',user.username);
    //        });
    //
    //    })(req, res, next);
    //});
    //}

    app.get('/auth/session', session.ensureAuthenticated);

    app.post('/auth/session', function handleLocalAuthentication(req, res, next) {

        passport.authenticate('local-login', function (err, user, info) {
            
            if (err)
                return next(err);
            if (!user) {          
                return res.status(403).json(info);             
            }

            // Manually establish the session...
            req.login(user, function (err) {
                if (err)
                    return next(err);

                //redirect user to its dashboard page
                res.render('dashboardShell.html');

                console.log('User : %s authenticated successfully',user.username);
            });

        })(req, res, next);
    });
    
    
    app.del('/auth/session', session.logout);


    app.get('/dashboard', function (req, res) {
        console.log('serving dashboard');
        res.render('dashboardShell.html');
    });

    // Angular Routes
    app.get('/partials/*', function (req, res) {
        res.render('partials/' + req.params.name);
    });

    app.get('/*', function (req, res) {
        if (req.user) {
            res.cookie('user', JSON.stringify(req.user.user_info));
        }
        console.log('serving index');
        res.render('index.html');
    });



};