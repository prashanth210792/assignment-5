import './index.css'

export const Skills = props => {
  const {details} = props
  const {name, imageUrl} = details
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
    </li>
  )
}
export default Skills
