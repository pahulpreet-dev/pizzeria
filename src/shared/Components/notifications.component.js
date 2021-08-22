import { Toast } from "react-bootstrap";

const Notification = (props) => {
  const closeNotification = () => {
    props.closeNotification();
  };
  return (
    <Toast
      bg="Warning"
      className="notification-toast m-4"
      onClose={closeNotification}
      show={props.showToast}
      autohide
    >
      <Toast.Body>
        <strong>{props.toastMessage}</strong>
      </Toast.Body>
    </Toast>
  );
};

export default Notification;
