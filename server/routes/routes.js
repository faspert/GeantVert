// app/routes/routes.js
module.exports = function (app, passport) {

    // Session Routes API
    var session = require('../controller/session');
    // load up the user model
    var User            = require('../models/users');


    app.post('/registration', passport.authenticate('local-signup'));

    app.post('/registration2', function (req, res, next) {

        process.nextTick(function() {
            console.log('try to find existing user')
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return next(err);

                // check to see if there is already a user with that email
                if (user) {
                    return res.status(403).json({ message: 'Email is already registered.' });
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser            = new User();

                    // set the user's local credentials
                    newUser.local.email    = req.body.email;
                    newUser.local.username = req.body.username;
                    newUser.local.password = newUser.generateHash(req.body.password);

                    console.log('I am creating a new user');
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                    });

                    //login manually with local passport strategy
                    req.login(user, function (err) {
                        if (err)
                            return next(err);

                        //redirect user to its dashboard page
                        res.status(200);

                        console.log('User : %s authenticated successfully',user.username);
                }

            });

        });
    }

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