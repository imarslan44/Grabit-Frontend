import React, { useEffect, useState } from "react";
import { fetchProductdetail } from "../controllers/product.controller.js";
import { addToCart } from "../controllers/cart.controller.js";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProduct, updateQuantity } from "../context/order.slice.js";

const Product = () => {
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
    })();
  }, [id]);

  useEffect(() => {
    if (currentVariant?.images?.length) {
      setSelectedImage(currentVariant.images[0]);
    }
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
    <section className="w-screen pt-18 px-2 md:px-10 bg-gray-50 min-h-screen flex flex-col md:flex-row gap-8">

      {/* IMAGE SECTION */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-[85vh]">

        {/* MOBILE SLIDER */}
        <div className="md:hidden h-full overflow-hidden overflow-x-auto flex snap-x snap-mandatory rounded-sm">
          {currentVariant?.images?.map((img, i) => (
            <div
              key={i}
              className="min-w-full h-9/10 snap-center bg-gray-100 flex "
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-contain object-center rounded-sm"
              />
            </div>
          ))}
        </div>

        {/* DESKTOP THUMBNAILS */}
        <div className="hidden md:grid h-full grid-cols-5 gap-4">

          <div className="col-span-1 flex flex-col gap-3">
            {currentVariant?.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`border rounded-md overflow-hidden ${
                  selectedImage === img
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>

          <div className="col-span-4 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="w-full md:w-[45%] bg-white rounded-lg p-4 md:p-6 shadow-sm">

        <p className="text-xs uppercase text-gray-500">Seller</p>
        <h1 className="text-2xl font-semibold mt-1">
          {product?.title}
        </h1>

        {/* COLOR */}
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-500">Color</p>
          <div className="flex gap-3 mt-2">
            {product?.variants?.map((v, i) => (
              <button
                key={i}
                onClick={() => setVariantIndex(i)}
                className={`border rounded-md overflow-hidden ${
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
        <div className="flex items-center gap-4 mt-4">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-14 border rounded px-2 py-1 text-center"
          />
          <p className="text-xl font-bold">
            ₹ {quantity * price}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleCart}
            className="flex-1 border border-gray-300 rounded-md py-3 text-sm font-semibold hover:bg-gray-100"
          >
            Add To Cart
          </button>
          <button
            onClick={buyNow}
            className="flex-1 bg-black text-white rounded-md py-3 text-sm font-semibold hover:opacity-90"
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
