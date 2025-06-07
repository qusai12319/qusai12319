import { Link } from "react-router-dom";
import { categories } from "../../main";
import CategoryItem from "../category-item/category-item.component";
import './directory.style.scss';

const Directory = () => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Link key={category.id} to={`/shop/${category.title.toLowerCase()}`}>
          <CategoryItem category={category} />
        </Link>
      ))}
    </div>
  );
};

export default Directory;
