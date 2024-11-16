const SvgBeermat = (props) => {
    const baseUrl = '/static/hotdog_app/images/pics/';
    const server = 'http://127.0.0.1:8000/';
    
    const [galleryPic, setGalleryPic] = useState(null); // Start with null since we need to fetch the first image
    const [navClick, setNavClick] = useState(null); // Track button clicks ('next', 'prev')
  
    // Function to fetch the image (reuse for both initial and button-triggered fetches)
    const fetchImage = (path) => {
      fetch(path, { method: 'GET' })
        .then(response => {
          const response_status = response.status;
          return response.json().then(data => ({ ...data, response_status })); // attach the status to the result
        })
        .then(result => {
          if (result.response_status === 201) {
            setGalleryPic(result.new_image); // Set the galleryPic state with the new image data
          } else if (result.response_status === 204) {
            // Bounce animation if no next/previous image
            if (navClick === 'prev') {
              gsap.from("#prev-arrow", { x: 20, duration: 0.35 });
            } else {
              gsap.from("#next-arrow", { x: -20, duration: 0.35 });
            }
          }
        })
        .catch(error => {
          console.log("Fetch Error: ", error);
        });
    };
  
    // useEffect for both the initial fetch and navigation clicks
    useEffect(() => {
      let path = '';
  
      if (!navClick && !galleryPic) {
        // On the initial render, fetch the first image
        path = server + 'get_first_pic'; // API endpoint for the first image
      } else if (navClick === 'prev' && galleryPic) {
        // Fetch the previous image
        path = server + 'get_prev_pic/' + galleryPic.order;
      } else if (navClick === 'next' && galleryPic) {
        // Fetch the next image
        path = server + 'get_next_pic/' + galleryPic.order;
      }
  
      if (path) {
        fetchImage(path); // Call the fetch function with the correct path
      }
  
    }, [navClick]); // Only trigger when navClick changes (and on initial render)
  
    // Function to handle 'next' button click
    const nextImage = () => {
      setNavClick('next'); // Set to 'next' to trigger useEffect
    };
  
    // Function to handle 'prev' button click
    const prevImage = () => {
      setNavClick('prev'); // Set to 'prev' to trigger useEffect
    };
  
    return (
      <>
        <div className='beermat-container'>
          {galleryPic && (
            <>
              <BeermatTitle beermat_title={galleryPic.title} />
              <BeermatGallery picture={server + galleryPic.url} />
              <BeermatDescription descrip={galleryPic.description} />
            </>
          )}
          <BeermatNav prev={prevImage} next={nextImage} />
        </div>
      </>
    );
  };
  
  export default SvgBeermat;
  