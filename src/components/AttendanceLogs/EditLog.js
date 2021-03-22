import React, { useState, Fragment } from "react"

const EditLog = (props) => {
  const [log, setLog] = useState(props.log)

  const handleTimeChange = () => {
    setLog()
  }

  const handleNameChange = () => {
    setLog()
  }

  const handleDescriptionChange = () => {
    setLog()
  }

  const handleSubmit = () => {
    props.onEditLog(log)
  }

  const handleCloseForm = () => {
    props.onCloseEditLog()
  }

  return(
    <Fragment>
      <tr>
        <td>
          <input
            name="description"
            ype="text"
            value={log.occured_at}
            onChange={handleTimeChange} 
          />
        </td>
        <td>
          <input
            name="description"
            ype="text"
            value={log.name}
            onChange={handleNameChange} 
          />
        </td>
        <td>
          <input 
            name="description"
            ype="text"
            value={log.description}
            onChange={handleDescriptionChange} 
          />
        </td>
        <td>
          <button onClick={handleSubmit}>Update Log</button>
        </td>
        <td>
          <button onClick={handleCloseForm}> X </button>
        </td>
      </tr>
    </Fragment>  
  )
}

export default EditLog