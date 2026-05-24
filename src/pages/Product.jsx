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


  const [showReviews, setShowReviews] = useState(false)



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
    const wrapper = document.querySelector(".container");
    if (wrapper) {
      wrapper.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
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

    
    <section className="w-screen   md:px-20 bg-gray-50 min-h-screen flex flex-col lg:flex-row gap-8 ">

      {/* IMAGE SECTION */}
      <div className="w-full md:h-[85vh]  lg:w-3/8  pt-18 bg-white rounded-b-4xl md:p-4 md:pt-20" >
        {/* mobile image section slider */}
        <div className="md:hidden relative h-full ">

          <div ref={sliderRef} onScroll={handleScroll} className="overflow-x-auto flex gap-1 snap-x snap-mandatory rounded-sm min-h-70  scrollbar-hide  ">
            {currentVariant?.images?.map((img, i) =>
            (
              <div key={i} className="min-w-full   h-65 min-h-40  overflow-hidden snap-center  flex  rounded-xl " >
                <img src={img} alt="" className="w-full h-full object-contain object-center rounded-sm" />
              </div>

            ))}
          </div> {/* Dots */}
          <div className="absolute -bottom-6  rounded p-1  min-h-4 left-1/2 -translate-x-1/2 flex space-x-2 ">
            {currentVariant?.images?.map((_, i) => (
              <button key={i} onClick={() => scrollToIndex(i)}
                className={`h-2 w-2 rounded-full transition-colors duration-500 ${i === activeIndex ? "bg-gray-600" : "bg-gray-300"
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
                className={`border aspect-3/3 rounded-xl overflow-hidden ${selectedImage === img
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

          <div className=" row-span-4 col-start-1 row-start-1 col-span-5 bg-gray-50 rounded-lg overflow-hidden ">
            <img
              src={selectedImage}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      
      <div className="w-full flex-1 bg-black  p-4 md:p-6 shadow-xs  rounded-t-4xl text-gray-200  ">   

        <p className="text-xs uppercase text-gray-200">{product?.seller || ""}</p>
        <h1 className="text-xl  sm:text-2xl text-gray-100 font-semibold mt-3">
          {product?.title ? product.title : (<><h1 className="rounded-xl w-8/10 h-4 mb-2 bg-gray-200"></h1>
          <h1 className="rounded-xl w-5/10 h-4 bg-gray-200"></h1></>
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
                className={`border-t-2  pt-2    rounded- overflow-hidden ${variantIndex === i
                  ? "border-orange-500"
                  : "border-transparent"
                  }`}
              >
                <img
                  src={v.images?.[0]}
                  alt=""
                  className="w-18 rounded-md overflow-hidden bg-gray-100 h-18 object-contain"
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
                  className={`w-8 h-8 rounded border text-sm font-semibold ${sizeIndex === i
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
            className="w-14 border rounded-xs text-gray-100 border-gray-200 px-2 py-1 text-center"
          />
          <p className="text-xl font-bold text-gray-100">
            ₹ {quantity * price || ""}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6 w-full">
          <button
            onClick={handleCart}
            className="flex-1 border border-gray-100 rounded-md py-3 text-sm sm:text-xl text-gray-100 font-semibold hover:bg-gray-300 cursor-pointer"
          >
            Add To Cart
          </button>
          <button
            onClick={buyNow}
            className="flex-1 bg-orange-600 text-white rounded-md py-3 text-sm sm:text-xl font-semibold hover:opacity-90 cursor-pointer"
          >
            BUY NOW
          </button>
        </div>

        {/* HIGHLIGHTS */}
        <div className="mt-6 md:w-7/10 ">
          <h3 className="font-semibold text-gray-400">
            Highlights
          </h3>
          <ul className="list-disc pl-6 mt-2 text-gray-300 text-md sm:text-lg ">
            {product?.attributes?.specs?.map(
              (s, i) => s && <li key={i}>{s}</li>
            )}
          </ul>
        </div>

        {/* DESCRIPTION */}
        

        {/* add a descriptioin and review section users should be able swithc to see either description or reviews */}

        <div>
          <div className="flex gap-1 mt-6 w-full border-b border-gray-500">
            {/* select between description and reviews */}
            <button
              onClick={() => setShowReviews(false)}
              className={`px-4 py-2 border-b flex-1 w-full ${!showReviews ? "border-orange-500 border" : " border-gray-300  text-gray-400"}`}
            >
              Description
            </button>
            <button
              onClick={() => setShowReviews(true)}
              className={`px-4 w-full flex-1 py-2 border-b ${showReviews ? "border-orange-500 border" : "border-gray-300  text-gray-400"}`}
            >
             Reviews
            </button>
          </div>
          {/* description or reviews content based on state  */}
           {
            showReviews ? (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-400">No Reviews</h3>
              </div>
            ) : (
              <div className="mt-4">
                {product?.description && (
          <div className="md:w-8/10">
            <h3 className="font-semibold text-gray-400">
              Description
            </h3>
            <p className="text-md sm:text-lg text-gray-300 mt-1">
              {product.description}
            </p>
          </div>
        )}
              </div>
            )}
        </div>
      
        


      </div>
    </section>
  );
};

export default Product;
