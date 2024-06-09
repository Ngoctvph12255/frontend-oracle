import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Students from './components/Students';
import Courses from './components/Courses';
import Instructors from './components/Instructors';
import Enrollments from './components/Enrollments';
import Departments from './components/Departments';
import './App.css'; 

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/students">Students</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/instructors">Instructors</Link></li>
                        <li><Link to="/enrollments">Enrollments</Link></li>
                        <li><Link to="/departments">Departments</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/students" component={Students} />
                    <Route path="/courses" component={Courses} />
                    <Route path="/instructors" component={Instructors} />
                    <Route path="/enrollments" component={Enrollments} />
                    <Route path="/departments" component={Departments} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
