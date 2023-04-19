// Importar las librerías necesarias
const mammoth = require("mammoth");
const axios = require("axios");

// Utilizar Dropzone.js para crear un objeto de carga de archivos
const myDropzone = new Dropzone("#my-dropzone", {
  url: "/upload",
});

// Manejar el evento de carga de archivo completado
myDropzone.on("complete", function (file) {
  // Utilizar mammoth.js para convertir el archivo a texto plano
  mammoth.extractRawText({ path: file }).then(function (result) {
    const text = result.value;

    // Pedir al usuario que ingrese un prompt
    const prompt = prompt("Por favor ingrese un prompt para enviar a ChatGPT");

    // Utilizar Axios para enviar el texto extraído y el prompt a la API de ChatGPT
    axios.post("https://api.openai.com/v1/engines/davinci-codex/completions", {
      prompt: prompt + "\n" + text,
      max_tokens: 50,
      n: 1,
      temperature: 0.7,
    }).then(function (response) {
      // Mostrar la respuesta de ChatG
