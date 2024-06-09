import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Departments = () => {
    const url = "http://localhost:8080";
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({
        departmentId: '',
        departmentName: ''
    });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        const response = await axios.get(url+'/departments');
        setDepartments(response.data);
            console.log(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.departmentId) {
            await axios.put(url+`/departments/${form.departmentId}`, form)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        } else {
            await axios.post(url+'/departments', form)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        }
        setForm({
            departmentId: '',
            departmentName: ''
        });
        fetchDepartments();
    };

    const handleEdit = (department) => {
        setForm(department);
    };

    const handleDelete = async (departmentId) => {
        await axios.delete(url+`/departments/${departmentId}`);
        fetchDepartments();
    };

    return (
        <div>
            <h1>Departments</h1>
            <form onSubmit={handleSubmit}>
                <input name="departmentId" placeholder="ID" value={form.departmentId} onChange={handleChange} hidden= "true"/>
                <input name="departmentName" placeholder="Name" value={form.departmentName} onChange={handleChange} required />
                <button type="submit">Save</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(department => (
                        <tr key={department.departmentId}>
                            <td>{department.departmentName}</td>
                            <td>
                                <button onClick={() => handleEdit(department)}>Edit</button>
                                <button hidden ={department.isDelete} onClick={() => handleDelete(department.departmentId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Departments;
