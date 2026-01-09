"use client"

import { motion } from "framer-motion"
import Image from "next/image"


export function FloatingWhatsApp() {
    const whatsappNumber = "919876543210" // Replace with actual number
    const whatsappMessage = "Hi, I'm interested in your services."

    const handleClick = () => {
        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
            "_blank"
        )
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
            <motion.button
                onClick={handleClick}
                className="relative group bg-transparent focus:outline-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {/* Continuous Floating Animation */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                >
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png?20220228223904"
                        alt="WhatsApp"
                        width={60}
                        height={60}
                        className="drop-shadow-lg"
                    />
                </motion.div>

                <span className="sr-only">Chat on WhatsApp</span>
            </motion.button>
        </div>
    )
}
