import { useRef } from 'react'
import './App.css'
import FontControlBox from './components/FontControlBox'
import Footer from './components/Footer'
import Form from './components/Form'
import FormProvider from './components/FormContext'
import Modal from './components/Modal'

function App() {
    const modalRef = useRef(null)

    return (
        <FormProvider>
            <section className="form-wrapper">
                <Form modalRef={modalRef} />
                <Footer />
            </section>
            <FontControlBox />
            <Modal ref={modalRef} />
        </FormProvider>
    )
}

export default App
