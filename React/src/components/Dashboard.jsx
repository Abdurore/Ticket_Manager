import {Link,useNavigate} from 'react-router-dom'
import { useEffect,useState } from 'react'
import {toast} from 'react-hot-toast'

function Dashboard(){
    const [stats,setStats] = useState({total:0, open:0, resolved:0})
    const navigate = useNavigate();

    useEffect(() => {
        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
        const open = tickets.filter(t=>t.status === 'open').length
        const resolved = tickets.filter(t=>t.status === 'closed').length
        setStats({total:tickets.length, open, resolved})
    },[])

    const handleLogout = () =>{
        localStorage.removeItem('ticketapp_session')
        toast.info('Logged Out'); 
        navigate('/');
    }
    return (
        <div>
        <div className="container dash_board">
            <header className="hero">
                <div className="wave"></div>
                <div className="decor-circle decor-circle1" ></div>
                <div className="decor-circle decor-circle2" ></div>
                <h1>Dashboard</h1>
            </header>
            <main className='dashboard-container'>
                <section aria-labelledby='dashboard-stats'>
                    <h2 id="dashboard-stats" className="visually-hidden">Dashboard Statistics</h2>
                    <div className="dashboard-cards">
                        <article className="card" role="region" aria-label='Total Tickets'>
                            <h3>Total Tickets</h3>
                            <p>{stats.total}</p>
                        </article>
                        <article className="card" role="region" aria-label='Open Tickets'>
                            <h3>Open Tickets</h3>
                            <p>{stats.open}</p>
                        </article>
                        <article className="card" role="region" aria-label='resolved Tickets'>
                            <h3>Resolved Tickets</h3>
                            <p>{stats.resolved}</p>
                        </article>
                        </div>  
                </section>
                <nav aria-label='Dashboard navigation'>
                    <Link to="/tickets" className="btn" >
                    Manage Tickets
                    </Link>
                    <button 
                    type='button'
                    onClick={handleLogout}
                    aria-label='Log out of the application'
                    className="btn btn-logout">
                      Logout
                    </button>
                </nav>
            </main>
        </div>
        <footer>2025 Ticket App</footer>
        </div>
    );
    
}

export default Dashboard ;
