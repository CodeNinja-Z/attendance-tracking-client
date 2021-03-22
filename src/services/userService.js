import axios from 'axios'
import authHeader from './authHeader'

const API_URL = 'http://localhost:3000/api/v1/'

axios.defaults.headers.common['Authorization'] = authHeader()
axios.defaults.headers.common['Content-Type'] = 'application/json'

const getAttendanceLogsByDate = () => {
  return axios.get(API_URL + 'attendance_logs')
}

const createAttendanceLog = (attendance_log_params) => {
  return axios.post(API_URL + 'attendance_logs',  attendance_log_params)
}

const updateAttendanceLog = (attendance_log_params, id) => {
  return axios.put(API_URL + `attendance_logs/${id}`, attendance_log_params)
}

const deleteAttendanceLog = (id) => {
  return axios.delete(API_URL + `attendance_logs/${id}`)
}

export default {
  getAttendanceLogsByDate,
  createAttendanceLog,
  updateAttendanceLog,
  deleteAttendanceLog
}