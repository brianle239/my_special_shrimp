import { useState, useEffect, useRef } from 'react';
import './Game2.css';

// interface SpeechRecognition {
//   grammars: typeof SpeechGrammarList;
//   lang: string;
//   continuous: boolean;
//   interimResults: boolean;
//   maxAlternatives: number;
//   start(): void;
//   stop(): void
// }

const Game2 = () => {
  const [transcript, setTranscript] = useState('');
  const [lastWord, setLastWord] = useState('');
  const [listening, setListening] = useState(false);
  const soundList = ['bark', 'quack', 'meow'];
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      console.error('Your browser does not support speech recognition.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition() as SpeechRecognition;
    recognitionRef.current = recognition;
    if (recognition && recognitionRef.current) {
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
      const grammar = `#JSGF V1.0; grammar sounds; public <sound> = meow\\100 | quack\\100 | crack\\0.01 | clock\\.01 | bark\\100 | Mia\\0.01 | yeah\\0.01;`;

      const speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognitionRef.current.grammars = speechRecognitionList;
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          const transcriptSegment = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptSegment;
          } else {
            interimTranscript += transcriptSegment;
          }
        }
        setTranscript(finalTranscript + interimTranscript);
    }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event);
    };

    recognitionRef.current.onend = () => {
      setListening(false);
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  useEffect(() => {
    if (transcript != "") {
        const transscriptList = transcript.split(" ");
        let tempWord = transscriptList[transscriptList.length-1];
        console.log(tempWord)
        setLastWord(tempWord);
        if (soundList.includes(tempWord)) {
          setCompletion(completion+10);
          console.log(completion)
        }
        
    }
    
  }, [transcript]
)

  return (
    <>
    
      <div>
        <button onClick={startListening} disabled={listening}>Start Listening</button>
        <button onClick={stopListening} disabled={!listening}>Stop Listening</button>
        <p>{listening ? 'Listening' : 'Click "Start Listening" to begin (Bark, Meow, or Quack)'}</p>
        <p>Last Word: {lastWord}</p>
        
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{width:`${completion}%`}}></div>
      </div>
    </>
  );
};

export default Game2;
