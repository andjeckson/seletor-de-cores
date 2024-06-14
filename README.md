# Seletor de cores

Este é um seletor de cores, feito usando canvas do JavaScript.

### Como usar?

> Para chamar o seletor, basta chamar a classe no **JavaScript**, usando o `new SeletorDeCores()`


#### Conheça os métodos:

| Método | Descrição |
| --- | --- |
| `abrir()` | Abre o seletor de cores.|
| `converterParaHEX()` | Converte as cores para hexadecimal |
| `aoSelecionar` | executa uma callback, com um argumento para a cor retornada.|

### Exemplo:

```javascript
   var seletor = new SeletorDeCores()
       seletor.abrir()
       seletor.aoSelecionar = (cor)=>{
        document.body.style.setProperty('background-color', cor)
     }
 ```
