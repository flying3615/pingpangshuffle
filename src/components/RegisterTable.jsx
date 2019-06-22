import React from 'react'


const RegTable = (props) => {

    return (
        <table>
            <tbody>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Level</th>
                    <th>Delete</th>
                </tr>

                {props.players && props.players.map(p => (
                    <tr key={p.firstName}>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td>{p.level}</td>
                        <td><button onClick={()=>props.deletePlayer(p)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RegTable