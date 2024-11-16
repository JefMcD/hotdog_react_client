

const CloseRndBtn = () => {
    return (
        <svg
        version="1.1"
        id="closeRnd-btn-svg"

        //width="50"  // Default width
        //height="50" // Default height
        viewBox="0 0 13.25 13.25" // This seems to control the size of the svg inside its containing box
        >
        <defs id="closeRnd-btn-defs1" />
        <g id="closeRnd-group">
            <circle
            id="closeRnd-path1"
            cx="6.6"       // Circle center x-coord
            cy="6.6"       // Circle center y-coord
            r="6"          // Radius 
            />   
            <path
            d="M 3.7441624,9.5266257 C 5.6753839,7.58959 7.6066054,5.6525543 9.5378269,3.7155186"
            id="closeRnd-path9" />
            <path
            d="M 9.5291848,9.5075493 C 7.5910931,7.5684244 5.6530013,5.6292994 3.7149095,3.6901744"
            id="closeRnd-path10" />
        </g>
        </svg>
    )
}

export default CloseRndBtn