"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6" data-aos="fade-right">
            <h1 className="text-4xl md:text-6xl font-bold">
              Olá, eu sou{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Matheus Araújo
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium">Desenvolvedor Full Stack</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Estudante universitário da UNINTER especializado em desenvolvimento Full Stack, com experiência em
              diversas tecnologias modernas para criação de soluções web completas e eficientes.
            </p>

            <div className="flex gap-4">
              <Button size="lg" asChild>
                <a href="#projects">Ver meus projetos</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contato
                </a>
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/KingOFsun00" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="relative" data-aos="fade-left">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Matheus"
                  alt="Matheus Araújo"
                  width={400}
                  height={400}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/30 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
