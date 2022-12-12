import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const EditWorker = () => {
    const { setAlert } = useContext(MainContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        photo: '',
        saloonId: ''
    })

    const [saloons, setSaloons] = useState([])

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        for(const key in form) {
            formData.append(key, form[key])
        }

        axios.put('/api/workers/edit/' + id, formData)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/admin/workers')
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
        axios.get('/api/workers/single/' + id)
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
                    <h1>Darbuotojo redagavimas</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-2">
                        <label className="mb-1">Vardas:</label>
                        <input type="text" name="first_name" className="form-control" onChange={handleForm} value={form.first_name} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Pavardė:</label>
                        <input type="text" name="last_name" className="form-control" onChange={handleForm} value={form.last_name} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Nuotrauka:</label>
                        <input type="file" name="photo" className="form-control" onChange={handleForm} />
                    </div>
                    {form.photo && typeof form.photo === 'string' &&
                        <div className="mb-2">
                            <img src={form.photo} alt="" style={{ maxWidth: 200 }} />
                            <div>
                                <button 
                                className="btn btn-danger mt-2"
                                onClick={(e) => {
                                    setForm({...form, photo: ''})
                                }}
                                >
                                    Ištrinti nuotrauką
                                </button>
                            </div>
                        </div>
                    }
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

export default EditWorker