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

    const polaroid_images: CharacterCollections = {
        "cinnamoroll": ['./poloroid_safe/Cinnamoroll.png', '#BAE2F0', './pokadots.svg'],
        "pompom": ['./poloroid_safe/Pompom.png', '#FFEF95', './stripes.svg'],
        "myMelody": ['./poloroid_safe/MyMelody.png', '#F7C7D6', './pokadots.svg'],
        "kuromi": ['./poloroid_safe/Kuromi.png', '#D4D1E8', './stripes.svg'],
        "pochacco": ['./poloroid_safe/Pochacco.png', '#ABE0DA', './pokadots.svg'],
        "helloKitty": ['./poloroid_safe/HelloKitty.png', '#F4A5AA', './stripes.svg'],
        "handyodon": ['./poloroid_safe/Hangyodon.png', '#AEC3E0', './pokadots.svg'],
        "twinStars": ['./poloroid_safe/Twin.png', '#F7BA8B', './stripes.svg'],
        "tuxedosam": ['./poloroid_safe/Tuxedosam.png', '#BAE2F0', './pokadots.svg'],
        "badBadTzMaru": ['./poloroid_safe/BADBADTZMARU.png', '#BEB8C2', './stripes.svg'],
        "cogimyun": ['./poloroid_safe/Cogimyun.png', '#F2D4D2', './pokadots.svg'],
        'keroppi': ['./poloroid_safe/Keroppi.png', '#BDF4CA', './stripes.svg'],
        'mySweetPiano': ['./poloroid_safe/MYSWEETPIANO.png', '#F7CCD5', './pokadots.svg'],
        'gudetama': ['./poloroid_safe/Gudetama.png', '#FDDCAC', './stripes.svg'],
        'pekkle': ['./poloroid_safe/AHIRUNOPEKKLE.png', '#51C5E2', './pokadots.svg'],
        'marumofubiyori': ['./poloroid_safe/Marumofubiyori.png', '#BEE0DF', './stripes.svg']
    }

    // pekkle is one pixel of padding

    const [leftImage, setLeftImage] = useState(polaroid_images["cinnamoroll"]);
    const [rightImage, setRightImage] = useState(polaroid_images["pompom"]);

    const randomImage = (restrictedImage: string[] | null) => {
        // Currently have randodm and no dupes.
        // Future:  have it so that its a set
        let tempPolaroidImages = polaroid_images
        if (restrictedImage) {
            for (const key in tempPolaroidImages) {
                if (tempPolaroidImages[key] === restrictedImage) {
                  delete tempPolaroidImages[key];
                }
            }
        }

        let keys = Object.keys(tempPolaroidImages)
        if (restrictedImage) {
            keys.splice(keys.indexOf(restrictedImage[0]), 1)
        }
        let random_index: number = Math.floor(Math.random() * keys.length);
        return polaroid_images[keys[random_index]]
    }

    const transition = (side: string) => {
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
        
        setTimeout(() => { 
            if (side == 'right' && leftTrapCurrent) {
                setLeftImage(rightImage);
                leftTrapCurrent.style.zIndex = '3';
            }

            setTimeout(() => {
                // let keys = Object.keys(polaroid_images)
                // let random_index: number = Math.floor(Math.random() * keys.length);
                // let random_name: string[] = polaroid_images[keys[random_index]]
                setRightImage(randomImage(rightImage))
                
            }, 50);

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

    useEffect(() => {
        
        let leftImage = randomImage(null);

        console.log(leftImage)
        let rightImage = randomImage(leftImage);

        setLeftImage(leftImage);
        setRightImage(rightImage);
    }, []);

    return (
        <div className='backGround'>
            
            <div className='leftTrapezoid' ref={leftTrap} onClick={() => transition('left')} style={{backgroundColor: `${leftImage[1]}`, backgroundImage: `url(${leftImage[2]})`}}>
                <div className='leftCard' ref={leftPic} style={{backgroundImage: `url(${leftImage[0]})`}}>
                </div>
            </div>
            <div className='rightTrapezoid' ref={rightTrap} onClick={() => transition('right')} style={{backgroundColor: `${rightImage[1]}`, backgroundImage: `url(${rightImage[2]})`}}>
                <div className='rightCard' ref={rightPic} style={{backgroundImage: `url(${rightImage[0]})`}}>
                </div>
            </div>
        </div>

    );
};
