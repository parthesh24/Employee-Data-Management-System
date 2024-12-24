'use client';

// import { AuthProvider } from '@/context/AuthContext';
import Link from 'next/link';
import '@/styles/Home.css';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function HomePage() {
  const { user,logout } = useContext(AuthContext);
  var role = "abc";
  if (user){
    role = user.role
  }
  console.log("user in home",user);
  return (
    <div className="gradient-bg">
      <div className="card-container">
        <h1 className="page-title">Employee Management</h1>
        <p className="welcome-text">
          Welcome to the Employee Management System. Use the links below to manage employees.
        </p>
        <div className="button-container">
        {user==null ? (
          <>
          <Link
            href="/register"
            className="nav-button login-button"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="nav-button login-button"
          >
            Login
          </Link>
          </>
        ) : (
          <Link
            href="/employees"
            className="nav-button view-button"
          >
            View Employees
          </Link>
        )}
        {role === "admin" ? (
          <Link
            href="/employees/create"
            className="nav-button create-button"
          >
            Add Employee
          </Link>
        ) : (
          <></>
        )}
        {user!==null ? (
          <Link
            onClick={logout}
            href="/"
            className="nav-button logout-button"
          >
            Logout
          </Link>
        ) : (
          <></>
        )}
        </div>
      </div>
    </div>
  );
}