import { Product } from "@/lib/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/placeholder.svg";

  return (
    <Link href={`/products/${product.slug}`} className="block">
      <div className="bg-flash-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200 ease-in-out transform hover:scale-105 h-full">
        <div className="relative h-24">
          <img
            src={imageUrl}
            alt={product.name || "Product image"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2 flex flex-col flex-grow">
          <h3 className="text-sm font-semibold text-rich-black truncate">
            {product.name || "Unnamed Product"}
          </h3>
          <p className="text-xs text-hooker-green">
            {product.category?.name || "Uncategorized"}
          </p>
          <p className="text-sm font-bold text-lion-brown mt-auto pt-2">
            ${product.price || 0}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
