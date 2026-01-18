import React from 'react'
import { assets } from '../assets/assets'


 function Home() {
  return (
    <section className="relative w-screen h-screen overflow-hidden bg-white md:p-14 max-md:h-[70vh] max-sm:h-[50vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={assets.hero_bg}
          alt="Hero background"
          className="h-full w-full  object-cover object-center"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-xl">
          {/* Heading */}
          <h1 className="text-3xl font-medium tracking-tight leading-tight text-gray-900 md:text-5xl capitalize">
            Discover Products <br />
            That Fit Your Life
          </h1>

          {/* Description */}
          <p className="mt-6 text-base text-gray-600 md:text-lg max-sm:hidden">
            Curated products designed to deliver performance,
            comfort, and value—no matter what you’re looking for.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 max-sm:flex-col max-sm:w-1/2">
            <button className="rounded-sm bg-gray-900 px-6 py-2 text-white transition hover:bg-gray-800 cursor-pointer">
              Shop Now
            </button>
            <button className="rounded-sm border border-gray-300 px-6 py-2 text-gray-900 transition hover:bg-gray-100 cursor-pointer">
              Explore Collection
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-700 max-sm:w-2/3  border-t border-gray-300 py-2">
            <div className="flex items-center gap-2 leading-3">
              ⭐ <span>4.8/5 from 12,000+ customers</span>
            </div>
            <div className="flex items-center gap-2 leading-3">
              🚚 <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 leading-3">
              🔒 <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Home


