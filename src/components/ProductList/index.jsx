import Product from "../Product";

// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   // More products...
// ]

export default function ProductList({ products, valueToBeFiltered = null, gender=null }) {
  
  let newProducts = null;
  if(valueToBeFiltered!==null && gender!==null){
    newProducts= products?.filter((product) =>
      product?.title?.includes(valueToBeFiltered) && product?.gender?.includes(gender)
    );
  }else if(valueToBeFiltered!==null && gender===null){
    newProducts= products?.filter((product) =>
        product?.title?.includes(valueToBeFiltered)
      );
  }else if(valueToBeFiltered===null && gender!==null){
    newProducts= products?.filter((product) =>
      product?.gender?.includes(gender)
    );
  }else{
    newProducts= products
  }
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {newProducts.map((product, index) => (
        <Product key={index} product={product} index={index} />
      ))}
    </div>
  );
}
