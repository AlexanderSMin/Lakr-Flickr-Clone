const express = require('express');
const asyncHandler = require('express-async-handler');
const {Photo} = require('./../../db/models');

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
    '/',
    asyncHandler(async function(req, res) {
        const photos = await Photo.findAll();
        return res.json(photos);
    })
);

router.put(
    '/:id', photoValidations.validateUpdate,
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
    '/', photoValidations.validateCreate,
    asyncHandler(async function(req, res, next) {
      try{
        const newPhoto = await Photo.create(req.body);
        return res.json(newPhoto);
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
