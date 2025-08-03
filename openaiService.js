async function gerarReceitaPersonalizada(objetivo, restricoes, modificacaoExtra = '') {
  const prompt = `
Crie uma receita saudável com base no seguinte objetivo: "${objetivo}".
Leve em conta as seguintes restrições médicas/dietéticas: "${restricoes}".
${modificacaoExtra ? `O usuário também pediu: ${modificacaoExtra}.` : ''}
A receita deve conter:
- Nome da receita
- Ingredientes detalhados
- Modo de preparo passo a passo
- Porções ideais para esse objetivo
`;

  return await gerarResposta(prompt);
}
