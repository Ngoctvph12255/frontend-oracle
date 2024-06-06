import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        courseName: '',
        departmentId: ''
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const response = await axios.get('localhost:8080/courses');
        setCourses(response.data);
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
        if (form.courseId) {
            await axios.put(`localhost:8080/courses/${form.courseId}`, form);
        } else {
            await axios.post('localhost:8080/courses', form);
        }
        setForm({
            courseName: '',
            departmentId: ''
        });
        fetchCourses();
    };

    const handleEdit = (course) => {
        setForm(course);
    };

    const handleDelete = async (courseId) => {
        await axios.delete(`localhost:8080/courses/${courseId}`);
        fetchCourses();
    };

    return (
        <div>
            <h1>Courses</h1>
            <form onSubmit={handleSubmit}>
                <input name="courseName" placeholder="Course Name" value={form.courseName} onChange={handleChange} required />
                <input name="departmentId" placeholder="Department ID" value={form.departmentId} onChange={handleChange} required />
                <button type="submit">Save</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Department ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.courseId}>
                            <td>{course.courseName}</td>
                            <td>{course.departmentId}</td>
                            <td>
                                <button onClick={() => handleEdit(course)}>Edit</button>
                                <button onClick={() => handleDelete(course.courseId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Courses;
