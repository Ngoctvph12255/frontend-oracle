import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
    const url = "http://localhost:8080";
    var isDelete = "true";
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        studentId: '',
        studentName: '',
        birthDate: '',
        gender: '',
        departmentId: '',
        departmentName: '',
        isDelete: ''
    });
    const [departments, setDepartments] = useState([]);
    const [formDepartment, setFormDepartment] = useState({
        departmentId: '',
        departmentName: ''
    });

    useEffect(() => {
        fetchStudents();
        fetchDepartments();
    }, []);

    const fetchStudents = async () => {
        const response = await axios.get(url+'/students');
        setStudents(response.data);
            console.log(response.data);
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
        if (form.studentId) {
            await axios.put(url+`/students/${form.studentId}`, form)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        } else {
            await axios.post(url+'/students', form)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        }
        setForm({
            studentId: '',
            studentName: '',
            birthDate: '',
            gender: '',
            departmentName: ''
        });
        fetchStudents();
    };

    const handleEdit = (student) => {
        setForm(student);
    };

    const handleDelete = async (studentId) => {
        await axios.delete(url+`/students/${studentId}`)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        fetchStudents();
    };

    return (
        <div>
            <h1>Students</h1>
            <form onSubmit={handleSubmit}>
                <input name="studentId" placeholder="ID" value={form.studentId} onChange={handleChange} hidden= "true"/>
                <input name="studentName" placeholder="Name" value={form.studentName} onChange={handleChange} required />
                <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} required />
                <select name="gender" value={form.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                <select name="departmentId" value={form.departmentId} onChange={handleChange} required>
                    {departments.map(department => (<option value={department.departmentId}>{department.departmentName}</option>))}
                </select>
                <button type="submit">Save</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.studentId}>
                            <td>{student.studentName}</td>
                            <td>{student.birthDate}</td>
                            <td>{student.gender == 'M'? 'Male':'Female'}</td>
                            <td>{student.departmentName}</td>
                            <td>
                                <button onClick={() => handleEdit(student)}>Edit</button>
                                <button hidden ={student.isDelete} onClick={() => handleDelete(student.studentId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Students;
