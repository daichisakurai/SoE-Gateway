import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useLogout } from '../context/AuthUserProvider'
import Recurring from '../components/Recurring/Recurring'
import SmallSalesSubject from '../components/SmallSalesSubject/SmallSalesSubject'
import ContinueSalesSubject from '../components/ContinueSalesSubject/ContinueSalesSubject'
import ExternalService from '../components/ExternalService/ExternalService'
import { Typography } from '@mui/material'

/**
 * Material UI Drawerコンポーネントの横幅サイズ
 */
const drawerWidth = 240

/**
 * renderするメインコンポーネントのスタイル
 */
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

/**
 * Material UI AppBarPropsのインタフェース
 */
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

/**
 * カスタムAppBar
 */
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

/**
 * カスタムDrawerHeader
 */
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

/**
 * メイン関数
 * @returns トップページ
 */
const TOP: React.VFC = () => {
  /**
   * MUIテーマ
   */
  const theme = useTheme()

  /**
   * Drawer表示のステートフック
   */
  const [openDrawer, setDrawerOpen] = useState<boolean>(true)

  /**
   * ログアウト確認ダイアログ表示のステートフック
   */
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false)

  /**
   * 「SIGMA連携」のボタンのステートフック
   */
  const [sigmaListopen, setSigmaListOpen] = useState<boolean>(true)

  /**
   * renderするメインコンポーネントのステートフック
   */
  const [renderPage, setRenderPage] = useState(<Recurring />)

  /**
   * ログアウト処理関数
   */
  const logout = useLogout()

  /**
   * リストメニュー選択のステートフック
   */
  const [selectedItem, setSelectedItem] = useState<number>(1)

  /**
   * 「SIGMA連携」ボタン押下時処理
   */
  const handleSigmaListClick = () => {
    setSigmaListOpen(!sigmaListopen)
  }

  /**
   * ハンバーガーボタン押下時処理
   */
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  /**
   * ＜ボタン押下時処理
   */
  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  /**
   * ログアウトボタン押下時処理
   */
  const handleClickLogoutButton = () => {
    setLogoutOpen(true)
  }

  /**
   * ログアウトダイアログの「はい」ボタン押下時処理
   */
  const handleLogoutYes = () => {
    logout()
  }

  /**
   * ログアウトダイアログの「いいえ」ボタン押下時処理
   */
  const handleLogoutNo = () => {
    setLogoutOpen(false)
  }

  /**
   * バックドロップ押下時処理
   * @returns false
   */
  const handleBackdropClick = () => {
    return false
  }

  /**
   * Drawerのリストアイテム押下時処理
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} _event イベント
   * @param {string} page 押下ページ
   */
  const handleClicktoggleDrawer = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    page: string
  ) => {
    switch (page) {
      case 'Recurring':
        setSelectedItem(1)
        setRenderPage(<Recurring />)
        break
      case 'SmallSalesSubject':
        setSelectedItem(2)
        setRenderPage(<SmallSalesSubject />)
        break
      case 'ContinueSalesSubject':
        setSelectedItem(3)
        setRenderPage(<ContinueSalesSubject />)
        break
      case 'ExternalService':
        setSelectedItem(4)
        setRenderPage(<ExternalService />)
        break
      default:
        setSelectedItem(1)
        setRenderPage(<Recurring />)
        break
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={openDrawer}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(openDrawer && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" onClick={handleClickLogoutButton} color="inherit">
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton onClick={handleSigmaListClick}>
            <ListItemText primary="SIGMA連携" />
            {sigmaListopen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={sigmaListopen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => handleClicktoggleDrawer(event, 'Recurring')}
                selected={selectedItem === 1 ? true : false}
              >
                <ListItemText primary="リカーリング連携" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => handleClicktoggleDrawer(event, 'SmallSalesSubject')}
                selected={selectedItem === 2 ? true : false}
              >
                <ListItemText primary="小口物販連携" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => handleClicktoggleDrawer(event, 'ContinueSalesSubject')}
                selected={selectedItem === 3 ? true : false}
              >
                <ListItemText primary="通常/継続物販連携" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItemButton
            onClick={(event) => handleClicktoggleDrawer(event, 'ExternalService')}
            selected={selectedItem === 4 ? true : false}
          >
            <ListItemText primary={'外部サービス連携'} />
          </ListItemButton>
        </List>
      </Drawer>
      <Main open={openDrawer}>
        <DrawerHeader />
        <Box
          component="div"
          sx={{
            height: '100%',
            width: '100%',
            overflow: 'auto'
          }}
        >
          {renderPage}
        </Box>
      </Main>
      <Dialog
        open={logoutOpen}
        onBackdropClick={handleBackdropClick}
        aria-describedby="logout-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            <Typography>ログアウトしてよろしいですか？</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutYes} autoFocus>
            <Typography>はい</Typography>
          </Button>
          <Button onClick={handleLogoutNo}>
            <Typography>いいえ</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TOP
