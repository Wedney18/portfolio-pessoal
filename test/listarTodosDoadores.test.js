const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app'); 

describe('GET /donors Listar todos os doadores', () => {
  before(async () => {
    await request('http://localhost:3000')
      .post('/api/donors')
      .send({ name: 'Santos', bloodType: 'O+', contactInfo: '(11) 98154-3455' });
  });

  it('Deve retornar 200 quando usuário preencher dados válidos', async () => {
    const respostaListarDoador = await request('http://localhost:3000')
      .get('/api/donors')
      .query({ name: 'Santos', bloodType: 'O+' });

    expect(respostaListarDoador.status).to.equal(200);
    expect(respostaListarDoador.body.success).to.be.true;
  });

  it('Deve retornar 404 quando usuário preencher dados inválidos', async () => {
    const respostaListarDoador2 = await request('http://localhost:3000')
      .get('/api/donors')
      .query({ name: 'Inexistente', bloodType: 'A-' });

    expect(respostaListarDoador2.status).to.equal(404);
    expect(respostaListarDoador2.body.error).to.equal('DOADORES_NAO_ENCONTRADOS');
  });
});