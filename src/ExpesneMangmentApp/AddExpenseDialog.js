import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './Expense.css';

export  function AddExpenseDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [expenseName,setExpenseName]=useState('')
    const [amount,setAmount]=useState('')

    const handleExpense=(e)=>{
      setExpenseName(e.target.value)
      
    }
    const handleAmount=(e)=>{
      setAmount(e.target.value)
      
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      props.addExpesneData(expenseName,amount)
      setAmount('')
      setExpenseName('')
      setOpen(false);
    };
  
    return (
      <div>
        <Button className='expbtn'  variant="contained"  onClick={handleClickOpen}>
          Expense
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
           
            <TextField
                 required
              autoFocus
              margin="dense"
              id="name"
              label="Expense"
              type="text"
              fullWidth
              variant="standard"
              value={expenseName}
              onChange={handleExpense}
              name='Name'

            />
          </DialogContent>
          <DialogContent>
           
           <TextField
                required
             autoFocus
             margin="dense"
             id="name"
             label="Amount"
             type="number"
             fullWidth
             variant="standard"
             value={amount}
             onChange={handleAmount}
             name='Amount'
           />
         </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button> */}
            <Button onClick={handleClose}>Add Expense</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
