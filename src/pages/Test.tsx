import './Test.css'
import { useRef, useState, useEffect, useLayoutEffect } from 'react';



export default function Test() {
    const text: string[] = ["goup1.1", "group1.2", "group1.3", "group1.4", 
                            "goup2.1", "group2.2", "group2.3", "group2.4",
                            "goup3.1", "group3.2", "group3.3", "group3.4",
                            "goup4.1", "group4.2", "group4.3", "group4.4"]


    const parentRef = useRef<HTMLDivElement>(null);
    const [parentRendered, setParentRendered] = useState(false);
    const [integerPairs, setIntegerPairs] = useState(Array(16).fill([0, 0]));
    const [divRefs, setDivRefs] = useState(Array.from({ length: 16 }, () => useRef(null)));
    const [hasSwapped, setHasSwapped] = useState(false);
   
    function getViewportDimensions(): { vh: number; vw: number } {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);
        return { vh, vw };
    }
      
    // Function to convert pixels to vh or vw
    function pixelsToUnit(pixels: number, unit: 'vh' | 'vw'): number {
    const { vh, vw } = getViewportDimensions();
    switch (unit) {
        case 'vh':
        return pixels / vh;
        case 'vw':
        return pixels / vw;
        default:
        throw new Error('Invalid unit. Use "vh" or "vw".');
    }
    }

    function placeCard() {
        let padding: number = 0
        const parentContainer = parentRef.current.getBoundingClientRect();
        const parentLeft = pixelsToUnit(parentContainer.left+padding, "vw");
        const parentTop = pixelsToUnit(parentContainer.top+padding, "vh");

        let tempPos = integerPairs;
        for (let i=0; i < tempPos.length; i++) {
            tempPos[i] = [(i%4)*12.5 + parentLeft, Math.floor(i/4)*15 + parentTop]
        }
        console.log("yes")
        setIntegerPairs(tempPos)
        return integerPairs
        
        // return {left: `${(index%4)*210 + parentLeft}px`, top: `${Math.floor(index/4)*100 + parentTop}px`}
    
    }

    function changeCard() {
        console.log("nope")
        let copydivRefs = divRefs.map((ref) => ref);
        for (let i=0; i < text.length; i++) {
            if (copydivRefs[i].current) {
                console.log(i)
                const tl = copydivRefs[i].current?.getBoundingClientRect().x;
                const tt = copydivRefs[i].current?.getBoundingClientRect().y;
                console.log(copydivRefs[i].current?.getBoundingClientRect())
                copydivRefs[i].current.style.left = tt;
                someAsyncOperation(copydivRefs, (processedData) => {
                    copydivRefs[i].current.style = `position: fixed; left: ${tl}px; top: ${tt}px; transition: 0s`;
                    // copydivRefs[i].current.style.position = 'fixed';
                    // copydivRefs[i].current.style.left = `${tl}px`;
                    // copydivRefs[i].current.style.top = `${tt}px`;
                });
                
            
            }            
        }
        setDivRefs(copydivRefs)
    }

    function revertCard() {
        let copydivRefs = divRefs.map((ref) => ref);
        for (let i=0; i < text.length; i++) {
            if (copydivRefs[i].current) {
                console.log(i)
                const tl = copydivRefs[i].current?.getBoundingClientRect().x;
                const tt = copydivRefs[i].current?.getBoundingClientRect().y;
                console.log(copydivRefs[i].current?.getBoundingClientRect())
                copydivRefs[i].current.style.left = tt;
                someAsyncOperation(copydivRefs, (processedData) => {
                    copydivRefs[i].current.style.position = 'relative';
                    // copydivRefs[i].current.style.position = 'fixed';
                    // copydivRefs[i].current.style.left = `${tl}px`;
                    // copydivRefs[i].current.style.top = `${tt}px`;
                });
                
            
            }            
        }
        setDivRefs(copydivRefs)
    }
    function handleClick() {
        if (parentRef.current && divRefs[0].current !== null && divRefs[14].current) {
            console.log(divRefs)
            const firstElementPosition = divRefs[0].current;
            const secondElementPosition = divRefs[14].current;

            console.log(firstElementPosition.getBoundingClientRect())
            
            console.log(firstElementPosition.getBoundingClientRect().top)
            divRefs[0].current.style.left = divRefs[14].current.style.left;
            // let copyDivArray: React.ReactElement[] = divs
            // console.log(divs.length)
            // let newDiv = <div className='card' onClick={handleClick} key="15">
            //                 15
            //             </div>;
            // copyDivArray.splice(2, 0, newDiv);
            // setDivs(copyDivArray)
        }
        
    }

    function someAsyncOperation(data, callback) {
    // Simulate asynchronous operation
    setTimeout(() => {
        callback(data); // Call the provided callback after a delay
    },  1);
    }

    function swap() {
        console.log(divRefs)
        console.log("yes", divRefs[0].current.style.top)
        let tempTop = divRefs[0]?.current?.style.top
        let tempLeft = divRefs[0]?.current?.style.left
        console.log("no")

        console.log(divRefs[0]?.current?.style.top, divRefs[13].current.style.top)
        divRefs[0].current.style.top = divRefs[13].current.style.top
        divRefs[0].current.style.left = divRefs[13].current.style.left
        divRefs[0].current.style.transition ='1s';

        divRefs[13].current.style.top = tempTop
        divRefs[13].current.style.left =tempLeft
        divRefs[13].current.style.transition ='1s';
        console.log(divRefs[0]?.current?.style.top, divRefs[13].current.style.top)
        console.log("finished")

        setTimeout(() => {
            setHasSwapped(true);
        }, 5000);
        
        
    }


    const place = async () => {
        await placeCard()

        changeCard()
    }
      

    useEffect(() => {
        if (parentRef.current) {
          // Parent div has been rendered and attached to the DOM
          setParentRendered(true);
          console.log("Parent rendered")
          
          
        }
      }, []);

      useLayoutEffect(() => {
        
        place()
            
        if (divRefs[15].current) {
            // Parent div has been rendered and attached to the DO
            console.log("divRef is present")
            
        }
        else {
            console.log("divref not render")
        }
      }, []);

      useEffect(() => {
        if (hasSwapped == true) {
            revertCard();
            setHasSwapped(false);
        }

        
        
      }, [hasSwapped]);
      

    
    // window.onload = changeCard;
    return (
        <>
        <div className='board' ref={parentRef}>
            {parentRendered && divRefs.map((ref, index) => (
                // {order: `${index}`}
                // {left: `${integerPairs[index][0]}svw`, top: `${integerPairs[index][1]}svh`}
                    <div className='card' key={index} ref={ref} >
                        {text[index]}.
                    </div>
            ))}
        </div>
        
        
        <div onClick={handleClick}>Yes</div>
        <div className="swap" onClick={swap} style={{backgroundColor: "Blue", width:"100px"}}>swap</div>
        </>
        
    )
}
