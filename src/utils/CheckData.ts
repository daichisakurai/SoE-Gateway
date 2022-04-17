import Ajv from 'ajv'
import addFormats from 'ajv-formats'

/**
 * Ajvインスタンス
 */
const ajv = new Ajv()
addFormats(ajv)

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

export const validateEmail = (email: string): boolean => {
  const validate = ajv.compile(EmailSchema)
  const result = validate({ email: email })
  return result
}

export const validatePassword = (password: string): boolean => {
  const validate = ajv.compile(PasswordSchema)
  const result = validate({ password: password })
  return result
}
