import express from 'express';
import * as controller from '../controllers/customer.controller';

const router = express.Router();

// POST /api/customers/signup
router.post('/signup', controller.signup);

// POST /api/customers/signin
router.post('/signin', controller.signin);

// GET /api/customers/all
router.get('/all', controller.getAll);

export default router;
