export const fetchImageOfProducts=(image_id)=>{
    return `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/v1/media/products/${image_id}`;
}