import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Instructors = () => {
    const url = "http://localhost:8080";
    const [instructors, setInstructors] = useState([]);
    const [form, setForm] = useState({
        instructorName: '',
        departmentId: '',
        departmentName: ''
    });

    const [departments, setDepartments] = useState([]);
    const [formDepartment, setFormDepartment] = useState({
        departmentId: '',
        departmentName: ''
    });
    useEffect(() => {
        fetchInstructors();
        fetchDepartments();
    }, []);

    const fetchInstructors = async () => {
        const response = await axios.get(url+ '/instructors');
        setInstructors(response.data);
    };


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
        if (form.instructorId) {
            await axios.put(url+`/instructors/${form.instructorId}`, form)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        } else {
            await axios.post(url+ '/instructors', form)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        }
        setForm({
            instructorName: '',
            departmentId: '',
            departmentName: ''
        });
        fetchInstructors();
    };

    const handleEdit = (instructor) => {
        setForm(instructor);
    };

    const handleDelete = async (instructorId) => {
        await axios.delete(url+`/instructors/${instructorId}`)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        fetchInstructors();
    };

    return (
        <div>
            <h1>Instructors</h1>
            <form onSubmit={handleSubmit}>
                <input name="instructorName" placeholder="Instructor Name" value={form.instructorName} onChange={handleChange} required />
                <select name="departmentId" value={form.departmentId} onChange={handleChange} required>
                    {departments.map(department => (<option value={department.departmentId}>{department.departmentName}</option>))}
                </select>
                <button type="submit">Save</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Instructor Name</th>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instructors.map(instructor => (
                        <tr key={instructor.instructorId}>
                            <td>{instructor.instructorName}</td>
                            <td>{instructor.departmentName}</td>
                            <td>
                                <button onClick={() => handleEdit(instructor)}>Edit</button>
                                <button onClick={() => handleDelete(instructor.instructorId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Instructors;
