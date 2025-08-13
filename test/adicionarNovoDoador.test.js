const request = require('supertest');
const { expect } = require('chai');

describe('Adicionar novo doador', () => {
  describe('POST /api/donors', () => {
    it('Deve retornar 201 quando for adicionado novo doador', async () => {
      const respostaNovoDoador = await request('http://localhost:3000')
        .post('/api/donors')
        .set('Content-Type', 'application/json')
        .send({
          name: 'João Silva',
          bloodType: 'A+',
          contactInfo: '(11) 99999-9999'
        });

      expect(respostaNovoDoador.status).to.equal(201);
      expect(respostaNovoDoador.body).to.include({
        success: true,
        message: 'Doador adicionado com sucesso'
      });

      expect(respostaNovoDoador.body.data).to.include({
        name: 'João Silva',
        bloodType: 'A+',
        contactInfo: '(11) 99999-9999'
      });
      expect(respostaNovoDoador.body.data).to.have.property('id').that.is.a('number');
    });
  });

  describe('POST /api/donors', () => {
    it('Deve retornar 201 quando usuário não digitar nenhum dado no campo name', async () => {
      const respostaNovoDoador2 = await request('http://localhost:3000')
        .post('/api/donors')
        .set('Content-Type', 'application/json')
        .send({
          name: '',
          bloodType: 'O+',
          contactInfo: '(11) 98713-9888'
        });

      expect(respostaNovoDoador2.status).to.equal(201);
      expect(respostaNovoDoador2.body).to.include({
        success: true,
        message: 'Doador adicionado com sucesso'
      });

      expect(respostaNovoDoador2.body.data).to.include({
        name: '',
        bloodType: 'O+',
        contactInfo: '(11) 98713-9888'
      });
      expect(respostaNovoDoador2.body.data).to.have.property('id').that.is.a('number');
    });
  });

  describe('POST /api/donors', () => {
    it('Deve retornar 400 quando usuário não digitar nenhum dado no campo bloodType', async () => {
      const respostaNovoDoador3 = await request('http://localhost:3000')
        .post('/api/donors')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Carlos',
          bloodType: '',
          contactInfo: '(11) 98713-9882'
        });

      expect(respostaNovoDoador3.status).to.equal(400); 
      expect(respostaNovoDoador3.body).to.include({
        success: false,
        message: 'O campo tipoSanguineo é obrigatório',
        error: 'CAMPO_OBRIGATORIO_AUSENTE'
      });
    });
  });

  describe('POST /api/donors', () => {
    it('Deve retornar 400 quando usuário digitar dado inválido no campo bloodType', async () => {
      const respostaNovoDoador4 = await request('http://localhost:3000')
        .post('/api/donors')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Junior',
          bloodType: 'J+',
          contactInfo: '(11) 98713-9855'
        });

      expect(respostaNovoDoador4.status).to.equal(400); 
      expect(respostaNovoDoador4.body).to.include({
        success: false,
        message: 'Tipo sanguíneo deve ser um dos seguintes: A+, A-, B+, B-, AB+, AB-, O+, O-',
        error: 'TIPO_SANGUINEO_INVALIDO'
      });
    });
  });
});
