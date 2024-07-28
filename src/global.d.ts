interface SpeechRecognition {
    grammars: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechGrammarList: typeof SpeechGrammarList;
    SpeechGrammarList: typeof SpeechGrammarList;
  }
  
  declare var webkitSpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };
  
  declare var SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };
  
  declare var webkitSpeechGrammarList: {
    prototype: SpeechGrammarList;
    new (): SpeechGrammarList;
  };
  
  declare var SpeechGrammarList: {
    prototype: SpeechGrammarList;
    new (): SpeechGrammarList;
  };
 
