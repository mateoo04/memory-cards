import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Modal.css';

export default function Modal({ title, message, onClose, buttonText }) {
  return createPortal(
    <div className='modal'>
      <h3>{title}</h3>
      <p>{message}</p>
      <button onClick={onClose}>{buttonText}</button>
    </div>,
    document.body
  );
}
