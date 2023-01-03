const {Thought, User} = require('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought,find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        });
    },

    getSingleThoughts({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    createThought({ body }, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {username: body.username},
                { $push: { thoughts: _id } },
                { new: true }
            );

        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body,
            { new: true, runValidators: true }
        )
        .then(updatedThought => {
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this id' });
            }
        res.json(updatedThought);
        })
        .catch(err => res.json(err));
    },

    deleteThought({ params, body}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id'})
            }
            res.json(deletedThought);
        })
        .catch(err => res.json(err));
    },

    addReaction ({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

};

module.exports = thoughtController;