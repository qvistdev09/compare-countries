export default function Tooltip({ text }: Props) {
  return (
    <div className="tooltip">
      <i className="fas fa-info-circle tooltip-icon"></i>
      <div className="tooltip-hover">
        <div className="tooltip-pointer"></div>
        <p className="tooltip-text">{text}</p>
      </div>
    </div>
  );
}

interface Props {
  text: string;
}
