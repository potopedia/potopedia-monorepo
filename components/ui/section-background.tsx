"use client"

import { useEffect, useRef, useState } from "react"

type AnimationType = "particles" | "grid" | "waves" | "ripple"

interface SectionBackgroundProps {
    type: AnimationType
    className?: string
}

export const SectionBackground = ({ type, className = "" }: SectionBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let width = canvas.offsetWidth
        let height = canvas.offsetHeight

        const resize = () => {
            width = canvas.offsetWidth
            height = canvas.offsetHeight
            canvas.width = width
            canvas.height = height
        }
        window.addEventListener("resize", resize)
        resize()

        const renderParticles = () => {
            ctx.clearRect(0, 0, width, height)
            const time = Date.now()

            // Floating particles
            for (let i = 0; i < 40; i++) {
                const x = (Math.sin(time * 0.0001 * (i + 1)) + 1) / 2 * width
                const y = (Math.cos(time * 0.0002 * (i + 1)) + 1) / 2 * height
                const size = Math.sin(time * 0.001 + i) * 2 + 2

                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(147, 51, 234, ${0.3 + Math.sin(time * 0.001 + i) * 0.2})`
                ctx.fill()
            }

            // Hover effect - particle burst
            if (isHovered && mousePos.x >= 0) {
                for (let i = 0; i < 20; i++) {
                    const angle = (i / 20) * Math.PI * 2
                    const distance = 50 + Math.sin(time * 0.005 + i) * 30
                    const x = mousePos.x + Math.cos(angle) * distance
                    const y = mousePos.y + Math.sin(angle) * distance

                    ctx.beginPath()
                    ctx.arc(x, y, 3, 0, Math.PI * 2)
                    ctx.fillStyle = "rgba(236, 72, 153, 0.6)"
                    ctx.fill()
                }
            }
        }

        const renderGrid = () => {
            ctx.clearRect(0, 0, width, height)
            const time = Date.now()
            const gridSize = 40

            ctx.strokeStyle = "rgba(79, 70, 229, 0.2)"
            ctx.lineWidth = 1

            // Animated grid lines
            for (let x = 0; x < width; x += gridSize) {
                const offset = Math.sin(time * 0.001 + x * 0.01) * 10
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x + offset, height)
                ctx.stroke()
            }

            for (let y = 0; y < height; y += gridSize) {
                const offset = Math.cos(time * 0.001 + y * 0.01) * 10
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(width, y + offset)
                ctx.stroke()
            }

            // Hover effect - grid highlight
            if (isHovered && mousePos.x >= 0) {
                const radius = 100
                const grad = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, radius)
                grad.addColorStop(0, "rgba(147, 51, 234, 0.3)")
                grad.addColorStop(1, "rgba(147, 51, 234, 0)")
                ctx.fillStyle = grad
                ctx.fillRect(0, 0, width, height)
            }
        }

        const renderWaves = () => {
            ctx.clearRect(0, 0, width, height)
            const time = Date.now()

            const waves = [
                { color: "rgba(147, 51, 234, 0.15)", speed: 0.002, amplitude: 30, frequency: 0.01 },
                { color: "rgba(236, 72, 153, 0.15)", speed: 0.0015, amplitude: 40, frequency: 0.008 },
            ]

            waves.forEach((wave) => {
                ctx.beginPath()
                ctx.moveTo(0, height / 2)
                for (let x = 0; x < width; x++) {
                    const y = Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
                    ctx.lineTo(x, height / 2 + y)
                }
                ctx.lineTo(width, height)
                ctx.lineTo(0, height)
                ctx.closePath()
                ctx.fillStyle = wave.color
                ctx.fill()
            })

            // Hover effect - wave distortion
            if (isHovered && mousePos.x >= 0) {
                ctx.beginPath()
                ctx.arc(mousePos.x, mousePos.y, 60, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
                ctx.fill()
            }
        }

        const renderRipple = () => {
            ctx.clearRect(0, 0, width, height)
            const time = Date.now()

            // Concentric circles
            for (let i = 0; i < 5; i++) {
                const radius = (time * 0.05 + i * 100) % 500
                const opacity = 1 - (radius / 500)

                ctx.beginPath()
                ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2)
                ctx.strokeStyle = `rgba(79, 70, 229, ${opacity * 0.3})`
                ctx.lineWidth = 2
                ctx.stroke()
            }

            // Hover effect - ripple from cursor
            if (isHovered && mousePos.x >= 0) {
                for (let i = 0; i < 3; i++) {
                    const radius = ((time * 0.1 + i * 50) % 150)
                    const opacity = 1 - (radius / 150)

                    ctx.beginPath()
                    ctx.arc(mousePos.x, mousePos.y, radius, 0, Math.PI * 2)
                    ctx.strokeStyle = `rgba(236, 72, 153, ${opacity * 0.6})`
                    ctx.lineWidth = 3
                    ctx.stroke()
                }
            }
        }

        const render = () => {
            switch (type) {
                case "particles":
                    renderParticles()
                    break
                case "grid":
                    renderGrid()
                    break
                case "waves":
                    renderWaves()
                    break
                case "ripple":
                    renderRipple()
                    break
            }
            animationFrameId = requestAnimationFrame(render)
        }
        render()

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [type, mousePos, isHovered])

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    return (
        <div
            className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    )
}
