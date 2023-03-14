import { createContext, useState } from 'react'

const initialFormData = {
    id: '',
    pw: '',
    confirmPw: '',
}

export const FormContext = createContext({
    formData: initialFormData,
    setFormData: () => {},
})

export default function FormProvider({ children }) {
    const [formData, setFormData] = useState(initialFormData)
    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    )
}
