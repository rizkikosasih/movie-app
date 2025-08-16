import { useRef, useEffect } from 'react';

const DynamicModal = ({ isOpen, onClose, title, children, id = 'dynamic-modal' }) => {
  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current?.close();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      closeModal();
    }
    const handleEsc = (e) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <dialog id={id} className="modal" ref={modalRef} onClick={e => {
      if (e.target === modalRef.current) closeModal();
    }}>
      <div className="modal-box scrollbar-none">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
        </form>

        <h3 className="font-bold text-lg mb-8">{title}</h3>

        {children}
      </div>
    </dialog>
  );
};

export default DynamicModal;
