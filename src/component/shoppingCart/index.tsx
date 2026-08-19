import { useState, type CSSProperties } from "react";
import { useCart } from "../../customHook/useCart";
import Cart from "./Cart";

type ProductProp = {
  id: number;
  name: string;
  price: number;
};
const products: ProductProp[] = [
  { id: 1, name: "React T-Shirt", price: 25 },
  { id: 2, name: "JavaScript Mug", price: 15 },
  { id: 3, name: "Node.js Sticker", price: 5 },
];

const ProductList = () => {
    const [isOpen, setOpen] = useState(false)
    const onClose = () => {
        setOpen(false)
    }
  return (
    <>
    <button type="button" onClick={()=>setOpen(true)}>Cart</button>
     {
        isOpen ? 
        <Cart isOpen={isOpen} onClose={onClose} />
        : products.map((item) => (
        <Card product={item} key={item?.id}/>
      ))
     }
    </>
  );
};

export default ProductList;

const Card = ({product}:{product:ProductProp}) => {
    const {addToCart} = useCart()
  return (
    <section style={styles}>
      <h4>{product?.name}</h4>
      <h6>{product?.price}</h6>
      <button onClick={()=>addToCart(product)}>Add to Cart</button>
    </section>
  );
};

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid grey",
  gap: "1rem",
  padding: "5px 10px",
};
