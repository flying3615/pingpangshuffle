import React from 'react'
import Button from '@material-ui/core/Button';

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
                    <tr key={p.firstName+p.lastName}>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td>{p.level}</td>
                        <td><Button onClick={()=>props.deletePlayer(p)}>Delete</Button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RegTable