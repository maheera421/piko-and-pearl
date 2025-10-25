import { body } from 'express-validator';

export const categoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('Category name is required.')
    .isString()
    .withMessage('Category name must be a string.')
    .isLength({ max: 100 })
    .withMessage('Category name must not exceed 100 characters.'),
  
  body('slug')
    .notEmpty()
    .withMessage('Slug is required.')
    .isString()
    .withMessage('Slug must be a string.')
    .isLength({ max: 100 })
    .withMessage('Slug must not exceed 100 characters.'),
  
  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL.'),
  
  body('mainHeading')
    .optional()
    .isString()
    .withMessage('Main heading must be a string.')
    .isLength({ max: 120 })
    .withMessage('Main heading must not exceed 120 characters.'),
  
  body('content')
    .optional()
    .isString()
    .withMessage('Content must be a string.'),
  
  body('metaTitle')
    .optional()
    .isString()
    .withMessage('Meta title must be a string.')
    .isLength({ max: 60 })
    .withMessage('Meta title must not exceed 60 characters.'),
  
  body('metaDescription')
    .optional()
    .isString()
    .withMessage('Meta description must be a string.')
    .isLength({ max: 160 })
    .withMessage('Meta description must not exceed 160 characters.'),
  
  body('keywords')
    .optional()
    .isString()
    .withMessage('Keywords must be a string.'),
];