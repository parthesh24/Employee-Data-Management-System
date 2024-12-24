'use client';

import { useEffect, useState } from 'react';
import API from '../../utils/api';
import EmployeeTable from '../../components/EmployeeTable';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
        const fetchEmployees = async () => {
            try{
                const response = await API.get('/employees');
                setEmployees(response.data);
            } catch (err) {
                console.log('Failed:', err);
            }
        };

        fetchEmployees();
    },[]);

    return (
        <div>
            <style>{styles}</style>
            {user.role==="admin"?(
            <>
            <center><div className='button-container'>
            <a href='/employees/create'><button className='employee-button'>Add Employee</button></a>
            </div></center>
            </>
            ):(
                <></>
            )}
            <EmployeeTable employees={employees}/>
        </div>
        
    );
}

const styles = `
.button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

.employee-button {
    width: auto;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background-color: #007bff; 
    border: 1px solid transparent;
    border-radius: 6px; 
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.employee-button:hover {
    background-color: #0056b3; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}

.employee-button:active {
    transform: scale(0.98); 
    background-color: #004085; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

`;