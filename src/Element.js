
import './Element.css';

const Element = ({url, title, id})=>{
    return(
        <div className="main">
            <small>{id}</small>
            <img src={url} alt={title}></img>
            <h4>{title}</h4>
            
        </div>
    )
}

export default Element;