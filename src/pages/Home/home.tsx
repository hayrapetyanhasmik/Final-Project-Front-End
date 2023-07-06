import './home.scss';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const images = [
    "/images/1.jpg",
    "/images/4.webp"
]
export default function Home() {
    const [index,setIndex] = useState<number>(0);
    const timeOut = useRef<NodeJS.Timeout | null>(null);

    useEffect(()=>{
        resetTimeout();
        timeOut.current = setTimeout(() => {
            setIndex((prev)=>
            prev === images.length-1 ? 0 : prev+1)
        }, 4000);
        return ()=>{
            resetTimeout();
        }
    },[index])

    function resetTimeout(){
        if(timeOut.current){
            clearTimeout(timeOut.current)
        }
    }
    return(
        <div className='mainContainer'>
            <div className="slideshow">
                <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {images.map((image, idx) => (
                <img className="slide" key={idx} src={image}/>
                ))}
                </div>

                <div className="slideshowDots">
                    {images.map((_, idx) => (
                    <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`} onClick={() => setIndex(idx)}></div>
                    ))}
                </div>
            </div>
            <div className="homeImgDiv">
                <img src='/images/home.jpg'/>
            </div>
            <article>
                <h3>CREATE A NEW STORY WITH US</h3>
                <p> Our first drop of coffee was poured out to customers in 2015, and there was no looking back ever since. We now operate 22 branches across the country. Our unique combination of quality, an unmatched menu serving over 120 varieties of drinks along with our experienced baristas makes us stand out among the rest.The coffeehouses were great social levelers, open to all men and indifferent to social status, and as a result associated with equality and republicanism. The rich intellectual atmosphere of early London coffeehouses were available to anyone who could pay the sometimes one penny entry fee, giving them the name of 'Penny Universities'. </p>
                <Link to="/about" ><p className='more'>Discover more... </p></Link>
            </article>
        </div>
    )
}