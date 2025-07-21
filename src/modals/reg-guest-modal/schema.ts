import { GuestCarsList, GuestGroupList } from 'src/types/registration'
import * as yup from 'yup'

export type RegGuestInputs = {
  surname: string
  firstname: string
  fathname?: string
  age: string
  id_region: string
  id_city: string
  city_name?: string
  phone: string
  code: string
  email?: string
  use_group?: boolean
  group_name?: string
  id_group_type?: string
  group_count?: string
  group_list?: GuestGroupList[]
  use_car?: boolean
  cars_count?: string
  cars_list?: GuestCarsList[]
  use_lager?: boolean
  id_lager_type?: string
  lager_count?: string
  data_zaezd?: string
  data_viezd?: string
}

export const regGuestSchema = yup.object().shape({
  surname: yup.string().required('Введите фамилию'),
  firstname: yup.string().required('Введите имя'),
  id_region: yup
    .string()
    .required('Введите регион')
    .test('contains-comma', 'Выберите регион из списка', (value) => {
      return value == 'Иностранец' || value.includes(',')
    }),
  age: yup.string().required('Введите возраст'),
  code: yup.string().required('Введите верный код'),
  id_city: yup.string().required('Введите название населенного пункта'),
  email: yup
		.string()
		.nullable()
		.transform((value) => value || null)
		.notRequired()
		.when('$email', {
			is: (value: string) => !!value,
			then: (schema) => schema.email('Введите корректный email'),
			otherwise: (schema) => schema,
		}),
  phone: yup.string().required('Введите номер телефона').min(10, 'Недостаточно цифр в номере'),
})
