class Donor {
    constructor(id, name, bloodType, contactInfo) {
        this.id = id;
        this.name = name;
        this.bloodType = bloodType;
        this.contactInfo = contactInfo;
    }
}

let donors = [];
let currentId = 1;

class DonorsController {
    addDonor(req, res) {
        const { name, bloodType, contactInfo } = req.body;
        const newDonor = new Donor(currentId++, name, bloodType, contactInfo);
        donors.push(newDonor);
        
        res.status(201).json({
            success: true,
            message: 'Doador adicionado com sucesso',
            data: newDonor
        });
    }

    listDonors(req, res) {
        const { bloodType, id } = req.query;
        
        let filteredDonors = [...donors];
        
        // Filtro por tipo sanguíneo
        if (bloodType) {
            filteredDonors = filteredDonors.filter(donor => 
                donor.bloodType.toLowerCase() === bloodType.toLowerCase()
            );
        }
        
        // Filtro por ID
        if (id) {
            const donorId = parseInt(id);
            if (!isNaN(donorId)) {
                filteredDonors = filteredDonors.filter(donor => 
                    donor.id === donorId
                );
            }
        }
        
        if (filteredDonors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Nenhum doador encontrado com os critérios especificados',
                error: 'DOADORES_NAO_ENCONTRADOS',
                filtros: { bloodType, id }
            });
        }

        const categorizedDonors = filteredDonors.reduce((acc, donor) => {
            if (!acc[donor.bloodType]) {
                acc[donor.bloodType] = [];
            }
            acc[donor.bloodType].push(donor);
            return acc;
        }, {});

        res.status(200).json({
            success: true,
            message: 'Doadores listados com sucesso',
            data: categorizedDonors,
            total: filteredDonors.length,
            filtros: { bloodType, id }
        });
    }

    removeDonor(req, res) {
        const { id } = req.params;
        const donorId = parseInt(id) || 0;
        
        const donorIndex = donors.findIndex(donor => donor.id === donorId);
        
        if (donorIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Doador não encontrado',
                error: 'DOADOR_NAO_ENCONTRADO'
            });
        }
        
        const removedDonor = donors.splice(donorIndex, 1)[0];
        
        res.status(200).json({
            success: true,
            message: 'Doador removido com sucesso',
            data: removedDonor
        });
    }

}

module.exports = new DonorsController();