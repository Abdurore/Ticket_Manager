// UUID library (include via CDN or npm if needed)
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Toast Notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = type;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Protect Routes
function checkAuth() {
  const token = localStorage.getItem('ticketapp_session');
  const page = new URLSearchParams(window.location.search).get('page');
  if ((page === 'dashboard' || page === 'tickets') && !token) {
    showToast('Please log in', 'error');
    window.location.href = '?page=login';
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  // Login Form
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value.trim();
      const errors = {};

      if (!email) errors.email = 'Email is required';
      if (!password) errors.password = 'Password is required';

      document.querySelectorAll('.error').forEach(el => el.classList.add('hidden'));
      if (Object.keys(errors).length > 0) {
        if (errors.email) document.querySelector('#email-error').textContent = errors.email;
        if (errors.password) document.querySelector('#password-error').textContent = errors.password;
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('ticketapp_session', 'loggedin');
        showToast('Login successful');
        window.location.href = '?page=dashboard';
      } else {
        showToast('Invalid credentials', 'error');
      }
    });
  }

  // Signup Form
  const signupForm = document.querySelector('#signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value.trim();
      const errors = {};

      if (!email) errors.email = 'Email is required';
      if (!password) errors.password = 'Password is required';

      document.querySelectorAll('.error').forEach(el => el.classList.add('hidden'));
      if (Object.keys(errors).length > 0) {
        if (errors.email) document.querySelector('#email-error').textContent = errors.email;
        if (errors.password) document.querySelector('#password-error').textContent = errors.password;
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        showToast('User already exists', 'error');
      } else {
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        showToast('Signup successful. Please login.');
        window.location.href = '?page=login';
      }
    });
  }

  // Dashboard Stats
  const dashboard = document.querySelector('#dashboard-stats');
  if (dashboard) {
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const open = tickets.filter(t => t.status === 'open').length;
    const resolved = tickets.filter(t => t.status === 'closed').length;
    document.querySelector('#total-tickets').textContent = tickets.length;
    document.querySelector('#open-tickets').textContent = open;
    document.querySelector('#resolved-tickets').textContent = resolved;
  }

  // Logout
  const logoutBtn = document.querySelector('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('ticketapp_session');
      showToast('Logged out', 'info');
      window.location.href = '?page=landing';
    });
  }

  // Tickets CRUD
  const ticketForm = document.querySelector('#ticket-form');
  const ticketList = document.querySelector('#ticket-list');
  if (ticketList) {
    const loadTickets = () => {
      const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      ticketList.innerHTML = '';
      tickets.forEach(ticket => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <h3>${ticket.title}</h3>
          <p>${ticket.description || 'No description'}</p>
          <span class="status-tag status-${ticket.status}">${ticket.status.replace('_', ' ')}</span>
          <div>
            <button class="btn" onclick="editTicket('${ticket.id}')">Edit</button>
            <button class="btn btn-logout" onclick="openDeleteConfirm('${ticket.id}')">Delete</button>
          </div>
        `;
        ticketList.appendChild(card);
      });
    };

    window.openCreateModal = function(){
      document.getElementById('ticket-id').value = '';
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      document.getElementById('status').value = 'open';
      document.getElementById('priority').value = 'medium';
      
      document.getElementById('ticket-modal').classList.remove('hidden');
      document.getElementById('modal-overlay').classList.remove('hidden');
    };
    
    window.editTicket = (id) => {
      const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const ticket = tickets.find(t => t.id === id);
      if (ticket) {
        document.querySelector('#ticket-id').value = ticket.id;
        document.querySelector('#title').value = ticket.title;
        document.querySelector('#description').value = ticket.description || '';
        document.querySelector('#status').value = ticket.status;
        document.querySelector('#priority').value = ticket.priority;
        document.querySelector('#ticket-modal').classList.remove('hidden');
        document.querySelector('#modal-overlay').classList.remove('hidden');
      }
    };

    window.openDeleteConfirm = (id) => {
      document.querySelector('#delete-id').value = id;
      document.querySelector('#delete-modal').classList.remove('hidden');
      document.querySelector('#modal-overlay').classList.remove('hidden');
    };

    if (ticketForm) {
      ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.querySelector('#ticket-id').value;
        const title = document.querySelector('#title').value.trim();
        const description = document.querySelector('#description').value.trim();
        const status = document.querySelector('#status').value;
        const priority = document.querySelector('#priority').value;
        const errors = {};

        if (!title) errors.title = 'Title is required';
        if (!['open', 'in_progress', 'closed'].includes(status)) errors.status = 'Invalid status';

        document.querySelectorAll('.error').forEach(el => el.classList.add('hidden'));
        if (Object.keys(errors).length > 0) {
          if (errors.title) document.querySelector('#title-error').textContent = errors.title;
          if (errors.status) document.querySelector('#status-error').textContent = errors.status;
          return;
        }

        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        if (id) {
          const index = tickets.findIndex(t => t.id === id);
          tickets[index] = { id, title, description, status, priority };
          showToast('Ticket updated');
        } else {
          tickets.push({ id: uuidv4(), title, description, status, priority });
          showToast('Ticket created');
        }
        localStorage.setItem('tickets', JSON.stringify(tickets));
        ticketForm.reset();
        document.querySelector('#ticket-modal').classList.add('hidden');
        document.querySelector('#modal-overlay').classList.add('hidden');
        loadTickets();
      });
    }

    const deleteForm = document.querySelector('#delete-form');
    if (deleteForm) {
      deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.querySelector('#delete-id').value;
        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        const newTickets = tickets.filter(t => t.id !== id);
        localStorage.setItem('tickets', JSON.stringify(newTickets));
        showToast('Ticket deleted');
        document.querySelector('#delete-modal').classList.add('hidden');
        document.querySelector('#modal-overlay').classList.add('hidden');
        loadTickets();
      });
    }

    const cancelButtons = document.querySelectorAll('.cancel-btn');
    cancelButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('#ticket-modal').classList.add('hidden');
        document.querySelector('#delete-modal').classList.add('hidden');
        document.querySelector('#modal-overlay').classList.add('hidden');
      });
    });

    loadTickets();
  }
});

