<template>
  <div class="container">
    <header class="hero">
      <div class="wave"></div>
      <div class="decor-circle decor-circle1"></div>
      <div class="decor-circle decor-circle2"></div>
      <div class="hero-content">
        <h1>Ticket Management App</h1>
        <p>Manage your tickets efficiently and effectively.</p>
        <div class="btn-group">
          <router-link to="/auth/login" class="btn">Login</router-link>
          <router-link to="/auth/signup" class="btn">Get Started</router-link>
        </div>
      </div>
    </header>
    <main>
      <section class="features">
        <article class="card">
          <h3>Easy Ticketing</h3>
          <p>Create and manage tickets with a simple, intuitive interface.</p>
        </article>
        <article class="card">
          <h3>Real-Time Updates</h3>
          <p>Track ticket statuses with instant feedback and notifications.</p>
        </article>
        <article class="card">
          <h3>Secure Access</h3>
          <p>Protected routes ensure your data stays safe.</p>
        </article>
      </section>
    </main>
  </div>
  <footer>© 2025 Ticket App</footer>
</template>

<script>
export default {}
</script>