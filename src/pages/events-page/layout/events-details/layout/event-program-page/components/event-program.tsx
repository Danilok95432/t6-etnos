import { EventProgramInfo } from "./components/event-program-info/event-program-info"
import { EventProgramDetails } from "./components/event-program-details/event-program-details"

export const EventProgram = () => {
  return(
    <div>
      <EventProgramInfo />
      <EventProgramDetails />
    </div>
  )
}