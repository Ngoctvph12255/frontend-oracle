import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Enrollments = () => {
const url = "http://localhost:8080";
    const [enrollments, setEnrollments] = useState([]);
    const [form, setForm] = useState({
        studentId: '',
        studentName: '',
        courseId: '',
        courseName: '',
        enrollmentDate: ''
    });

    const [students, setStudents] = useState([]);
    const [formStudent, setFormStudent] = useState({
        studentId: '',
        studentName: ''
    });
    const [courses, setCourses] = useState([]);
    const [formCourse, setFormCourse] = useState({
        courseName: '',
        courseId: ''
    });

    useEffect(() => {
        fetchEnrollments();
        fetchStudents();
        fetchCourses();
    }, []);

    const fetchEnrollments = async () => {
        const response = await axios.get(url + '/enrollments');
        setEnrollments(response.data);
    };
    const fetchStudents = async () => {
        const response = await axios.get(url+'/students');
        setStudents(response.data);
            console.log(response.data);
    };

    const fetchCourses = async () => {
        const response = await axios.get(url+'/courses');
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
        let response;
        if (form.enrollmentId) {
            await axios.put(url + `/enrollments/${form.enrollmentId}`, form)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        } else {
            await axios.post(url + '/enrollments', form)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        }
        setForm({
            studentId: '',
            studentName: '',
            courseId: '',
            courseName: '',
            enrollmentDate: ''
        });
        fetchEnrollments();
    };

    const handleEdit = (enrollment) => {
        setForm(enrollment);
    };

    const handleDelete = async (enrollmentId) => {
        await axios.delete(url + `/enrollments/${enrollmentId}`)
            .then(()=>{
            }).catch((error)=>{
               alert(error);
            });
        fetchEnrollments();
    };

    return (
        <div>
            <h1>Enrollments</h1>
            <form onSubmit={handleSubmit}>
                <select name="courseId" value={form.courseId} onChange={handleChange} required>
                    {courses.map(course => (<option value={course.courseId}>{course.courseName}</option>))}
                </select>
                <select name="studentId" value={form.studentId} onChange={handleChange} required>
                    {students.map(student => (<option value={student.studentId}>{student.studentName}</option>))}
                </select>
                <input type="date" name="enrollmentDate" value={form.enrollmentDate} onChange={handleChange} required />
                <button type="submit">Save</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Course Name</th>
                        <th>Enrollment Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map(enrollment => (
                        <tr key={enrollment.enrollmentId}>
                            <td>{enrollment.studentName}</td>
                            <td>{enrollment.courseName}</td>
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
