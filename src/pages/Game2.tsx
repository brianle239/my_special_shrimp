import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game2.css';

export default function Game2() {

  const navigate = useNavigate();

  const [transcript, setTranscript] = useState('');
  const [lastWord, setLastWord] = useState('');
  const [listening, setListening] = useState(false);
  const soundList = [['bark', 'park', 'woof', 'rough', 'ruff'], ['meow', 'me'], ['quack', 'wack']];
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Animal animation vars
  const animations = ['./animals/dog_walking.gif', './animals/dog_backward.gif', './animals/cat_walking.gif', './animals/cat_backward.gif', './animals/duck_walking.gif', './animals/duck_backward.gif', '', ''];
  const [completion, setCompletion] = useState(0);
  const [height, setHeight] = useState(100);
  const [increment, setIncrement] = useState(-4);
  const intervalRef = useRef<number | null>(null); // To store the interval ID
  const incrementRef = useRef(increment);
  const [backgroundState, setBackgroundState] = useState(animations[0]);
  const [animalIndex, setAnimalIndex] = useState(0);
  

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
      startGameLoop();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      stopGameLoop();
    }
  };

  useEffect(() => {
    if (transcript != "") {
        const transscriptList = transcript.split(" ");
        let tempWord = transscriptList[transscriptList.length-1];
        console.log(tempWord)
        setLastWord(tempWord);
        if (soundList[animalIndex].includes(tempWord.toLowerCase())) {
          setCompletion(completion+10);
          increaseIncrement();
          const interval = setInterval(() => {
            decreaseIncrement();
            clearInterval(interval);
          }, 5000); // Adjust the interval time as needed
          return;
        } 
    }
    
  }, [transcript])

  const increaseIncrement = () => {
    setIncrement((prevIncrement) => {
      const newIncrement = prevIncrement + 5;
      incrementRef.current = newIncrement; // Update the ref with the new increment value
      return newIncrement;
    });
  };

  const decreaseIncrement = () => {
    setIncrement((prevIncrement) => {
      const newIncrement = prevIncrement - 5;
      incrementRef.current = newIncrement; // Update the ref with the new increment value
      return newIncrement;
    });
  };
  // Function to start the game loop
  const startGameLoop = () => {
    if (intervalRef.current !== null) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setHeight((prev) => {
        console.log(prev, incrementRef.current)
        if (prev >= 500) {
          stopGameLoop();
        }
        return prev + incrementRef.current;
      });
      if (incrementRef.current < 0) {
        setBackgroundState(animations[(2*animalIndex)+1]);
      }
      else {
        setBackgroundState(animations[(2*animalIndex)]);
      }
      

    }, 500); // Adjust the interval time as needed (1000ms = 1 second)

  };

  // Function to stop the game loop
  const stopGameLoop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      stopListening();
      
      setBackgroundState(animations[(animalIndex+1)*2]);
      setHeight(100);
      setAnimalIndex((prev) => {
        if (prev == 2) {
          navigate('/?gamecomplete=2');
        }
        return prev+1});
      
    }
  };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (animalIndex == 3) {
  //       navigate('/?gamecomplete=2');
  //     } 
  //     }, 1000);        
  // }, [animalIndex]);
  

  return (
    <>
      <div className='animal'>

        <div className='animalImage' style={{backgroundImage: `url(${backgroundState})`, height: `${height}px`}}></div>
        {/* <div className='animalImage' style={{backgroundImage: `url(${catBackgroundState})`, height: `${catHeight}px`}}></div> */}
      </div>
      <div className='control'>
        <p>{listening ? `${lastWord}` : 'Lure in the Animal'}</p>
        <button onClick={startListening} disabled={listening}>Start Listening</button>
        {/* <button onClick={stopListening} disabled={!listening}>Stop Listening</button> */}
        
        {/* <p>Last Word: {lastWord}</p> */}
        
      </div>
      {/* <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{width:`${completion}%`}}></div>
      </div> */}
    </>
  );
};

