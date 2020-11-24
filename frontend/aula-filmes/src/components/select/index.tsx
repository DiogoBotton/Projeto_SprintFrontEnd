import React, { SelectHTMLAttributes } from 'react';
import './style.css'

// É igual uma interface de POO (Orientado a objetos), onde será colocado todas as propriedades que deverão ser usadas pelo componente
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    arrayObject: Array<any>;
}

// Prática de desestruturação de parametro para pegar propriedades específicas. O "...rest" adquire todos os atributos de input HTML
const Select: React.FC<SelectProps> = ({ label, arrayObject, name, ...rest }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <select className="select" {...rest} id={name}>
                <option value="0" disabled={true}>{label}</option>
                {
                    arrayObject.map((item: any) => {
                        return <option value={item.idString}>{item.string}</option>
                    })
                }
            </select>
        </div>
    );
}

export default Select;