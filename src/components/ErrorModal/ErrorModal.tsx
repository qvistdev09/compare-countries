export default function ErrorModal({ onCloseAction }: Props) {
  return (
    <div id="error-modal-wrapper">
      <div id="error-modal">
        <div className="modal-header-div flex-row align-center p-small">
          <i className="fas fa-exclamation-circle error-icon m-right-small"></i>
          <p>Oh no!</p>
        </div>
        <div className="p">
          <p className="error-description m-bottom">
            It appears the REST Countries API is offline right now - you can still compare the cached countries, but new
            ones can&apos;t be added. Please try again later!
          </p>
          <button className="maxed error-btn" onClick={onCloseAction}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface Props {
  onCloseAction: () => void;
}
