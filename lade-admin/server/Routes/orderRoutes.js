import express from 'express';
import { getOrders, putCompletedOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/all-orders', getOrders);
router.put('/completed-order/:orderId', putCompletedOrder);

export default router;
