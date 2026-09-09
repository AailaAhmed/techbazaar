const BASE_URL= "https://dummyjson.com";
export async function getAllProducts(limit=50,skip=0) {
    const result= await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
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