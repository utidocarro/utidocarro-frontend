import { memo } from 'react';
import { DataTable } from 'primereact/datatable';

import style from './style.module.css';
import { Colors } from '@styles/Colors';

export function Table({}) {
  return (
    <DataTable
      paginator
      rows={10}
      style={{
        color: Colors.white,
        backgroundColor: Colors.lightShape,
      }}
      className={style.tableContainer}
    ></DataTable>
  );
}

export default memo(Table);
