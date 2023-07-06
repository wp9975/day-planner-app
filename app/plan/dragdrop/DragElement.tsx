import React from "react"
import { Draggable } from "react-beautiful-dnd"

type Props = {
  task: {
    time: string
    description: string
  }
  index: number
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void
}

const DragElement = (props: Props) => {
  return (
    <Draggable
      key={props.index}
      draggableId={String(props.index)}
      index={props.index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <input
              type="text"
              name="time"
              value={props.task.time}
              onChange={(event) => props.handleChange(event, props.index)}
            />
            <input
              type="text"
              name="description"
              value={props.task.description}
              onChange={(event) => props.handleChange(event, props.index)}
            />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default DragElement
