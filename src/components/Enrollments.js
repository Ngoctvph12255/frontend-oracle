import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [form, setForm] = useState({
        studentId: '',
        courseId: '',
        enrollmentDate: ''
    });

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        const response = await axios.get('localhost:8080/enrollments');
        setEnrollments(response.data);
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
        if (form.enrollmentId) {
            await axios.put(`localhost:8080/enrollments/${form.enrollmentId}`, form);
        } else {
            await axios.post('localhost:8080/enrollments', form);
        }
        setForm({
            studentId: '',
            courseId: '',
            enrollmentDate: ''
        });
        fetchEnrollments();
    };

    const handleEdit = (enrollment) => {
        setForm(enrollment);
    };

    const handleDelete = async (enrollmentId) => {
        await axios.delete(`localhost:8080/enrollments/${enrollmentId}`);
        fetchEnrollments();
    };

    return (
        <div>
            <h1>Enrollments</h1>
            <form onSubmit={handleSubmit}>
                <input name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} required />
                <input name="courseId" placeholder="Course ID" value={form.courseId} onChange={handleChange} required />
                <input type="date" name="enrollmentDate" value={form.enrollmentDate} onChange={handleChange} required />
                <button type="submit">Save</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Course ID</th>
                        <th>Enrollment Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map(enrollment => (
                        <tr key={enrollment.enrollmentId}>
                            <td>{enrollment.studentId}</td>
                            <td>{enrollment.courseId}</td>
                            <td>{enrollment.enrollmentDate}</td>
                            <td>
                                <button onClick={() => handleEdit(enrollment)}>Edit</button>
                                <button onClick={() => handleDelete(enrollment.enrollmentId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Enrollments;
