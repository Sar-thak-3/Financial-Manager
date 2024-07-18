const UserService = require('../services/userService');

class AuthController {
    static register(req, res) {
        const { name, email, password } = req.body;
        UserService.registerUser(name, email, password, (err, user) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json(user);
        });
    }

    static login(req, res) {
        const { email, password } = req.body;
        UserService.loginUser(email, password, (err, user) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            res.status(200).json(user);
        });
    }
}

module.exports = AuthController;
