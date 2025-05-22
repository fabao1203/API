// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database');

router.post('/admin/login', async (req, res) => {
    const { email, senha } = req.body;
    
    try {
        const [admin] = await db.query(`
            SELECT * FROM administradores WHERE email = ?
        `, [email]);
        
        if (admin.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        const isValid = await bcrypt.compare(senha, admin[0].senha_hash);
        
        if (!isValid) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        req.session.adminLoggedIn = true;
        req.session.adminId = admin[0].id;
        req.session.adminEmail = admin[0].email; // Add email to session
        
        res.json({ 
            success: true,
            email: admin[0].email // Include email in response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

module.exports = router;