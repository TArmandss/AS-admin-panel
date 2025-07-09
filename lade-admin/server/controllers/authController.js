import bcrypt from 'bcryptjs';
import genToken from '../lib/utils.js';
import { User } from '../modals/user.modal.js';
import cloudinary from '../lib/cloudinary.js';

const getUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Visi lauki ir jāaizpilda' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Nederīga e-pasta adrese' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Nederīgs lietotājvārds vai parole' });
        }

        genToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            last_name: user.last_name,
            password: user.password
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const logOut = (req, res) => {
    try {
        res.cookie('token', '', { maxAge: 0 });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateProfile = async (req, res) => {
    const formData = req.body;

    const user = await User.findOne({ email: formData.email });
    if (!user) return res.status(404).json({ message: 'Lietotājs nebija atrasts' });

    if (formData.account_img !== user.account_img) {
        const uploadResponse = await cloudinary.uploader.upload(formData.account_img);
        formData.account_img = uploadResponse.secure_url; // Replace base64 with URL
    }

    // If the password is different, hash it
    if (formData.password) {
        const isOldPassword = await bcrypt.compare(formData.password, user.password);
        if (!isOldPassword) {
            const saltRounds = 12;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(formData.password, salt);
            formData.password = hashedPassword;
        }
    }

    Object.assign(user, formData);

    await user.save();
    res.status(200).json({ user });
};

const comparePasswords = async (req, res) => {
    const formData = req.body;

    const user = await User.findOne({ email: formData.email });
    if (!user) return res.status(404).json({ message: 'Lietotājs nebija atrasts' });
    const isSamePassword = await bcrypt.compare(formData.password, user.password);
    if (isSamePassword) {
        res.status(200).json({ passwordMatch: true });
    } else {
        res.status(401).json({ passwordMatch: false });
    }
};

export default { getUser, logOut, updateProfile, comparePasswords };
