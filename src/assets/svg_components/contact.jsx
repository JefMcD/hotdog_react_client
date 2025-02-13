
/*
You're absolutely on the right track with how SVGs work, but I understand why it’s confusing! 
In SVGs, both the viewBox and the viewport (width and height) influence the appearance, 
but they each play different roles.

Let's go through each part:

    Viewport (width and height attributes): These specify the display area for the SVG on the page.
     When you change width and height, you’re adjusting the viewport size. 
     The SVG will scale to fit this viewport unless specified otherwise by CSS.

    viewBox attribute: This defines the internal coordinate system of the SVG. It uses four values:
        min-x and min-y (top-left corner of the viewBox within the SVG’s coordinates),
        width and height (the area of the SVG that’s visible).

    The viewBox allows you to specify how much of the SVG’s drawing area should fit within the 
    viewport and the aspect ratio.

    Scaling Behavior:
        When you change only width and height on the <svg>, it scales the SVG to fit the viewport.
        The viewBox determines the actual "content area" of the SVG. If you set viewBox="0 0 50 50", 
        you’re saying, “Take the internal 50x50 units of my SVG and scale it to fit my viewport.”

In your example, when width and height change, the SVG scales because the viewBox is fixed. 
Think of the viewBox as the SVG’s “content dimension,” while width and height are the display 
area dimensions.


If you omit the width and height attributes on an <svg>, the SVG will typically inherit its size from its container, 
much like a regular HTML element. In this case:

    SVG scales to fit: The SVG will scale to match the dimensions defined by the parent element’s CSS, 
    so it will expand or shrink within the container based on the container’s size.

    Aspect Ratio: If there’s a viewBox attribute on the SVG, the SVG content will scale to fit within 
    the inherited dimensions, maintaining the aspect ratio specified by the viewBox.

Without specified width and height, the SVG will essentially behave as a flexible, responsive element, 
filling its container's available space
*/


const ContactBtn = (props) => {
   return(
      <svg
      version="1.1"
      id="contact-svg"
      // width and height define te size of the svg veiwport.
      // When it is undefined viewport will inherit the height and width deined by its parent container
      // and the svg will scale to fit
      //width="50"
      //height="50"
      viewBox="0 0 50 50" // min-x min-y width height, min-x and min-y define top left corner
      >
     <defs id="contact-defs1" />
     <g id="contact-svg-group">
       <path
          d="m 3.7612237,36.396569 c -1.595433,-0.57388 -2.608987,-1.541298 -3.11378495,-2.972047 -0.414923,-1.176018 -0.409207,-28.5976902 0.0062,-29.8168882 0.38891495,-1.1414 1.32784995,-2.166349 2.44836195,-2.67264998 l 0.949326,-0.428951 20.7022973,-0.04779 c 22.729343,-0.05247 21.736508,-0.09605 23.279791,1.02189298 0.406314,0.294332 0.96608,0.921888 1.243923,1.394567 l 0.505171,0.859416 0.05219,14.3470382 c 0.03655,10.048389 -0.007,14.561969 -0.145456,15.064389 -0.330278,1.198766 -1.279375,2.320223 -2.450155,2.895112 l -1.043333,0.512309 -20.892874,0.03849 C 8.5247927,36.622367 4.2822247,36.583957 3.7612087,36.396572 Z M 44.301454,33.280046 c -0.0062,-0.07398 -2.114455,-1.990651 -4.685023,-4.259276 -2.570569,-2.268626 -5.755366,-5.081152 -7.077327,-6.250058 l -2.403566,-2.125284 -1.026454,0.851133 c -1.598158,1.325189 -2.667064,1.747366 -4.222402,1.667687 -1.496948,-0.07669 -2.379436,-0.471475 -3.836505,-1.716287 l -0.958652,-0.819003 -0.398228,0.356847 c -0.219025,0.196266 -3.40438,3.036888 -7.078567,6.312494 -3.6741873,3.275605 -6.6803393,5.991782 -6.6803393,6.035948 0,0.04417 8.6351233,0.0803 19.1891623,0.0803 10.55404,0 19.184095,-0.06053 19.177901,-0.134504 z M 11.023515,24.380461 c 5.397642,-4.821635 6.556223,-5.936467 6.359744,-6.119592 -0.132135,-0.123154 -2.015691,-1.743525 -4.185681,-3.600823 -2.169989,-1.857299 -5.0758233,-4.349118 -6.4574083,-5.5373762 -1.381586,-1.188259 -2.652644,-2.271229 -2.824573,-2.406602 -0.296591,-0.233526 -0.3126,0.380178 -0.3126,11.9838262 v 12.229957 l 0.410264,-0.326858 c 0.225645,-0.179772 3.38026,-2.979911 7.0102543,-6.222532 z M 46.601629,12.599302 46.554439,6.4897668 39.649928,12.422209 c -3.797482,3.262843 -6.917702,5.991958 -6.933823,6.0647 -0.01612,0.07274 3.090909,2.892766 6.904512,6.26672 l 6.933822,6.134462 0.04719,-6.089627 c 0.02595,-3.349295 0.02595,-8.838918 0,-12.199162 z m -20.706711,7.199119 c 0.239822,-0.09118 2.290438,-1.765749 4.556926,-3.721263 2.266488,-1.955515 6.349746,-5.475027 9.073907,-7.8211372 2.724161,-2.346111 5.001123,-4.343488 5.059914,-4.438615 0.06838,-0.110649 -6.939173,-0.172958 -19.451528,-0.172958 -10.757132,0 -19.5584223,0.03553 -19.5584223,0.07895 0,0.202001 17.8645553,15.5578522 18.5289673,15.9269592 0.632121,0.351168 1.144552,0.393548 1.790236,0.14806 z"
          id="contact-path" />
     </g>
   </svg> 



   )
}

export default ContactBtn