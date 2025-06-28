import * as yup from 'yup'

export type RegNewInputs = {
  surname: string
  firstname: string
  fathname?: string
  birthdate?: string
  id_region: string
  id_city: string
  email: string
  phone: string
  code?: string
}

export const regNewSchema = yup.object().shape({
  surname: yup.string().required('Введите фамилию'),
  firstname: yup.string().required('Введите имя'),
  id_region: yup.string().required('Введите регион'),
  id_city: yup.string().required('Введите название населенного пункта'),
  email: yup.string().required('Введите электронную почту').email('Введите верную почту'),
  phone: yup.string().required('Введите номер телефона').min(10, 'Недостаточно цифр в номере'),
})
