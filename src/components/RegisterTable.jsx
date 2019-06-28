import React from 'react'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const RegTable = (props) => {

    return (
        props.players.length > 0 && <Table>
            <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.players && props.players.map(p => (
                    <TableRow key={p.firstName + p.lastName}>
                        <TableCell>{p.firstName}</TableCell>
                        <TableCell>{p.lastName}</TableCell>
                        <TableCell>{p.level}</TableCell>
                        <TableCell><Button color="secondary" onClick={() => props.deletePlayer(p)}>Delete</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default RegTable