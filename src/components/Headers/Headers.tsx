export function Name({ position, sortFunction, currentSort }: HeaderProps) {
  return <Sortable label="Name" position={position} sortFunction={sortFunction} currentSort={currentSort} />;
}

export function Flag({ position }: HeaderProps) {
  return <NonSortable label="Flag" position={position} />;
}

export function Capital({ position, sortFunction, currentSort }: HeaderProps) {
  return <Sortable label="Capital" position={position} sortFunction={sortFunction} currentSort={currentSort} />;
}

export function Population({ position, sortFunction, currentSort }: HeaderProps) {
  return <Sortable label="Population" position={position} sortFunction={sortFunction} currentSort={currentSort} />;
}

export function Area({ position, sortFunction, currentSort }: HeaderProps) {
  return <Sortable label="Area" position={position} sortFunction={sortFunction} currentSort={currentSort} />;
}

export function Demonym({ position, sortFunction, currentSort }: HeaderProps) {
  return <Sortable label="Demonym" position={position} sortFunction={sortFunction} currentSort={currentSort} />;
}

export function Gini({ position, sortFunction, currentSort }: HeaderProps) {
  return <Sortable label="Gini" position={position} sortFunction={sortFunction} currentSort={currentSort} />;
}

export function DeleteButton({ position }: HeaderProps) {
  const className = `grid-cell header-${position}`;
  return <div className={className}></div>;
}

function NonSortable({ label, position }: Pick<GenericHeaderProps, 'label' | 'position'>) {
  const className = `grid-cell header-${position}`;
  return (
    <div className={className}>
      <p className="table-header">{label}</p>
    </div>
  );
}

function Sortable({ label, position, sortFunction, currentSort }: GenericHeaderProps) {
  const className = `grid-cell header-${position}`;
  return (
    <div className={className}>
      <p className="m-right-small table-header">{label}</p>
      <SortButtons label={label} sortFunction={sortFunction} currentSort={currentSort} />
    </div>
  );
}

function SortButtons({ sortFunction, currentSort, label }: SortProps) {
  return (
    <>
      <i
        onClick={() => sortFunction(label, 'ASC')}
        className={
          'fas fa-chevron-up sort-icon' +
          (currentSort.column === label && currentSort.direction === 'ASC' ? ' active-sort' : '')
        }
      />
      <i
        onClick={() => sortFunction(label, 'DESC')}
        className={
          'fas fa-chevron-down sort-icon' +
          (currentSort.column === label && currentSort.direction === 'DESC' ? ' active-sort' : '')
        }
      />
    </>
  );
}

interface SortProps {
  label: string;
  sortFunction: (column: string, direction: 'ASC' | 'DESC') => void;
  currentSort: { column: string; direction: 'ASC' | 'DESC' };
}

interface GenericHeaderProps {
  label: string;
  sortFunction: (column: string, direction: 'ASC' | 'DESC') => void;
  currentSort: { column: string; direction: 'ASC' | 'DESC' };
  position: 'left-end' | 'middle' | 'right-end';
}

export type HeaderProps = Omit<GenericHeaderProps, 'label'>;
