import { ProductType } from '../entity/product_entity';

interface Product {
  id: number;
  title: string;
  type: string;
  prefab_url: string;
  description: string;
  price: number;
  thumbnail_url: string;
  product_type: ProductType;
}
export default Product;