import { Route, Routes } from "react-router-dom";
import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigatio/nav.component";
import Authentication from "./components/routes/auth/authentication.component.jsx";
import Shope from "./components/routes/shope/shop.component.jsx";
import Checkout from "./components/checkout/checkout.jsx";
import { useEffect } from "react";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils.js";
import { createUserDocumentFromAuth } from "./utils/firebase/firebase.utils.js";
import { setCurrentUser } from "./REDUCERS/user/user.action.js";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe; // cleanup
  }, [dispatch]);
  return (
    <Routes>
      {/* Layout route */}
      <Route path="/" element={<Navigation />}>
        {/* Nested child routes */}
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop/*" element={<Shope />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
