const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');
const { route } = require('./home-routes');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where:{
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'post_text',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
          ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
          ]
    }).then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res)=>{
        Post.update(
            {
                title: req.body.title,
                post_url: req.body.post_url,
                post_text: req.body.post_text
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(dbPostData =>{
            if(!dbPostData){
                res.status(404).json({message: "No post found with this id"});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
      });

      router.delete('/:id', (req, res) => {
        Post.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(dbPostData => {
            if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
            }
            res.json(dbPostData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });

module.exports = router;