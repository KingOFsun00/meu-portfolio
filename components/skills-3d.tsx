"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls, Environment, Float } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"

const skills3D = [
  {
    name: "JavaScript",
    color: "#f0db4f",
    level: 90,
    description: "Experiência com ES6+, Node.js, Express e desenvolvimento de aplicações web complexas.",
    category: "Language",
  },
  {
    name: "Python",
    color: "#3776ab",
    level: 70,
    description: "Desenvolvimento de scripts, automação e aplicações com Flask e Django.",
    category: "Language",
  },
  {
    name: "React",
    color: "#61dafb",
    level: 80,
    description: "Desenvolvimento de interfaces reativas com Hooks, Context API e Redux.",
    category: "Frontend",
  },
  {
    name: "HTML/CSS",
    color: "#e34c26",
    level: 95,
    description: "Criação de layouts responsivos com CSS moderno (Flexbox, Grid).",
    category: "Frontend",
  },
  {
    name: "Git",
    color: "#f34f29",
    level: 75,
    description: "Controle de versão, trabalho em equipe e fluxos Git Flow.",
    category: "Tools",
  },
  {
    name: "Node.js",
    color: "#339933",
    level: 85,
    description: "Desenvolvimento de APIs REST, serviços backend e aplicações server-side.",
    category: "Backend",
  },
]

function SkillSphere({
  skill,
  position,
  isSelected,
  onClick,
}: {
  skill: (typeof skills3D)[0]
  position: [number, number, number]
  isSelected: boolean
  onClick: () => void
}) {
  const meshRef = useRef<any>()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y += 0.01
    }
  })

  const scale = isSelected ? 1.3 : hovered ? 1.1 : 1
  const sphereScale = (skill.level / 100) * 0.8 + 0.4

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          scale={[scale * sphereScale, scale * sphereScale, scale * sphereScale]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color={skill.color}
            transparent
            opacity={0.9}
            roughness={0.2}
            metalness={0.8}
            emissive={isSelected ? skill.color : "#000000"}
            emissiveIntensity={isSelected ? 0.2 : 0}
          />
        </mesh>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Bold.json"
        >
          {skill.name}
        </Text>
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.18}
          color="#888"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Regular.json"
        >
          {skill.level}%
        </Text>
      </group>
    </Float>
  )
}

function Skills3DScene({
  selectedSkill,
  onSkillSelect,
}: {
  selectedSkill: number
  onSkillSelect: (index: number) => void
}) {
  const { theme } = useTheme()

  return (
    <>
      <ambientLight intensity={theme === "dark" ? 0.4 : 0.6} />
      <pointLight position={[10, 10, 10]} intensity={theme === "dark" ? 0.8 : 1} />
      <pointLight position={[-10, -10, -10]} intensity={theme === "dark" ? 0.4 : 0.5} />

      {skills3D.map((skill, index) => {
        const angle = (index / skills3D.length) * Math.PI * 2
        const radius = 4
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(index * 0.5) * 0.5

        return (
          <SkillSphere
            key={skill.name}
            skill={skill}
            position={[x, y, z]}
            isSelected={selectedSkill === index}
            onClick={() => onSkillSelect(index)}
          />
        )
      })}

      <Environment preset={theme === "dark" ? "night" : "studio"} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export function Skills3D() {
  const [view, setView] = useState<"3d" | "list">("3d")
  const [selectedSkill, setSelectedSkill] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[600px] bg-muted/50 animate-pulse rounded-lg" />
  }

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Minhas Habilidades</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Interaja com os elementos 3D para explorar minhas competências técnicas
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setView("3d")}
              className={`px-6 py-2 rounded-lg transition-colors ${
                view === "3d"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Visualização 3D
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-6 py-2 rounded-lg transition-colors ${
                view === "list"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Lista Detalhada
            </button>
          </div>
        </div>

        {view === "3d" ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-[500px] w-full rounded-lg overflow-hidden bg-gradient-to-b from-background to-muted/50 border">
                <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                  <Suspense fallback={null}>
                    <Skills3DScene selectedSkill={selectedSkill} onSkillSelect={setSelectedSkill} />
                  </Suspense>
                </Canvas>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                🖱️ Clique nas esferas para ver detalhes • Arraste para rotacionar
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: skills3D[selectedSkill].color }} />
                    {skills3D[selectedSkill].name}
                  </CardTitle>
                  <Badge variant="secondary">{skills3D[selectedSkill].category}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Proficiência</span>
                      <span className="font-medium">{skills3D[selectedSkill].level}%</span>
                    </div>
                    <Progress value={skills3D[selectedSkill].level} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{skills3D[selectedSkill].description}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-2">
                {skills3D.map((skill, index) => (
                  <button
                    key={skill.name}
                    onClick={() => setSelectedSkill(index)}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      selectedSkill === index ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }} />
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                    <div className="text-xs opacity-70 mt-1">{skill.level}%</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills3D.map((skill) => (
              <Card key={skill.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: skill.color }} />
                      {skill.name}
                    </CardTitle>
                    <Badge variant="secondary">{skill.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Proficiência</span>
                      <span className="font-medium">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
