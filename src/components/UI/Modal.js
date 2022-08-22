import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
// import { ReactDOM } from "react";
const BackDrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick}></div>;
};
const OverLay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onModalClick} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <OverLay>{props.children}</OverLay>,
        document.getElementById("overlays")
      )}
    </>
  );
};
export default Modal;
