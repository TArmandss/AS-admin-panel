import jwt from 'jsonwebtoken';

const genToken = (userId, res) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT SECRET IS NOT DEFINED');

    //GENERETING A TOKEN <Header>.<Payload>.<Signature>
    const token = jwt.sign({ userId }, jwtSecret, {
        expiresIn: '7d'
    });

    res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS for 7days
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
    });

    return token;
};

export default genToken;
