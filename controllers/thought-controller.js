const {Thought, User} = require('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought,find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            res.sendStatus(400).json(err)
        })
    },

    getSingleThoughts(req, res) {
        Thought.findOne({_id: URLSearchParams.id})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            res.sendStatus(400).json(err)
        })
    },

    createThought

}