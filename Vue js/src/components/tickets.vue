<template>
  <div class="container">
    <header class="hero">
      <div class="wave"></div>
      <div class="decor-circle decor-circle1"></div>
      <div class="decor-circle decor-circle2"></div>
      <div class="hero-content">
        <h1>Ticket Management</h1>
      </div>
    </header>
    <main class="ticket-main">
      <button @click="openModal(false)" class="btn">Create Ticket</button>
      <section class="ticket-list features">
        <article v-for="ticket in tickets" :key="ticket.id" class="card">
          <h3>{{ ticket.title }}</h3>
          <p>{{ ticket.description }}</p>
          <span class="status-tag" :class="`status-${ticket.status}`">{{ ticket.status.replace('_', ' ') }}</span>
          <div class="buttons">
            <button @click="openModal(true, ticket)" class="btn edit">Edit</button>
            <button @click="openDeleteConfirm(ticket.id)" class="btn btn-logout">Delete</button>
          </div>
        </article>
      </section>

      <!-- Modal Overlay -->
      <div v-if="showModal || showDelete" class="modal-overlay" @click="closeModal"></div>

      <!-- Create/Edit Modal -->
      <div v-if="showModal" class="modal">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="title">Title</label>
            <input id="title" v-model="form.title" required aria-describedby="title-error" />
            <div id="title-error" class="error" v-if="errors.title">{{ errors.title }}</div>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="form.description" aria-describedby="description-error"></textarea>
            <div id="description-error" class="error" v-if="errors.description">{{ errors.description }}</div>
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="form.status" required>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div class="form-group">
            <label for="priority">Priority</label>
            <select id="priority" v-model="form.priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button type="submit" class="btn">{{ editing ? 'Update' : 'Create' }}</button>
          <button type="button" @click="closeModal" class="btn btn-logout">Cancel</button>
        </form>
      </div>

      <!-- Delete Confirm Modal -->
      <div v-if="showDelete" class="modal">
        <p>Confirm delete?</p>
        <button @click="confirmDelete" class="btn">Yes</button>
        <button @click="closeModal" class="btn btn-logout">No</button>
      </div>
    </main>
  </div>
  <footer>© 2025 Ticket App</footer>
</template>

<script>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { v4 as uuidv4 } from 'uuid'

export default {
  setup() {
    const tickets = ref([])
    const form = ref({ id: '', title: '', description: '', status: 'open', priority: 'medium' })
    const errors = ref({})
    const editing = ref(false)
    const showModal = ref(false)
    const showDelete = ref(false)
    const deleteId = ref(null)
    const toast = useToast()

    const loadTickets = () => {
      tickets.value = JSON.parse(localStorage.getItem('tickets') || '[]')
    }

    const saveTickets = (newTickets) => {
      localStorage.setItem('tickets', JSON.stringify(newTickets))
      tickets.value = newTickets
    }

    const openModal = (editMode, ticket = null) => {
      editing.value = editMode
      if (editMode && ticket) {
        form.value = { ...ticket }
      } else {
        form.value = { id: '', title: '', description: '', status: 'open', priority: 'medium' }
      }
      errors.value = {}
      showModal.value = true
      showDelete.value = false
    }

    const closeModal = () => {
      showModal.value = false
      showDelete.value = false
    }

    const handleSubmit = () => {
      errors.value = {}
      if (!form.value.title) errors.value.title = 'Title is required'
      if (!['open', 'in_progress', 'closed'].includes(form.value.status)) errors.value.status = 'Invalid status'

      if (Object.keys(errors.value).length > 0) return

      let newTickets
      if (editing.value) {
        newTickets = tickets.value.map(t => t.id === form.value.id ? form.value : t)
        toast.success('Ticket updated')
      } else {
        form.value.id = uuidv4()
        newTickets = [...tickets.value, form.value]
        toast.success('Ticket created')
      }
      saveTickets(newTickets)
      closeModal()
    }

    const openDeleteConfirm = (id) => {
      deleteId.value = id
      showDelete.value = true
      showModal.value = false
    }

    const confirmDelete = () => {
      const newTickets = tickets.value.filter(t => t.id !== deleteId.value)
      saveTickets(newTickets)
      toast.success('Ticket deleted')
      closeModal()
    }

    loadTickets()

    return {
      tickets,
      form,
      errors,
      editing,
      showModal,
      showDelete,
      openModal,
      closeModal,
      handleSubmit,
      openDeleteConfirm,
      confirmDelete
    }
  }
}
</script>