'use client';

import { useState } from 'react';
import '../styles/EmployeeForm.css';

export default function EmployeeForm({ initialData = {}, onSubmit }) {
    const [name, setName] = useState(initialData.name || '');
    const [position, setPosition] = useState(initialData.position || '');
    const [department, setDepartment] = useState(initialData.department || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, position, department });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="form-container"
        >
            <h2 className="form-title">
                Add Employee
            </h2>
            <div className="form-group">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Position</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Department</label>
                <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    className="form-input"
                />
            </div>
            <button
                type="submit"
                className="form-button"
            >
                {initialData.id ? 'Update Employee' : 'Add Employee'}
            </button>
        </form>
    );
};
