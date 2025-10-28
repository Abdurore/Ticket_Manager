<template>
  <div class="container">
    <header class="hero">
      <div class="wave"></div>
      <div class="decor-circle decor-circle1"></div>
      <div class="decor-circle decor-circle2"></div>
      <div class="hero-content">
        <h1>Dashboard</h1>
      </div>
    </header>
    <main>
      <section aria-labelledby="dashboard-stats">
        <h2 class="visually-hidden" id="dashboard-stats">Dashboard Statistics</h2>
        <div class="features cards">
          <article class="card" role="region" aria-label="Total Tickets">
            <h3>Total Tickets</h3>
            <p>{{ stats.total }}</p>
          </article>
          <article class="card" role="region" aria-label="Open Tickets">
            <h3>Open Tickets</h3>
            <p>{{ stats.open }}</p>
          </article>
          <article class="card" role="region" aria-label="Resolved Tickets">
            <h3>Resolved Tickets</h3>
            <p>{{ stats.resolved }}</p>
          </article>
        </div>
      </section>
      <nav class="dash-board-main" aria-label="Dashboard navigation">
        <router-link to="/tickets" class="btn">Manage Tickets</router-link>
        <button @click="handleLogout" class="btn btn-logout" aria-label="Log out of the application">Logout</button>
      </nav>
    </main>
  </div>
  <footer>© 2025 Ticket App</footer>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  setup() {
    const stats = ref({ total: 0, open: 0, resolved: 0 })
    const router = useRouter()
    const toast = useToast()

    onMounted(() => {
      const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
      const open = tickets.filter(t => t.status === 'open').length
      const resolved = tickets.filter(t => t.status === 'closed').length
      stats.value = { total: tickets.length, open, resolved }
    })

    const handleLogout = () => {
      localStorage.removeItem('ticketapp_session')
      toast.info('Logged out')
      router.push('/')
    }

    return { stats, handleLogout }
  }
}
</script>