import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { anim } from './anim';
import "./Transition.css";

const routes = {
    "/userEntry": "About",
    "/contact": "Contact"

};

const anim = (variants) => {
    return {
        variants,
        initial: "initial",
        animate: "enter",
        exit: "exit"
    }
};

const SVG = ({ height, width }) => {
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

export const Transiton = ({ children }) => {
    const location = useLocation();
    return (
        <div className='page curve' style={{ backgroundColor }}>
            <div style={{ opacity: dimensions.width == null ? 1 : 0 }} className='background' />
            <motion.p className='route' {...anim(text)}>
                {location.pathname}
            </motion.p>
            {dimensions.width != null && <SVG {...dimensions} />}
            {
                children
            }
        </div>
    );
}