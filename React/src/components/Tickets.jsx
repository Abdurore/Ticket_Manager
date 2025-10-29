import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

function Tickets() {
  const [tickets, setTickets] = useState([])
  const [form, setForm] = useState({ id: '', title: '', description: '', status: 'open', priority: 'medium' })
  const [editing, setEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tickets') || '[]')
    setTickets(stored)
  }, [])

  const saveTickets = (newTickets) => {
    localStorage.setItem('tickets', JSON.stringify(newTickets))
    setTickets(newTickets)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title) return toast.error('Title is required')
    if (!['open', 'in_progress', 'closed'].includes(form.status)) return toast.error('Invalid status')

    let newTickets
    if (editing) {
      newTickets = tickets.map(t => t.id === form.id ? form : t)
      toast.success('Ticket updated')
    } else {
      form.id = uuidv4()
      newTickets = [...tickets, form]
      toast.success('Ticket created')
    }
    saveTickets(newTickets)
    setShowModal(false)
    setForm({ id: '', title: '', description: '', status: 'open', priority: 'medium' })
    setEditing(false)
  }

  const handleEdit = (ticket) => {
    setForm(ticket)
    setEditing(true)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    const newTickets = tickets.filter(t => t.id !== deleteId)
    saveTickets(newTickets)
    toast.success('Ticket deleted')
    setDeleteId(null)
  }

  return (
    <div>
    <div className="ticket-manager container">
      <h2>Ticket Management</h2>
      <button onClick={() => setShowModal(true)}>Create Ticket</button>
      <div className="ticket-list">
        {tickets.map(ticket => (
          <div key={ticket.id} className="card">
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <span className={`status-tag status-${ticket.status}`}>{ticket.status}</span>
            <button onClick={() => handleEdit(ticket)}>Edit</button>
            <button onClick={() => handleDelete(ticket.id)}>Delete</button>
          </div>
        ))}
      </div>

      {showModal && (
        
          <form className="modal modal-form" onSubmit={handleSubmit}>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </form>
        
      )}

      {deleteId && (
        <div className="delete modal">
          <p>Confirm delete?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={() => setDeleteId(null)}>No</button>
        </div>
      )}
    </div>
    <footer>© 2025 Ticket App</footer>
    </div>
  )
}


export default Tickets
