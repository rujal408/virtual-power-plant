import React, { ChangeEvent, KeyboardEvent } from 'react'

interface IProps{
    name?:string
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void
    placeholder?:string
    onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
    value?:string|number
}

const InputField:React.FC<IProps> = (props) => {
  const {name, onChange, placeholder, onKeyUp, value} = props
  return (
    <input name={name} value={value} onChange={onChange} className="input_field" placeholder={placeholder} onKeyUp={onKeyUp} />
  )
}

export default InputField