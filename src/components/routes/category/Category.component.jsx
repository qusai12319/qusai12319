import {  useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../products/product.component';
import { CategoryContainer, Title } from './category.styles';

import { useSelector } from 'react-redux';
const Category = () => {
  const categoriesMap=useSelector((state)=>state.categories.categoriesMap)
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoriesMap && categoriesMap[category]) {
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);

  if (!categoriesMap) return <div>Loading...</div>;

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
