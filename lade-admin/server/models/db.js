import mongoose from 'mongoose';

const mongoDB = () => {
    mongoose
        .connect(process.env.MONGO_DB_DRIVER)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            console.error('Error connecting to MongoDB:', err);
        });
};

export default mongoDB;
