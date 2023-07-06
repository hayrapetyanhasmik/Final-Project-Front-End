import { useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { fetchProductById, oneProduct} from "../../features/productSlice";
import { AppDispatch } from "../../app/store";
import { useParams, useNavigate } from "react-router-dom";
import {decodeToken} from "react-jwt";
import { createCart } from "../../features/cartSlice";
import './description.scss';


export default function Description(){
    const url:string = "http://localhost:5000/images/";
    const [currentImage, setCurrentImage] = useState<string|null>(null);
    const navigate = useNavigate();
    const state = useSelector(oneProduct);
    const {id} = useParams<{id:string}>(); 
    const dispatch: AppDispatch = useDispatch();

    useEffect(()=>{
        if(id){
            dispatch(fetchProductById(+id));
        }
    }, [dispatch,id]) 
    
    async function handleCart(id:number) {
        try {
          const user = localStorage.getItem("token");
          if (user) {
            const decoded:any = await decodeToken(user);
            await dispatch(createCart({ ProductId: id, UserId: decoded.id }));
          }else{
            navigate('/login')
          }
        } catch (error) {
          console.error("Error occurred while adding to cart:", error);
        }
    } 
    
    function showImg(filePath:string){
        setCurrentImage(filePath);
    }

    return(
        <div className="descContainer">
            <div className="imgDiv">
            {currentImage ? (
          <img className="mainImg" src={`${url}${currentImage}`} alt="Main Image" />
        ) : (
          state?.Images && state.Images[3] && (
            <img
              className="mainImg"
              src={`${url}${state.Images[3].filePath}`}
              alt="Main Image"
            />
          )
        )}

        {state?.Images?.map((image) => (
          <img
            className="secondaryImg"
            key={image.filePath}
            src={`${url}${image.filePath}`}
            alt="Secondary Image"
            onClick={() => showImg(image.filePath)}
          />
        ))}
            </div>
            <div className="detailsDiv">
            <h2>{state.name}</h2><p>{state.description}</p><div className="checkDiv"> <img src="/images/check_icon.png" /><span>In Stock</span></div><p>{state.price}USD</p><input className="inp" type="checkbox"></input><input className="inp" type="checkbox"></input><input className="inp" type="checkbox"></input>
            <div className="btnDiv">
            <button onClick={()=>handleCart(state.id)}>Add To Cart</button>
            </div>
            </div>
        </div>
    )
}
