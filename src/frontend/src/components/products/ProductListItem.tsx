import React from 'react';
import Item, { CategoryType } from '../../models/Item'; // Assuming ItemInterface is the file name
import { Avatar, TextField, Typography, Card, CardContent, Box, Grid, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useItemStore } from '../../stores/ItemStore';

const RenderItems = (items: Item[]) => {

  const itemStore = useItemStore()  
  return (
    <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Nazwa</TableCell>
        <TableCell align="right">Cena</TableCell>
        <TableCell align="right">Kategoria</TableCell>
        <TableCell align="right">Opis</TableCell>
        <TableCell align="right">Akcje</TableCell> {/* Add header for actions */}
      </TableRow>
    </TableHead>
    <TableBody>
      {items.map((item) => (
        <TableRow
          key={item.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {item.name}
          </TableCell>
          <TableCell align="right">{item.price}</TableCell>
          <TableCell align="right">{item.category}</TableCell>
          <TableCell align="right">{item.description}</TableCell>
          {/* Add cells for actions */}
          <TableCell align="right">
                  {/* <Button onClick={() => handleEdit(item)}>Edit</Button>  */}
            <Button>Edytuj</Button>
            <Button onClick={() => itemStore.removeItem(item.id)}>Usuń</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  );
};

export default RenderItems;


