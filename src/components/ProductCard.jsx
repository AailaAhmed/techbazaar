function ProductCard({image,title,pricing, rating}) {
    return(
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col border border-white hover:shadow-lg transition">
            <div className="h-70 bg-gray-900 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            <div className="p-2 flex flex-col flex-1">
                <h3 className="text-5sm font-semibold text-[#0D0D7B] line-clamp-2 min-h-[3rem]">{title}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{rating}</span>

                </div>
                <p className="text-sm font-bold text-[#0D0D7B] mt-auto">Rs. {pricing}</p>
                <button type="button" className="bg-[#436EDF] w-full mt-auto py-2.5 text-[#F8FAE5] rounded-lg font-semibold hover:bg-gray-700 transition ">Add to Cart</button>
            </div>
        </div>
    );
}
export default ProductCard;
