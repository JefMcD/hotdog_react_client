
import React, { useState, useEffect } from 'react';
import server from './servers'

const ContactForm = (props) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [apiResponse, setApiResponse] = useState('')

    // Function to get the Django CSRF token from the cookies
    const getCSRFToken = () => {
        const name = 'csrftoken';
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(name))
            ?.split('=')[1];
        console.log("document.cookie",document.cookie)
        return cookieValue || '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // build formData to pass to API
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message)

        const csrfToken = getCSRFToken();
        console.log('csrftoken', csrfToken)

        let path = server+'/contact_form'
        // Sending the Contact Form data to Django backend
    
        fetch(path, {
            method: 'POST',
            credentials: 'include', // Ensure Cookies are sent for CORS validation
            headers: {
                // 'Content-Type': 'application/json', The fetch API will automatically set Content-Type to multipart/form-data with a boundary, which is required for FormData
                'X-CSRFToken': csrfToken,  // Attach the CSRF token in headers
            },
            body: formData
        })
        .then(response => {
            let response_status = response.status;
            return response.json().then(data => ({ ...data, response_status })); // attach the status to the result
        })
        .then(result => {
            if (result.response_status === 201){
                console.log("good", result.message)
                // display confirmation message
                // delay 2000ms
                // close form
            }else{
                console.log("bad ", result.response_status)
                // display error message
            }
            setApiResponse(result.message)
            setTimeout(() => {
                setApiResponse('')
                props.toggle_contact()
            }, 2000)
        })
        .catch(error => {
            console.log("error = ", error)
        })
    
    }

    return (
        <div>
            <form 
                action='#' 
                method="POST" 
                id="contact-form-id" 
                className="contact-form" 
                onSubmit={handleSubmit} 
                encType="multipart/form-data">

                <input 
                    autoFocus
                    className="contact-form-input"
                    type="text"
                    name = 'fullname'
                    placeholder="Name"
                    defaultalue=''
                    onChange={e => setFullname(e.target.value)}
                />

                <input 
                    className="contact-form-input"
                    type="text"
                    name="email"
                    placeholder="email"
                    defaultValue=''
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    className="contact-form-input"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    defaultValue=''
                    onChange={e => setSubject(e.target.value)}
                />
                <textarea 
                    className="contact-form-input contact-form-message"
                    type="text"
                    name="message"
                    placeholder="message"
                    defaultValue=''
                    onChange={e => setMessage(e.target.value)}
                />
                <input 
                    className="submit-btn"
                    type="submit"
                    value="Send"
                />
            </form>
            {apiResponse && (
                <div className='contact-form-message-container'>
                    <div className="contact-form-response">{apiResponse}</div>
                </div>

            )}
        </div>
    );
};

export default ContactForm;

























/*
/// Handle form with promises

*/

const handleForm3 = (e) => {
    e.preventDefault();

    const csrfToken = getCSRFToken();

    let path = server+'/contact_form'
    // Sending the Contact Form data to Django backend

    fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,  // Include CSRF token in the headers
        },
        body: JSON.stringify({
            fullname,
            email,
            message,
        }),
        credentials: 'include',  // Include credentials
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}




function handle_form2(e){
    e.preventDefault();

    const csrfToken = getCSRFToken();

    let path = server+'/contact_form'
    // Sending the Contact Form data to Django backend

    fetch(path,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,  // Attach the CSRF token in headers
            },
            body: JSON.stringify({
                fullname,
                email,
                message,
            })
        })
        .then(response => {
            let response_status = response.status;
            return response.json().then(data => ({ ...data, response_status })); // attach the status to the result
        })
        .then(result => {
            if (result.response_status === 201){
                console.log("good ", result.message)
            }else{
                console.log("bad ", result.response_status)
            }
        })
        .catch(error => {
            console.log("error = ", error)
        })

}



