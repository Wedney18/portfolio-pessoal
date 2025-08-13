const request = require('supertest');
const { expect } = require('chai');

describe('DELETE/donors Remover doador', () => {
  let criadorDoadorId;

  beforeEach(async () => {
    
    const resposta = await request('http://localhost:3000')
      .post('/api/donors')
      .send({
        name: 'Fulano Teste',
        bloodType: 'O+',
        contactInfo: '(11) 99999-9992'
      });
       criadorDoadorId = resposta.body.id;
  });

  it('Deve retornar 404 quando usuário preencher campo ID com dados inválidos de doador que não existe na lista de doadores', async () => {
    const respostaExcluirDoador = await request('http://localhost:3000')
      .delete('/api/donors')
      .send({ id: 99 });

    expect(respostaExcluirDoador.status).to.equal(404);
  });

  it('Deve retornar 200 quando usuário preencher campo ID com dados válidos de doador que existe na lista de doadores', async () => {
    const respostaExcluirDoador2 = await request('http://localhost:3000')
      .delete(`/api/donors/${criadorDoadorId}`);

    expect(respostaExcluirDoador2.status).to.equal(200);
    expect(respostaExcluirDoador2.body.message).to.equal('Doador removido com sucesso');
  });
});

 