import PropTypes from 'prop-types'
import './Modal.css'

const Modal = (props: any) => (
  <div className="modal">
    <div className="modal__header">
      <div className="modal__header-title-div">
        <div className="modal__header-title-div-text">{props.title}</div>
        <button type="button" className="modal__header-title-div-close" onClick={() => props.closeModal()}>
          <svg className="modal__header-title-div-close-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="modal__content">{props.children}</div>
    </div>
  </div>
)

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  closeModal: PropTypes.func
}

export default Modal