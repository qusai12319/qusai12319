import CategoryPreview from '../../category-preview/category.component.preview';


import { useSelector } from 'react-redux';

const CategoriesPreview = () => {
  const categoriesMap = useSelector((state) => state.categories.categoriesMap);

  return (
    <div>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </div>
  );
};

export default CategoriesPreview;
