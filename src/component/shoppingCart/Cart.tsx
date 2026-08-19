import type { CSSProperties } from "react";
import { useCart } from "../../customHook/useCart";

type ProductProp = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
type CartProp = {
  isOpen: boolean;
  onClose: () => void;
};
const Cart = ({ onClose, isOpen }: CartProp) => {
  const { cart, clearCart } = useCart();

  if (!isOpen) {
    return;
  }
  return (
    <section
      style={{
        // position:'absolute',
        // top:'50%',
        // left:'50%',
        // transform:'translate(-50%)',
        background: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        // width:'100%',
        // height:'100vh',
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems:'center',
          }}
        >
          <h3>Cart View</h3>
          <button style={{width:'25px', height:'25px'}} onClick={onClose}>
            {"X"}
          </button>
        </div>
        <button type="reset" onClick={clearCart}>Clear Cart</button>

        {cart.map((item) => (
          <Card key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default Cart;

const Card = ({ product }: { product: ProductProp }) => {
  const { updateQuantity, removeProduct } = useCart();

  const increaseQuantity = () => {
    const newVal = Number(product?.quantity)+1
    updateQuantity(product.id, newVal)
  }
  const decreaseQuantity = () => {
    const newVal = Number(product?.quantity)-1
    updateQuantity(product.id, newVal)
  }
  return (
    <section style={styles}>
      <h4>{product?.name}</h4>
      <h6>{product?.price}</h6>
      <div>
        <button onClick={decreaseQuantity}>- </button>
        <input type="number" name="" id="" value={product?.quantity} />
        <button onClick={increaseQuantity}>+ </button>
        <button onClick={()=>removeProduct(product.id)}>Remove</button>
      </div>
    </section>
  );
};

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  border: "1px solid grey",
  gap: ".1rem",
  padding: "5px 10px",
};
