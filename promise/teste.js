const myFn = (fnExecutor) => fnExecutor({ data: "myData" });

const value = myFn((res) => {
  // Salvar no banco de dados o data;
  // Executar funcoes assincronas;
  // salvar no contexto de alguma coisa;
  return res.data;
});

console.log(value);
