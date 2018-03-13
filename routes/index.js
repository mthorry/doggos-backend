var express = require('express');
var router = express.Router();

var db = require('../db/queries');

// Photos
router.get('/api/:username/photos', db.getAllPhotos);
router.get('/api/:username/photos/:photo_id', db.getSinglePhoto);
router.post('/api/:username/photos/new', /* loginRequired, */ db.createPhoto);
router.put('/api/:username/photos/:photo_id', db.updatePhoto);
router.delete('/api/:username/photos/:photo_id', db.removePhoto);


// Likes
router.get('/api/:username/photos/:photo_id/likes', db.getPhotoLikes);
router.post('/api/:username/photos/:photo_id/likes', db.likePhoto);


// Follows
router.post('/api/:followed_username/addFollower/:follower_username', /* loginRequired, */ db.addFollower)
router.get('/api/:username/followers/count', db.getFollowersCount)
router.get('/api/:username/followers', db.getFollowers)
router.get('/api/:username/following/count', db.getFollowingCount)
router.get('/api/:username/following', db.getFollowing)


// Adoptables
router.get('/api/adoptables', db.getAllAdoptables)

module.exports = router;
