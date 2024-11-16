
// Import react libraries
import { useEffect, useState } from 'react';

// Set the server
import server from './assets/svg_components/servers.jsx'

// Import Project SVG components
import PrevButton from './assets/svg_components/prev.jsx'
import NextButton from './assets/svg_components/next.jsx'
import StarSpinner from './assets/svg_components/star.jsx'
import Jeffers from './assets/svg_components/jeffers.jsx';
import AboutBtn from './assets/svg_components/about.jsx';
import ContactBtn from './assets/svg_components/contact.jsx';
import CloseRndBtn from './assets/svg_components/closeRnd.jsx';
import CloseBtnSq from './assets/svg_components/closeSq.jsx';
import TestSVG from './assets/svg_components/test.jsx';
import ContactForm from './assets/svg_components/contactForm.jsx';

// Import Component Styles
import './css/svgBeermat.css'
import './css/svg_icons.css'
import './css/about_modal.css'
import './css/login_form.css'
import './css/contact_form.css'


const Loading = (props) => {
  return(
    <>
      <div className='loading-container'>
        <div className='svg-star-icon'>
          <StarSpinner />
          </div>
          <div className = "loading-message">
            Loading..{props.serverName}
          </div>
      </div>
    </>
  )
}

const AboutModel = (props) => {
  return(
    <div className='about-component'> 
      <div className='about-close-btn' onClick={props.togAbout}>
        {console.log(props.togAbout)}
        <CloseRndBtn />
      </div>

      <div className='aboutTitle-container'>
        <div className='about-title'>
          <Jeffers />
        </div>
      </div>

      <div className='para-tldr'>
        Jef McDonald is an artist and illustrator who has exhibited at venues across the UK including the Glasgow Print Studio, Platform and the Glasgow Art Club
      </div>
      <div className='about-pic-container'>
        <div className='about-pic'>
          <img src='/static/hotdog_app/images/helloFrens/jeffers_pic_500.jpg' />
        </div>
      </div>
      <div className='para-body'>
      As a freelance artist since 2012, he has received hundreds of commissions and sold his work at 
      comic cons and art fairs to grand folks all over the world, as well as being a contributer to 
      various magazines and publications. He can often be 
      found reading, underground comix, sci-fi, horror, folklore, Heavy Metal,
       Fish'n'Chips, and for added bonus points he's also a musician who takes twisted 
       pleasure in strangling guitars.
      </div>
    </div>
  )
}

const ContactModal = (props) => {
  console.log("props,toggleContact = ", props.togContact)
  return(
    <div className='contact-form-component'>

      <div className='contact-close-btn' onClick={props.togContact}>
        <CloseRndBtn />
      </div>
      <div className='contact-form-title'>
        Whats on Yer Mind?
      </div>
      <div className = 'contact-form-wrapper'>
        <ContactForm toggle_contact = {props.togContact} />
      </div>
    </div>
  )
}

const BeermatBtns = (props) => {

  return (
    <div className = "btns-container">

        <div className='aboutBtn-container' onClick={props.togAbout}>
            <AboutBtn  />
        </div>

        <div className='contactBtn-container' onClick={props.togContact}>
            <ContactBtn />
        </div> 

        {/* <TestSVG /> */}
        
    </div>
  )
}

const BeermatTitle = (props) => {
  return(
    <div className='pic-title'>
      {props.beermat_title}
    </div>
  )

}

const BeermatGallery = (props) => {
  console.log('picture url= ',props.picture)
  return(
    <div className='main-pic-container'>
      <img className='main-pic' src={props.picture} />
    </div>
  )
}

const BeermatDescription = (props) => {
  return(
    <div className="pic-description-container">

    <div className="pic-description">
      <div className="scroll-content">
        {props.descrip}
      </div>
    </div>

    <div className="fade-effect"></div>
    
  </div>
  )
}

const BeermatNav = (props) => {
  return(
    
    <div className='gallery-nav'>

      <div className='nav-btn' id='prev-arrow' onClick = {props.prev}>
        <PrevButton />
      </div>

      <div className='nav-btn' id='next-arrow' onClick = {props.next}>
        <NextButton />
      </div>
    </div>
  )
}





const SvgBeermat = (props) => {
  // let server = 'http://127.0.0.1:8000'
  // let server = 'http://127.0.0.1:8001' // local production server /etc/hosts 127.0.0.2 hotdog
  // let server = 'https://jeffers.pythonanywhere.com/'
  
  const [galleryPic, setGalleryPic] = useState(null)
  const [navClick, setNavClick] = useState(null)
  const [contactModalState, setContactModalState] = useState(false)
  const [aboutModalState, setAboutModalState] = useState(false)

// Fetch the initial csrfToken from server if it isnt already present.
// If React CLient is on same domain then cookie will be sent in response to the App URL request
// If Client is on a different domain (such as 127.0.0.1:5173) it must be requested 
function fetch_csrfToken(){
  // Is Token already in the Browser Cookies
  if (getCSRFToken() != ''){
    let path = server+'/csrfToken_please'
    fetch(path, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => {
      let response_status = response.status;
      return response.json().then(data => ({ ...data, response_status })); // attach the status to the result
    })
    .then(result => {
      if(result.response_status === 201){

      }else{

      }
    })
    .catch({

    })
  }
}

// Function to get the Django CSRF token from the browser cookies
const getCSRFToken = () => {
  const name = 'csrftoken';
  const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name))
      ?.split('=')[1];
  console.log("document.cookie",document.cookie)
  return cookieValue || '';
};


