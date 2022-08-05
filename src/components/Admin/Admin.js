import React from "react";
import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useLocation, NavLink } from "react-router-dom";
import AddProduct from "../AddProduct/AddProduct";
import ManageProduct from "../ManageProducts/ManageProduct";
import useDocumentTitle from "../../useDocumentTitle";

const Admin = () => {
  //change title

  useDocumentTitle("Haat-Bazar | Admin");
  let { path, url } = useRouteMatch();

  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");
  //console.log(splitLocation);
  return (
    <Router>
      <div>
        <div className='admin-container'>
          <div className='dashboard'>
            <h1 className='dashboard-title'>Haat Bazar</h1>
            <ul className='admin-nav'>
              <li>
                <NavLink exact activeClassName='active' className='link-text' to={`${url}/manageProduct`}>
                  <FontAwesomeIcon icon={faThLarge} /> manage product
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName='active' className='link-text' to={`${url}/addProduct`}>
                  <FontAwesomeIcon icon={faPlus} /> add product
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <Switch>
              <Route exact path={url}>
                <AddProduct></AddProduct>
              </Route>
              <Route path={`${path}/manageProduct`}>
                <ManageProduct></ManageProduct>
              </Route>
              <Route path={`${path}/addProduct`}>
                <AddProduct />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Admin;
