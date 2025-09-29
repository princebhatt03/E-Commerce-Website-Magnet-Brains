import { ObjectId } from 'mongodb';

export default {
  async create(ordersCol, { items, status, transactionId, email }) {
    try {
      const order = {
        items,
        status,
        transactionId,
        email,
        createdAt: new Date(),
      };
      const result = await ordersCol.insertOne(order);
      return { ...order, _id: result.insertedId };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  },
  async updateStatus(ordersCol, transactionId, status) {
    try {
      return await ordersCol.updateOne(
        { transactionId },
        { $set: { status } }
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  },
  async getByTransactionId(ordersCol, transactionId) {
    try {
      return await ordersCol.findOne({ transactionId });
    } catch (error) {
      console.error('Error fetching order by transactionId:', error);
      throw new Error('Failed to fetch order');
    }
  },
};
