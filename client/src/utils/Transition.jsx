import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import "./Transition.css";
import { useLocation } from 'react-router-dom';

const routes = {
    "/register": "Register",
    "/login": "Login",
    "/history": "Fuel History"
};

const anim = (variants) => {
    return {
        variants,
        initial: "initial",
        animate: "enter",
        exit: "exit"
    }
};

const curve = (initialPath, targetPath) => {
    return {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: { duration: 1, delay: .35, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: initialPath,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
        }
    }
};
const translate = {
    initial: {
        top: "-300px"
    },
    enter: {
        top: "-100vh",
        transition: { duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1] },
        transitionEnd: {
            top: "100vh"
        }
    },
    exit: {
        top: "-300px",
        transition: { duration: .75, ease: [0.76, 0, 0.24, 1] }
    }
}

export const Transition = ({ children }) => {
    const location = useLocation(); 
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
          };
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        }; 
    }, []);

    const text = {
        initial: {
            opacity: 1,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
        },
        enter: {
            opacity: 1,
            top: -100,
            transition: { duration: 1, delay: .35, ease: [0.76, 0, 0.24, 1] },
            
        }, 
    };

    return (

        <div className='curve' >
            <div style={{opacity: dimensions.width == null ? 1 : 0}} className='background'/>
            <motion.p className='route' {...anim(text)}>
                {routes[location.pathname]}
            </motion.p>
            {dimensions.width != null && <SVG {...dimensions} />}
            {
                children
            }
        </div>
    );
};
const SVG = ({ width, height }) => {
    const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `
    const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `
    return (
        <motion.svg {...anim(translate)}>
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    )
};