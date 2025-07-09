import Order from '../modals/ordersModal.js';

const getOrders = async (req, res) => {
    try {
        const items = await Order.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const putCompletedOrder = async (req, res) => {
    const { orderId } = req.params;
    const { completed } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { id: orderId },
            { $set: { status: completed ? 'Pabeigts' : 'Nepabeigts' } },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Update failed:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.body;

    try {
        const deletedOrder = await Order.findOneAndDelete({ id });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Delete failed:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export { getOrders, putCompletedOrder, deleteOrder };
