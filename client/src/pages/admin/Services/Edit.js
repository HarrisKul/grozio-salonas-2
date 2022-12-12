import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const EditService = () => {
    const { setAlert } = useContext(MainContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        duration: '',
        price: '',
        saloonId: ''
    })

    const [saloons, setSaloons] = useState([])

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/services/edit/' + id, form)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/admin/services')
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

    useEffect(() => {
        axios.get('/api/services/single/' + id)
            .then(resp => setForm(resp.data))
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [id, setAlert])

    useEffect(() => {
        axios.get('/api/saloons/')
        .then(resp => setSaloons(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })
    }, [setAlert])

    return (
        <>
            <div className="container mw-50">
                <div className="page-heading">
                    <h1>Paslaugos redagavimas</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-2">
                        <label className="mb-1">Paslaugos pavadinimas:</label>
                        <input type="text" name="name" className="form-control" onChange={handleForm} value={form.name} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Paslaugos trukmė:</label>
                        <input type="text" name="duration" className="form-control" onChange={handleForm} value={form.duration} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Kaina:</label>
                        <input type="number" step="any" name="price" className="form-control" onChange={handleForm} value={form.price} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Grožio salonas:</label>
                        <select 
                        name="saloonId" 
                        onChange={handleForm} 
                        className="form-control" 
                        value={form.saloonId ? form.saloonId : ''}
                        >
                            {saloons.map(saloon => 
                                <option key={saloon.id} value={saloon.id}>{saloon.name}</option>
                            )}
                        </select>
                    </div>
                    <button className="btn btn-primary">Išsaugoti</button>
                </form>
            </div>
        </>
    )
}

export default EditService