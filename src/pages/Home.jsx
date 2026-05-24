import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <section className="relative w-screen h-[70vh] overflow-hidden   md:p-8 max-md:h-[70vh] max-sm:h-[30vh] rounded ">
      {/* Background Image */}
      <div className="absolute inset-0 shadow-xl    border-2 bg-black  mx-2 mt-16 rounded-xl overflow-hidden lg:mx-12 lg:rounded-lg">
        <img
          src={assets.hero_bg}
          alt="Hero background"
          className="h-full w-full  object-cover object-center"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-12 py-20 overflow-hidden">
        <div className="max-w-xl">
          {/* Heading */}
          <h1 className="text-3xl font-medium tracking-tight leading-tight text-gray-100 md:text-5xl sm:hidden capitalize">
            Shop Smart, <br />
            Live Better.
          </h1>
          <h1 className="text-3xl font-medium tracking-tight leading-tight text-gray-100 max-sm:hidden md:text-5xl capitalize">
            Discover Products <br />
            That Fit Your Life
          </h1>

          {/* Description */}
          <p className="mt-6 text-base text-gray-400 md:text-lg max-sm:hidden">
            Curated products designed to deliver performance,
            comfort, and value—no matter what you’re looking for.
          </p>

          {/* CTA Buttons */}
          <Link to="/products" className='max-sm:w-1/10'>
            <div className="mt-8 flex flex-wrap  max-sm:flex-col max-sm:w-1/3 ">
              <button className="rounded-sm bg-orange-600 px-6 py-2 text-white transition hover:bg-orange-700 cursor-pointer">
                Explore
              </button>
            </div>
          </Link>

          {/* Trust Badges */}
          <div className="mt-4 sm:mt-8 w-[80%] flex flex-wrap items-center gap-6 text-xs text-gray-400 max-sm:w-2/3  border-t border-gray-600 py-2">
            <div className="flex items-center gap-2 leading-3">
              ⭐ <span>4.8/5 from 12,000+ customers</span>
            </div>
            <div className="flex items-center gap-2 leading-1">
              🚚 <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 leading-1">
              🔒 <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Home


