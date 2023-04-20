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
      api_key: "<TU_CLAVE_DE_API_DE_OPENAI>", // Reemplazar con tu clave de API
    }).then(function (response) {
      // Mostrar la respuesta de ChatGPT
      const output = document.getElementById("output");
      output.innerHTML = response.data.choices[0].text;
    }).catch(function (error) {
      // Manejar errores de Axios
      console.log(error);
    });
  }).catch(function (error) {
    // Manejar errores de mammoth.js
    console.log(error);
  });
});