// fetch image from the server
const fetchImage = (path) => {
  console.log("fetchImage", path)
  let csrfToken = getCSRFToken()
  console.log("csrf token = ", csrfToken)
  fetch(path, {
    method: 'GET',
    credentials: 'include', // Ensure Cookies are sent for CORS validation
    headers: {
          'X-CSRFToken': csrfToken,  // Attach the CSRF token in headers
    },
  })
  .then(response => {
    const response_status = response.status;
    return response.json().then(data => ({ ...data, response_status })); // attach the status to the result
  })
  .then(result => {
    if (result.response_status === 201) {
      console.log(result.new_image)
      setGalleryPic(result.new_image); // Set the galleryPic state with the new image data
    } else if (result.response_status === 202) {
      // Bounce animation if no next/previous image
      console.log("response_status - ",result.response_status)
      if (navClick === 'prev') {
        gsap.from("#prev-arrow", { x: 20, duration: 0.35 });
      } else {
        gsap.from("#next-arrow", { x: -20, duration: 0.35 });
      }
    } else if (result.response_status === 500){
      // redirect to db_admin login page
      let redirect = server + '/db_admin'
      window.location.href = redirect;
    }

  })
  .catch(error => {
    console.log("Fetch Error: ", error);
  });
  setNavClick(null) // Is this an asynchronous problem?
};

  


  /*
    useEffect for both the initial fetch and navigation clicks
  */
  useEffect(() => {
    let path = '';
    if (!navClick && !galleryPic) {
      // On the initial render, obtain the csrfToken then set path to fetch the first image
      // fetch_csrfToken()
      path = server + '/get_first_pic'; // API endpoint for the first image
    } else if (navClick === 'prev' && galleryPic) {
      // Fetch the previous image
      path = server + '/get_prev_pic/' + galleryPic.order;
    } else if (navClick === 'next' && galleryPic) {
      // Fetch the next image
      path = server + '/get_next_pic/' + galleryPic.order;
    }
    if (path) {
      fetchImage(path); // Call the fetch function with the correct path
    }

    // This is the cleanup function. 
    // Called on just before the component unmounts or when dependencies change
    return () => {
      console.log("SVG Beermat Cleanup Called");
    };

  }, [navClick]); 
  // changing navClick state trigers execution


  const nextImage = () => {
      setNavClick('next') // navClick is a primitive type (string) so its state can be changed directly
  }

  const prevImage = () => {
      setNavClick('prev') // navClick is a primitive type (string) so its state can be changed directly

  }

  function toggle_about(){
    let newState = !aboutModalState
    setAboutModalState(newState)
  }
  
  const toggle_contact = () => {
    console.log("toggle contact")
    let newState = !contactModalState
    setContactModalState(newState)
  }



  return (
    <>
      <div className='beermat-container'>

        {/* Conditionally render components only when galleryPic is not null */}
        {galleryPic ? 
          (
          <>
            <BeermatBtns togAbout = {toggle_about} togContact = {toggle_contact} />
            <BeermatTitle beermat_title={galleryPic.title} />
            <BeermatGallery picture={server + galleryPic.url} />
            <BeermatDescription descrip={galleryPic.description} />
            <BeermatNav prev = {prevImage} next = {nextImage}/>
            
            {aboutModalState && (<AboutModel togAbout = {toggle_about}/>)}
            {contactModalState && (<ContactModal togContact = {toggle_contact} />)}

          </>
          ) : 
          (
            <Loading serverName={server} />
          )}


      </div>
    </>
  )
}

export default SvgBeermat

/*
Im setting navClick to null inside the fetchImage function after the fetch operation completes. 
However, this does not cause a re-render or loop for a few important reasons:

1. State Change After Side Effect

The useEffect hook with [navClick] as a dependency runs when navClick changes. However, once you trigger useEffect by changing navClick (e.g., from 'next' or 'prev' to null), the logic inside useEffect sees that navClick is now null. The if (!navClick) condition inside useEffect prevents a new fetch from occurring on the subsequent render, thus breaking the loop.

Here's the flow:

    The user clicks "next" → setNavClick('next') → triggers useEffect.
    Inside useEffect, the code recognizes that navClick === 'next' and fetches the next image.
    After the fetch completes, you set navClick(null), which triggers another call to useEffect.
    Now that navClick is null, the logic inside useEffect doesn't perform another fetch because of the condition if (!navClick && !galleryPic).

2. Guarding Against Loops

The condition if (!navClick && !galleryPic) is specifically designed to fetch the first image only when both navClick and galleryPic are null. After the first image is fetched, galleryPic is no longer null, preventing this condition from triggering again. When you set navClick back to null, the next re-render won't trigger the initial fetch again unless both navClick and galleryPic return to their initial states (null).
3. Re-render Timing

React re-renders your component when state changes, but the timing of when these renders happen depends on the lifecycle. By the time you're setting navClick to null after a successful fetch, the component has already rendered based on the initial state change (navClick = 'next' or 'prev'). The state reset to null prevents the next re-render from re-executing the fetch logic because navClick being null no longer matches any of the conditions that would trigger a fetch.
Potential Infinite Loop Case (Hypothetical)

If you didn't have the condition if (!navClick && !galleryPic) and always fetched based on navClick without any conditions guarding it, setting navClick to null would likely cause a fetch loop, as every state change would trigger a new fetch. However, your code is structured to break out of this by ensuring that only non-null navClick values ('next' or 'prev') lead to new fetches.
Conclusion

The logic inside useEffect handles state transitions carefully to prevent an infinite loop. Setting navClick to null after each fetch effectively "resets" the navigation, but the condition if (!navClick && !galleryPic) prevents further fetches unless there's a valid state change from the user's interaction. This prevents a re-render loop.

*/
