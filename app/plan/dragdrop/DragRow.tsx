import React, { FC } from 'react'

import './index.css'

import {

  Row,
  flexRender,

} from '@tanstack/react-table'


import {  useDrag, useDrop } from 'react-dnd'



const DraggableRow: FC<{
  row: Row<any>
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void
}> = ({ row, reorderRow }) => {
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<any>) => reorderRow(draggedRow.index, row.index),
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  })

  return (
    <tr ref={previewRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <td ref={dropRef}><button ref={dragRef}>🟰</button></td>
      {row.getVisibleCells().map(cell => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}