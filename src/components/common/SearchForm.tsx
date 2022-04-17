import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

const currencies = [
  {
    value: 'customer_id',
    label: '販売先ID'
  },
  {
    value: 'SCD',
    label: '決算単位コード'
  },
  {
    value: 'FMTCD',
    label: '組織コード'
  },
  {
    value: 'SYSKPNN',
    label: '担当者コード'
  },
  {
    value: 'URISCD',
    label: '売上先コード'
  },
  {
    value: 'CSTCD',
    label: '顧客コード'
  }
]

const SearchForm: React.VFC = () => {
  const [key, setKey] = useState('customer_id')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value)
  }

  return (
    <Toolbar>
      <TextField
        id="outlined-select-currency"
        select
        value={key}
        onChange={handleChange}
        sx={{ width: '300px' }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value + '_Key'} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField id={key + '_Form'} label={key} fullWidth variant="outlined" />
      <Button>検索</Button>
    </Toolbar>
  )
}

export default SearchForm
