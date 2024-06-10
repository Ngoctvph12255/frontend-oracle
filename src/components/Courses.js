import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
    const url = "http://localhost:8080";
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        courseName: '',
        department: {
        departmentId: '',
        departmentName: ''
        }
    });

    const [departments, setDepartments] = useState([]);
    const [formDepartment, setFormDepartment] = useState({
        departmentId: '',
        departmentName: ''
    });

    useEffect(() => {
        fetchCourses();
        fetchDepartments();
    }, []);

    const fetchCourses = async () => {
        const response = await axios.get(url+'/courses');
        setCourses(response.data);
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
        if (form.courseId) {
            await axios.put(url+`/courses/${form.courseId}`, form)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        } else {
            await axios.post(url+'/courses', form)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
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
        await axios.delete(url+`/courses/${courseId}`)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        fetchCourses();
    };

    return (
        <div>
            <h1>Courses</h1>
            <form onSubmit={handleSubmit}>
                <input name="courseName" placeholder="Course Name" value={form.courseName} onChange={handleChange} required />
                <select name="departmentId" value={form.departmentId} onChange={handleChange} required>
                                    {departments.map(department => (<option value={department.departmentId}>{department.departmentName}</option>))}
                </select>
                <button type="submit">Save</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.courseId}>
                            <td>{course.courseName}</td>
                            <td>{course.department.departmentName}</td>
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
