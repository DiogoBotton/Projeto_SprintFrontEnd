import React, {InputHTMLAttributes} from 'react';
import './style.css'

// É igual uma interface de POO (Orientado a objetos), onde será colocado todas as propriedades que deverão ser usadas pelo componente
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    name: string;
}

// Prática de desestruturação de parametro para pegar propriedades específicas. O "...rest" adquire todos os atributos de input HTML
const Input:React.FC<InputProps> = ({label, name, ...rest}) => {
  return (
    <div>
      <div className="input-component">
        <label htmlFor={name}>{label}</label>
        <input className="form-control" id={name}{...rest}/>
      </div>
    </div>
  );
}

export default Input;