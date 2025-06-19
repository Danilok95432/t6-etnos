import * as yup from 'yup'

export type RegGuestInputs = {
  phone?: string
  password: string
}

export const regGuestSchema = yup.object().shape({
  password: yup.string().required('Введите пароль'),
  // verificationCode: yup.string().required('Введите проверочный код'),
})
