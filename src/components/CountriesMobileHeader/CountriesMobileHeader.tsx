import { useState } from 'react';
import columns from '../../config/columns';

export default function CountriesMobileHeader({ currentSort, sortFunction }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <div key="mobile-header-left" className="MobileDataHeader-cell MobileDataHeader-left">
        <p className="MobileDataHeader-label">Sort mode:</p>
      </div>
      <div key="mobile-header-right" className="MobileDataHeader-cell MobileDataHeader-right">
        <div className="MobileDataHeader-sort-container flex-row align-center justify-between">
          <button className="grow" onClick={() => setShowDropdown(!showDropdown)}>
            <p className="MobileDataHeader-sort-mode">{currentSort.column}</p>
          </button>
          <div className="flex-row align-center">
            <button
              onClick={() => {
                sortFunction(currentSort.column, 'ASC');
                setShowDropdown(false);
              }}
            >
              <i
                key="sort-ascending-false"
                className={'fas fa-chevron-up sort-icon' + (currentSort.direction === 'ASC' ? ' active-sort' : '')}
              />
            </button>
            <button
              onClick={() => {
                sortFunction(currentSort.column, 'DESC');
                setShowDropdown(false);
              }}
            >
              <i
                key="sort-ascending-true"
                className={'fas fa-chevron-down sort-icon' + (currentSort.direction === 'DESC' ? ' active-sort' : '')}
              />
            </button>
          </div>
          <div className={'MobileDataHeader-sort-choices-container' + (showDropdown ? '' : ' hide')}>
            {columns
              .filter((column) => column.sortable)
              .map((column) => (
                <button
                  className="MobileDataHeader-sort-mode-choice"
                  key={column.label}
                  onClick={() => {
                    sortFunction(column.label, currentSort.direction);
                    setShowDropdown(false);
                  }}
                >
                  <p>{column.label}</p>
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

interface Props {
  sortFunction: (label: string, direction: 'ASC' | 'DESC') => void;
  currentSort: {
    column: string;
    direction: 'ASC' | 'DESC';
  };
}
