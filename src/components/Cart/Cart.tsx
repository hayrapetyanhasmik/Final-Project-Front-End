import { useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { cartR, getCart, incQuantity, decQuantity, deleteCart} from "../../features/cartSlice";
import { AppDispatch } from "../../app/store";
import {decodeToken} from "react-jwt";
import { Link } from "react-router-dom";
import './cart.scss';


export default function Cart(){
    const url:string = "http://localhost:5000/images/";
    const state = useSelector(cartR);
    const [deleted,setDeleted] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();
   
    const total = state?.reduce(
        (acc, el) => acc + el.Product?.price * el.quantity,
        0
    );
      
    const user = localStorage.getItem("token");
    const decoded:any = user && decodeToken(user);

    useEffect(()=>{
            dispatch(getCart(+decoded?.id));
    }, [dispatch, deleted])
       
    
    function increment(id:number){
        dispatch(incQuantity({id}))
    }

    function decrement(id:number,quantity:number){
        if (quantity === 1) {
            setDeleted(!deleted);
            dispatch(deleteCart(id));
        }else{
            dispatch(decQuantity({ id }));
        }
    }

    function deleteItem(id:number){
        setDeleted(!deleted);
        dispatch(deleteCart(id))
    }

    return(
        <div className="cartContainer">
             {state?.length ? ( 
             state?.map((prod)=><div className="cartItemContainer" key={prod.Product?.id}><div className="cartImgDiv"><img src={`${url}${prod.Product?.Image[prod.Product?.Image?.length-1]?.filePath}`}/><p>{prod.Product?.name}</p><p>{prod.Product?.price}USD</p></div>
            <div className="btnDiv">
            <button onClick={()=>increment(prod.Product?.id)}>+</button>
            <span>{prod.quantity}</span>
            <button onClick={()=>decrement(prod.Product?.id,prod?.quantity)}>-</button>
            <button onClick={()=>deleteItem(prod.Product?.id)}>Remove</button>
            </div>
            </div> 
            )
            ):(
                <div className="empty">
                 <p>Your Cart is empty!</p>
                 <Link to="/shop">Back to Shopping Page</Link>
                </div>
            )} 
            {total ?(
                <p>Total {total} USD</p>
            ):(
                null
            )}
        </div>
    )
}