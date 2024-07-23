
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Game1.css';
export default function Game1() {
        
    const [clickedTotal, setClickedTotal] = useState(0);

    const text: string[] = ["goup1.1", "group1.2", "group1.3", "group1.4", 
        "goup2.1", "group2.2", "group2.3", "group2.4",
        "goup3.1", "group3.2", "group3.3", "group3.4",
        "goup4.1", "group4.2", "group4.3", "group4.4"]

    const groups: string[][] = [["goup1.1", "group1.2", "group1.3", "group1.4"], ["goup2.1", "group2.2", "group2.3", "group2.4"], ["goup3.1", "group3.2", "group3.3", "group3.4"], ["goup4.1", "group4.2", "group4.3", "group4.4"]] 
    const [divRefs, setDivRefs] = useState(Array.from({ length: 16 }, () => useRef(null)));
    const [bigGroup, setBigGroup] = useState(Array.from({ length: 4 }, () => false));
    const [totalGroup, setTotalGroup] = useState(0);

    const switchPositions = (index1, index2) => {
        const box1 = divRefs[index1].current;
        const box2 = divRefs[index2].current;

        console.log("switching", box1.innerText, " with ", box2.innerText);

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
    };


    const highlight = (ref: React.Ref<HTMLDivElement>) => {
        if (ref && ref.current) {
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
        const startIndex = 0;
        const currentRow = totalGroup 
        for (let i = 0; i < divRefs.length; i++) {
            if (divRefs[i].current && Math.floor(Number(divRefs[i].current.id)/4) == currentRow) {
                indicies.push(i);
                console.log("pushing id",  divRefs[i].current.id);

            }
        }
        let findicies = indicies.filter(element => !clickedIndicies.includes(element));
        let fclickedIndicies = clickedIndicies.filter(element => !indicies.includes(element));
        console.log("swapping", findicies)
        for (let j = 0; j < clickedIndicies.length; j++) {
            if (findicies[j] != fclickedIndicies[j]) {
                console.log("swap", fclickedIndicies[j], findicies[j])
                switchPositions(fclickedIndicies[j], findicies[j]);
            }
            
        }
        const timeoutId = setTimeout(() => {
            const tempDivRefs = divRefs
            for (let k = groupNum*4; k < groupNum*4+4; k++) {
                tempDivRefs[k].current.remove(); 
                tempDivRefs[k].current = null;  
                   
            }
            setDivRefs(tempDivRefs);
            setTotalGroup(currentRow+1);
            const tempBigGroup = bigGroup;
            tempBigGroup[groupNum] = true;
            setBigGroup(tempBigGroup);
            setClickedTotal(0);

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
        console.log(shuffledArray)
        setDivRefs(shuffledArray);
    }

    const submit = () => {
        let clicked = []
        let clickedIndicies = []
        for (let i = 0; i < divRefs.length; i++) {
            if (divRefs[i].current && divRefs[i].current.className.indexOf(' box_clicked') > 0) {
                clicked.push(divRefs[i].current.innerText)
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
    <div className="container">
        
        {divRefs.map((ref, index) => (
            
                <div className='box' id={`${index}`} key={index} ref={ref} onClick={() => highlight(ref)} style={{left: `${index%4*120}px`, top: `${Math.floor(index/4)*60}px`}} >
                    {text[index]}
                </div>
        ))}
        {bigGroup[0] && <div className='bigCard'>GROUP 1</div>}
        {bigGroup[1] && <div className='bigCard'>GROUP 2</div>}
        {bigGroup[2] && <div className='bigCard'>GROUP 3</div>}
        {bigGroup[3] && <div className='bigCard'>GROUP 4</div>}
       

    </div>
    <button className='b' onClick={() => switchPositions(0, 1)}>Switch Positions</button>
    <button className='submit' onClick={() => submit()}>Submit</button>
    <button className='shuffle' onClick={() => shuffle()}>Shuffle</button>
    </>

  );
};

