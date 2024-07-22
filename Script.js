// Diccionario personalizado para traducción
const customDictionary = {
   
 "hola": "padiushi",
    "como": "tianii",
    "estas": "cualuu",
    "are": "estas_custom",
    "you": "tu"
 



   // Agrega más palabras y sus traducciones personalizadas aquí
};

// Inicia el reconocimiento de voz
document.getElementById('start-recording').addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Idioma del reconocimiento de voz
    recognition.interimResults = false; // Solo resultados finales
    recognition.maxAlternatives = 1; // Solo una alternativa

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        document.getElementById('text-output').value = transcript;
    };

    recognition.onerror = (event) => {
        console.error('Error de reconocimiento de voz:', event.error);
        document.getElementById('text-output').value = 'Error en el reconocimiento de voz.';
    };

    recognition.start();
});

// Función para traducir texto usando el diccionario personalizado
function translateText(text) {
    const words = text.split(' ');
    const translatedWords = words.map(word => customDictionary[word] || word);
    return translatedWords.join(' ');
}

// Traducir el texto cuando se haga clic en el botón de traducir
document.getElementById('translate-button').addEventListener('click', () => {
    const text = document.getElementById('text-output').value;
    const translatedText = translateText(text);
    document.getElementById('text-output').value = translatedText;
});

// Reproducir el texto traducido usando la síntesis de voz
document.getElementById('speak-button').addEventListener('click', () => {
    const text = document.getElementById('text-output').value;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Idioma de la síntesis de voz, cámbialo según sea necesario
    window.speechSynthesis.speak(utterance);
});