const express = require('express');
const router = express.Router();
const donorsController = require('../controllers/donorsController');

// Middleware de validação para adicionar doador
const validateDonorData = (req, res, next) => {
    const { name, bloodType, contactInfo } = req.body;
    
    if (!bloodType) {
        return res.status(400).json({
            success: false,
            message: 'O campo tipoSanguineo é obrigatório',
            error: 'CAMPO_OBRIGATORIO_AUSENTE'
        });
    }
    
    // name pode ser qualquer tipo de dado ou mesmo vazio
    // Não há validação específica para este campo
    
    const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (!validBloodTypes.includes(bloodType)) {
        return res.status(400).json({
            success: false,
            message: 'Tipo sanguíneo deve ser um dos seguintes: A+, A-, B+, B-, AB+, AB-, O+, O-',
            error: 'TIPO_SANGUINEO_INVALIDO'
        });
    }
    
    // Verificar se bloodType não contém valores numéricos
    if (/\d/.test(bloodType)) {
        return res.status(400).json({
            success: false,
            message: 'Tipo sanguíneo não pode conter valores numéricos',
            error: 'TIPO_SANGUINEO_COM_NUMEROS'
        });
    }
    
    // contactInfo pode ser qualquer tipo de dado ou mesmo vazio
    // Não há validação específica para este campo
    
    next();
};



// Adicionar doador
router.post('/', validateDonorData, donorsController.addDonor);

// Listar doadores por tipo sanguíneo
router.get('/', donorsController.listDonors);

// Remover doador
router.delete('/:id', donorsController.removeDonor);

module.exports = router;