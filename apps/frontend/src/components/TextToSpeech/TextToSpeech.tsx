export function speak(text: string) {
    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];

    // Keep track of the current utterance
    let currentUtterance: SpeechSynthesisUtterance | null = null;

    // Listen to end TTS
    utterance.addEventListener('end', () => {
        console.log('Speech synthesis ended');
        currentUtterance = null;
        speechSynthesis.cancel();
    });

    // Speak the text
    speechSynthesis.speak(utterance);

    // Store the current utterance
    currentUtterance = utterance;


    // Function to pause the speech synthesis
    function pauseSpeech() {
        if (currentUtterance) {
            speechSynthesis.pause();
            console.log('Speech synthesis paused');
        } else {
            console.log('No speech synthesis in progress');
        }
    }

    // Function to reset the speech path
    function resetSpeech() {
        speechSynthesis.cancel();
    }

    // Function to resume the speech synthesis
    function resumeSpeech() {
        if (currentUtterance) {
            speechSynthesis.resume();
            console.log('Speech synthesis resumed');
        } else {
            console.log('No speech synthesis in progress');
        }
    }

    return { pauseSpeech, resumeSpeech, resetSpeech };
}
