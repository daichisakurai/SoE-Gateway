import Ajv from 'ajv'
import addFormats from 'ajv-formats'

/**
 * Ajvインスタンス
 */
const ajv = new Ajv()
addFormats(ajv)

/**
 * メルアドレスチェック用スキーマ
 */
const EmailSchema = {
  required: ['email'],
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email'
    }
  }
}

/**
 * パスワードチェック用スキーマ
 */
const PasswordSchema = {
  required: ['password'],
  type: 'object',
  properties: {
    password: {
      type: 'string',
      minLength: 6
    }
  }
}

/**
 * メールアドレスのチェック
 * @param {string} email メールアドレス
 * @returns バリデーション結果
 */
export const validateEmail = (email: string): boolean => {
  const validate = ajv.compile(EmailSchema)
  const result = validate({ email: email })
  return result
}

/**
 * パスワードのチェック
 * @param {string} password
 * @returns 結果バリデーション結果
 */
export const validatePassword = (password: string): boolean => {
  const validate = ajv.compile(PasswordSchema)
  const result = validate({ password: password })
  return result
}
