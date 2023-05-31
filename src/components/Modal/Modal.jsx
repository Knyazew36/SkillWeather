import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({ setModalActive, children }) => {
  return (
    <div className='relative'>
      <div className={styles.overlay} onClick={() => setModalActive(false)} />
      <div className={styles.modal}>
        <p>{children}</p>
        <button
          className='btn btn-primary bg-green-300 p-3 rounded-xl cursor-pointer'
          onClick={() => setModalActive(false)}
        >
          Закрыть окно
        </button>
      </div>
    </div>
  );
};

export default Modal;
