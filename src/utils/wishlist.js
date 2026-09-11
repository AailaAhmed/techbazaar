const WISHLIST_KEY="wishlist";

export function getWishlist(){
    const data=localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data):[];
}

export function isInWishlist(id){
    const wishlist=getWishlist();
    return wishlist.some((item)=>item.id===id);
}

export function addToWishlist(product){
    const wishlist=getWishlist();
    if(!wishlist.some((item) =>item.id===product.id)){
        wishlist.push(product);
        localStorage.setItem(WISHLIST_KEY,JSON.stringify(wishlist));
    }
}

export function removeFromWishlist(id){
    const wishlist=getWishlist().filter((item)=>item.id !==id);
    localStorage.setItem(WISHLIST_KEY,JSON.stringify(wishlist));

}