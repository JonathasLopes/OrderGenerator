import "./ConfirmDeleteModal.css";

interface IConfirmDeleteModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDeleteModal(props: IConfirmDeleteModalProps) {
    if (!props.isOpen) return null;

    return (
        <div className="cdm-backdrop" onClick={props.onCancel}>
            <div
                className="cdm-dialog"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="cdm-title">Tem certeza?</h2>
                <p className="cdm-message">Essa ação não poderá ser desfeita.</p>
                <div className="cdm-actions">
                    <button
                        className="cdm-btn cdm-btn--cancel"
                        onClick={props.onCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        className="cdm-btn cdm-btn--danger"
                        onClick={props.onConfirm}
                    >
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;