// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], starredIsActive: false}

  getAppointmentDetails = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newDate = date.replaceAll('-', ', ')
    const newAppointment = {
      id: v4(),
      name: title,
      date: format(new Date(newDate), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
    }))
    this.setState({title: ''})
    this.setState({date: ''})
  }

  getAppTitle = event => {
    this.setState({title: event.target.value})
  }

  getAppDate = event => {
    this.setState({date: event.target.value})
  }

  onClickOnStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  starredToggle = () => {
    this.setState(prevState => ({starredIsActive: !prevState.starredIsActive}))
  }

  render() {
    const {title, date, appointmentsList, starredIsActive} = this.state
    const getFilteredList = () => {
      const filteredList = appointmentsList.filter(
        eachItem => eachItem.isStarred === true,
      )
      return filteredList
    }
    const filteredList = starredIsActive ? getFilteredList() : appointmentsList

    const starredBtnStyle = starredIsActive ? 'bottom-part-button2' : ''

    return (
      <div className="bg-container">
        <div className="card">
          <div className="top-part">
            <div className="part-1">
              <h1 className="title">Add Appointment</h1>
              <form
                className="form-details"
                onSubmit={this.getAppointmentDetails}
              >
                <label className="label-element" htmlFor="titleInput">
                  TITLE
                </label>
                <input
                  className="input-element"
                  id="titleInput"
                  type="text"
                  placeholder="Title"
                  onChange={this.getAppTitle}
                  value={title}
                />
                <label className="label-element" htmlFor="dateInput">
                  DATE
                </label>
                <input
                  className="input-element"
                  id="dateInput"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  onChange={this.getAppDate}
                  value={date}
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="part-2">
              <img
                className="part2-image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <div className="bottom-part">
            <div className="bottom-part-head">
              <h1 className="bottom-part-title">Appointments</h1>
              <button
                className={`bottom-part-button ${starredBtnStyle}`}
                type="button"
                onClick={this.starredToggle}
              >
                Starred
              </button>
            </div>
            <ul className="appoint-items-container">
              {filteredList.map(eachItem => (
                <AppointmentItem
                  appointmentDetails={eachItem}
                  key={eachItem.id}
                  onClickOnStar={this.onClickOnStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
