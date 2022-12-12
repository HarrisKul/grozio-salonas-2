import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const Services = () => {
    const [services, setServices] = useState([])
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)

    const handleDelete = (id) => {
        axios.delete('/api/services/delete/' + id)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            window.scrollTo(0, 0)

            setTimeout(() => {
                setAlert({
                    message: ''
                })
            }, 2000)
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
        axios.get('/api/services/')
            .then(resp => setServices(resp.data))
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
            <div className="d-flex justify-content-between page-heading">
                <h1>Paslaugos</h1>
                <Link 
                    to="/admin/services/new" 
                    className="btn btn-success"
                >
                    Nauja Paslauga
                </Link>
            </div>
            {services ?
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pavadinimas</th>
                            <th>Trukmė</th>
                            <th>Kaina</th>
                            <th>Salonas</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service =>
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>{service.name}</td>
                                <td>{service.duration}</td>
                                <td>{service.price}</td>
                                <td>{service.saloon?.name}</td>
                                <td>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to={'/admin/services/edit/' + service.id} className="btn btn-primary">Redaguoti</Link>
                                        <button className="btn btn-warning" onClick={() => handleDelete(service.id)}>Ištrinti</button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra registruotų paslaugų</h3>
            }
        </>
    )
}

export default Services