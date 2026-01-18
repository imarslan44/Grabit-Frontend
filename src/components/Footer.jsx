export default function Footer() {
  return (
    <footer className="bg-white border-t w-screen border-gray-200 text-gray-700 md:px-16">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold text-lg mb-4  text-black">
            Customer Service
          </h4>
          <ul className="space-y-2 text-sm list-disc pl-4">
            <li className="hover:text-black cursor-pointer">Contact Us</li>
            <li className="hover:text-black cursor-pointer">FAQ</li>
            <li className="hover:text-black cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-black cursor-pointer">Track Order</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-black">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Careers</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
            <li className="hover:text-black cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-black">
            Newsletter
          </h4>
          <p className="text-sm text-gray-600 mb-4 max-w-sm">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>

          <div className="flex w-full max-w-xs overflow-hidden rounded-sm border border-gray-300">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
            />
            <button className="bg-orange-500 px-6 text-sm font-medium text-white hover:bg-orange-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 grid gap-6 md:grid-cols-3 text-sm">

          <div className="flex items-center gap-2">
            <ion-icon name="star" class="text-yellow-400 text-lg"></ion-icon>
            <span>4.8/5 from 12,000+ customers</span>
          </div>

          <div className="flex items-center gap-2 md:justify-center">
            <ion-icon name="cube-outline" class="text-lg"></ion-icon>
            <span>Fast Delivery</span>
          </div>

          <div className="flex items-center gap-2 md:justify-end">
            <ion-icon name="lock-closed-outline" class="text-lg"></ion-icon>
            <span>Secure Checkout</span>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid gap-6 md:grid-cols-3 items-center text-sm">

        {/* Payments */}
        <div className="flex items-center gap-3">
          <span className="font-medium">Payments:</span>
          <ion-icon name="card-outline" class="text-lg"></ion-icon>
          <ion-icon name="logo-paypal" class="text-lg"></ion-icon>
          <span className="text-xs font-medium">COD</span>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-500">
          © 2026 YourCompany. All rights reserved.
        </p>

        {/* Social */}
        <div className="flex gap-4 justify-end text-lg">
          <ion-icon name="logo-facebook" class="cursor-pointer hover:text-black"></ion-icon>
          <ion-icon name="logo-twitter" class="cursor-pointer hover:text-black"></ion-icon>
          <ion-icon name="logo-instagram" class="cursor-pointer hover:text-black"></ion-icon>
        </div>

      </div>
    </footer>
  );
}
