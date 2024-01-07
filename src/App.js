import { useState, useEffect } from 'react';
import './App.css';
import { FaSearch,FaArrowUp,  FaArrowDown   } from 'react-icons/fa';

function App() {
  const [endPoint, setEndPoint] = useState('');
  const [container, setContainer] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // For smooth scrolling effect
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth' // For smooth scrolling effect
    });
  };
  window.addEventListener('scroll', toggleVisibility);

  useEffect(() => {
    fetchRecipes();
  }, [endPoint]);

  const fetchRecipes = () => {
    fetch(`https://food-recipes-with-images.p.rapidapi.com/?q=+${endPoint}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2d2203cfecmsh100d5348edf46f9p1fa3a2jsn4e0b6e0c471b',
        'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
      }
    })
      .then(response => response.json())
      .then(data => {
        setContainer(data.d);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = e => {
    setEndPoint(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    fetchRecipes();
  };

  const handleCardClick = recipe => {
    setSelectedRecipe(recipe);
    console.log(recipe)
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     fetchRecipes();
  //   }
  // }

  return (
    <>
       <header className='bg-green-200 shadow-md'>
<div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
       <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-black'>Recipes</span>
            <span className='text-green-500'>Ride</span>
        </h1>
      <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type='text' 
          placeholder='search...' 
          className='bg-transparent focus:outline-none w-24 sm:w-64'
          onChange={handleChange}
           //onKeyDown={handleKeyPress}
          />
          <FaSearch className='text-slate-400' onClick={ submitHandler}/>
        </form>
    </div>
    </header>
    {container && container.length > 0 ? (
  <div className="grid md:grid-cols-4 gap-4 justify-items-center mt-8 p-3">
    {container.map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center border border-gray-300 rounded-md p-4"
        onClick={() => handleCardClick(item)}
        style={{ cursor: 'pointer' }}
      >
        <img src={item.Image} alt={item.Title} className="max-w-250 mb-2" />
        <div className="text-center font-semibold">{item.Title}</div>
      </div>
    ))}
  </div>
) : (
  <div>No data available</div>
)}

      <div>
      <button className="scroll-to-bottom-btn" onClick={scrollToBottom}>
        <FaArrowDown />
      </button>
      </div>
      {isVisible && (
        <button className="scroll-to-top-btn" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
      {/* Display selected recipe details */}
      {selectedRecipe && (
        <div className="mt-8 p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-semibold mb-3">Recipe Details</h2>
          <img src={selectedRecipe.Image} alt={selectedRecipe.Title} className="max-w-250 mb-2" />
          <div className="text-lg font-semibold">{selectedRecipe.Title}</div>
          {/* Render recipe details here */}
          {/* For example, display ingredients */} {isVisible && (
        <button className="scroll-to-top-btn" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
          {selectedRecipe.Ingredients && typeof selectedRecipe.Ingredients === 'object' ? (
              <ul className="list-disc text-sm mt-3">
                {Object.keys(selectedRecipe.Ingredients).map((key) => (
                  <li key={key}>{selectedRecipe.Ingredients[key]}</li>
                ))}
              </ul>
                ) : (
                  <div>No ingredients available</div>
                )}
        </div>
      )}
    </>
  );
}

export default App;
