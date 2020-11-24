import React, {ButtonHTMLAttributes} from 'react';
import './style.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    name: string;
}

const Button:React.FC<ButtonProps> = ({name, ...rest}) => {
  return (
    <div>
        <button className="btn-enviar" {...rest}>{name}</button>
    </div>
  );
}

export default Button;
