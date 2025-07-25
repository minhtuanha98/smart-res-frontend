import React from 'react';
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

export interface TableProps {
  columns: Column[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => (
  <TableContainer component={Paper}>
    <MUITable stickyHeader>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.id}
              align={column.align || 'left'}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length === 1 && data[0].specialEmptyRow ? (
          <TableRow>
            <TableCell colSpan={columns.length} align='center'>
              {data[0].message}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, idx) => (
            <TableRow hover tabIndex={-1} key={idx}>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </MUITable>
  </TableContainer>
);

export default Table;
