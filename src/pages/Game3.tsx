import { useState, useRef } from 'react'; //useState, useEffect, 
import './Game3.css';

export default function Game3() {
    
    const cina = useRef<HTMLDivElement>(null);
    const cinaPic = useRef<HTMLDivElement>(null);
    const pomp = useRef<HTMLDivElement>(null);
    const pompPic = useRef<HTMLDivElement>(null);

    const polaroid_images = {
        "cinnamoroll": ['./poloroid_safe/Cinnamoroll.png', '#BAE2F0'],
        "pompom": ['./poloroid_safe/Pompom.png', '#FFEF95'],
        "myMelody": ['./poloroid_safe/MyMelody.png', '#F7C7D6'],
        "kuromi": ['./poloroid_sage/Kuromi.png', '#D4D1E8'],
        "pochacco": ['./poloroid_safe/Pochacco.png', '#ABE0DA'],
        "helloKitty": ['./poloroid_safe/HelloKitty.png', '#F4A5AA'],
        "handyodon": ['./poloroid_safe/Hangyodon.png', '#AEC3E0'],
        "twinStars": ['./poloroid_safe/Twin.png', '#F7BA8B'],
        "tuxedosam": ['./poloroid_safe/Tuxedosam.png', '#BAE2F0'],
        "badBadTzMaru": ['./poloroid_safe/BADBADTZMARU.png', '#BEB8C2'],
        "cogimyun": ['./poloroid_safe/Cogimyun.png', '#F2D4D2'],
        'keroppi': ['./poloroid_safe/Keroppi.png', '#BDF4CA'],
        'mySweetPiano': ['./poloroid_safe/MYSWEETPIANO.png', '#F7CCD5'],
        'gudetama': ['./poloroid_safe/Gudetama.png', '#FDDCAC'],
        'pekkle': ['./poloroid_safe/AHIRUNOPEKKLE.png', '#51C5E2'],
        'marumofubiyori': ['./poloroid_safe/Marumofubiyori.png', '#BEE0DF']
    }

    const [leftImage, setLeftImage] = useState(polaroid_images["cinnamoroll"][0]);
    const [leftImage2, setLeftImage2] = useState('./poloroid_safe/Pompom.png');

    
    const transition = () => {
        if (cina.current) {
            cina.current.classList.add('moveLeftCenterLeft');
        }
        if (pomp.current) {
            pomp.current.classList.add('moveCenterLeft');
        }
        if (cinaPic.current) {
            cinaPic.current.classList.add('movePictureRight');
        }
        if (pompPic.current) {
            pompPic.current.classList.add('movePictureLeft');
        }
        setTimeout(() => { 
            
            setLeftImage('./poloroid_safe/Pompom.png');

            if (cina.current) {
                cina.current.style.backgroundColor = '#FFEF95';
                cina.current.style.zIndex = '2';
            }
            // setLeftImage2('./poloroid_safe/Kuromi.png')
            
            setTimeout(() => {
                let keys = Object.keys(polaroid_images)
                let random_image = Math.floor(Math.random() * keys.length);
                console.log(polaroid_images[keys[random_image]], keys)
                setLeftImage2(polaroid_images[keys[random_image]][0])
                if (pomp.current) {
                    pomp.current.style.backgroundColor = polaroid_images[keys[random_image]][1]
                }
            }, 50);

        }, 2450) 
        setTimeout(() => { 
            if (cina.current) {
                cina.current.classList.remove('moveLeftCenterLeft');
            }
            if (pomp.current) {
                pomp.current.classList.remove('moveCenterLeft');
            }
            if (cinaPic.current) {
                cinaPic.current.classList.remove('movePictureRight');
            }
            if (pompPic.current) {
                pompPic.current.classList.remove('movePictureLeft');
            }

        }, 5000);
    }

    return (
        <div className='backGround'>
            
            <div className='leftTrapezoid' ref={cina} onClick={() => transition()}>
                <div className='leftCard' ref={cinaPic} style={{backgroundImage: `url(${leftImage})`}}>

                </div>
            </div>
            <div className='rightTrapezoid' ref={pomp} onClick={() => transition()}>
                <div className='rightCard' ref={pompPic} style={{backgroundImage: `url(${leftImage2})`}}>
                </div>
                
            </div>
            <button className='swap' onClick={() => transition()}>
                Swaps {polaroid_images['cinnamoroll'][0]}
            </button>
        </div>

    );
};
