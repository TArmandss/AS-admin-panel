import mongoose from 'mongoose';

const designTextObjectSchema = new mongoose.Schema(
    {
        text: String,
        fontFamily: String,
        color: String,
        angle: Number
    },
    { _id: false }
);

const designImageObjectSchema = new mongoose.Schema(
    {
        imageUrl: String,
        angle: Number
    },
    { _id: false }
);

const designDetailsSchema = new mongoose.Schema(
    {
        textObjects: [designTextObjectSchema],
        imageObjects: [designImageObjectSchema]
    },
    { _id: false }
);

const tshirtSideSchema = new mongoose.Schema(
    {
        'full-front': String,
        'only-color': String,
        'designDetails': designDetailsSchema
    },
    { _id: false }
);

const tShirtSizeSchema = new mongoose.Schema(
    {
        size: String,
        quantity: Number
    },
    { _id: false }
);

const stickerSizeSchema = new mongoose.Schema(
    {
        height: String,
        width: String
    },
    { _id: false }
);

const magnetsSizeCustomSchema = new mongoose.Schema(
    {
        width: String,
        height: String
    },
    { _id: false }
);

const itemSchema = new mongoose.Schema(
    {
        name: String,
        quantity: Number,
        price: Number,
        color: String,
        gender: String,
        size: String,
        teeId: String,
        comment: String,
        // ENVELOPES
        envelopeBackImage: String,
        envelopeSize: String,
        // INVITATIONS
        innerCardInvitation: String,
        backCardInvitation: String,
        frontCardInvitaion: String,
        invitationType: String,
        selectedColor: String,
        // BUSINESS CARDS
        businessCardFront: String,
        businessCardBack: String,
        // STICKERS
        stickerSize: stickerSizeSchema,
        stickerImage: String,
        // MAGNETS
        magnetImage: String,
        magnetsSizeCustom: magnetsSizeCustomSchema,
        // T-SHIRTS
        tShirtSizes: [tShirtSizeSchema],
        totalSize: Number,
        tShirtColor: String,
        frontTshirt: tshirtSideSchema,
        backTshirt: tshirtSideSchema,
        // MUGS
        mugContent: {
            mugImage: String,
            designDetails: designDetailsSchema
        }
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema({
    id: String,
    items: [itemSchema],
    status: String,
    paymentId: String,
    userName: String,
    userEmail: String,
    userPhone: String,
    pakomatsAddress: String,
    deliveryMethod: String,
    deliveryTerminal: String,
    totalAmount: Number,
    createdAt: String
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
