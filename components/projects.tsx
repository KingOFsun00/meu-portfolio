"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star } from "lucide-react"
import Image from "next/image"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
}

const getLanguageColor = (language: string | null) => {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    TypeScript: "#2b7489",
    PHP: "#4F5D95",
    Ruby: "#701516",
    "C++": "#f34b7d",
    C: "#555555",
    Shell: "#89e051",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Go: "#00ADD8",
    Rust: "#dea584",
    Dart: "#00B4AB",
    Vue: "#2c3e50",
    React: "#61dafb",
  }

  return colors[language || ""] || "#6c63ff"
}

export function Projects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.github.com/users/KingOFsun00/repos?sort=updated&per_page=6")
        const repos = await response.json()
        setProjects(repos.filter((repo: GitHubRepo) => !repo.name.includes("KingOFsun00")))
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true
    return project.language?.toLowerCase() === filter
  })

  const languages = [...new Set(projects.map((p) => p.language).filter(Boolean))]

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meus Projetos</h2>
            <p className="text-lg text-muted-foreground">Carregando projetos do GitHub...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meus Projetos</h2>
          <p className="text-lg text-muted-foreground">Projetos desenvolvidos e disponíveis no GitHub</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            Todos
          </Button>
          {languages.map((lang) => (
            <Button
              key={lang}
              variant={filter === lang?.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(lang?.toLowerCase() || "")}
            >
              {lang}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                <Image
                  src={`/placeholder-200x400.png?height=200&width=400&text=${encodeURIComponent(project.name)}`}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg truncate">{project.name}</h3>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description || "Sem descrição disponível."}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  {project.language && (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(project.language) }}
                      />
                      <span>{project.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{project.stargazers_count}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Código
                    </a>
                  </Button>
                  {project.homepage && (
                    <Button size="sm" className="flex-1" asChild>
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum projeto encontrado para o filtro selecionado.</p>
          </div>
        )}
      </div>
    </section>
  )
}
