import { useDispatch,useSelector } from "react-redux";
import {  allProducts, fetchProductsByPages} from "../../features/productSlice";
import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { AppDispatch , RootState} from "../../app/store";
import { createCart } from "../../features/cartSlice";
import {decodeToken} from "react-jwt";
import { oneCategory } from "../../features/categorySlice";
import './products.scss';



export default function Products () {
  const url:string = "http://localhost:5000/images/";
  const navigate = useNavigate();
  const singleCategory = useSelector(oneCategory);
  const allProd = useSelector(allProducts);
  const dispatch: AppDispatch = useDispatch();
  const [page,setPage] = useState<number>(1)
  const totpages = useSelector((state: RootState) => state.products.totalPages);

  useEffect(() => {
    dispatch(fetchProductsByPages(page)) 
  }, [dispatch,page]);

  const handlePageChange = (newPage:number) => {
    setPage(newPage);
  };


  async function handleCart(id:number) {
    try {
      const user = localStorage.getItem("token");
      if (user) {
        const decoded:any = await decodeToken(user);
        console.log(decoded)
        await dispatch(createCart({ ProductId: id, UserId: decoded.id }));
      }else{
        navigate('/login');
      }
    } catch (error) {
      console.error("Error occurred while adding to cart:", error);
    }
  }

  
    return(
      <div className="shopContainer">
       {!singleCategory?.Products? (
        allProd?.map((prod) => (
          <div className="imgContainer" key={prod.id}>
            <Link to={`/description/${prod.id}`}>
              <img src={`${url}${prod.Images[prod.Images.length - 1]?.filePath}`} />
              <p>{prod.name}</p>
              <p>{prod.price}USD</p>
            </Link>
            <button onClick={() => handleCart(prod.id)}>Add To Cart</button>
          </div>
        ))
      ) : (
        singleCategory?.Products?.map((prod:any) => (
          <div className="imgContainer" key={prod.id}>
            <Link to={`/description/${prod.id}`}>
              <img src={`${url}${prod.Images[prod.Images.length - 1]?.filePath}`} />
              <p>{prod.name}</p>
              <p>{prod.price}USD</p>
            </Link>
            <button onClick={() => handleCart(prod.id)}>Add To Cart</button>
          </div>
        ))
      )}

        <div className="paginationDiv">
          {Array.from(Array(totpages).keys()).map((el) => (
          <p key={el} onClick={() => handlePageChange(el + 1)}>
          {el + 1}
          </p>
          ))}
          <span>...</span>
        </div>
    </div>
    )
}

