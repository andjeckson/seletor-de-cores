# Seletor de cores v 0.03


Este é um seletor de cores, feito usando canvas do JavaScript.

### Como usar?

> Para chamar o seletor, basta chamar a classe no **JavaScript**, usando o `new SeletorDeCores()`


#### Conheça alguns métodos:

| Método | Descrição |
| --- | --- |
| `abrir()` | Abre o seletor de cores.|
| `fechar()`| Fecha o seletor de cores. |
| `converterParaHEX()` | Converte as cores para hexadecimal |
| `aoAlterar` | Executa uma callback, com um parâmetro para a cor retornada, ao mover os deslizadores.|
| `aoFechar` | Executa uma callback com um parâmetro para a cor retornada, ao fechar o seletor de cores.

### Exemplo:

O código abaixo chama o seletor de cores e muda a cor de fundo da tag `<body>` ao alterar a cor.

```javascript
   var seletor = new SeletorDeCores()
       seletor.abrir()
       seletor.aoAlterar = (cor)=>{
        document.body.style.setProperty('background-color', cor)
     }
 ```
 