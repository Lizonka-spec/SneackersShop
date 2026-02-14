import { IoMdAdd } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

import style from "../styles/catalog.module.css";

export const Card = ({ product }) => {
  const { toggleCart, isInCart, toggleWish, isInWish, user } = useAppContext();
  const activeCart = isInCart(product.id);
  const activeWish = isInWish(product.id);
  const navigate = useNavigate();

  const handleToCard = () => {
    if (!user) {
      return navigate("/auth");
    }
    toggleCart(product);
  };
  const handleToWish = () => {
    if (!user) {
      return navigate("/auth");
    }
    toggleWish(product);
  };

  return (
    <div className={style.catalog__card}>
      <button
        onClick={handleToWish}
        className={
          !activeWish ? style.addToWish__notActive : style.addToWish__active
        }
      >
        {!activeWish ? <FaRegHeart /> : <FaHeart />}
      </button>
      <img
        className={style.catalog__img}
        src={product.imageUrl}
        alt={product.title}
      />
      <div className={style.productContent}>
        <span className={style.productName}> {product.title} </span>
        <div className={style.productFeature}>
          <div className={style.priceContent}>
            <span className={style.text}>Цена:</span>
            <span className={style.price}>{product.price} руб.</span>
          </div>
          <button
            onClick={handleToCard}
            className={
              !activeCart ? style.addToCard__notActive : style.addToCard__Active
            }
          >
            {!activeCart ? <IoMdAdd /> : <IoMdCheckmark />}
          </button>
        </div>
      </div>
    </div>
  );
};
