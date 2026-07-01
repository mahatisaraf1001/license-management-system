import "../styles/ConfirmModal.css";

function ConfirmModal({

    isOpen,

    title,

    message,

    confirmText = "Delete",

    cancelText = "Cancel",

    onConfirm,

    onCancel

}) {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="confirm-modal">

                <h3>{title}</h3>

                <p>{message}</p>

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >

                        {cancelText}

                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >

                        {confirmText}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmModal;