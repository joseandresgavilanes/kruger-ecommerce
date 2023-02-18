import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import MainPage from "../pages/customer/MainPage/MainPage";
import Login from "../pages/login/Login";
import SearchProductPage from "../pages/customer/SearchProductPage/SearchProductPage";
import AboutUs from "../pages/customer/AboutUs/AboutUs";
import ProductDetail from "../pages/customer/ProductDetail/ProductDetail";
import ContactUs from "../pages/customer/ContactUs/ContactUs";
import Faq from "../pages/customer/Faq/Faq";
import ProtectedRoutes from "./ProtectedRoutes";
import Cart from "../pages/customer/Cart/Cart";
import Payment from "../pages/customer/Payment/Payment";

import Profile from "../pages/customer/Profile/Profile";

import { ProductsView } from "../pages/admin/Products/ProductsView";
import { AdminMainPage } from "../pages/admin/AdminMainPage";
import { CustomersView } from "../pages/admin/Customers/CustomersView";
import { ServicesView } from "../pages/admin/Services/ServicesView";
import { AdminsView } from "../pages/admin/Admins/AdminsView";
import { CouponsView } from "../pages/admin/Coupons/CouponsView";
import { CartsView } from "../pages/admin/Carts/CartsView";
import { ReviewsView } from "../pages/admin/Reviews/ReviewsView";
import { AnalitycsView } from "../pages/admin/Analytics/AnalitycsView";

import AllServices from "../pages/customer/AllServices/AllServices";
import AllProducts from "../pages/customer/AllProducts/AllProducts";
import { useDispatch } from "react-redux";
import { getCurrentCart } from "../store/cart/thunks";
import AreaView from "../pages/admin/ShowCharts/AreaView";
import LineView from "../pages/admin/ShowCharts/LineView";
import BarView from "../pages/admin/ShowCharts/BarView";
import ComposedView from "../pages/admin/ShowCharts/ComposedView";
import FunnelView from "../pages/admin/ShowCharts/FunnelView";
import PieView from "../pages/admin/ShowCharts/PieView";
import RadarView from "../pages/admin/ShowCharts/RadarView";
import RadialView from "../pages/admin/ShowCharts/RadialView";
import SankeyView from "../pages/admin/ShowCharts/SankeyView";
import TreeView from "../pages/admin/ShowCharts/TreeView";
import TextEditor from "../pages/admin/TextEditor/TextEditor";
import ToDo from "../pages/admin/ToDo/ToDo";
import CalendarComponent from "../pages/admin/Calendar/CalendarComponent";
import ProtectedAdminRoutes from "./ProtectedAdminRoutes";
import { Order } from "../pages/customer/Order/Order";
import UpdateCompany from "../pages/admin/UpdateCompany/UpdateCompany";
import Support from "../pages/customer/Support/Support";
import AboutCompany from "../pages/customer/AboutCompany/AboutCompany";
import CustomerCoupons from "../pages/customer/Cupons/CustomerCoupons";
import Pomodoro from "../pages/admin/Pomodoro/Pomodoro";
import PasswordRecovery from "../pages/customer/Passwordrecovery/PasswordRecovery";
import NoCard from "../pages/customer/NoCard/NoCard";
import { useCallback } from "react";
import { AuthVerify } from "../components/AuthVerify/AuthVerify";
import { setCurrentUser } from "../store/user/userSlice";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { resetCart } from "../store/cart/cartSlice";
import Comparacion from "../pages/customer/Comparacion/Comparacion";

export const MainRouter = () => {
  const dispatch = useDispatch();
  dispatch(getCurrentCart());
  const location = useLocation();
  const navigation = useNavigate();
  const [displayBasic, setDisplayBasic] = useState(false);

  const logOut = useCallback(() => {
    setDisplayBasic(true)
    setTimeout(() => {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("cart");
      dispatch(setCurrentUser(null));
      dispatch(resetCart())
      navigation("/");
      window.location.reload(true)
    }, 3000);

  }, [dispatch]);

  const onHide = () => {
    setDisplayBasic(false)
  }

  const renderFooter = () => {
    return (
        <div>
            <Button label="Aceptar" icon="pi pi-check" onClick={() => onHide()} autoFocus />
        </div>
    );
  }

  return (
    <>
    <Dialog header="Ups!" footer={()=>renderFooter()} visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide()}>
        <h5>Su sesión ha caducado porfavor vuelva a iniciar sesión.</h5>
    </Dialog>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<SearchProductPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/service/:id" element="" />
      <Route path="/services" element={<AllServices />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/company" element={<AboutCompany />} />
      <Route path="/support" element={<Support />} />
      <Route path="/testimonials/:id" element="" />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
      <Route  path="/comparacion" element={<Comparacion/>}/>
      <Route element={<ProtectedRoutes />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/no-card" element={<NoCard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/coupons" element={<CustomerCoupons />} />
      </Route>
      <Route element={<ProtectedAdminRoutes />}>
        <Route path="/admin" element={<AdminMainPage />}>
          <Route path="" element={<ProductsView />} />
          <Route path="productivity" element={<Pomodoro />} />
          <Route path="analitycs" element={<AnalitycsView />} />
          <Route path="line" element={<LineView />} />
          <Route path="area" element={<AreaView />} />
          <Route path="bar" element={<BarView />} />
          <Route path="composed" element={<ComposedView />} />
          <Route path="funnel" element={<FunnelView />} />
          <Route path="pie" element={<PieView />} />
          <Route path="radar" element={<RadarView />} />
          <Route path="radial" element={<RadialView />} />
          <Route path="sankey" element={<SankeyView />} />
          <Route path="tree" element={<TreeView />} />
          <Route path="admins" element={<AdminsView />} />
          <Route path="products" element={<ProductsView />} />
          <Route path="services" element={<ServicesView />} />
          <Route path="coupons" element={<CouponsView />} />
          <Route path="carts" element={<CartsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="customers" element={<CustomersView />} />
          <Route path="calendar" element={<CalendarComponent />} />
          <Route path="todo" element={<ToDo />} />
          <Route path="text-editor" element={<TextEditor />} />
          <Route path="empressa" element={<UpdateCompany />} />
        </Route>
      </Route>
    </Routes>
    <AuthVerify logOut={logOut}/>
    </>

  );
};
