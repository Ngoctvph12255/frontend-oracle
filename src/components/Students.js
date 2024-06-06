import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        studentName: '',
        birthDate: '',
        gender: '',
        departmentId: ''
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await axios.get('localhost:8080/students');
        setStudents(response.data);
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
            await axios.put(`localhost:8080/students/${form.studentId}`, form);
        } else {
            await axios.post('localhost:8080/students', form);
        }
        setForm({
            studentName: '',
            birthDate: '',
            gender: '',
            departmentId: ''
        });
        fetchStudents();
    };

    const handleEdit = (student) => {
        setForm(student);
    };

    const handleDelete = async (studentId) => {
        await axios.delete(`localhost:8080/students/${studentId}`);
        fetchStudents();
    };

    return (
        <div>
            <h1>Students</h1>
            <form onSubmit={handleSubmit}>
                <input name="studentName" placeholder="Name" value={form.studentName} onChange={handleChange} required />
                <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} required />
                <select name="gender" value={form.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                <input name="departmentId" placeholder="Department ID" value={form.departmentId} onChange={handleChange} required />
                <button type="submit">Save</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Department ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.studentId}>
                            <td>{student.studentName}</td>
                            <td>{student.birthDate}</td>
                            <td>{student.gender}</td>
                            <td>{student.departmentId}</td>
                            <td>
                                <button onClick={() => handleEdit(student)}>Edit</button>
                                <button onClick={() => handleDelete(student.studentId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Students;
