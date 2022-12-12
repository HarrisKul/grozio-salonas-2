import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)

    const handleDelete = (id) => {
        axios.delete('/api/orders/delete/' + id)
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
        axios.get('/api/orders/')
            .then(resp => setOrders(resp.data))
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
            <div className="page-heading">
                <h1>Užsakymai</h1>
            </div>
            {orders ?
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Užsakymo data</th>
                            <th>Klientas</th>
                            <th>Paslauga</th>
                            <th>Statusas</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order =>
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.order_date).toLocaleString('lt-LT')}</td>
                                <td>{order.user && order.user.first_name + ' ' + order.user.last_name}</td>
                                <td>{order.service?.name}</td>
                                <td>{order.status ? 'Patvirtintas' : 'Nepatvirtintas'}</td>
                                <td>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Link 
                                        to={'/admin/orders/edit/' + order.id} 
                                        className="btn btn-primary"
                                        >
                                            Redaguoti
                                        </Link>
                                        <button 
                                        className="btn btn-warning" 
                                        onClick={() => handleDelete(order.id)}
                                        >
                                            Ištrinti
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra registruotų užsakymų</h3>
            }
        </>
    )
}

export default Orders