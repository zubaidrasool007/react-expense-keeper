import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Expense.css'
import { AddExpenseDialog } from './AddExpenseDialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Grid from '@mui/material/Grid';
export function Expense(props) {
  //local storag get data from local storage
  //expense array
  let expenseItem = JSON.parse(localStorage.getItem('expenseArray'));
  if (expenseItem) {
    expenseItem = JSON.parse(localStorage.getItem('expenseArray'))
  }
  else {
    expenseItem = []
  }
  //total input balancr
  let balance = JSON.parse(localStorage.getItem('inputBudget'));
  if (balance) {
    balance = JSON.parse(localStorage.getItem('inputBudget'))
  }
  else {
    balance = []
  }
  //total Expense 
  let addExpenseItem = JSON.parse(localStorage.getItem('remaningBudget'));
  if (addExpenseItem) {
    addExpenseItem = JSON.parse(localStorage.getItem('remaningBudget'))
  }
  else {
    addExpenseItem = []
  }
  const [expense, setExpense] = useState(expenseItem)
  const [totalBalance, setTotalBalance] = useState(balance)
  const [totalExpense, setTotalExpense] = useState(addExpenseItem);
  const [open, setOpen] = useState(false);
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    //add expesne array 
    localStorage.setItem('expenseArray', JSON.stringify(expense));
  }, [expense]);
  useEffect(() => {
    //set totale expense budget
    localStorage.setItem('remaningBudget', JSON.stringify(totalExpense))
  }, [totalExpense])
  const handleInputData = (e) => {
    setTotalBalance(e.target.value)
  }
  function createData(name, amount) {
    return { name, amount };
  }
  const addExpesneData = (expenseName, amount) => {
    if (!expenseName, !amount) {
      alert('enter a value')

    } else {
      if (totalBalance - totalExpense < amount) {
        handleClick()
      }
      else {
        const expenseObj = {
          id: Math.random() * 100,
          name: expenseName,
          amount: amount
        }
        setExpense([...expense, expenseObj])
      }
    }


  }
  const deleteExpenseItem = (id) => {
    const deletItem = expense.filter((item) => {
      return item.id !== id
    })
    setExpense(deletItem)
  }
  const inputData = () => {
    localStorage.setItem('inputBudget', JSON.stringify(totalBalance))
    setIsShow(!isShow)
  }
  useEffect(() => {
    const InitialValue = 0;
    const remainingBudget = expense.reduce(
      (previousValue, currentValue) => {
        return previousValue + parseInt(currentValue.amount)
      },
      InitialValue
    );
    setTotalExpense(remainingBudget)
  }, [expense])
  //use a snakbar for alert massage
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <Box className='container'>
        <Box className='mainData'>
        <h2>Expesne Mangment App</h2>
        <Box className='budget'>
          <Box className='card'>
            <Card >
              <CardContent>
                <h4>Total Budget:{totalBalance}</h4>
              </CardContent>
            </Card>
          </Box>

          <Box className='remainingBudget'>
            <Card >
              <CardContent>
                <h4>RemainingBudget= {totalBalance - totalExpense}Rs</h4>
              </CardContent>
            </Card>

          </Box>
          <Box className='totalExpesne'>
            <Card>
              <CardContent>
                <h4>Total= {totalExpense}Rs</h4>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box className='main'>
          <Box className='input'>
            {isShow ? <TextField
              sx={{ width: '820px',backgroundColor:'white' }}
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{

                shrink: true,
              }}
              value={totalBalance}
              onChange={handleInputData}
            /> : ""}
            <Button variant="contained" onClick={inputData} className='budgetbtn' >{isShow ? "Set budget" : "Edit Budget"}</Button>
          </Box>
          <AddExpenseDialog addExpesneData={addExpesneData} />
          <h2>Expesne List</h2>
          <Box className='table'>
            <TableContainer sx={{ width: '950px' }} component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell align="right">Expense</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expense.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right"><Button onClick={() => deleteExpenseItem(row.id)}> <Grid item xs={8} >
                        <DeleteForeverIcon className='icon' />
                      </Grid></Button></TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">{totalExpense}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Not a enough balance"
          action={action}
        />
      </Box>
      </Box>
    </div>
  )
}
