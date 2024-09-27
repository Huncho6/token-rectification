import { useEffect, useRef, useState } from "react";
import { coins } from "../utils/coinsData";

const Header = () => {
  const [counts, setCounts] = useState([]);
  const [coinsData, setCoinsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = coins;
      setCoinsData(res);
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

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 0.1; 

    
    const handleScroll = () => {
      if (scrollContainer) {
        scrollPosition += scrollSpeed;

      
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = scrollContainer.scrollWidth / 4; 
        }

        scrollContainer.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    };

    const scrollInterval = setInterval(handleScroll, 5); 

    return () => clearInterval(scrollInterval);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }


  const duplicatedCoinsData = [...coinsData, ...coinsData];

  return (
    <div
      ref={scrollContainerRef}
      className="bg-slate-900 text-white flex items-center space-x-8 px-6 py-4 overflow-x-auto whitespace-nowrap"
      style={{ scrollbarWidth: "none" }} 
    >
      {duplicatedCoinsData.map((coin, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="flex items-center">
            {typeof coin.svg === "function" ? coin.svg() : coin.svg}
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-bold">
              <a href="https://coinlib.io/" target="_blank" className="hover:underline">
                {coin.name}
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Header;
