import type { Dispatch, SetStateAction } from 'react'
import classNames from 'classnames';

import Arrow from '../../Icons/Arrow';
import Sort from '../../Icons/Sort';
import type { TableColumns } from '../../../types/tables';

import './index.scss'

const TableSorter = ({sortKey, isReverse, setIsReverse, setSortKey, tableColumns}: Props) => {
  return (
    <div className='table-sorter'>
      {tableColumns.map((column, index) => {
        const isCurrentColumn = column.sortKey === sortKey;

        const sortTextClasses = classNames({
          'table-sorter-cell': true,
          'table-sorter-cell-selected': isCurrentColumn
        })

        return (
          <div
            className={sortTextClasses}
            key={index}
            onClick={() => {
              if (isCurrentColumn) {
                setIsReverse(!isReverse)
              }
              else {
                setIsReverse(false);
                setSortKey(column.sortKey);
              }
            }}
          >
            {column && column.title}

            <div className='table-sorter-cell-icon'>
              {isCurrentColumn ?
                <Arrow direction={isReverse ? 'down' : 'up'} /> :
                <Sort />
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}

type Props = {
  isReverse: boolean
  setIsReverse: Dispatch<SetStateAction<boolean>>
  setSortKey: Dispatch<SetStateAction<string>>
  sortKey: string
  tableColumns: TableColumns
}

export default TableSorter
