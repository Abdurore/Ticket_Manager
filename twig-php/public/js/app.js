// ==== GLOBAL TOAST FUNCTION (outside any listener) ====
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// ==== DOM LOADED ====
document.addEventListener('DOMContentLoaded', () => {
  // ----- AUTH CHECK -----
  const token = localStorage.getItem('ticketapp_session');
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');

  if ((page === 'dashboard' || page === 'tickets') && !token) {
    showToast('Please log in to continue', 'error');
    window.location.href = '/?page=login';
    return;
  }

  // ----- LOGIN FORM -----
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!email || !password) {
        showToast('Email and password are required', 'error');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('ticketapp_session', 'loggedin');
        showToast('Login successful');
        window.location.href = '/?page=dashboard';
      } else {
        showToast('Invalid credentials', 'error');
      }
    });
  }

  // ----- SIGNUP FORM -----
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!email || !password) {
        showToast('Email and password are required', 'error');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === email)) {
        showToast('User already exists', 'error');
        return;
      }

      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      showToast('Signup successful. Please login.');
      window.location.href = '/?page=login';
    });
  }

  // ----- TICKETS PAGE -----
  const ticketList = document.getElementById('ticket-list');
  if (ticketList) {
    const loadTickets = () => {
      const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      ticketList.innerHTML = '';
      tickets.forEach(t => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${t.title}</h3>
          <p>${t.description || 'No description'}</p>
          <span class="status-tag status-${t.status}">${t.status.replace('_', ' ')}</span>
          <button onclick="editTicket('${t.id}')">Edit</button>
          <button onclick="openDeleteModal('${t.id}')">Delete</button>
        `;
        ticketList.appendChild(card);
      });
    };

    window.editTicket = (id) => {
      const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const ticket = tickets.find(t => t.id === id);
      if (!ticket) return;

      document.getElementById('ticket-id').value = ticket.id;
      document.getElementById('title').value = ticket.title;
      document.getElementById('description').value = ticket.description || '';
      document.getElementById('status').value = ticket.status;
      document.getElementById('priority').value = ticket.priority;

      document.getElementById('ticket-modal').classList.remove('hidden');
      document.getElementById('modal-overlay').classList.remove('hidden');
    };

    window.openDeleteModal = (id) => {
      document.getElementById('delete-id').value = id;
      document.getElementById('delete-modal').classList.remove('hidden');
      document.getElementById('modal-overlay').classList.remove('hidden');
    };

    const ticketForm = document.getElementById('ticket-form');
    if (ticketForm) {
      ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('ticket-id').value;
        const title = document.getElementById('title').value.trim();
        const status = document.getElementById('status').value;

        if (!title || !['open','in_progress','closed'].includes(status)) {
          showToast('Title and valid status required', 'error');
          return;
        }

        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        if (id) {
          const idx = tickets.findIndex(t => t.id === id);
          tickets[idx] = {
            id,
            title,
            description: document.getElementById('description').value,
            status,
            priority: document.getElementById('priority').value
          };
          showToast('Ticket updated');
        } else {
          tickets.push({
            id: crypto.randomUUID(),
            title,
            description: document.getElementById('description').value,
            status,
            priority: document.getElementById('priority').value
          });
          showToast('Ticket created');
        }
        localStorage.setItem('tickets', JSON.stringify(tickets));
        ticketForm.reset();
        document.getElementById('ticket-modal').classList.add('hidden');
        document.getElementById('modal-overlay').classList.add('hidden');
        loadTickets();
      });
    }

    const deleteForm = document.getElementById('delete-form');
    if (deleteForm) {
      deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('delete-id').value;
        let tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        tickets = tickets.filter(t => t.id !== id);
        localStorage.setItem('tickets', JSON.stringify(tickets));
        showToast('Ticket deleted');
        document.getElementById('delete-modal').classList.add('hidden');
        document.getElementById('modal-overlay').classList.add('hidden');
        loadTickets();
      });
    }

    document.querySelectorAll('.cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('ticket-modal').classList.add('hidden');
        document.getElementById('delete-modal').classList.add('hidden');
        document.getElementById('modal-overlay').classList.add('hidden');
      });
    });

    loadTickets();
  }

  // ----- LOGOUT -----
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('ticketapp_session');
      showToast('Logged out', 'info');
      window.location.href = '/?page=landing';
    });
  }
});
