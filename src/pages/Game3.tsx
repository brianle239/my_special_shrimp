import { useState, useRef, useEffect } from 'react';
import './Game3.css';

type CharacterCollections = {
    [key: string]: string[];
  };

export default function Game3() {
    
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
        "badBadTzMaru": ['./poloroid_safe/BADBADTZMARU.png', '#BEB8C2', './stripes.svg', 'badBadTzMaru'],
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
    const [usedPictures, setUsedPictures] = useState<string[]>([]);

    const [count, setCount] = useState(0);
    const [stage, setStage] = useState(0);

    const randomImage = (restrict: string | null) => {
        // Currently have randodm and no dupes.
        // Future:  have it so that its a set
        let tempPolaroidImages = polaroid_images
        
        for (const key in tempPolaroidImages) {
            if ( usedPictures.includes(key) || (restrict && key == restrict)) {
                delete tempPolaroidImages[key];
            }
        }
        
        let keys = Object.keys(tempPolaroidImages)  
        let random_index: number = Math.floor(Math.random() * keys.length);
        setUsedPictures(prevPic => [...prevPic, keys[random_index]]);
        return polaroid_images[keys[random_index]];
    }

    const newImages = () => {
        // Changs both left and right images
        let leftImage = randomImage(null);
        let rightImage = randomImage(leftImage[3]);

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
                setRightImage(randomImage(null))
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
        if (count == 4) {
            
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
            
            if (count == totalCount) {
                return;
            }
            setCount(0);
            
        }
        else {
            slideTransition(side);
            setCount(count + 1);
        }
    }

    useEffect(() => {
        console.log("used", usedPictures, "top", topPictures, count);
        if (usedPictures.length == 16) {
            
            let x = usedPictures.filter(item => !topPictures.includes(item));
            setUsedPictures(() => {
                return x;
            });
            console.log("final", x);
            setStage(stage + 1);
        }
        else if (count == 0) {
            console.log("tes")
            newImages();
        }
        console.log(usedPictures.length)
    }, [count]);

    useEffect(() => {
        if (stage == 1) {
            newImages()
        }
    }, [stage]);

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
