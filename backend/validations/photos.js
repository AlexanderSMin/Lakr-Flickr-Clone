const { check } = require('express-validator');
const { handleValidationErrors } = require('./../utils/validation');

const id = check('id')
  .notEmpty()
  .isInt({ min: 0 })
  .withMessage('You must put a valid ID to update');
const userId = check('userId')
  .notEmpty()
  .isInt({ min: 0 })
  .withMessage('You must be signed into account.');
const imageUrl = check('imageUrl')
  .notEmpty()
  .isURL({ require_protocol: false, require_host: false })
  .withMessage('Please provide a URL link');
const description = check('description')
  .isLength({ min: 0, max:255 })
  .withMessage('Description must be less than 255 characters');


  exports.validateCreate = [
    userId,
    imageUrl,
    description,
    handleValidationErrors,
  ];

  exports.validateUpdate = [
    id,
    userId,
    imageUrl,
    description,
    handleValidationErrors,
  ];
