import ProductCard from '../products/product.component';
import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from './category-preview.styles';

const CategoryPreview = ({ title, products = [] }) => {  // ← default value
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products.length > 0 ? (
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <p>No products found.</p>
        )}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview