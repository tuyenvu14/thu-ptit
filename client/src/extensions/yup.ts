import * as Yup from 'yup'
import validate from '../constants/validate'

const stringRequired = Yup.string().required(validate.required)

export default {
  stringRequired
}
