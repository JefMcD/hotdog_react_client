
/*
The Viewport describes the size of the viewable area
The Viewbox describes what is visible with that viewable area

If you omit the width and height attributes on an <svg>, the SVG will typically inherit its size from its container, much like a regular HTML element. In this case:

    SVG scales to fit: The SVG will scale to match the dimensions defined by the parent element’s CSS, so it will expand or shrink within the container based on the container’s size.

    Aspect Ratio: If there’s a viewBox attribute on the SVG, the SVG content will scale to fit within the inherited dimensions, maintaining the aspect ratio specified by the viewBox.

Without specified width and height, the SVG will essentially behave as a flexible, responsive element, filling its container's available space
*/



const TestSVG = () =>{
    return(

        <svg 
            width="500" 
            height="500"
            viewBox="0 0 50 50" 
        >
            <circle r="25" cx="25" cy="25">

            </circle>
        </svg>

    )
}

export default TestSVG