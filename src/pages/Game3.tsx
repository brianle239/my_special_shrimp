import {useRef } from 'react'; //useState, useEffect, 
import './Game3.css';

export default function Game3() {

    const cina = useRef<HTMLDivElement>(null);
    const cinaPic = useRef<HTMLDivElement>(null);
    const pomp = useRef<HTMLDivElement>(null);
    const pompPic = useRef<HTMLDivElement>(null);

    const transition = () => {
        if (cina.current) {
            cina.current.classList.add('moveCenterRight');
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
    }

    return (
        <div className='backGround'>
            
            <div className='leftTrapezoid' ref={cina}>
                <div className='leftCard' ref={cinaPic}>

                </div>
            </div>
            <div className='rightTrapezoid' ref={pomp}>
                <div className='rightCard' ref={pompPic}>

                </div>
                
            </div>
            <button className='swap' onClick={() => transition()}>
                Swaps
            </button>
        </div>

    );
};
