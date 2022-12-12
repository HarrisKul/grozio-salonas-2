import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const EditOrder = () => {
    const { setAlert } = useContext(MainContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        order_date: '',
        status: ''
    })

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/orders/edit/' + id, form)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/admin/orders')
            })
            .catch(error => {
                console.log(error)

                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

                if (error.response.status === 401)
                    navigate('/login')
            })
    }

    //Paimame prieš tai išssaugotą užsakymo informaciją
    useEffect(() => {
        axios.get('/api/orders/single/' + id)
            .then(resp => {
                resp.data.order_date = new Date(resp.data.order_date).toISOString().slice(0,16)
                resp.data.status = resp.data.status ? '1' : '0'
                setForm(resp.data)
            })
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [id, setAlert])

    return (
        <>
            <div className="container mw-50">
                <div className="page-heading">
                    <h1>Užsakymo redagavimas</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-2">
                        <label className="mb-1">Užsakymo data:</label>
                        <input 
                            type="datetime-local" 
                            name="order_date" 
                            className="form-control" 
                            onChange={handleForm} 
                            value={form.order_date} 
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Užsakymo statusas:</label>
                        <select 
                            name="status" 
                            onChange={handleForm} 
                            value={form.status}
                        >
                            <option value="0">Nepatvirtintas</option>
                            <option value="1">Patvirtintas</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">Išsaugoti</button>
                </form>
            </div>
        </>
    )
}

export default EditOrder