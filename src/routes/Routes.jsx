import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Groups } from '../pages/admin/Groups'
import { Courses } from '../pages/admin/course/Courses'
// eslint-disable-next-line import/named
import { Instructors } from '../pages/admin/Instructors'
import InstructorCourses from '../pages/instructor/courses/Courses'
import { Students } from '../pages/admin/Students'
import { AdminLayout } from '../layout/AdminLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { CURRENT_PATH, USER_ROLES } from '../utlis/constants/commons'
import { MyCourses } from '../pages/student/my-courses/MyCourses'
import BasicTabs from '../pages/admin/course/Tabs'
import SignInSide from '../containers/SignIn'
import InstructorLayout from '../layout/InstructorLayout'
import StudentLayout from '../layout/StudentLayout'
import { AuthManagementRoute } from './AuthManagementRoute'

export const AppRoutes = () => {
   const role = useSelector((state) => state.auth.role)
   const isAuthorized = useSelector((state) => state.auth.isAuthorized)

   const isAllowed = (roles) => {
      const rolesValues = Object.values(roles)

      return rolesValues.includes(role)
   }

   return (
      <Routes>
         <Route path="/" element={<Navigate to="/login" />} />
         <Route
            path="/login"
            element={
               <AuthManagementRoute
                  isAuth={isAuthorized}
                  component={SignInSide}
               />
            }
         />
         <Route
            path={`/${CURRENT_PATH.admin.ADMIN}/*`}
            element={
               <ProtectedRoute
                  isAllowed={isAllowed(USER_ROLES)}
                  role={role}
                  isAuth={isAuthorized}
                  component={AdminLayout}
               />
            }
         >
            <Route path={CURRENT_PATH.admin.GROUPS} element={<Groups />} />
            <Route
               path={CURRENT_PATH.admin.GROUPS_DETAIL}
               element={<GroupsInnerPage />}
            />
            <Route path={CURRENT_PATH.admin.COURSES} element={<Courses />} />
            <Route path="courses/:courseId" element={<BasicTabs />} />

            <Route
               path={CURRENT_PATH.admin.INSTRUCTOR}
               element={<Instructors />}
            />
            <Route path={CURRENT_PATH.admin.STUDENTS} element={<Students />} />
         </Route>

         <Route
            path={`/${CURRENT_PATH.instructor.INSTRUCTOR}/*`}
            element={
               <ProtectedRoute
                  isAllowed={isAllowed(USER_ROLES)}
                  isAuth={isAuthorized}
                  component={InstructorLayout}
               />
            }
         >
            <Route
               path={CURRENT_PATH.instructor.COURSES}
               element={<CoursesInstructor />}
            />
         </Route>

         <Route
            path={CURRENT_PATH.admin.INSTRUCTOR}
            element={
               <ProtectedRoute
                  isAllowed={isAllowed(USER_ROLES.ADMIN)}
                  fallBackPath="/"
                  component={Instructors}
               />
            }
         />

         <Route
            path={`/${CURRENT_PATH.student.STUDENT}/*`}
            element={
               <ProtectedRoute
                  isAllowed={isAllowed(USER_ROLES)}
                  isAuth={isAuthorized}
                  component={StudentLayout}
               />
            }
         >
            <Route
               path={CURRENT_PATH.student.COURSES}
               element={<MyCourses />}
            />
         </Route>
      </Routes>
   )
}
