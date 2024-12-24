'use client';

// import Link from "next/link";
import '@/styles/EmployeeTable.css'; // Make sure to include this CSS file
import API from '@/utils/api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export default function EmployeeTable({ employees }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleEdit = async (id) => {
    router.push(`/employees/edit/${id}`)
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?'
    );
    if (confirmDelete) {
      try {
        await API.delete(`/employees/${id}`);
        alert('Employee deleted successfully.');
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete employee:', error);
        alert('Failed to delete the employee. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Employees</h1>
        {employees.length === 0 ? (
          <p className="no-employees">No employees found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Activity Status</th>
                {user.role==="admin" ? (
                  <>
                  <th>Edit</th>
                  <th>Delete</th>
                  </>
                ):(
                  <></>
                )}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id} className={index % 2 === 0 ? "even" : "odd"}>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.isActive? 'Active':'Not Active'}</td>
                  {user.role==="admin"? (
                    <>
                    <td>
                    <a
                      onClick={() => handleEdit(employee.id)}
                      className="action-link"
                    >
                      <center>
                      <EditIcon />
                      </center>
                    </a>
                    </td>
                    <td>
                    <a
                      onClick={() => handleDelete(employee.id)}
                      className="action-link"
                    >
                      <center>
                      <DeleteIcon />
                      </center>
                    </a>
                  </td>
                  </>
                  ):(
                    <></>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
