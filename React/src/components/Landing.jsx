import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
    <div className="landing container">
      <header className="hero">
        <div className="wave"></div>
        <div className="decor-circle decor-circle1"></div>
        <div className="decor-circle decor-circle2"></div>
        <div className="hero-content">
          <h1>Ticket Management App</h1>
          <p>Manage your tickets efficiently and effectively.</p>
          <div className="btn-group">
            <Link to="/auth/login" className="btn" data-testid="test-login-btn">Login</Link>
            <Link to="/auth/signup" className="btn" data-testid="test-signup-btn">Get Started</Link>
          </div>
        </div>
      </header>
      <main>
        <section className="features">
          <article className="card">
            <h3>Easy Ticketing</h3>
            <p>Create and manage tickets with a simple, intuitive interface.</p>
          </article>
          <article className="card">
            <h3>Real-Time Updates</h3>
            <p>Track ticket statuses with instant feedback and notifications.</p>
          </article>
          <article className="card">
            <h3>Secure Access</h3>
            <p>Protected routes ensure your data stays safe.</p>
          </article>
        </section>
      </main>
    </div>
    <footer>© 2025 Ticket App</footer>
    </div>
  );
}

export default Landing;