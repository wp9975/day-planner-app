
import React, { useState, useCallback } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTable } from "react-table";
import { DraggableRow } from "./DragRow";



export function TasksTable({ columns, data, setData }) {
  const [activeId, setActiveId] = useState();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const onRowValueChange = useCallback(
    (rowId, cellId, newValue) => {
      setData((old) =>
        old.map((row) => {
          if (row.id === rowId) {
            return { ...row, [cellId]: newValue };
          }
          return row;
        })
      );
    },
    [setData]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;

      if (active.id !== over.id) {
        setData((data) => {
          const oldIndex = data.findIndex((item) => item.id === active.id);
          const newIndex = data.findIndex((item) => item.id === over.id);

          return arrayMove(data, oldIndex, newIndex);
        });
      }

      setActiveId(null);
    },
    [setData]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          <SortableContext items={data.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <DraggableRow
                key={row.original.id}
                  row={row}
                  onRowValueChange={onRowValueChange}
                />
              );
            })}
          </SortableContext>
        </tbody>
      </table>
      <DragOverlay>
        {activeId ? (
          <StaticTableRow row={rows.find(({ original }) => original.id === activeId)} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
