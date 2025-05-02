
const emailTemplate = `
    <div>
        <h1>Hi, {{name}}</h1>
        <p>Thank you for your order<p>
    </div>;
`;

// Hay otras formas de depuracion que no sea con console.log
//  console.log(emailTemplate);

// Si sacamos el console.log de arriba al archivo de aranque podriamos pensar que despues del 
// required ya estaria en memoria la consola y que no tendriamos problemas pero si hacemos eso tendremos un error
// ya que cada archivo en Node es un modulo (Objeto encapsulado) no podemos nosotros usar esas variables o funciones 
// a solo que esten siendo exportadas (eso seria exponer al mundo de afuero esas funcionalidades)

// Esta es la forma de Exportar en Node
module.exports = {
    emailTemplate
}