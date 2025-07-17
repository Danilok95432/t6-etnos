import * as yup from 'yup'

export type RegInputs = {
  surname: string
  firstname: string
  fathname?: string
  age?: string
  birthdate?: string
  id_region: string
  id_city: string
  city_name?: string
  email: string
  phone: string
  code: string
  id_reg_type?: string
  id_event?: string
  use_lager?: boolean
  lager_count?: string
  data_zaezd?: string
  data_viezd?: string
  use_sportsmen?: boolean
  use_folk?: boolean
  use_trader?: boolean
  use_master?: boolean
  master_name?: string
  use_journalist?: boolean
  journal_name?: string
  use_car?: boolean
  id_car_type?: string
  car_number?: string
}

export const regSchema = yup.object().shape({
  surname: yup.string().required('Введите фамилию'),
  firstname: yup.string().required('Введите имя'),
  code: yup.string().required('Введите верный код'),
  id_region: yup
    .string()
    .required('Введите регион')
    .test('contains-comma', 'Выберите регион из списка', (value) => {
      return value == 'Иностранец' || value.includes(',')
    }),
  id_city: yup.string().required('Введите название населенного пункта'),
  email: yup.string().required('Введите электронную почту').email('Введите верную почту'),
  phone: yup.string().required('Введите номер телефона').min(10, 'Недостаточно цифр в номере'),
})
