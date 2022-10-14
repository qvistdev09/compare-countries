import Tooltip from '../Tooltip';

export default function CheckboxPanel({ checkboxes }: Props) {
  return (
    <div className="hide screen-small-flex-row screen-small-align-center screen-small-m-left">
      {checkboxes.map((checkbox) => (
        <div key={checkbox.label} className={`flex-row align-center m-right${checkbox.enabled ? '' : ' low-opacity'}`}>
          <button onClick={checkbox.enabled ? checkbox.onClick : undefined}>
            <i className={`${checkbox.checked ? 'far fa-check-square' : 'far fa-square'} checkbox-icon`} />
          </button>
          <p className="checkbox-label m-left-small">{checkbox.label}</p>
          {checkbox.tooltip && <Tooltip text={checkbox.tooltip} />}
        </div>
      ))}
    </div>
  );
}

interface Props {
  checkboxes: Array<{
    enabled: boolean;
    checked: boolean;
    label: string;
    onClick: () => void;
    tooltip?: string;
  }>;
}
