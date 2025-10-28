<template>
  <div class="container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <footer>© 2025 Ticket App</footer>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const toast = useToast()

    const handleSubmit = () => {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === email.value && u.password === password.value)
      if (user) {
        localStorage.setItem('ticketapp_session', 'loggedin')
        toast.success('Login successful')
        router.push('/dashboard')
      } else {
        toast.error('Invalid credentials')
      }
    }

    return { email, password, handleSubmit }
  }
}
</script>