import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Corporation from './Corporation'
import Product from './Product'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

/**
 * レンダーするタブパネルを返却する
 * @param {TabPanelProps} props タブパネルプロパティ
 * @returns タブパネル
 */
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`recurring-tabpanel-${index}`}
      aria-labelledby={`recurring-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

/**
 *
 * @param {number} index
 * @returns
 */
const a11yProps = (index: number) => {
  return {
    id: `recurring-tab-${index}`,
    'aria-controls': `recurring-tabpanel-${index}`
  }
}

/**
 * メイン関数
 * @returns
 */
const Recurring: React.VFC = () => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="組織・従業員一覧" {...a11yProps(0)} />
          <Tab label="商品一覧" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Corporation />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Product />
      </TabPanel>
    </Box>
  )
}

export default Recurring
