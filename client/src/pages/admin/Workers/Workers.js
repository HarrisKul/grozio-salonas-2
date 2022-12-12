import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'


const Workers = () => {
    const [workers, setWorkers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)

    const handleDelete = (id) => {
        axios.delete('/api/workers/delete/' + id)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            setRefresh(!refresh)

            window.scrollTo(0, 0)
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
        axios.get('/api/workers/')
            .then(resp => setWorkers(resp.data))
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [refresh, setAlert])

    return (
        <>
            <div className="d-flex justify-content-between align-items-center page-heading">
                <h1>Darbuotojai</h1>
                <Link 
                    to="/admin/workers/new" 
                    className="btn btn-success"
                >
                    Naujas darbuotojas
                </Link>
            </div>
            {workers ?
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nuotrauka</th>
                            <th>Vardas</th>
                            <th>Pavardė</th>
                            <th>Salonas</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {workers.map(worker =>
                            <tr key={worker.id}>
                                <td>{worker.id}</td>
                                <td>
                                    {worker.photo ? 
                                        <img 
                                        src={worker.photo} 
                                        alt={worker.first_name + ' ' + worker.last_name}
                                        style={{ maxWidth: '80px'}}
                                        />
                                    :
                                        <img 
                                    
                                        />
                                    }
                                </td>
                                <td>{worker.first_name}</td>
                                <td>{worker.last_name}</td>
                                <td>{worker.saloon?.name}</td>
                                <td>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to={'/admin/workers/edit/' + worker.id} className="btn btn-primary">Redaguoti</Link>
                                        <button className="btn btn-warning" onClick={() => handleDelete(worker.id)}>Ištrinti</button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra registruotų darbuotojų</h3>
            }
        </>
    )
}

export default Workers