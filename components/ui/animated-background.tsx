"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

export const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme } = useTheme()
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let width = window.innerWidth
        let height = Math.max(300, window.innerHeight * 0.4)

        const resize = () => {
            width = window.innerWidth
            height = Math.max(300, window.innerHeight * 0.4)
            canvas.width = width
            canvas.height = height
        }
        window.addEventListener("resize", resize)
        resize()

        const waves = [
            { color: "rgba(147, 51, 234, 0.2)", speed: 0.002, amplitude: 80, frequency: 0.005, offset: 0 },
            { color: "rgba(79, 70, 229, 0.2)", speed: 0.003, amplitude: 120, frequency: 0.004, offset: 2 },
            { color: "rgba(236, 72, 153, 0.2)", speed: 0.0015, amplitude: 60, frequency: 0.006, offset: 4 },
        ]

        const render = () => {
            ctx.clearRect(0, 0, width, height)
            const time = Date.now()

            waves.forEach((wave) => {
                ctx.beginPath()
                ctx.moveTo(0, height / 2)
                for (let x = 0; x < width; x++) {
                    const y =
                        Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
                        Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.5) * (wave.amplitude * 0.5)
                    ctx.lineTo(x, height / 2 + y)
                }
                ctx.lineTo(width, height)
                ctx.lineTo(0, height)
                ctx.closePath()
                ctx.fillStyle = wave.color
                ctx.fill()
            })

            const particleCount = 30
            for (let i = 0; i < particleCount; i++) {
                const x = (Math.sin(time * 0.0001 * (i + 1)) + 1) / 2 * width
                const y = (Math.cos(time * 0.0002 * (i + 1)) + 1) / 2 * height
                ctx.beginPath()
                ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(255,255,255,0.07)"
                ctx.fill()
            }

            if (mousePos.x >= 0 && mousePos.y >= 0) {
                const radius = 120
                const grad = ctx.createRadialGradient(
                    mousePos.x,
                    mousePos.y,
                    0,
                    mousePos.x,
                    mousePos.y,
                    radius,
                )
                const highlight = theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"
                grad.addColorStop(0, highlight)
                grad.addColorStop(1, "rgba(0,0,0,0)")
                ctx.fillStyle = grad
                ctx.fillRect(0, 0, width, height)
            }

            animationFrameId = requestAnimationFrame(render)
        }
        render()

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [theme, mousePos])

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    return (
        <div
            className="fixed inset-x-0 bottom-0 h-[40vh] -z-10 w-full overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    )
}
