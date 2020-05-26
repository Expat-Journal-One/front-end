import * as yup from 'yup'

const loginSchema = yup.object().shape({
    username: yup.string().trim().min(6, 'Username must be at least 6 characters long').max(50).required('Username is required'),
    password: yup.string().trim().min(8, 'Password must be at least 8 characters long').max(100).required('Password is required'),


})

export default loginSchema