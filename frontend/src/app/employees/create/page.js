'use client';

import { useRouter } from 'next/navigation';
import EmployeeForm from '../../../components/EmployeeForm';
import API from '../../../utils/api';

export default function CreateEmployeePage() {
    const router = useRouter();

    const handleCreate = async (data) => {
        try {
            console.log(data);
            await API.post('/employees',data);
            alert("Employee Added Successfully");
            router.push('/employees');
        } catch (err){
            console.log("failed", err);
        }
    };

    return (
        <div>
            <EmployeeForm onSubmit={handleCreate} />
        </div>
    );
}