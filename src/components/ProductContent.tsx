import { useState } from "react";
import watch from "/assets/images/watch.svg";
import product1 from "/assets/images/product1.svg";
import product2 from "/assets/images/product2.svg";
import product3 from "/assets/images/product3.svg";
import { Link } from "react-router-dom";
import Cart from "./Cart";

const ProductContent = ({ product }: { product: any }) => {
    const images = [product?.image || watch, product1, product2, product3];
    const [currentImage, setCurrentImage] = useState(images[0]);
    return (
    <div className="p-4 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-8">
        <div className="flex flex-col py-2 lg:flex-row lg:items-start gap-4 ">
            <div className="flex order-1 mt-2 lg:mt-12 gap-3 ml-4  lg:flex-col lg:order-none lg:gap-8">
            {images.map((img) => (
                <img
                key={img}
                src={img}
                onClick={() => setCurrentImage(img)}
                className={`
                    w-20 h-20 object-cover rounded-md cursor-pointer transition
                    ${currentImage === img ? "ring-2 ring-blue-400" : "ring-0"}
                `}
                />
            ))}
            </div>
            <div className="relative flex-1 mt-18  lg:mt-10 mx-auto bg-gray-100 rounded-2xl overflow-hidden w-[350px] lg:max-w-[500px]">
    <img
    src={currentImage}
    className="w-full h-[350px] lg:h-[430px] object-cover"
    />
    <img 
    src="/assets/icons/cart-btn.svg"
    alt="cart"
    className="absolute top-2 right-2 w-10 h-10 cursor-pointer "/>
    <div className="flex flex-col gap-2">
       <Link to="/shop">
    <button className="rounded-full px-4 py-2 top-2 left-2 bg-white absolute flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <img src="/assets/icons/new.svg" alt="new" />
        <span className="font-semibold">New in</span>
    </button>
</Link>

<Link to="/cart">
    <img 
        src="/assets/icons/cart-btn.svg"
        alt="cart"
        className="absolute top-2 right-2 w-10 h-10 cursor-pointer"
    />
</Link>
    </div>
    </div>
        </div>
        <div className="bg-white shadow-sm mt-10 rounded-2xl p-6 ">
            <Cart product={product} />
        </div>
        </div>
        
    </div>
    );
};
export default ProductContent;
