var express = require('express');
var router = express.Router();
const {
  getTopicById,
  createTopic,
  getTopic,
  getAllTopic,
  updateTopic,
  removeTopic
} = require('../controllers/topic');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');

// params
router.param('userId', getUserById);
router.param('topicId', getTopicById);

// actual routers
// create
router.post(
  '/topic/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createTopic
);
// read
router.get('/topic/:topicId', getTopic);
router.get('/topics', getAllTopic);
// update
router.put(
  '/topic/:topicId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateTopic
);
// delete
router.delete(
  '/topic/:topicId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeTopic
);

module.exports = router;
