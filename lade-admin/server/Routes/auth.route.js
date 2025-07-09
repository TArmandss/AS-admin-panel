import express from 'express';
import authController from '../controllers/authController.js';
import { protectRoute } from '../middleware/auth.protect.js';

const router = express.Router();

router.post('/login', authController.getUser);
router.post('/logout', authController.logOut);
router.put('/update-profile', protectRoute, authController.updateProfile);
router.post('/password-check', protectRoute, authController.comparePasswords);
router.get('/check-auth', protectRoute, (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error('Error in checkAuth ', error.message);
    }
});

export default router;
