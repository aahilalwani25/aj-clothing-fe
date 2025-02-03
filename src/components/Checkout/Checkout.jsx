"use client";

const dummyProducts = [
  { id: 1, name: "Split Sneakers", size: 37, quantity: 2, price: 40, img: "/images/product10.webp" },
  { id: 2, name: "Velvet Boots", size: 37, quantity: 2, price: 40, img: "/images/product11.webp" },
  { id: 3, name: "Echo Elegance", size: 37, quantity: 2, price: 40, img: "/images/product14.webp" },
  { id: 4, name: "Pumps", size: 37, quantity: 2, price: 40, img: "/images/product13.webp" },
];

export default function Checkout() {
  const totalAmount = dummyProducts.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="font-sans bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-gray-100 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div className="relative h-full">
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {dummyProducts.map((product) => (
                  <div key={product.id} className="flex items-start gap-4">
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                      <img src={product.img} className="w-full object-contain" alt={product.name} />
                    </div>
                    <div className="w-full">
                      <h3 className="text-sm lg:text-base text-gray-800">{product.name}</h3>
                      <ul className="text-xs text-gray-800 space-y-1 mt-3">
                        <li className="flex flex-wrap gap-4">Size <span className="ml-auto">{product.size}</span></li>
                        <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{product.quantity}</span></li>
                        <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto">${product.price}</span></li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-200 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-sm lg:text-base text-gray-800">Total <span className="ml-auto">${totalAmount}</span></h4>
            </div>
          </div>
        </div>
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
          <form className="mt-8">
            <div>
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="input-field text-black" />
                <input type="text" placeholder="Last Name" className="input-field text-black" />
                <input type="email" placeholder="Email" className="input-field text-black" />
                <input type="number" placeholder="Phone No." className="input-field text-black" />
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">Shipping Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Address Line" className="input-field text-black" />
                <input type="text" placeholder="City" className="input-field text-black" />
                <input type="text" placeholder="State" className="input-field text-black" />
                <input type="text" placeholder="Zip Code" className="input-field text-black" />
              </div>
              <div className="flex gap-4 max-md:flex-col mt-8">
                <button type="button" className="btn-cancel">Cancel</button>
                <button type="submit" className="btn-submit">Complete Purchase</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .input-field {
          padding: 12px;
          background: #f3f4f6;
          width: 100%;
          border-radius: 8px;
          font-size: 14px;
          border: 1px solid transparent;
        }
        .btn-cancel {
          padding: 10px;
          width: 100%;
          background: transparent;
          border: 1px solid #ccc;
          color: #333;
          border-radius: 8px;
        }
        .btn-submit {
          padding: 10px;
          width: 100%;
          background: #2563eb;
          color: white;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
