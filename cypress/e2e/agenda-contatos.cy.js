describe('Testes da Agenda de Contactos', () => {
  // O beforeEach corre antes de cada teste, abrindo sempre o URL exigido
  beforeEach(() => {
    cy.visit('https://ebac-agenda-contatos-tan.vercel.app/');
  });

  // 1. Teste de Inclusão
  it('Deve incluir um novo contacto', () => {
    cy.get('input[type="text"]').first().type('Vitor Bonato'); // Insere nome
    cy.get('input[type="email"]').type('vitor@teste.com'); // Insere email
    cy.get('input[type="tel"]').type('999999999'); // Insere telefone
    cy.get('.adicionar').click(); // Clica no botão de adicionar (ajustar classe se necessário)
    
    // Verifica se o contacto foi adicionado à lista
    cy.contains('Vitor Bonato').should('exist');
  });

  // 2. Teste de Alteração
  it('Deve alterar um contacto existente', () => {
    // Clica no botão de editar do último contacto (ou de um específico)
    cy.get('.edit').last().click(); 
    
    // Limpa o campo de nome e escreve um novo
    cy.get('input[type="text"]').first().clear().type('Vitor Editado'); 
    cy.get('.alterar').click();
    
    // Verifica se a alteração teve sucesso
    cy.contains('Vitor Editado').should('exist');
  });

  // 3. Teste de Remoção
  it('Deve remover um contacto', () => {
    // Conta quantos contactos existem antes
    cy.get('.contato').then(($contatos) => {
      const quantidadeInicial = $contatos.length;
      
      // Clica no botão de remover do último contacto
      cy.get('.delete').last().click();
      
      // Verifica se a quantidade diminuiu
      cy.get('.contato').should('have.length', quantidadeInicial - 1);
    });
  });
});