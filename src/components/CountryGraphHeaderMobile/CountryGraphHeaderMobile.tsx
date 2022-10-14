import columns from '../../config/columns';

export default function CountryGraphHeaderMobile({ sortAction, currentSort, toggleColumn, activeColumns }: Props) {
  return (
    <div className="MobileGraphModeHeader-header">
      {columns
        .filter((column) => column.modes.includes('GRAPH'))
        .map((column, index, array) => (
          <div
            key={column.label}
            className={
              'MobileGraphModeHeader-grid-row align-center' + (index === array.length - 1 ? '' : ' m-bottom-small')
            }
          >
            <div
              className="MobileGraphModeHeader-square m-right-small"
              style={{ backgroundColor: column.graphColor }}
              onClick={() => toggleColumn(column.label)}
            >
              {activeColumns.includes(column.label) && <i className="fas fa-check"></i>}
            </div>
            <p className="MobileGraphModeHeader-sort-label">{column.label}</p>
            <div className="flex-row align-center">
              <i
                onClick={() => sortAction(column.label, 'ASC')}
                key="sort-ascending-false"
                className={
                  'fas fa-chevron-up sort-icon' +
                  (currentSort.column === column.label && currentSort.direction === 'ASC' ? ' active-sort' : '')
                }
              />
              <i
                onClick={() => sortAction(column.label, 'DESC')}
                key="sort-ascending-true"
                className={
                  'fas fa-chevron-down sort-icon' +
                  (currentSort.column === column.label && currentSort.direction === 'DESC' ? ' active-sort' : '')
                }
              />
            </div>
          </div>
        ))}
    </div>
  );
}

interface Props {
  sortAction: (column: string, direction: 'ASC' | 'DESC') => void;
  currentSort: { column: string; direction: 'ASC' | 'DESC' };
  toggleColumn: (label: string) => void;
  activeColumns: string[];
}
