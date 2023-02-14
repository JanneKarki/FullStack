const Persons = ({namesToShow, handleRemoveClick}) => {

    return (
        <div>
            {namesToShow.map(person => 
            <p key={person.name} >{person.name} {person.number} <button id={person.id} onClick={handleRemoveClick}>delete</button></p>
            )}
        </div>
    )
}


export default Persons