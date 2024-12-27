import { atom,useAtom } from "jotai"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Message } from "../../interfaces/Message"
export const messageAtom = atom("")
export const messagesAtom = atom<Message[]>([])

export default function Input({color}: {color: string}) {

    const [message, setMessage] = useAtom(messageAtom)
    const [messages, setMessages] = useAtom(messagesAtom)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        e.currentTarget.reset()
        console.log(message)
        setMessages((prev) => [...prev, {
            id: messages.length + 1,
            message: message,
            sender: "user",
            timestamp: new Date().toLocaleTimeString().split(":")[0] + ":" + new Date().toLocaleTimeString().split(":")[1]
        }])
        setMessage("")
        setTimeout(() => {
            console.log(messages)
        }, 1000)
    }

    return (
        <div className={`flex flex-col w-full h-fit self-end h-[12%] p-2 py-4 border-t border-neutral-600`}>
            <form className="flex flex-row w-full h-fit relative items-center text-white" onSubmit={handleSubmit}>
                <input className={`w-full text-sm h-fit p-2 py-[10px] rounded-xl border-[0px] border-neutral-600 bg-neutral-700`} type="text" placeholder="Type a message..." onChange={(e) => setMessage(e.target.value)} />
                <motion.button 
                    className="outline-none absolute end-0 bg-pink-500 text-black py-[3px] px-4 text-sm rounded-xl m-2 shadow-md hover:shadow-red-500/50 hover:shadow-md hover:bg-red-500 focus:outline-none focus-visible:outline-none border-none focus:ring-0 focus:ring-offset-0" 
                    onClick={() => handleSubmit}
                    whileHover={{
                        scale: 1.05,
                        opacity: 1,
                    }}
                    transition={{ duration: 0.1, ease: "easeInOut", type: "spring", stiffness: 100 }}
                >Send</motion.button>
            </form>
        </div>
    )
}