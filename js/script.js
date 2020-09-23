const btn = document.querySelector("button");
cont outputme = document.querySelector(".output-you");
const outputbot = document.querySelector(".output-bot");

const SpeechRecognition =
    window.SpeechRecognition = || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lan = "en=US";
recognition.interimResults = false;

btn.addEventListener("click", () => {
    recognition.start();
});
console.log("imadeit");
recognition.onresult = function(event) {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    console.log(text);

    outputme.textContent = text;
};

const socket = io();

const botReply = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.pitch = 1;
    utterance.volume = 1;
    synth.speak(utterance);
};

socket.on("bot reply", (text) => {
    outputbot.textContent = text;
    botReply(text);
});