const Topic = require('../models/topic');

exports.getTopicById = (req, res, next, id) => {
  Topic.findById(id).exec((err, topic) => {
    if (err) {
      return res.status(400).json({
        error: 'Topic not found in DB'
      });
    }

    req.topic = topic;
    next();
  });
};

exports.createTopic = (req, res) => {
  const topic = new Topic(req.body);
  console.log(topic);
  topic.save((err, topic) => {
    if (err) {
      return res.status(400).json({
        error: 'Not able to save topic in DB'
      });
    }
    res.json({topic});
    console.log(req.body);
  });
};

exports.getTopic = (req, res) => {
  return res.json(req.topic);
};

exports.getAllTopic = (req, res) => {
  Topic.find().exec((err, topics) => {
    if (err) {
      return res.status(400).json({
        error: 'No topics found'
      });
    }

    res.json(topics);
  });
};

exports.updateTopic = (req, res) => {
  const topic = req.topic;
  topic.name = req.body.name;
  topic.save((err, updatedTopic) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to update topic'
      });
    }

    res.json(updatedTopic);
  });
};

exports.removeTopic = (req, res) => {
  const topic = req.topic;
  topic.remove((err, topic) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to delete this topic'
      });
    }

    res.json({
      message: 'Successfully deleted'
    });
  });
};
