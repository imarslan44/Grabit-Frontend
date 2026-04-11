import React, { useEffect, useState, useRef } from "react";
import { fetchProductdetail } from "../controllers/product.controller.js";
import { addToCart } from "../controllers/cart.controller.js";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProduct, updateQuantity } from "../context/order.slice.js";


const Product = () => {
  //scrollable image  for mobile
  const [activeIndex, setActiveIndex] = useState(0); 
  const sliderRef = useRef(null); 
  
  const handleScroll = () => { 
    const scrollLeft = sliderRef.current.scrollLeft; 
    const width = sliderRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width); 
     setActiveIndex(index); 
    };
  const scrollToIndex = (index) => {
     const width = sliderRef.current.offsetWidth; 
     sliderRef.current.scrollTo({ left: width * index, behavior: "smooth", }); setActiveIndex(index); 
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const currentVariant = product?.variants?.[variantIndex];
  const currentSize = currentVariant?.sizes?.[sizeIndex];
  const price = currentSize?.price || currentVariant?.price;

  

  useEffect(() => {
    (async () => {
      const data = await fetchProductdetail(id);
      setProduct(data);
      console.log(data)
    })();
  }, [id]);

  useEffect(() => {
    setVariantIndex(0)
    setActiveIndex(0)
  }, [id])
  

  useEffect(() => {
    if (currentVariant?.images?.length) {
      setSelectedImage(currentVariant.images[0]);
    }
    
    scrollToIndex(0);
  }, [currentVariant]);

  const handleCart = async () => {
    try {
      const payload = {
        productId: id,
        quantity,
        variantIndex,
        currentSize,
      };
      const { status, data } = await addToCart(payload);
      if (status === 401) return alert("Login required");
      alert(data?.message || "Added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  const buyNow = () => {
    if (!quantity) return alert("Enter quantity");
    dispatch(
      updateProduct({
        product,
        productId: id,
        variantIndex,
        sizeIndex,
      })
    );
    dispatch(updateQuantity(quantity));
    navigate(`/order/place/${id}`);
  };

  return (
    <section className="w-screen pt-18 pb-1 px-1 md:px-5 bg-gray-50 min-h-screen flex flex-col lg:flex-row gap-8">

      {/* IMAGE SECTION */}
      <div className="w-full md:h-[85vh]  lg:w-3/8   ">
    {/* mobile image section slider */}
        <div className="md:hidden relative h-full"> 
            <div ref={sliderRef} onScroll={handleScroll} className="overflow-x-auto flex gap-1 snap-x snap-mandatory rounded-sm min-h-60 bg-gray-200 scrollbar-hide" > 
            {currentVariant?.images?.map((img, i) => 
              ( 
               <div key={i} className="min-w-full rounded-xs  h-65 min-h-40  overflow-hidden snap-center bg-gray-200 hello world flex" > 
                 <img src={img} alt="" className="w-full h-full object-contain object-center rounded-sm" /> 
              </div> 

            ))}
           </div> {/* Dots */}
      <div className="absolute -bottom-5 bg-gray-500 min-h-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {currentVariant?.images?.map((_, i) => (
          <button key={i} onClick={() => scrollToIndex(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === activeIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
      </div>


        {/* DESKTOP THUMBNAILS */}
        <div className="hidden md:grid h-full grid-cols-5 gap-4 grid-rows-5">

          <div className="col-span-5 row-start-5    flex gap-3">

            {currentVariant?.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`border aspect-3/3 rounded-xs overflow-hidden ${
                  selectedImage === img
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="lg:w-full md:w-25  h-25 object-cover"
                />
              </button>
            ))}
          </div>

          <div className=" row-span-4 col-start-1 row-start-1 col-span-5 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="w-full flex-1 bg-white rounded-sm p-3 md:p-6 shadow-xs mb-2">

        <p className="text-xs uppercase text-gray-500">{product?.sellel || ""}</p>
        <h1 className="text-2xl font-semibold mt-1">
       {   product?.title ? product.title : (<h1 className="rounded-sm w-2/3 h-8 bg-gray-200"></h1>
       )
}
        </h1>

        {/* COLOR */}
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-500">Color</p>
          <div className="flex gap-3 mt-2">
            {product?.variants?.map((v, i) => (
              <button
                key={i}
                onClick={() => setVariantIndex(i)}
                className={`border rounded-sm overflow-hidden ${
                  variantIndex === i
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={v.images?.[0]}
                  alt=""
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* SIZE */}
        {currentVariant?.sizes?.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-500">Size</p>
            <div className="flex gap-2 mt-2">
              {currentVariant.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSizeIndex(i)}
                  className={`w-8 h-8 rounded border text-sm font-semibold ${
                    sizeIndex === i
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUANTITY + PRICE */}
        <div className={`flex items-center gap-4 mt-4 ${price ? "" : "bg-gray-200 w-1/2 rounded-sm p-1 "}`}>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-14 border rounded-xs border-gray-400 px-2 py-1 text-center"
          />
          <p className="text-xl font-bold text-gray-800">
            ₹ {quantity * price ||""}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleCart}
            className="flex-1 border border-gray-300 rounded-md py-3 text-sm font-semibold hover:bg-gray-100 cursor-pointer"
          >
            Add To Cart
          </button>
          <button
            onClick={buyNow}
            className="flex-1 bg-black text-white rounded-md py-3 text-sm font-semibold hover:opacity-90 cursor-pointer"
          >
            BUY NOW
          </button>
        </div>

        {/* HIGHLIGHTS */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700">
            Highlights
          </h3>
          <ul className="list-disc pl-6 mt-2 text-gray-600 text-sm">
            {product?.attributes?.specs?.map(
              (s, i) => s && <li key={i}>{s}</li>
            )}
          </ul>
        </div>

        {/* DESCRIPTION */}
        {product?.description && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">
              Description
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {product.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Product;
