import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
    // console.log(product)
  const price = product.default_price as Stripe.Price;
  const image = product.images?.[0];
  return (
    <div>
      <Link href={`/products/${product.id}`}>
        <Card className="group overflow-hidden border hover:shadow-lg transition-shadow duration-300">
          {image && (
            <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
              <Image
                alt={product.name}
                src={image}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold line-clamp-1">
              {product.name}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {price?.unit_amount != null && (
              <p className="text-lg font-bold text-gray-900">
                ${(price.unit_amount / 100).toFixed(2)}
              </p>
            )}

            {product?.description && (
              <p className="">{product.description}</p>
            )}

            <Button className="mt-4 bg-black text-white">View Details</Button>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
