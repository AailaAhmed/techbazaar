const API_URL = "http://localhost:8000/api";
const BASE_URL= "https://dummyjson.com";
export async function getAllProducts(limit=50,skip=0) {
    const result= await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    if (!result.ok) throw new Error("Failed to fetch products");
    return result.json();
}

export async function getProductById(id) {
    const result =await fetch(`${API_URL}/products/${id}/`);
    if (!result.ok) throw new Error("Failed to fetch products");
    return result.json();
    
}

export async function getProductsByCategory(category) {
    const result=await fetch(`${BASE_URL}/products/category/${category}`);
    if (!result.ok) throw new Error("Failed to fetch category products");
    return result.json();
}

export async function getCategories() {
    const result=await fetch(`${BASE_URL}/products/categories`);
    if(!result.ok) throw new Error("Failed to fetch categories");
    return result.json();
    
}

export async function getProducts({page=1,search="",category="all", ordering=""}={}){
    const params= new URLSearchParams({page});
    if (search) params.set("search",search);
    if (category!=="all") params.set("category__slug",category);
    if (ordering) params.set("ordering",ordering);
    const result=await fetch (`${API_URL}/products/?${params}`);
    if (!result.ok) throw new Error("Failed to fetch products");
    return result.json();


}