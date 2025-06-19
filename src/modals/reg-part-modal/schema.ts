import * as yup from 'yup'

export type RegInputs = {
  phone?: string
  password: string
}

export const regSchema = yup.object().shape({
  password: yup.string().required('Введите пароль'),
  // verificationCode: yup.string().required('Введите проверочный код'),
})
