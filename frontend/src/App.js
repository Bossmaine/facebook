function App() {
  const get = async ( ) => {
    const response = await fetch('http://localhost:11000')
    console.log(response)
  }
  get();
  return <div>welcome to frontend</div>;
}

export default App;
