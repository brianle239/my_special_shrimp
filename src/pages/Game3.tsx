import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game3.css';
import '../components/loadingAnimation';

type CharacterCollections = {
    [key: string]: string[];
  };

export default function Game3() {

    const navigate = useNavigate();
    
    const leftTrap = useRef<HTMLDivElement>(null);
    const leftPic = useRef<HTMLDivElement>(null);
    const rightTrap = useRef<HTMLDivElement>(null);
    const rightPic = useRef<HTMLDivElement>(null);

    let polaroid_images: CharacterCollections = {
        "cinnamoroll": ['./poloroid_safe/Cinnamoroll.png', '#BAE2F0', './pokadots.svg', 'cinnamoroll'],
        "pompom": ['./poloroid_safe/Pompom.png', '#FFEF95', './stripes.svg', 'pompom'],
        "myMelody": ['./poloroid_safe/MyMelody.png', '#F7C7D6', './pokadots.svg', 'myMelody'],
        "kuromi": ['./poloroid_safe/Kuromi.png', '#D4D1E8', './stripes.svg', 'kuromi'],
        "pochacco": ['./poloroid_safe/Pochacco.png', '#ABE0DA', './pokadots.svg', 'pochacco'],
        "helloKitty": ['./poloroid_safe/HelloKitty.png', '#F4A5AA', './stripes.svg', 'helloKitty'],
        "handyodon": ['./poloroid_safe/Hangyodon.png', '#AEC3E0', './pokadots.svg', 'handyodon'],
        "twinStars": ['./poloroid_safe/Twin.png', '#F7BA8B', './stripes.svg', 'twinStars'],
        "tuxedosam": ['./poloroid_safe/Tuxedosam.png', '#BAE2F0', './pokadots.svg', 'tuxedosam'],
        "badBadTzMaru": ['./poloroid_safe/BADBADTZ-MARU.png', '#BEB8C2', './stripes.svg', 'badBadTzMaru'],
        "cogimyun": ['./poloroid_safe/Cogimyun.png', '#F2D4D2', './pokadots.svg', 'cogimyun'],
        'keroppi': ['./poloroid_safe/Keroppi.png', '#BDF4CA', './stripes.svg', 'keroppi'],
        'mySweetPiano': ['./poloroid_safe/MYSWEETPIANO.png', '#F7CCD5', './pokadots.svg', 'mySweetPiano'],
        'gudetama': ['./poloroid_safe/Gudetama.png', '#FDDCAC', './stripes.svg', 'gudetama'],
        'pekkle': ['./poloroid_safe/AHIRUNOPEKKLE.png', '#51C5E2', './pokadots.svg', 'pekkle'],
        'marumofubiyori': ['./poloroid_safe/Marumofubiyori.png', '#BEE0DF', './stripes.svg', 'marumofubiyori']
    }

    // pekkle is one pixel of padding

    const [leftImage, setLeftImage] = useState(polaroid_images["tuxedosam"]);
    const [rightImage, setRightImage] = useState(polaroid_images["badBadTzMaru"]);

    const [topPictures, setTopPictures] = useState<string[]>([]);

    let [shufflePictures, setShufflePictures] = useState<string[]>(Object.keys(polaroid_images));

    const [count, setCount] = useState(0);
    const [stage, setStage] = useState(-1);

    const shuffle = () => {
        let shuffledArray = [...shufflePictures]; // Create a copy of the array to avoid mutating the original array
        for (let i = 15; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        setShufflePictures(shuffledArray);
        console.log(shuffledArray, 1)
    }

    const newImages = () => {
        // Changs both left and right images
        console.log(shufflePictures, count);
        let leftImage = polaroid_images[shufflePictures[count]];
        let rightImage = polaroid_images[shufflePictures[count+1]];

        setLeftImage(leftImage);
        setRightImage(rightImage);
        setCount(count => count+2);

    }

    const slideTransition = (side: string) => {
        let leftTrapCurrent = leftTrap.current;
        let rightTrapCurrent = rightTrap.current;
        let leftPicCurrent = leftPic.current;
        let rightPicCurrent = rightPic.current;

        if (leftTrapCurrent && rightTrapCurrent) {
            leftTrapCurrent.classList.add('moveLeftCenterLeft');
            rightTrapCurrent.classList.add('moveCenterLeft');
            if (side == 'left') {
                leftTrapCurrent.style.zIndex = '2';
                rightTrapCurrent.style.zIndex = '1';
            }
            else {
                leftTrapCurrent.style.zIndex = '1';
                rightTrapCurrent.style.zIndex = '2';
            }
        }
        if (leftPicCurrent && rightPicCurrent) {
            leftPicCurrent.classList.add('movePictureRight');
            rightPicCurrent.classList.add('movePictureLeft');
        }
        
        // Changes order and then changes image
        setTimeout(() => { 
            if (side == 'right' && leftTrapCurrent) {
                setLeftImage(rightImage);
                leftTrapCurrent.style.zIndex = '3';
            }
            // Waits to change image
            setTimeout(() => {
                setRightImage(polaroid_images[shufflePictures[count]]);
            }, 100);
        }, 2450) 

        setTimeout(() => { 
            if (leftTrapCurrent && rightTrapCurrent) {
                leftTrapCurrent.classList.remove('moveLeftCenterLeft');
           
                rightTrapCurrent.classList.remove('moveCenterLeft');
            }
            if (leftPicCurrent && rightPicCurrent) {
                leftPicCurrent.classList.remove('movePictureRight');
                rightPicCurrent.classList.remove('movePictureLeft');
            }
            
        }, 5000);
    }

    const transition = (side: string) => {
        
        if (count%4 == 0 ) {
            
            if (side == 'left') {
                setTopPictures(prevTopPictures => {
                    const updatedPictures = [...prevTopPictures, leftImage[3]];
                    return updatedPictures;
                  });
            }
            else {
                setTopPictures(prevTopPictures => {
                    const updatedPictures = [...prevTopPictures, rightImage[3]];
                    return updatedPictures;
                  });
            }
            setStage(stage => stage+1);
        }
        else {
            slideTransition(side);
            setCount(count + 1);
        }
        console.log(count);
        
    }

    useEffect(() => {
        if (count == 16) {
            setShufflePictures(() => {
                
                return topPictures;
            })
            setCount(0);
           
        }
        else if (stage == -1) {
            shuffle();
            setStage(0);
            
        }
        else {
            newImages();
        }
    }, [stage]);

    useEffect(() => {
        if (shufflePictures.length == 4 && count == 0) {
            
            console.log(shufflePictures);
            newImages();
        }
        else if (shufflePictures.length == 4 && stage == 5) {
            navigate('/?gamecomplete=3');
        }
    }, [count, stage]);
    
    return (
        <div>
            <div className='backGround'>
                
                <div className='leftTrapezoid' ref={leftTrap} onClick={() => transition('left')} style={{backgroundColor: `${leftImage[1]}`, backgroundImage: `url(${leftImage[2]})`}}>
                    <div className='card leftCard leftCardHover' ref={leftPic} style={{backgroundImage: `url(${leftImage[0]})`}}>
                    </div>
                </div>
                <div className='rightTrapezoid' ref={rightTrap} onClick={() => transition('right')} style={{backgroundColor: `${rightImage[1]}`, backgroundImage: `url(${rightImage[2]})`}}>
                    <div className='card rightCard rightCardHover' ref={rightPic} style={{backgroundImage: `url(${rightImage[0]})`}}>
                    </div>
                </div>
            </div>
            
        </div>

    );
};
