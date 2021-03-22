import React, { useState, useEffect } from "react"
import UserService from "../../services/userService"
import EditLog from "./EditLog"

const AttendanceLogs = () => {
  const [description, setDescription] = useState("")
  const [attendanceLogsByDate, setAttendanceLogsByDate] = useState({})
  const [durationsOfWorkByDate, setDurationsOfWorkByDate] = useState({})
  const [editingLogId, setEditingLogId] = useState(null)

  useEffect(() => {
    UserService.getAttendanceLogsByDate()
    .then(response => {
      setAttendanceLogsByDate(response.data['attendance_logs_by_date'])
      setDurationsOfWorkByDate(response.data['durations_of_work_by_date'])
    })
    .catch(error => {
      const errorObj =
        (error.response && error.response.data) ||
        error.message ||
        error.toString()

      console.log(errorObj)
    })
  }, [])

  const prettyDate = time => {
    let dateTime = new Date(time)
    return dateTime.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    })
  }

  const onChangeDescription = e => {
    const description = e.target.value
    setDescription(description)
  }

  const onClockBtnClick = e => {
    UserService.createAttendanceLog({
      name: e.target.value,
      description: description
    })
    .then(response => {
      setAttendanceLogsByDate(response.data['attendance_logs_by_date'])
      setDurationsOfWorkByDate(response.data['durations_of_work_by_date'])
    })
    .catch(error => {
      const errorObj =
        (error.response && error.response.data) ||
        error.message ||
        error.toString()

      alert(errorObj.error)
    })
  }

  const onDeleteBtnClick = e => {
    let confirmed = window.confirm("Are you sure to delete?")
    if (confirmed) {
      const logId = e.target.value
      UserService.deleteAttendanceLog(logId)
      .then(response => {
        setAttendanceLogsByDate(response.data['attendance_logs_by_date'])
        setDurationsOfWorkByDate(response.data['durations_of_work_by_date'])
      })
      .catch(error => {
        const errorObj =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
  
        alert(errorObj)
      })    
    }
  }

  const onEditBtnClick = e => {
    setEditingLogId(e.target.value)
  }

  const handleEditLog = log => {
    // update goes here
  }

  const closeEditLog = () => {
    setEditingLogId(null)
  } 

  return(
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <div className="card card-container px-3">
            <div className="form-group text-center mt-3">
              <h5 htmlFor="description">Log Description (Optional)</h5>
              <input
                type="text"
                className="form-control"
                name="description"
                value={description}
                onChange={onChangeDescription}
              />
            </div>

            <div className="btn-group mb-4">
              <div className="col-md-6">
                <button 
                  className="btn btn-primary btn-block"
                  name="clock-in-btn"
                  value="ClockIn"
                  onClick={onClockBtnClick}
                >
                  Clock In
                </button>
              </div>
              <div className="col-md-6">
                <button 
                  className="btn btn-primary btn-block"
                  name="clock-out-btn"
                  value="ClockOut"
                  onClick={onClockBtnClick}
                >
                  Clock Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr/>

      <div className="row justify-content-md-center">
        <div className="col-md-12">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Date</th>
                <th>Logs</th>
                <th>Total Hours Logged</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(attendanceLogsByDate).reverse().map(key => {
                return(
                  <tr key={key}>
                    <td>{key}</td>
                    {attendanceLogsByDate[key].map(log => {
                      if (editingLogId === log.id) {
                        <EditLog
                          key={log.id}
                          log={log}
                          onEditLog={handleEditLog}
                          onCloseEditLog={closeEditLog}
                        />
                      } else {
                        return(
                          <tr key={log.id}>
                            <td>{prettyDate(log.occured_at)}</td>
                            <td>{log.name}</td>
                            <td>{log.description}</td>
                            <td>
                              <button 
                                className="btn btn-outline-success btn-sm"
                                name="update-btn"
                                value={log.id}
                                onClick={onEditBtnClick}
                              >
                                Edit
                              </button>
                            </td>
                            <td>
                              <button 
                                className="btn btn-outline-danger btn-sm"
                                name="delete-btn"
                                value={log.id}
                                onClick={onDeleteBtnClick}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      }
                    })}
                    <td>{durationsOfWorkByDate[key]} Hours</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AttendanceLogs