'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import API from '../../../../utils/api';
import '@/styles/EmployeeForm.css';
import ProtectedRoute from '../../../../components/ProtectedRoute'

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [isActive, setActive] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployee() {
      if (params?.id) {
        try {
          const res = await API.get(`/employees/${params.id}`);
          const data = res.data;
          console.log(data);
          setEmployee(data);
          setName(data.name);
          setPosition(data.position);
          setDepartment(data.department);
          setActive(data.isActive);
        } catch (error) {
          console.error('Error fetching employee:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchEmployee();
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/employees/${params.id}`, { name, position, department, isActive });
        console.log(res)
      if (res.status === 200) {
        alert('Employee updated successfully!');
        router.push('/employees');
      } else {
        alert('Failed to update employee.');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('An error occurred while updating the employee.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!employee) {
    return <p>Employee not found</p>;
  }

  return (
    <div>
      <ProtectedRoute>
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="form-title">Edit Employee</h1>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setActive(e.target.checked)}
            />
            Active
          </label>
        </div>
        <button type="submit" className="form-button">
          Update Employee
        </button>
      </form>
      </ProtectedRoute>
    </div>
  );
}
