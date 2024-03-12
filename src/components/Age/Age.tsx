import './Age.scss'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { LoadingComponent } from "../Loading/Loading"
import Button from '../Button/Button'
import dataText from "../../mock/static.json";
import {getAge } from '../../../api/age/getAge'

type Inputs = {
  name: string
}

function Age(): JSX.Element {
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const nameMap = useRef(new Map());
  const onSubmit: SubmitHandler<Inputs> = () => {
    setIsFirst(false);
    if( nameMap.current.get(watch("name")) === undefined){
      queryClient.cancelQueries({ queryKey: ['ageData'] });
      
      refetch();
      
    } else {
      setText(nameMap.current.get(watch("name")) ? nameMap.current.get(watch("name")) : text_.nores);
    } 
  };

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['ageData'],
    queryFn: () => getAge(watch("name")),
    enabled: false,
    })
  
    const [isFirst, setIsFirst] = useState<boolean>(true);
    const [text, setText] = useState<string>('')
  
    useEffect(() => {
 
      if ( data ){
        setText(data.age ? data.age : text_.nores );

        nameMap.current.set(watch("name"), data.age ? data.age : text_.nores);
      }
  }, [data])


  const queryClient = useQueryClient()
  const [timeo, setTimeo] = useState<number>();

  const timerSetUp = () => {
    if ( timeo ){
      clearInterval(timeo);
    }

    const timeouFunc = () => {
      handleSubmit(onSubmit)();
    };

    const id = setTimeout(timeouFunc, 3000);
   
    setTimeo(id);
  }

  const text_ = dataText.text.age;
  return (
    <>
      <div className='age__wrapper'>
      <form className='age__form' onSubmit={handleSubmit(onSubmit)}>

      <div className="age__input-wrapper">
        <input placeholder={text_.placeholder} defaultValue="" 
        {...register("name",  { required: true, pattern: /^[a-zA-Z\s]*$/, onChange: () => timerSetUp() })} />
        
        {errors.name && <p>{text_.textError}</p>}
      </div>

      <Button text={"Отправить"} callback={handleSubmit(onSubmit)} />
      </form>

      {isFirst ? <p>{text_.bait}</p> : isPending ? <LoadingComponent/> : error ? <p>{text_.error} </p> : 
        <p>{text === text_.nores ? text_.sad : text_.happy} {text_.yourAge} {text}</p>}
      
      </div>
    </>
  )
}

export default Age