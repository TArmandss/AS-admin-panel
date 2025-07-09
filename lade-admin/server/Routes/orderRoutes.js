import express from 'express';
import { getOrders, putCompletedOrder,deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/all-orders', getOrders);
router.put('/completed-order/:orderId', putCompletedOrder);
router.delete('/delete-order',deleteOrder)

export default router;
