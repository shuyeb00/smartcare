import { db } from '../config/db.js';

export const getDoctors = async (req, res) => {
    const { name, specialization } = req.query;
    try {
        let sql = 'SELECT * FROM doctors WHERE 1=1';
        let params = [];
        if (name) {
            sql += ' AND name LIKE ?';
            params.push(`%${name}%`);
        }
        if (specialization) {
            sql += ' AND specialization LIKE ?';
            params.push(`%${specialization}%`);
        }
        const [rows] = await db.query(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
