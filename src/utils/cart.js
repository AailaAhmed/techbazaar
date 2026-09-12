const CART_KEY="cart";

export function getCart() {
    const data=localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data):[];

}


export function addToCart(product) {
    const cart=getCart();
    const existing=cart.find((item)=>item.id===product.id);
    if (existing){
        existing.quantity+=1;
    } else{
        cart.push({...product,quantity:1});
    }
    localStorage.setItem(CART_KEY,JSON.stringify(cart));


}


export function removeFromCart(id) {
    const cart=getCart().filter((item)=>item.id!==id);
    localStorage.setItem(CART_KEY,JSON.stringify(cart));
    
}


export function updateQuantity(id,quantity) {
    const cart=getCart();
    const item=cart.find((item)=>item.id===id);
    if(item){
        item.quantity=Math.max(1,quantity);
        localStorage.setItem(CART_KEY,JSON.stringify(cart));
    }   
}


export function getCartTotal() {
    return getCart().reduce((sum,item)=> sum + item.price * item.quantity,0);
    
}

export function getCartCount() {
    return getCart().reduce((sum,item)=> sum + item.quantity,0);
    
}
