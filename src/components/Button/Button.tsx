
import { IButton } from './Button.interface';
import './Button.scss'

function Button({text, callback}: IButton): JSX.Element {
    
    return (
        <>
            <div className='button__body' onClick={callback}>
                {text}
            </div>
        </>
    )
}

export default Button;