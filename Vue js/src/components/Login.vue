<template>
  <div class="container">
    <header class="hero">
      <div class="wave"></div>
      <div class="decor-circle decor-circle1"></div>
      <div class="decor-circle decor-circle2"></div>
      <div class="hero-content">
        <h1>Login</h1>
      </div>
    </header>
    <main>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required aria-describedby="email-error" />
          <div id="email-error" class="error" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" required aria-describedby="password-error" />
          <div id="password-error" class="error" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <button type="submit" class="btn">Login</button>
      </form>
    </main>
  </div>
  <footer>© 2025 Ticket App</footer>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const errors = ref({})
    const router = useRouter()
    const toast = useToast()

    const handleSubmit = () => {
      errors.value = {}
      if (!email.value) errors.value.email = 'Email is required'
      if (!password.value) errors.value.password = 'Password is required'

      if (Object.keys(errors.value).length > 0) return

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

    return { email, password, errors, handleSubmit }
  }
}
</script>