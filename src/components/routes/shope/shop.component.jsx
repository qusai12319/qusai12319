import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.compnent';
import Category from '../category/Category.component';

import { useEffect } from 'react';
import { setCategoriesMap } from '../../../REDUCERS/categories/categories.action';
import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
const Shop = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      dispatch(setCategoriesMap(categoryMap));
    };
    getCategories();
  }, [dispatch]);
  return (
    
    <Routes>
      <Route index={true} element={<CategoriesPreview />} />
      <Route path=':category' element={<Category/>} />
    </Routes>
  );
};

export default Shop;