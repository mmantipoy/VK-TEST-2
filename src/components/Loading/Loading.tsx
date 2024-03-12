import "./style.scss";
import data from "../../mock/static.json"

export function LoadingComponent(): JSX.Element{  
    const text = data.text.loader;

    return (
        <div className="loading__container">
            <p> {text.loadingText} </p>
            <div className="loading__wrapper">
                <div className="loading__block">
                </div>
                <img className="image" src="../../../public/svg/loader.svg" width={50} height={50} alt="" />
            </div>
        </div>
    )
}
