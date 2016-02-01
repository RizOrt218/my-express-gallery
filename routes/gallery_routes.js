var express = require( 'express' );
var router = express.Router();

var db = require( './../models' );
var Gallery = db.Gallery;

var bodyParser = require( 'body-parser' );

router.use( bodyParser.urlencoded ( { extended : true } ) );

//will only render the form page to add values into
//the gallery.
//users/new-form
router.route('/new')
  .get(function (req, res) {
    Gallery.findAll()
    .then( function ( gallery ) {
      res.render('users/new-form');
    });
  })
  .post( function (req, res ) {
    Gallery.create(
      {
        author: req.body.author,
        title: req.body.title,
        link: req.body.link,
        description: req.body.description
      }
    )
    .then( function ( ) {
      res.redirect( '/gallery' );
    });
  });

router.route('/')
  .get( function ( req, res ) {
    Gallery.findAll()
      .then( function ( allPhotos ) {
        res.render( 'users/allPhotos', {
          'gallery' : allPhotos,
        });
      });
  })
  .post( function (req, res ) {
    Gallery.create(
      {
        author: req.body.author,
        title: req.body.title,
        link: req.body.link,
        description: req.body.description
      }
    )
    .then( function ( gallery ) {
      res.redirect( '/gallery' );
    });
});

router.route('/new')
  .get( function ( req, res ) {

  });

router.route('/test')
  .get( function (req, res ) {
    res.render( 'test_landing_page' );
  }
);

router.route('/:id')
  .get( function (req, res) {
  var main = null;
  var thumbs = null;
    Gallery.findAll()
    .then( function (data) {
      thumbs = data;
      Gallery.findById(req.params.id)
        .then(function (data) {
          main = data;
        })
        .then(function (data) {
        res.render( 'users/singleImg', {
          gallery : main,
          thumbs : thumbs
        });
      });
    });
  })
  .put( function ( req, res ) {
    Gallery.update({
      author: req.body.author,
      title: req.body.title,
      link: req.body.link,
      description: req.body.description
    }, {
      where : {
        id : req.params.id
      }
    })
    .then( function ( gallery ) {
      res.redirect( '/gallery' );
    });
  })
  .delete( function ( req, res ) {
    Gallery.destroy({
      where : {
        id : req.params.id
      }
    })
    .then( function ( gallery ) {
      res.redirect( '/gallery' );
    });
  });


router.route('/:id/edit')
  .get( function ( req, res ) {
    Gallery.findAll({
      where: {
        id : req.params.id
      }
    })
    .then( function ( data ) {
      res.render( 'gallery/edit', {
        'gallery' : data[0]
      });
    });
});



module.exports = router;