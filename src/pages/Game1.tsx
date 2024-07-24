
import React, { useLayoutEffect, useRef, useState } from 'react';
import './Game1.css';
export default function Game1() {
        
    const [clickedTotal, setClickedTotal] = useState(0);

    const text: string[] = ["goup1.1", "group1.2", "group1.3", "group1.4", 
        "goup2.1", "group2.2", "group2.3", "group2.4",
        "goup3.1", "group3.2", "group3.3", "group3.4",
        "goup4.1", "group4.2", "group4.3", "group4.4"]

    const groups: string[][] = [["goup1.1", "group1.2", "group1.3", "group1.4"], ["goup2.1", "group2.2", "group2.3", "group2.4"], ["goup3.1", "group3.2", "group3.3", "group3.4"], ["goup4.1", "group4.2", "group4.3", "group4.4"]] 
    const parent = useRef(null);
    const [divRefs, setDivRefs] = useState(Array.from({ length: 16 }, () => useRef(null)));
    
    const [bigGroup, setBigGroup] = useState(Array.from({ length: 4 }, () => false));
    const bigGroupRef = Array.from({ length: 4 }, () => useRef(null));
    const [totalGroup, setTotalGroup] = useState(0);

    const switchPositions = (index1: number, index2: number) => {
        const box1 = divRefs[index1].current as HTMLDivElement | null;
        const box2 = divRefs[index2].current as HTMLDivElement | null;

        if (box1 && box2) {
            const box1Key = box1.id;
            const box2Key = box2.id;
            const box1Offset = { left: box1.style.left, top: box1.style.top };
            const box2Offset = { left: box2.style.left, top: box2.style.top };
            box1.style.left = box2Offset.left;
            box2.style.left = box1Offset.left;
            box1.style.top = box2Offset.top;
            box2.style.top = box1Offset.top;
            box1.id = box2Key;
            box2.id = box1Key;
        }    
    };

    const highlight = (ref: React.Ref<HTMLDivElement>) => {
        
        if (ref && typeof ref !== 'function' && ref.current) {
            if (ref.current.className.indexOf(' box_clicked') > 0) {
                ref.current.className = ref.current.className.replace(' box_clicked', '');
                setClickedTotal(clickedTotal-1)
            }
            else if (clickedTotal < 4) {
                ref.current.className += ' box_clicked';
                setClickedTotal(clickedTotal+1)
            }
        }
    }

    const reOrder = (clickedIndicies: number[], groupNum: number) => {
        let indicies: number[] = [];
        const currentRow = totalGroup 
        for (let i = 0; i < divRefs.length; i++) {
            const currentRef = divRefs[i].current as HTMLDivElement | null;
            if (currentRef && Math.floor(Number(currentRef.id)/4) == currentRow) {
                indicies.push(i);
            }
        }
        let findicies = indicies.filter(element => !clickedIndicies.includes(element));
        let fclickedIndicies = clickedIndicies.filter(element => !indicies.includes(element));
        for (let j = 0; j < clickedIndicies.length; j++) {
            if (findicies[j] != fclickedIndicies[j]) {
                switchPositions(fclickedIndicies[j], findicies[j]);
            }  
        }
        const timeoutId = setTimeout(() => {
            const tempDivRefs = divRefs
            for (let k = groupNum*4; k < groupNum*4+4; k++) {
                let currentRef =tempDivRefs[k].current as HTMLDivElement | null;
                if (currentRef) {
                    currentRef.remove(); 
                    currentRef = null;  
                }
                
                   
            }
            setDivRefs(tempDivRefs);
            setTotalGroup(currentRow+1);
            const tempBigGroup = bigGroup;
            tempBigGroup[groupNum] = true;
            setBigGroup(tempBigGroup);
            setClickedTotal(0);

            const t = setTimeout(() => {
                let bigGroupCurrentRef = bigGroupRef[groupNum].current as HTMLDivElement | null
                if (bigGroupCurrentRef) {
                    bigGroupCurrentRef.style.top = `${(currentRow)*100}px`;
                }
                
            }, 10);
            clearTimeout(t);
        }, 1000);
        return () => clearTimeout(timeoutId);

    }

    const shuffle = () => {
        let shuffledArray = [...divRefs]; // Create a copy of the array to avoid mutating the original array
        for (let i = 15; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            switchPositions(i, j)
        //   [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
        }
        setDivRefs(shuffledArray);
    }

    const deselect = () => {
        for (let i = 0; i < divRefs.length; i++) {
            const currentRef = divRefs[i].current as HTMLDivElement | null;
            if (currentRef && currentRef.className.indexOf(' box_clicked') > 0) {
                let classIndex = currentRef.className.indexOf(' box_clicked');
                currentRef.className = currentRef.className.slice(0, classIndex);
            }
        }
        setClickedTotal(0);
    }

    const submit = () => {
        let clicked = []
        let clickedIndicies = []
        for (let i = 0; i < divRefs.length; i++) {
            const currentRef = divRefs[i].current as HTMLDivElement | null;
            if (currentRef && currentRef.className.indexOf(' box_clicked') > 0) {
                clicked.push(currentRef.innerText)
                clickedIndicies.push(i)
            }
            
        }
        console.log(clicked)
        clicked = clicked.sort()
        for (let j = 0; j < groups.length; j++) {
            let sortedGroup = groups[j].sort();
            if (sortedGroup.every((element, index) => element === clicked[index])) {
                // console.log("group 1");
                console.log("reorder")
                clickedIndicies = clickedIndicies.sort()
                reOrder(clickedIndicies, j);
                break;
            }
        }
    }

    useLayoutEffect(() => {
        shuffle();
        console.log("shuffle array")
    }, []);


  return (
    <>
    <div className='title'>
        Spicy Connections
    </div>
    <div className='subtext'>
        Make Groups of 4
    </div>
    <div className="container" ref={parent}>
        
        {divRefs.map((ref, index) => (
            
                <div className='box' id={`${index}`} key={index} ref={ref} onClick={() => highlight(ref)} style={{left: `${index%4*200}px`, top: `${Math.floor(index/4)*100}px`}} >
                    {text[index]}
                </div>
        ))}
        {bigGroup[0] && <div className='bigCard group1' ref={bigGroupRef[0]}>
            <div className='bigCardName'>
                Group 1
            </div>
            <div className='bigCardValue'>
                {groups[0].join(", ")}
            </div>
        </div>}
        {bigGroup[1] && <div className='bigCard group2' ref={bigGroupRef[1]}>
        <div className='bigCardName'>
                Group 2
            </div>
            <div className='bigCardValue'>
                {groups[1].join(", ")}
            </div>
        </div>}
        {bigGroup[2] && <div className='bigCard group3' ref={bigGroupRef[2]}>
        <div className='bigCardName'>
                Group 3
            </div>
            <div className='bigCardValue'>
                {groups[2].join(", ")}
            </div>
        </div>}
        {bigGroup[3] && <div className='bigCard group4' ref={bigGroupRef[3]}>
        <div className='bigCardName'>
                Group 4
            </div>
            <div className='bigCardValue'>
                {groups[3].join(", ")}
            </div>
        </div>}
       

    </div>
    <div className='mainButtons'>
        <button className='shuffle' onClick={() => shuffle()}>Shuffle</button>
        <button className='deselect' onClick={() => deselect()}>Deselect All</button>
        <button className='submit' onClick={() => submit()}>Submit</button>
    </div>
    
    </>

  );
};

