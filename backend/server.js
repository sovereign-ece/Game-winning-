const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to your Database (MongoDB)
mongoose.connect('your_mongodb_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 2. Define the User Model (The 'Shape' of your data)
const UserSchema = new mongoose.Schema({
    telegramId: { type: String, unique: true, required: true },
    balance: { type: Number, default: 0 },
    lastMint: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

// 3. The "Mint" Endpoint (Called when the ad finishes)
app.post('/api/mint', async (req, res) => {
    const { telegramId } = req.body;

    try {
        let user = await User.findOne({ telegramId });
        
        if (!user) {
            // Create new miner if they don't exist
            user = new User({ telegramId, balance: 500 });
        } else {
            // Add tokens to existing miner
            user.balance += 500;
            user.lastMint = Date.now();
        }

        await user.save();
        res.status(200).json({ success: true, newBalance: user.balance });
    } catch (error) {
        res.status(500).json({ success: false, message: "Database Error" });
    }
});

// 4. Get Balance Endpoint
app.get('/api/balance/:id', async (req, res) => {
    const user = await User.findOne({ telegramId: req.params.id });
    res.json({ balance: user ? user.balance : 0 });
});

app.listen(3000, () => console.log('Efikcoin Engine running on port 3000'));
