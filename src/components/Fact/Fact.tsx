import './Fact.scss'

import {
    useQuery,
  } from '@tanstack/react-query'
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { LoadingComponent } from '../Loading/Loading';
import Button from '../Button/Button';
import {getFact } from '../../../api/fact/getFact'
import dataText from "../../mock/static.json";

function Fact(): JSX.Element {
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        setIsFirst(false);
        refetch();
    };

    const { isPending, error, data, refetch } = useQuery({
    queryKey: ['factData'],
    queryFn: () => getFact(),
    enabled: false,
    })

    useEffect(() => {

        if ( !isPending && !error){
            setText(data.fact);
            setIsFirstAfterFetch(true);            
        }
    }, [data]);

    const [text, setText] = useState('');

    useEffect(() => {

        if ( isFirstAfterFetch && !isPending && !error && inputRef.current && inputRef.current.value ){

            const first = inputRef.current.value.indexOf(' ');

            if (first !== -1) {
              inputRef.current.selectionStart = first;
              inputRef.current.selectionEnd = first;
            }
            
            inputRef.current.focus();
        }
    }, [text])

    const [isFirstAfterFetch, setIsFirstAfterFetch] = useState(true);
    const [isFirst, setIsFirst] = useState(true);
    const text_ = dataText.text.fact;
    return (
        <>
        <div className='fact__wrapper'>
        
            <Button text={text_.buttonText} callback={handleClick} />
            
            {isFirst ? 
            <p>{text_.bait}</p> : 
            isPending ? <LoadingComponent/> : 
            error ? <p>{text_.error}</p> : 
            <div className='fact__result-wrapper'><p>{text_.didyknow}</p><input ref={inputRef} id='fact-input' placeholder={text_.placeholder} onChange={(e) => setText(e.target.value)} value={text} /></div>
            }
        </div>
        </>
    )
}

export default Fact