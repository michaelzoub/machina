import { useAtom } from "jotai"
import { messageAtom, messagesAtom } from "./input"
import { useEffect, useState, useRef } from "react"
import { atom } from "jotai"
import { Message } from "../../interfaces/Message"

const messageRefAtom = atom<React.RefObject<HTMLDivElement> | null>(null)

const timeSplit = new Date().toLocaleTimeString().split(":")[0] + ":" + new Date().toLocaleTimeString().split(":")[1]

const messagesInitial = [
    {
        id: 1,
        message: "Hey, can you swap all tokens I bought yesterday for ETH?",
        sender: "user",
        timestamp: timeSplit,
    }, 
    {
        id: 2,
        message: "Sure thing, I'll get right on it!",
        sender: "assistant",
        timestamp: timeSplit,
    },
    {
        id: 3,
        message: "Hey, can you swap all tokens I bought yesterday for ETH?",
        sender: "user",
        timestamp: timeSplit,
    }, 
    {
        id: 4,
        message: "Sure thing, I'll get right on it!",
        sender: "assistant",
        timestamp: timeSplit,
    },
    {
        id: 5,
        message: "Sure thing, I'll get right on it!",
        sender: "assistant",
        timestamp: timeSplit,
    },
]

export default function Messages({color, secondary}: {color: string, secondary: string}) {
    const [messages, setMessages] = useAtom<Message[]>(messagesAtom)
    const [message] = useAtom(messageAtom)

    const messageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        //set messages to initial messages
        setMessages(messagesInitial)
        //scroll downwards
        const curr = messageRef.current
        if (curr) {
            curr.scrollTop = curr.scrollHeight
        }
        //fetch messages from database
    }, [])

async function messageLogic() {
    const timeSplit = new Date().toLocaleTimeString().split(":")[0] + ":" + new Date().toLocaleTimeString().split(":")[1]
    setMessages((prev) => 
        [...prev, 
            {
                id: messages.length + 1,
                message: message,
                sender: "user",
                timestamp: timeSplit,
            }
        ]
)
}

    return (
        <div className="flex flex-col h-[78%] mx-2 py-0 border-neutral-600">
            <div className="flex flex-col w-full h-full gap-2 overflow-y-auto py-2" ref={messageRef}>
                {messages.map((message) => (
                    <div className={`flex flex-col h-fit w-fit max-w-[150px] ${message.sender === "user" ? "self-end" : "self-start"}`} key={message.id}>
                        <div className={`text-neutral-200 shadow-lg ${
                            message.sender === "user" 
                                ? `bg-${color} border-[1px] border-${secondary} self-end text-right`
                                : `text-left bg-neutral-500 border-[1px] border-neutral-600`
                        } break-words rounded-xl p-2 flex flex-col w-full h-fit`}>
                            {message.message}
                        </div>
                        <div className={`${message.sender === "user" ? "text-right" : "text-left"} text-xs mx-1 my-1 text-neutral-400`}>{message.timestamp}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
