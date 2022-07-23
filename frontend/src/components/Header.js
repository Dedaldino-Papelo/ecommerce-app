import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Actions/userLoginActions'
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLoginReducers)
  const { userInfo } = userLogin

  //logout user
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/user/login')
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>e-Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox  />
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link><i className='fas fa-shopping-cart '></i>Cart</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to='/user/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : <LinkContainer to="/user/login">
                <Nav.Link><i className='fas fa-user '></i>SignIn</Nav.Link>
              </LinkContainer>
              }
              {userInfo && userInfo.isAdmin === "true" && (
                <NavDropdown title='Admin' id="AdminMenu">
                  <LinkContainer to='/admin/users'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='admin/orders'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
