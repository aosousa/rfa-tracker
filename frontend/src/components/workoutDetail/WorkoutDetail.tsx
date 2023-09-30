import './WorkoutDetail.css'

type WorkoutDetailProps = {
  label: string
  value: string | number
}

const WorkoutDetail = (props: WorkoutDetailProps) => (
  <div className="detail">
    <p className="detail-header">{props.label}</p>
    <p className="detail-value">{props.value}</p>
  </div>
)

export default WorkoutDetail
