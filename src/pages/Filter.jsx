import { useState } from "react";


const Filter = ({ onFilter }) => {
  const [name, setName] = useState("");

  const handleFilter = () => {
    onFilter({ name });
  };


  return (
    <div>
       <input
        type="text"
        placeholder="Search Wallet"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 text-gray-200 rounded-md w-full sm:w-[300px] mb-2 bg-black"
      />
      <button onClick={handleFilter}  className="bg-gray-500 text-white py-2 px-4 rounded-md ml-1">Search</button>
    </div>
  )
}

export default Filter;