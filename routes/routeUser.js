//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/controllerUser');
const User = require('../models/modelUser.js');
const JWT_SECRET = require('../secrets/secret');
const Jwt = require('jsonwebtoken');
const passport = require('passport');

//CREATE
router.post("/user", (req, res) => {
     
    controller.create(req, res);

});

//READ
router.get("/users", (req, res) => {
    
    controller.reads(req, res);
    
});

router.get("/user/:id", (req, res) => {
    controller.read(req, res);
});

//UPDATE
router.put("/user/:id", (req, res) => {

    controller.update(req, res);
});

//DELETE
router.delete("/user/:id", (req, res) => {
    
    controller.delete(req, res);
});

router.get('/createUser', async (req, res) => {
    // create a user a new user
    var testUser = new User({
        nom: 'el ouahabi',
        prenom: 'saphya',
        email: 'saphya@gmail.com',
        password: 'Motdepasse123'
    });
    try {
        // save user to database
        await testUser.save() 
        res.send('utilisateur enregistré')
      
    } catch (error) {
      res.send('utilisateur déjà existant')
      console.error(error);
    }
})

router.get('/testMdp', (req, res) => {
    // fetch user and test password verification
    User.findOne({ email: 'saphya@gmail.com' }, function (err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword('Motdepasse123', function (err, isMatch) {
            if (err) throw err;
            console.log('Motdepasse123:', isMatch); // -> Motdepasse123: true
        });

        // test a failing password
        user.comparePassword('123Motdepasse', function (err, isMatch) {
            if (err) throw err;
            console.log('123Motdepasse:', isMatch); // -> 123Motdepasse: false
        });
    });

    res.send('le testMdp fonctionne')
})

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
  
        // test a matching password
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) throw err;
        
            if(req.body.password , isMatch){
                
                const token = Jwt.sign({id: user._id, password: user.password, email: user.email},
                '123456',
                {expiresIn:'1 week'})

                res.send(token)
            } else {
                res.send("mot de passe ou email incorrect")
            }
        });


    });
});
router.get('/', passport.authenticate('jwt'), function (req, res){
    res.json(req.user)
});

  router.get('*', function(req, res){
    res.send('ERREUR 404', 404); 
  });


module.exports = router;