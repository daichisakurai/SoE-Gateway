import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useLogin } from '../context/AuthUserProvider'
import { validateEmail, validatePassword } from '../utils/CheckData'

/**
 * メイン関数
 * @returns ログインページ
 */
const Login: React.VFC = () => {
  /**
   * historyオブジェクト
   */
  const history = useHistory()

  /**
   * ログイン関数
   */
  const login = useLogin()

  /**
   * メールアドレスTextFieldのエラーメッセージステートフック
   */
  const [alertEmailText, setAlertEmailText] = useState<string>('')

  /**
   * パスワードTextFieldのエラーメッセージステートフック
   */
  const [alertPasswordText, setAlertPasswordText] = useState<string>('')

  /**
   * メールアドレスTextFieldのエラーステートフック
   */
  const [errorEmailInput, setErrorEmailInput] = useState<boolean>(false)

  /**
   * パスワードTextFieldのエラーステートフック
   */
  const [errorPasswordInput, setErrorPassword] = useState<boolean>(false)

  /**
   * アラート表示のステートフック
   */
  const [openAlert, setOpenAlert] = useState<boolean>(false)

  /**
   * エラーメッセージの府テートフック
   */
  const [errorMessage, setErrorMessage] = useState<string>('')

  /**
   * ログインボタン押下時処理
   * @param event イベント
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const validateEmailResult = validateEmail(String(data.get('email')))
    const validatePasswordResult = validatePassword(String(data.get('password')))
    if (validateEmailResult && validatePasswordResult) {
      setAlertEmailText('')
      setAlertPasswordText('')
      setErrorEmailInput(false)
      setErrorPassword(false)
      if (data.get('email') === 'test@gmail.com' && data.get('password') === 'testtest') {
        login('test@gmail.com')
        history.push({ pathname: '/' })
      } else {
        setErrorMessage('ログイン情報が誤っています。')
        setOpenAlert(true)
      }
    } else if (validateEmailResult && !validatePasswordResult) {
      setAlertEmailText('')
      setAlertPasswordText('6文字以上入力してください')
      setErrorEmailInput(false)
      setErrorPassword(true)
    } else if (!validateEmailResult && validatePasswordResult) {
      setAlertEmailText('メール形式で入力してください')
      setAlertPasswordText('')
      setErrorEmailInput(true)
      setErrorPassword(false)
    } else {
      setAlertEmailText('メール形式で入力してください')
      setAlertPasswordText('6文字以上入力してください')
      setErrorEmailInput(true)
      setErrorPassword(true)
    }
  }

  /**
   * スナックバーの×ボタン押下処理
   */
  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  return (
    <React.Fragment>
      <Snackbar
        open={openAlert}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ width: '97%' }}
      >
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={alertEmailText}
              error={errorEmailInput}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={alertPasswordText}
              error={errorPasswordInput}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Login
