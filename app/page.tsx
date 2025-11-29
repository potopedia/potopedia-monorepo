"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Camera, ImageIcon, Video, Users, BarChart3, Sparkles, ChevronRight, Wand2, Share, ArrowRight, Play } from "lucide-react"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { SectionBackground } from "@/components/ui/section-background"

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [registerUserType, setRegisterUserType] = useState("photographer")
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  const openRegisterModal = (type = "photographer") => {
    setRegisterUserType(type)
    setIsRegisterModalOpen(true)
  }

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false)
  }

  const howItWorks = [
    {
      number: "1",
      title: "Upload Your Photos",
      description: "Organize and upload all your event photos in seconds with our intuitive interface.",
      image: "/wedding_photo_1_1764312813818.png",
      icon: Camera,
    },
    {
      number: "2",
      title: "AI Enhancement",
      description: "Automatically enhance photos, recognize faces, and generate stunning videos with AI.",
      image: "/wedding_ceremony_example_1764312589201.png",
      icon: Wand2,
    },
    {
      number: "3",
      title: "Share & Monetize",
      description: "Create custom galleries and share with clients or monetize your content.",
      image: "/wedding_reception_example_1764312604940.png",
      icon: Share,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-purple-500/30">
      <AnimatedBackground />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
              <Camera className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Photopedia
            </span>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <ModeToggle />
            <Button
              variant="ghost"
              onClick={openLoginModal}
              className="font-medium hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              Log in
            </Button>
            <Button
              onClick={() => openRegisterModal()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
            >
              Sign up
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden perspective-1000">
          <SectionBackground type="particles" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-purple-100/50 dark:bg-purple-900/30 backdrop-blur border border-purple-200 dark:border-purple-800 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                The Future of Event Photography
              </span>
            </motion.div>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            >
              Capture. Enhance. <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% auto" }}
              >
                Monetize.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              The all-in-one AI platform for modern photographers. From smart enhancements to instant sharing, we've got
              you covered.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl shadow-purple-500/25"
                  onClick={() => openRegisterModal("photographer")}
                >
                  Start for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  onClick={() => openRegisterModal("guest")}
                >
                  I'm a Guest
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* How It Works Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="text-center mb-20"
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6">
                How It Works
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your workflow with our simple three-step process.
              </motion.p>
            </motion.div>

            <div className="grid gap-12 md:grid-cols-3">
              {howItWorks.map((step, idx) => (
                <HowItWorksCard key={step.number} step={step} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-sm relative">
          <SectionBackground type="waves" />
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Powerful Features</h2>
              <p className="text-xl text-muted-foreground">Everything you need to succeed</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <FeatureCard
                icon={<Camera className="h-8 w-8 text-white" />}
                title="Photographer Tools"
                description="Easily upload, organize, and enhance your event photos with our intuitive dashboard."
                color="from-purple-500 to-indigo-600"
              />
              <FeatureCard
                icon={<ImageIcon className="h-8 w-8 text-white" />}
                title="Client Galleries"
                description="Share beautiful galleries with your clients using QR codes or event links."
                color="from-pink-500 to-rose-600"
              />
              <FeatureCard
                icon={<Video className="h-8 w-8 text-white" />}
                title="AI Video Generation"
                description="Transform your photos into stunning videos with AI-powered editing tools."
                color="from-orange-500 to-amber-600"
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-white" />}
                title="Face Recognition"
                description="Let your clients easily find photos they appear in with smart face recognition."
                color="from-green-500 to-emerald-600"
              />
              <FeatureCard
                icon={<Sparkles className="h-8 w-8 text-white" />}
                title="Photo Enhancement"
                description="Automatically enhance your photos with our AI-powered editing tools."
                color="from-blue-500 to-cyan-600"
              />
              <FeatureCard
                icon={<BarChart3 className="h-8 w-8 text-white" />}
                title="Analytics Dashboard"
                description="Track engagement and performance with comprehensive analytics."
                color="from-violet-500 to-purple-600"
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <SectionBackground type="ripple" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 -z-20" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 -z-10" />

          <div className="container mx-auto max-w-4xl text-center text-foreground dark:text-white relative z-10">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-8"
            >
              Ready to transform your event photography?
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-purple-100 mb-12 max-w-2xl mx-auto"
            >
              Join thousands of photographers and event planners who trust Photopedia to deliver exceptional experiences.
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={() => openRegisterModal()}
                className="h-16 px-10 text-xl bg-white text-purple-900 hover:bg-purple-50 hover:scale-105 transition-all shadow-2xl rounded-full"
              >
                Get Started Today
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-600 text-white">
                <Camera className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg">Photopedia</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-purple-600 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-purple-600 transition-colors">
                Privacy
              </Link>
              <Link href="/help" className="text-muted-foreground hover:text-purple-600 transition-colors">
                Help
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-purple-600 transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <a href="mailto:support@photopedia.co" className="hover:text-purple-600 transition-colors">
                support@photopedia.co
              </a>
              <a href="mailto:tech@photopedia.co" className="hover:text-purple-600 transition-colors">
                tech@photopedia.co
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Photopedia. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onOpenRegister={() => {
          closeLoginModal()
          openRegisterModal()
        }}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onOpenLogin={() => {
          closeRegisterModal()
          openLoginModal()
        }}
        defaultUserType={registerUserType}
      />
    </div>
  )
}

function HowItWorksCard({ step, index }: { step: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-3xl bg-card border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="h-full w-full"
        >
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
          className="absolute top-4 left-4 z-20 h-12 w-12 rounded-2xl bg-white/90 backdrop-blur text-purple-700 flex items-center justify-center font-bold text-xl shadow-lg"
        >
          {step.number}
        </motion.div>
      </div>

      <div className="p-8 relative">
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={isInView ? { rotate: 0, scale: 1 } : { rotate: -20, scale: 0 }}
          transition={{ delay: 0.6 + index * 0.2, type: "spring" }}
          className="absolute -top-10 right-8 h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-xl text-white z-20 border-4 border-card group-hover:rotate-12 transition-transform duration-300"
        >
          <step.icon className="h-10 w-10" />
        </motion.div>

        <h3 className="text-2xl font-bold mb-3 mt-4">{step.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>

        <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-2 transition-transform duration-300 cursor-pointer">
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </motion.div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
      }}
      whileHover={{ scale: 1.03 }}
      className="group bg-card p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
    >
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      <div className="mt-6">
        <Button
          variant="link"
          className="text-purple-600 dark:text-purple-400 inline-flex items-center p-0 group-hover:translate-x-1 transition-transform"
        >
          Learn more <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  )
}
