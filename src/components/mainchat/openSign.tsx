import { useAtom, atom } from "jotai"
import { useState } from "react"
import { motion } from "framer-motion"

export const openState = atom(false)
export const translateState = atom(false)
export const rotateState = atom(false)
export const scaleState = atom(false)

export default function OpenSign() {
    const [open, setOpen] = useAtom(openState)
    const [rotate, setRotate] = useAtom(rotateState)
    const [scale, setScale] = useAtom(scaleState)
    const [translate, setTranslate] = useAtom(translateState)

    console.log(open)

    function handleClick() {
        setRotate(true)
        setTimeout(() => {
            setScale(true)
            //setRotate(false)
        }, 250)
        setTimeout(() => {
            setTranslate(true)
            setOpen((e) => !e)
        }, 1200)
    }

    //on click, animate the span (rotate 3/4 circle around it)

    return (
        <motion.button 
            className={`absolute z-[100] h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center hover:bg-pink-500/30 focus:outline-none focus-visible:outline-none outline-none border-none focus:ring-0 focus:ring-offset-0`} 
            onClick={() => handleClick()}
            style={{
                top: "200px",
                left: "50%",
                transform: "translateX(-50%)"
            }}
            animate={{
                translateY: translate ? 700 : 0,
                opacity: translate ? 0 : 1
            }}
            transition={{ duration: 1, ease: "easeInOut", type: "spring", stiffness: 100 }}
        >
            <motion.div className={`absolute w-full h-full border-2 border-transparent border-t-pink-500 border-r-pink-500 rounded-full -z-10`}
                animate={{ 
                    rotate: (rotate ? 900 : 0),
                    scale: scale ? 1 : 1,
                    opacity: (rotate ? 1 : 0),
                 }}
                transition={{ duration: 1.2, ease: "linear", delay: (rotate ? 0 : 0.4), }}
                initial={{ rotate: 0, opacity: 0 }}
            ></motion.div>
            <span className="text-pink-500 text-xl duration-200 ease-in-out z-10 m-2">+</span>
        </motion.button>
    )
}