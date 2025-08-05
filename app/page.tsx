"use client"

import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills3D } from "@/components/skills-3d"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      <Skills3D />
      <Projects />
      <Contact />
    </main>
  )
}
