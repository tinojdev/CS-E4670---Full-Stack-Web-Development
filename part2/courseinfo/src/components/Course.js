

export const Course = ({course}) => {


    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}



const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Content = ({ parts }) => {

console.log(parts);
    return (
        <div>
            {parts.map((part, i) => { return <Part name={part.name} key={i} exercises={part.exercises} /> })}
        </div>
    )

}

const Part = ({name, exercises}) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((prev, cur) => prev + cur.exercises, 0);
    return (
        <b>Number of exercises { total }</b>
    )
}
