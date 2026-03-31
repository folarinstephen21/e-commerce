import Stripe from "stripe"
import { ProductCard } from "./product-card";

interface Props {
    products: Stripe.Product[]
}

export const ProductList = ({products}: Props) => {
    return (
        <div>
            <div>
                <input type="text" placeholder="Search Products" />
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, key) => {
                    return <li key={key}> 
                        <ProductCard product={product}/>
                    </li>; 
                        
                })}
            </ul>
        </div>
    )
}