const handleSubmit_async_await = async (e) => {
    e.preventDefault();

    // build formData to pass to API
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message)

    const csrfToken = getCSRFToken();
    console.log('csrftoken', csrfToken)

    let path = server+'/contact_form'
    // Sending the Contact Form data to Django backend
    const response = await fetch(path, {
        method: 'POST',
        credentials: 'include', // Ensure Cookies are sent fro CORS validation
        headers: {
            // 'Content-Type': 'application/json', The fetch API will automatically set Content-Type to multipart/form-data with a boundary, which is required for FormData
            'X-CSRFToken': csrfToken,  // Attach the CSRF token in headers
        },
        body: formData
    });

    const data = await response.json();
    setApiResponse(data.message)
};


    // UseEffect has no dependencies here, so triggered only when compinent is mounted
    // This pings Django with a GET request which return a csrfToken cookie
    // Only needed when Client hosted on another Domain and CORS is required
    // useEffect(() => {
    //     let path = server+'/ping'
    //     fetch(path, {
    //         method: 'GET',
    //         credentials: 'include',  // Include cookies
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         // The CSRF token will now be set in the browser's cookies
    //     })


    //     .catch(error => console.log('Error fetching CSRF token:', error));
    // }, []);



/*
Configuring CSRF between React Frontend and Django Backend

To configure CSRF protection between your Django backend running on localhost:8000 and your React frontend running on localhost:5173, you need to ensure that:

    Django is correctly generating the CSRF token and setting it in the response as a cookie.
    The React app can fetch and use this token in API requests.

Here’s a step-by-step approach to resolve the issue:
1. Django CSRF Setup

Ensure that Django is configured to send the CSRF token in cookies. Add or check the following settings in your settings.py:
CSRF Settings:

# Allow React frontend to make cross-origin requests
CORS_ALLOW_CREDENTIALS = True

# Add the frontend's origin to the whitelist
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # React app
]

# Make sure Django allows the CSRF token to be sent via cookies
CSRF_COOKIE_HTTPONLY = False
CSRF_TRUSTED_ORIGINS = ['http://localhost:5173']  # Allow trusted frontend


2. Ensure CSRF Middleware is Active

You’ve already included the CsrfViewMiddleware in your MIDDLEWARE settings, which is correct. This middleware ensures that Django will set the csrftoken cookie.
3. CSRF Token in React Frontend

To send the CSRF token with API requests, follow these steps:
a. Set CSRF Cookie

Django sets the CSRF token in a cookie if the frontend makes any request that triggers the CSRF middleware, such as a GET request to the Django backend.

Make a request to Django, for example:

useEffect(() => {
    fetch('http://localhost:8000/any-endpoint/', {
        method: 'GET',
        credentials: 'include',  // Include cookies
    })
    .then(response => {
        // This request will cause Django to set the CSRF token in the cookies
    })
    .catch(error => console.log('Error fetching CSRF token:', error));
}, []);

This ensures that Django sets the CSRF token in the cookie for subsequent requests.
b. Extract CSRF Token from Cookie

You can extract the csrftoken from the browser’s cookies using JavaScript. Here’s how to extract the token and send it with POST requests:

const getCSRFToken = () => {
    const name = 'csrftoken';
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name))
        ?.split('=')[1];

    return cookieValue || '';
};

// Send a POST request with the CSRF token in the headers
const sendPostRequest = (data) => {
    fetch('http://localhost:8000/your-api-endpoint/', {
        method: 'POST',
        credentials: 'include',  // Ensure cookies are sent
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),  // Include CSRF token
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
};

4. Check CSRF Token in the Application Tab

After making a request to Django, check the Application tab in your browser’s Developer Tools. Under Cookies, you should see a csrftoken cookie for localhost:8000.
5. Cross-Origin and CORS Setup

When dealing with two separate domains (or ports, in your case), Django might block requests unless CORS is configured properly.

Ensure that you are:

    Adding credentials: 'include' to your fetch requests so that cookies (like CSRF) are sent.
    Using CORS_ALLOW_CREDENTIALS = True and adding localhost:5173 to your CORS_ALLOWED_ORIGINS and CSRF_TRUSTED_ORIGINS in Django’s settings.

    Common Issues:

    CSRF Token Not Showing in Network Tab:
        If the CSRF token isn’t visible in the Network tab, check if your initial request (like the GET request to fetch some initial data) is actually hitting the Django backend and causing the token to be set in the cookies.

    Forbidden (CSRF cookie not set):
        This usually means the CSRF token isn’t being sent with the request or the CSRF middleware wasn’t triggered to set the cookie initially. Ensure you’re sending credentials: 'include' and making at least one initial request to Django.

Once this setup is done correctly, the Django server should generate the CSRF token, store it in cookies, and allow your React frontend to send it back in requests, allowing secure form submissions or API calls.























*/