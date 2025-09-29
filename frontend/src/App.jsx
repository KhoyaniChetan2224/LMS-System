import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Signup from './pages/Signup';
import Headers from './heaser and footer bar/header';

import AdminHome from './components/Admin/AdminHome';
import AdminHeader from './components/Admin/Admin Header/header';
import Live from './components/Admin/live';
import UpcomingClassSchedule from './components/Admin/UpcomingClassSchedule';
import LiveClassDashboard from './components/Admin/LiveClassDashboard';
import ScheduleClass from './components/Admin/ScheduleClass';
import Homework from './components/Admin/Homework';
import PastClasses from './components/Admin/PastClasses';
import TestYourself from './components/Admin/TestYourself';
import TestPage from './components/Admin/TestPage';
import ProgressReport from './components/Admin/ProgressReport';
import CoursePage from './components/Admin/CoursePage';

import TeacherHome from './components/teachers/Home';
import TeacherHeader from './components/teachers/header/header';
import CourseSchedule from './components/teachers/CourseSchedule';
import Chapter from './components/teachers/Chapter';
import TeacherUpcommingLiveClasses from './components/teachers/TeacherUpcomingClasses';


import StudentHome from './components/student/Home';
import StudentHeader from './components/student/header/header';
import StudentClass from './components/student/StudentClass';
import ScheduleUpcomingLiveClass from './components/student/StudentUpcomingLiveClass';
import StudentHomework from './components/student/StudentHomework';
import StudentPastCLasses from './components/student/StudentPastClasses';
import StudentYourSelf from './components/student/TestYourself';
import StudentProgressReport from './components/student/StudentProgressReport';
// import StudentTestPage from './components/student/TestPage';

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/header' element={<Headers />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Route */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/header" element={<AdminHeader />} />
        <Route path="/admin/live/:title" element={<Live />} />
        <Route path="/join/:meetingId" element={<LiveClassDashboard />} />
        <Route path='/admin/create-class-schedule' element={<UpcomingClassSchedule />} />
        <Route path="/admin/schedule-class" element={<ScheduleClass />} />
        <Route path="/admin/homework" element={<Homework />} />
        <Route path="/admin/past-classes" element={<PastClasses />} />
        <Route path="/admin/test-yourself" element={<TestYourself />} />
        <Route path="/admin/test-yourself/:id" element={<TestPage />} />
        <Route path='/admin/progres-report' element={<ProgressReport />} />
        <Route path="/admin/course/:title" element={<CoursePage />} />

        {/* Teacher Route */}
        <Route path="/teachers/home" element={<TeacherHome />} />
        <Route path="/teachers/header" element={<TeacherHeader />} />
        <Route path="/teachers/course-schedule" element={<CourseSchedule />} />
        <Route path='/teachers/chapter' element={<Chapter />} />
        <Route path='/teachers/create-class-schedule' element={<TeacherUpcommingLiveClasses />} />

        {/* Student Routes */}
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/header" element={<StudentHeader />} />
        <Route path="/student/schedule-class" element={<StudentClass />} />
        <Route path='/student/upcoming-live-class' element={<ScheduleUpcomingLiveClass />} />
        <Route path='/student/student-homework' element={<StudentHomework />} />
        <Route path='/student/student-past-classes' element={<StudentPastCLasses />} />
        <Route path='/student/test-yourself' element={<StudentYourSelf />} />
        <Route path='/student/progress-report' element={<StudentProgressReport />} />
        {/* <Route path='/student/test-yourself/:id' element={<StudentTestPage/>} /> */}

      </Routes>
    </div>
  )
}

export default App
