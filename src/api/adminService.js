import { axiosInstance } from '../config/axiosInstance'

export const getAllInstructors = (size = 10, page = 1) => {
   return axiosInstance.get(`api/instructors?size=${size}&page=${page}`)
}
// export const getInstructors = () => {
//    return axiosInstance.get('instructors/findById')
// }
export const instructorPost = (data) => {
   return axiosInstance.post('api/instructors', data)
}
export const instructorPut = () => {
   return axiosInstance.put('api/instructors')
}
export const instructorDelete = (id) => {
   return axiosInstance.delete(`api/instructors/${id}`)
}
