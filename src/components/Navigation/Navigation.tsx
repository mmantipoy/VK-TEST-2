
import Button from '../Button/Button';
import { INavigation } from './Navigation.interface';
import './Navigation.scss'
import data from "../../mock/static.json";

function Navigation({setActive}: INavigation): JSX.Element {
    
    const text = data.text.navigation;
    return (
        <>
        <div className='navigation__wrapper'>
            <Button text={text.fact} callback={() => setActive('fact')} />
            <Button text={text.age} callback={() => setActive('age')} />
        </div>
        </>
    )
}

export default Navigation;