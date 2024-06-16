import React, { useState } from 'react';
import { useItemStore } from '../../stores/ItemStore';
import Button from '@mui/material/Button';
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem
} from '@mui/material';
import Item, { CategoryType } from '../../models/Item';

const RenderItems = (items: Item[]) => {
  const itemStore = useItemStore();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null); 
  
  const handleEditClick = (item: Item) => {
    setCurrentItem(item);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
      if (currentItem) {
        const itemToChange: Item = currentItem
      itemStore.editItem(itemToChange.id, currentItem);
      handleClose();
    }
  };  
    
    
  return (
    <>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell>Nazwa</TableCell>
            <TableCell align="right">Cena</TableCell>
            <TableCell align="right">Kategoria</TableCell>
            <TableCell align="right">Opis</TableCell>
            <TableCell align="right">Edycja</TableCell>
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
                <Button onClick={() => handleEditClick(item)}>Edit</Button>
                <Button onClick={() => itemStore.removeItem(item.id)}>Usuń</Button>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    </TableContainer>

      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={currentItem?.name}
                onChange={(e) => setCurrentItem(currentItem ? { ...currentItem, name: e.target.value } : null)}
            />
            <TextField
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                value={currentItem?.price}
                onChange={(e) => setCurrentItem(currentItem ? { ...currentItem, price: (e.target as HTMLInputElement).valueAsNumber } : null)}

            />
             <TextField
                fullWidth
                margin="normal"
                select
                label="Kategoria"
                name="category"
                value={currentItem?.category}
                onChange={(e) => setCurrentItem(currentItem ? { ...currentItem, category: e.target.value as CategoryType } : null)}
                >
                <MenuItem value="CARPET">Dywan</MenuItem>
                <MenuItem value="BEER">Piwo</MenuItem>
                </TextField>
            <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                value={currentItem?.description}
                onChange={(e) => setCurrentItem(currentItem ? { ...currentItem, description: e.target.value } : null)}
            />
            {/* If you have a URL field */}
            <TextField
                margin="dense"
                label="URL"
                type="text"
                fullWidth
                variant="standard"
                value={currentItem?.url}
                onChange={(e) => setCurrentItem(currentItem ? { ...currentItem, url: e.target.value } : null)}
            />
</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RenderItems;


