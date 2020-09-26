const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
    const posts = await loadTasksCollection();
    res.send(await posts.find({}).toArray());
});

// Add post
router.post('/', async (req, res) => {
    const posts = await loadTasksCollection();
    await posts.insertOne({
        task: req.body.text,
        dateCreated: new Date()
    });
    res.status(201).send();
});

// Delete posts
router.delete('/:id', async (req, res) => {
    const posts = await loadTasksCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})
async function loadTasksCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Meta:1234@metaclouddb.ilspf.mongodb.net/my_tasklist?retryWrites=true&w=majority', 
    { useNewUrlParser: true});
    return client.db('vue_express').collection('mytasks');
}

module.exports = router;