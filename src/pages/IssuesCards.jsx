import { useEffect, useState } from "react";
import { data } from "../utils/issuesData";
import { useNavigate } from "react-router-dom";

const IssuesCards = () => {
  const [counts, setCounts] = useState([]);
  const [issueData, setIssueData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = data;
      setIssueData(res);
      setCounts(new Array(res.length).fill(0));
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mx-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {issueData.map((item, index) => (
        <div
          key={index}
          className="w-full sm:w-[220px] md:w-[250px] h-[410px] rounded-lg overflow-hidden mb-4 bg-white hover:shadow-xl transition-shadow duration-300"
        >
          {/* Image styling */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-[200px] object-cover"
          />
          {/* Content */}
          <div className="p-4 flex flex-col justify-between h-[250px]">
            <h2 className="text-xl font-bold flex justify-center sm:mb-0">
              {item.name}
            </h2>
            <p className="text-sm text-gray-600 mb-4 sm:mb-0">{item.description}</p>
            {/* Button */}
            <button onClick={() => navigate("/wallets")} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mt-1 mb-20">
              {item.solution}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssuesCards;
