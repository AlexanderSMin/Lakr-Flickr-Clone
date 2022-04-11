const express = require('express');
const asyncHandler = require('express-async-handler');
const {Photo} = require('./../../db/models');
const {Comment} = require('./../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get(
    '/',
    asyncHandler(async function(req, res) {
        const photos = await Photo.findAll();
        return res.json(photos);
    })
);

router.get(
    '/:id',
    asyncHandler(async function(req, res) {
        const photos = await Photo.findAll();
        return res.json(photos);
    })
);

  router.get(
    '/:id/comments',
    asyncHandler(async function(req, res) {
        const comments = await Comment.findAll(
        {
          where: {photoId: req.params.id}
        });
        return res.json(comments);
    })
  );

router.put(
    '/:id',
    asyncHandler(async function(req, res, next) {
      try{
        const updatedPhoto = await Photo.findByPk(req.params.id);
        await updatedPhoto.update(req.body);
        return res.json(updatedPhoto);
      } catch (err){
        next(err);
      }
    })
);

router.post(
    '/',
    asyncHandler(async function(req, res, next) {
      try{
        const newPhoto = await Photo.create(req.body);
        return res.json(newPhoto);
      } catch (err){
        next(err);
      }
    })
);

//comments
router.post(
  '/:id/comments',
  asyncHandler(async function(req, res, next) {
    console.log(req.body);
    try{
      const newComment = await Comment.create(req.body);
      console.log(newComment)
      return res.json(newComment);
    } catch (err){
      next(err);
    }
  })
);

router.delete(
    '/:id',
    asyncHandler(async function(req, res) {
      const photo = await Photo.findByPk(req.params.id);
      await photo.destroy();
      return res.json(req.body);
  })
);

module.exports = router;
