import { Product } from "@/lib/types";
import Link from "next/link";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg';

  return (
    <Link href={`/products/${product.slug}`} className="block">
      <div className="bg-flash-white rounded-lg shadow-md overflow-hidden flex transition-shadow duration-200 ease-in-out hover:shadow-xl">
        <div className="relative w-20 flex-shrink-0">
          <img
            src={imageUrl}
            alt={product.name || 'Product image'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2 flex flex-col">
          <h3 className="text-sm font-semibold text-rich-black truncate">{product.name || 'Unnamed Product'}</h3>
          <p className="text-xs text-hooker-green">{product.category?.name || 'Uncategorized'}</p>
          <p className="text-sm font-bold text-lion-brown mt-auto">${product.price || 0}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductListItem;
