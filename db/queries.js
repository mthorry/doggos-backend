var promise = require('bluebird');
var options = { promiseLib: promise };
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/doggos';
var db = pgp(connectionString);


// PHOTOS ===========================================================================

function getAllPhotos(req, res, next) {
  let username = req.params.username
  db.any('SELECT * FROM photos WHERE username = $1', username)
    .then( data => {
      res.status(200)
        .json({
          status: 'success',
          data: data
        })
    })
    .catch(function (err) {
      return next(err)
    })
}

function getSinglePhoto(req, res, next) {
  let photo = parseInt(req.params.photo_id)
  db.one('SELECT * FROM photos WHERE id = $1', photo)
    .then( data => {
      res.status(200)
        .json({
          status: 'success',
          data: data
        })
    })
    .catch( err => {
      return next(err)
    })
}

function createPhoto(req, res, next) {
  req.body.user_id = parseInt(req.body.user_id)
  db.none('INSERT INTO photos(caption, url, user_id)' + 'VALUES (${caption}, ${url}, ${user_id}', req.body)
    .then( function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'Added one Photo'
        })
    })
    .catch( err => {
      return next(err)
    })
}

function updatePhoto(req, res, next) {
  db.none('UPDATE photos SET caption=$1, url=$2',
    [req.body.caption, req.body.url]
    )
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Photo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePhoto(req, res, next) {
    var photoId = parseInt(req.params.photo_id);
  db.result('DELETE FROM photos WHERE id = $1', photoId)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Photo`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


// LIKES ===========================================================================

function likePhoto(req, res, next) {
  db
    .none("INSERT INTO likes (liker_id, photo_id)" + "VALUES(${liker}, ${photo})", {
      liker: req.user.id,
      photo: req.body.photo_id
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        likes: data
      });
    })
    .catch(err => {
      console.log(`Error`, err);
      res.status(500).json({
        status: 'Error',
        likes: err
      });
    });
}

function getPhotoLikes(req, res, next) {
  let photo_id = parseInt(req.params.photo_id)
  db
    .one(
      "SELECT Count(*) FROM photos JOIN likes ON likes.photo_id=photos.id WHERE likes.photo_id=$1",
      photo_id
    )
    .then(data => {
      res.status(200).json({
        status: 'success',
        likes: data.count
      });
    })
    .catch(err => {
      console.log(`Error`, err);
      res.status(500).json({
        status: 'Error',
        data: err
      });
    });
}


// FOLLOWS ===========================================================================

function addFollower(req, res, next) {
  db
    .none(
      "INSERT INTO follows (follower_username, followed_username) VALUES(${follower_username}, ${followed_username})",
      { follower_username: req.params.follower_username, followed_username: req.params.followed_username }
    )
    .then(data => {
      res.status(200).json({
        status: 'success',
        follow: "User followed"
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 'Error',
        follow: "User not followed"
      });
    });
}

function getFollowersCount(req, res, next) {
  db
    .one("SELECT COUNT(followed_username) FROM follows WHERE followed_username=${username}", {
      username: req.params.username
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        followers: data.count
      });
    });
}

function getFollowers(req, res, next) {
  db
    .any(
      "SELECT follower_username FROM follows JOIN users ON follows.followed_username=${username} WHERE users.username=${username}",
      {
        username: req.params.username
      }
    )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        data: "Error",
        err
      });
    });
}

function getFollowingCount(req, res, next) {
  db
    .one("SELECT COUNT(follower_username) FROM follows WHERE follower_username=${username}", {
      username: req.params.username
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        following: data.count
      });
    });
}

function getFollowing(req, res, next) {
  db
    .any(
      "SELECT followed_username FROM follows JOIN users ON follows.follower_username=${username} WHERE users.username=${username}",
      {
        username: req.params.username
      }
    )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        data: "Error",
        err
      });
    });
}


// ADOPTABLES ===========================================================================

function getAllAdoptables(req, res, next) {
  db.any('SELECT * FROM adoptables')
    .then( data => {
      res.status(200)
        .json({
          status: 'success',
          data: data
        })
    })
    .catch(function (err) {
      return next(err)
    })
}


module.exports = {
  getAllPhotos: getAllPhotos,
  getSinglePhoto: getSinglePhoto,
  createPhoto: createPhoto,
  updatePhoto: updatePhoto,
  removePhoto: removePhoto,
  likePhoto: likePhoto,
  getPhotoLikes: getPhotoLikes,
  addFollower: addFollower,
  getFollowersCount: getFollowersCount,
  getFollowers: getFollowers,
  getFollowing: getFollowing,
  getFollowingCount: getFollowingCount,
  getAllAdoptables: getAllAdoptables
};