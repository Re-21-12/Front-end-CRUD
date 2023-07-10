
function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <h1 className="text-center text-8xl text-white ">
        <b>Welcome</b>
        <p className="text-2xl">This <b>CRUD</b> has options like: </p>
        <ul className="text-sm text-left">
          <li> * Create Customers <b>[Form]</b></li>
          <li> * Delete Customers <b>[Button]</b></li>
          <li> * Update Customers <b>[Button]</b></li>
          <li> * Search By Id <b>[Search]</b></li>
          <li> * Show Customers <b>[Auto Generate]</b></li>
        </ul>
      </h1>
    </div>
  );
}

export default Home;
