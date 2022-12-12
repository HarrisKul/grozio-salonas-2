import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainContext from '../../context/MainContext'
import axios from 'axios'
import './Header.css'

const Header = () => {
    const { userInfo, setUserInfo, setAlert } = useContext(MainContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        axios.get('/api/users/logout/')
        .then(resp => {
            setUserInfo({})
            setAlert({
                message: resp.data,
                status: 'success'
            })

            navigate('/')
        })
    }

    return (
        <header className="header p-3 text">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <div className="d-block ms-3 lh-1">
                        <h6 className="mb-0">Aldonos</h6>
                        <h6 className="mb-0">GROŽIO SALONAI</h6>
                    </div>
                </a>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
                    <li>
                        <Link 
                        to="/" 
                        className="nav-link px-2 nav-link-active"
                        >
                            Salonai
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="/workers" 
                        className="nav-link px-2"
                        >
                            Darbuotojai
                        </Link>
                    </li>
                    {userInfo.role === 0 && 
                        <li>
                            <Link 
                            to="/orders" 
                            className="nav-link px-2"
                            >
                                Užsakymai
                            </Link>
                        </li>
                    }
                    {userInfo.role === 1 &&
                        <li>
                            <Link 
                            to="/admin" 
                            className="nav-link px-2"
                            >
                                Administratorius
                            </Link>
                            <ul>
                                <li>
                                    <Link 
                                        to="/admin/services/" 
                                        className="nav-link px-2"
                                        >
                                            Paslaugos
                                        </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/workers" 
                                        className="nav-link px-2"
                                        >
                                            Darbuotojai
                                        </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/orders" 
                                        className="nav-link px-2"
                                        >
                                            Užsakymai
                                        </Link>
                                </li>
                            </ul>
                        </li>
                    }
                </ul>

                <div className="text-end">
                    {userInfo.id ? 
                        <button onClick={handleLogout} className="btn btn-primary">Atsijungti</button>
                        :
                        <>
                            <Link to="/login" className="btn btn-outline-light me-2">Prisijungimas</Link>
                            <Link to="/register" className="btn btn-primary">Registracija</Link>
                        </>
                    }
                </div>
            </div>
            </div>
        </header>
    )
}

export default Header