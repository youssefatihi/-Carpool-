import HelloWorld from './components/HelloWorld';
function App() {
  return (
    <div className="app">
      <header>
        <h1>Covoiturage</h1>
      </header>
      
      <main>
        <p>Bienvenue sur notre plateforme de covoiturage !</p>
        <HelloWorld name="John boy" />
      </main>
      
      <footer>
        <p>© 2025 Covoiturage</p>
      </footer>
    </div>
  );
}

export default App;