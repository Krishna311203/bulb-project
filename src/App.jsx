
import "./App.css";
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable} from 'gsap/all'
import { useGSAP } from "@gsap/react";
import audio from '../public/click.mp3'

gsap.registerPlugin(window.MorphSVGPlugin);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(useGSAP);
function App () {
  const cordsRef = useRef([]);
  const hitRef = useRef(null);
  const dummyRef = useRef(null);
  const dummyCordRef = useRef(null);
  const proxyRef = useRef(null);
  const [state, setState] = useState({ on: false });
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);

  useEffect(() => {
    const cords = document.querySelectorAll('.toggle-scene__cord');
    cordsRef.current = Array.from(cords);
    hitRef.current = document.querySelector('.toggle-scene__hit-spot');
    dummyRef.current = document.querySelector('.toggle-scene__dummy-cord');
    dummyCordRef.current = document.querySelector('.toggle-scene__dummy-cord line');
    proxyRef.current = document.createElement('div');
    setEndX(dummyCordRef.current.getAttribute('x2'));
    setEndY(dummyCordRef.current.getAttribute('y2'));
  }, []);

  const reset = () => {
    gsap.set(proxyRef.current, {
      x: endX,
      y: endY,
    });
  };

  const cordTL = gsap.timeline({
    paused: true,
    onStart: () => {
      setState(prevState => ({ ...prevState, on: !prevState.on }));
      gsap.set(document.documentElement, { '--on': state.on ? 1 : 0 });
      gsap.set([dummyRef.current, hitRef.current], { display: 'none' });
      gsap.set(cordsRef.current[0], { display: 'block' });
      new Audio(audio).play();
    },
    onComplete: () => {
      gsap.set([dummyRef.current, hitRef.current], { display: 'block' });
      gsap.set(cordsRef.current[0], { display: 'none' });
      reset();
    },
  });

  cordsRef.current.slice(1).forEach(cord => {
    cordTL.add(
      gsap.to(cordsRef.current[0], {
        morphSVG: cord,
        duration: 0.3,
        repeat: 1,
        // delay: 0.3,
        yoyo: true,
        // ease: 'power1.inOut',
      })
    );
  });

  //   cordsRef.current.slice(1).forEach(cord => {
  //   cordTL.add(
  //     gsap.to(dummyCordRef.current[0], {
  //   rotation: 5, // Adjust the rotation angle as needed
  //   duration: 0.1,
  //   repeat: 1, // Adjust the number of wiggles
  //   yoyo: true, // Make the animation yoyo for smooth transition
  //   delay: 0.3, // Delay the wiggle animation to start after the cord animation
  //   ease: 'power1.inOut', // Adjust the easing as needed
  // })
  //   );
  // });

  

  useGSAP(() => {
    Draggable.create(proxyRef.current, {
      trigger: hitRef.current,
      type: 'x,y',
      // inertia:true,
      onPress: e => {
        proxyRef.current.startX = e.x;
        proxyRef.current.startY = e.y;
      },
      onDrag: function() {
        gsap.set(dummyCordRef.current, {
          attr: {
            x2: this.x,
            y2: this.y,
          },
        });
      },
      onRelease: function(e) {
        const distX = Math.abs(e.x - proxyRef.current.startX);
        const distY = Math.abs(e.y - proxyRef.current.startY);
        const travelled = Math.sqrt(distX * distX + distY * distY);
        gsap.to(dummyCordRef.current, {
          attr: { x2: endX, y2: endY },
          duration: 0.3,
          ease: 'power1.inOut', 
          onComplete: () => {
            if (travelled >50) {
              cordTL.restart();
            } else {
              reset();
            }
          },
        });
      },
    });

  

  }, [cordTL, endX, endY]);

  return (
    <>
      <svg
        className="toggle-scene"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin"
        viewBox="0 0 197.451 481.081"
      >
        <defs>
          <marker id="e" orient="auto" overflow="visible" refX="0" refY="0">
            <path
              className="toggle-scene__cord-end"
              fillRule="evenodd"
              strokeWidth=".2666"
              d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </marker>
          <marker id="d" orient="auto" overflow="visible" refX="0" refY="0">
            <path
            
              className="toggle-scene__cord-end"
              fillRule="evenodd"
              strokeWidth=".2666"
              d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </marker>
          <marker id="c" orient="auto" overflow="visible" refX="0" refY="0">
            <path
              className="toggle-scene__cord-end"
              fillRule="evenodd"
              strokeWidth=".2666"
              d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </marker>
          <marker id="b" orient="auto" overflow="visible" refX="0" refY="0">
            <path
              className="toggle-scene__cord-end"
              fillRule="evenodd"
              strokeWidth=".2666"
              d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </marker>
          <marker id="a" orient="auto" overflow="visible" refX="0" refY="0">
            <path
              className="toggle-scene__cord-end"
              fillRule="evenodd"
              strokeWidth=".2666"
              d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </marker>
          <clipPath id="g" clipPathUnits="userSpaceOnUse">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.677" d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"></path>
</clipPath>
          <clipPath id="f" >
            <path d="M-868.418 945.051c-4.188 73.011 78.255 53.244 150.216 52.941 82.387-.346 98.921-19.444 98.921-47.058 0-27.615-4.788-42.55-73.823-42.55-69.036 0-171.436-30.937-175.314 36.667z"></path>
          </clipPath>
        </defs>
        <g className="toggle-scene__cords">
          <path
            className="toggle-scene__cord"
            markerEnd="url(#a)"
            fill="none"
            strokeLinecap="square"
            strokeWidth="6"
            d="M123.228-28.56v150.493"
            transform="translate(-24.503 256.106)"
          ></path>
          <path
            className="toggle-scene__cord"
            // ref={cordsRef}
            markerEnd="url(#a)"
            fill="none"
            strokeLinecap="square"
            strokeWidth="6"
            d="M123.228-28.59s28 8.131 28 19.506-18.667 13.005-28 19.507c-9.333 6.502-28 8.131-28 19.506s28 19.507 28 19.507"
            transform="translate(-24.503 256.106)"
          ></path>
          <path
            className="toggle-scene__cord"
            markerEnd="url(#a)"
            fill="none"
            strokeLinecap="square"
            strokeWidth="6"
            d="M123.228-28.575s-20 16.871-20 28.468c0 11.597 13.333 18.978 20 28.468 6.667 9.489 20 16.87 20 28.467 0 11.597-20 28.468-20 28.468"
            transform="translate(-24.503 256.106)"
          ></path>
          <path
            className="toggle-scene__cord"
            markerEnd="url(#a)"
            fill="none"
            strokeLinecap="square"
            strokeWidth="6"
            d="M123.228-28.569s16 20.623 16 32.782c0 12.16-10.667 21.855-16 32.782-5.333 10.928-16 20.623-16 32.782 0 12.16 16 32.782 16 32.782"
            transform="translate(-24.503 256.106)"
          ></path>
          <path
            className="toggle-scene__cord"
            markerEnd="url(#a)"
            fill="none"
            strokeLinecap="square"
            strokeWidth="6"
            d="M123.228-28.563s-10 24.647-10 37.623c0 12.977 6.667 25.082 10 37.623 3.333 12.541 10 24.647 10 37.623 0 12.977-10 37.623-10 37.623"
            transform="translate(-24.503 256.106)"
          ></path>
          <g className="line toggle-scene__dummy-cord">
            <line
              markerEnd="url(#a)"
              x1="98.7255"
              x2="98.7255"
              y1="240.5405"
              y2="380.5405"
            ></line>
          </g>
          <circle
            className="toggle-scene__hit-spot"
            cx="98.7255"
            cy="380.5405"
            r="60"
            fill="transparent"
          ></circle>
        </g>
        <g
          className="toggle-scene__bulb bulb"
          transform="translate(844.069 -645.213)"
        >
           
          <path
            className="bulb__cap"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.677"
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
          ></path>
          <path
             className="bulb__cap-shine"
             d="M-778.379 802.873h25.512v118.409h-25.512z"
             clipPath="url(#g)"
             transform="matrix(.52452 0 0 .90177 -368.282 82.976)"
           ></path>
         
         <path
            className="bulb__cap"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v0s-8.439 10.115-28.817 10.115c-21.673 0-29.59-10.115-29.59-10.115z"
          ></path>
          <path
            className="bulb__cap-outline"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.677"
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
          ></path>
          <g
            className="bulb__filament"
            fill="none"
            strokeLinecap="round"
            strokeWidth="5"
          >
            <path d="M-752.914 823.875l-8.858-33.06"></path>
            <path d="M-737.772 823.875l8.858-33.06"></path>
          </g>
          <path
            className="bulb__bulb"
            strokeLinecap="round"
            strokeWidth="5"
            d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z"
          ></path>
        
            <circle
              className="bulb__flash"
              cx="-745.343"
              cy="743.939"
              r="83.725"
              fill="none"
              strokeDasharray="10,30"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="10"
            ></circle>
       
           
          <path
            className="bulb__shine"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="12"
            d="M-789.19 757.501a45.897 45.897 0 013.915-36.189 45.897 45.897 0 0129.031-21.957"
          ></path>
        </g>
      </svg>
    </>
  );
}

export default App;
