import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [form, setForm] = useState({
        instructorName: '',
        departmentId: ''
    });

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = async () => {
        const response = await axios.get('localhost:8080/instructors');
        setInstructors(response.data);
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
            await axios.put(`localhost:8080/instructors/${form.instructorId}`, form);
        } else {
            await axios.post('localhost:8080/instructors', form);
        }
        setForm({
            instructorName: '',
            departmentId: ''
        });
        fetchInstructors();
    };

    const handleEdit = (instructor) => {
        setForm(instructor);
    };

    const handleDelete = async (instructorId) => {
        await axios.delete(`localhost:8080/instructors/${instructorId}`);
        fetchInstructors();
    };

    return (
        <div>
            <h1>Instructors</h1>
            <form onSubmit={handleSubmit}>
                <input name="instructorName" placeholder="Instructor Name" value={form.instructorName} onChange={handleChange} required />
                <input name="departmentId" placeholder="Department ID" value={form.departmentId} onChange={handleChange} required />
                <button type="submit">Save</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Instructor Name</th>
                        <th>Department ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instructors.map(instructor => (
                        <tr key={instructor.instructorId}>
                            <td>{instructor.instructorName}</td>
                            <td>{instructor.departmentId}</td>
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
