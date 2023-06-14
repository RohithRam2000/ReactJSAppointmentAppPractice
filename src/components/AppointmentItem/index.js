// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickOnStar} = props
  const {id, name, date, isStarred} = appointmentDetails
  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const updateStar = () => {
    onClickOnStar(id)
  }

  return (
    <li className="appointment-item-desc">
      <div className="appointment-item-desc-con">
        <p className="appointment-item-title">{name}</p>
        <p className="appointment-item-date">Date: {date}</p>
      </div>
      <button
        className="start-button"
        type="button"
        onClick={updateStar}
        data-testid="star"
      >
        <img className="star-image" src={starImgUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
