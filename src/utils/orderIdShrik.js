export const shrinkOrderId= (order_id)=>{
    return order_id?.split('-')[0]
}