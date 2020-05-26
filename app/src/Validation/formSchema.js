import * as yup from 'yup'

const fromSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    username: yup.string().trim().min(6, 'Username must be at least 6 characters long').max(50).required('Username is required'),
    email: yup.string().trim().required('Email is required'),
    password: yup.string().trim().min(8, 'Password must be at least 8 characters long').max(100).required('Password is required'),


})

export default fromSchema