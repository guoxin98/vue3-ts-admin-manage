import type { FormInstance } from 'element-plus'
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      return true
    } else {
      console.log('error submit!', fields)
    }
  })
}
export default submitForm
