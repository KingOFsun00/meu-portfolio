import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Laptop, Heart } from "lucide-react"
import Image from "next/image"

export function About() {
  return (
    <section id="about" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative" data-aos="fade-right">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=500&text=Profile"
                alt="Matheus Araújo"
                width={500}
                height={600}
                className="rounded-lg object-cover shadow-lg"
              />
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/30 rounded-lg -z-10"></div>
            </div>
          </div>

          <div className="space-y-6" data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-bold">
              Sobre <span className="text-primary">Mim</span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                Sou um desenvolvedor Full Stack apaixonado por tecnologia e soluções inovadoras. Atualmente cursando
                Análise e Desenvolvimento de Sistemas na UNINTER, busco constantemente aprimorar minhas habilidades e
                aprender novas tecnologias.
              </p>
              <p>
                Minha jornada na programação começou quando eu tinha 15 anos, criando pequenos scripts para automatizar
                tarefas. Desde então, desenvolvi uma paixão por resolver problemas complexos através do código e criar
                experiências digitais significativas.
              </p>
              <p>
                Acredito que a tecnologia deve ser acessível, intuitiva e transformadora. Meu objetivo é desenvolver
                soluções que impactem positivamente a vida das pessoas, combinando funcionalidade robusta com design
                cuidadoso.
              </p>
            </div>

            <div className="grid gap-6 mt-8">
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Formação</h4>
                    <p className="text-sm text-muted-foreground">
                      Análise e Desenvolvimento de Sistemas - UNINTER (Cursando)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Laptop className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Experiência</h4>
                    <p className="text-sm text-muted-foreground">
                      2+ anos desenvolvendo projetos pessoais e freelances
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Interesses</h4>
                    <p className="text-sm text-muted-foreground">IA, IoT, Desenvolvimento Mobile, Web e Software</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
