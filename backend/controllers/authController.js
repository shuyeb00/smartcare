import { db } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { role, name, specialization, description, fee, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (role === 'doctor') {
            await db.query(
                'INSERT INTO doctors (name, specialization, description, fee, email, password) VALUES (?, ?, ?, ?, ?, ?)',
                [name, specialization, description, fee, email, hashedPassword]
            );
        } else {
            await db.query(
                'INSERT INTO patients (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword]
            );
        }
        res.json({ message: 'Signup successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    const { role, email, password } = req.body;
    try {
        const table = role === 'doctor' ? 'doctors' : 'patients';
        const [rows] = await db.query(`SELECT * FROM ${table} WHERE email = ?`, [email]);
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role }, 'secretkey', { expiresIn: '1d' });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
