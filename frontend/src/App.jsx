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
import ProgressReport from './components/Admin/ProgressReport';
// import MeetingRoom from './components/Admin/MeetingRoom';

import TeacherHome from './components/teachers/Home';
import TeacherHeader from './components/teachers/header/header';
import CourseSchedule from './components/teachers/CourseSchedule';

import StudentHome from './components/student/Home';
import StudentHeader from './components/student/header/header';
import StudentClass from './components/student/StudentClass';


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
        <Route path="/admin/live" element={<Live />} />
        <Route path="/join/:meetingId" element={<LiveClassDashboard />} />
        <Route path='/admin/create-class-schedule' element={<UpcomingClassSchedule />} />
        <Route path="/admin/schedule-class" element={<ScheduleClass />} />
        <Route path="/admin/homework" element={<Homework />} />
        <Route path="/admin/past-classes" element={<PastClasses />} />
        <Route path="/admin/test-yourself" element={<TestYourself />} />
        <Route path='/admin/progres-report' element={<ProgressReport />} />
        {/* <Route path="/admin/live/:meetingId" element={<MeetingRoom />} /> */}

        {/* Teacher Route */}
        <Route path="/teachers/home" element={<TeacherHome />} />
        <Route path="/teachers/header" element={<TeacherHeader />} />
        <Route path="/teachers/course-schedule" element={<CourseSchedule />} />

        {/* Student Routes */}
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/header" element={<StudentHeader />} />
        <Route path="/student/schedule-class" element={<StudentClass />} />

      </Routes>
    </div>
  )
}

export default App
