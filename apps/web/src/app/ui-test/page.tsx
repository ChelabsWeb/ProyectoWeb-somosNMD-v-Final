"use client";

import { PageShell } from "@/components/layout/PageShell";
import { BentoCard } from "@/components/blocks/bento-card";
import { ArtistCard } from "@/components/sections/ArtistCard";
import { Terminal, AlertCircle } from "lucide-react";
import { BookingModule } from "@/components/sections/booking-module";

// The 20+ Expansion Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { HoverCard } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider, useToast } from "@/components/ui/toast";

const ToastDemo = () => {
  const { addToast } = useToast();
  return (
    <Button onClick={() => addToast({ title: "Sistema en Línea", description: "Sistema de diseño armonizado exitosamente.", type: "success" })}>
      Lanzar Notificación
    </Button>
  );
};

export default function UITestPage() {
  return (
    <ToastProvider>
      <PageShell>
        <div className="pt-32 pb-24 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full space-y-32">
          
          <section className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold uppercase tracking-tighter">
              NÓMADES UI
            </h1>
            <p className="text-lg text-white/60 font-mono">
              The complete harmonized brutalist design system components showcasing 20+ functional blocks.
            </p>
          </section>

          {/* Phase 1: Base Brutalist Components */}
          <section className="space-y-12">
            <div className="border-b-4 border-white pb-4">
              <h2 className="text-3xl font-heading uppercase tracking-widest text-[#FF4D00]">Fase 1: Componentes Base</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <BentoCard>
                <h3 className="text-xl font-sans font-black text-[#0055FF] mb-4">Botón Brutalista</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default" alternateText="¡RESERVAR YA!">RESERVAR SESIÓN</Button>
                  <Button variant="destructive">ELIMINAR</Button>
                  <Button variant="outline">FANTASMA</Button>
                  <Button variant="secondary" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                  </Button>
                </div>
              </BentoCard>

              <BentoCard>
                <h3 className="text-xl font-sans font-black text-[#FF4D00] mb-4">Inputs & Badges</h3>
                <div className="space-y-4">
                  <Input placeholder="INGRESA TU EMAIL..." type="email" />
                  <div className="flex gap-4 mt-4 flex-wrap">
                    <Badge variant="default">ENTRADA 01</Badge>
                    <Badge variant="secondary">PASE VIP</Badge>
                    <Badge variant="destructive">BLOQUEADO</Badge>
                    <Badge variant="brutalist">NUEVO INGRESO</Badge>
                  </div>
                </div>
              </BentoCard>

              <BentoCard className="md:col-span-2">
                <h3 className="text-xl font-sans font-black text-white mb-4">Dialog (Modal)</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" alternateText="ABRIR AHORA">ABRIR MODAL</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-black uppercase text-[#FF4D00]">Alerta Studio Job</DialogTitle>
                      <DialogDescription className="font-mono text-white/70">
                        Este es un modal brutalista. Sin sombras suaves. Sin esquinas redondeadas. Pura violencia HTML.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-8">
                      <p className="font-mono font-bold text-white">El contenido va aquí en su forma más cruda.</p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">CANCELAR</Button>
                      </DialogClose>
                      <Button variant="secondary" alternateText="¡VAMOS!">CONFIRMAR</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </BentoCard>
            </div>
          </section>

          {/* Form & Input Elements */}
          <section className="space-y-12">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold uppercase tracking-tight">Formularios e Inputs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-white/40 uppercase">Inputs & Textarea</h3>
                <Input placeholder="Ingresa tu email..." type="email" />
                <Textarea placeholder="Escribe tu mensaje aquí..." />
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-mono text-white/40 uppercase">Toggles & Checks</h3>
                <div className="flex items-center gap-4">
                  <Switch defaultChecked />
                  <span className="font-mono text-sm uppercase">Modo Activo</span>
                </div>
                <div className="flex items-center gap-4">
                  <Checkbox defaultChecked />
                  <span className="font-mono text-sm uppercase">Aceptar Términos</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-mono text-white/40 uppercase">Selectors</h3>
                <RadioGroup defaultValue="1" className="flex gap-4">
                  <div className="flex items-center gap-2"><RadioGroupItem value="1" /> Opt 1</div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="2" /> Opt 2</div>
                </RadioGroup>
                
                <Select options={[{label: "Option Alpha", value: "a"}, {label: "Option Beta", value: "b"}]} placeholder="Select Item" />
              </div>

              <div className="space-y-4 md:col-span-2 lg:col-span-3">
                <h3 className="text-sm font-mono text-white/40 uppercase">Slider / Range</h3>
                <Slider defaultValue={50} max={100} step={1} />
              </div>

            </div>
          </section>

          {/* Navigation & Layout */}
          <section className="space-y-12">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold uppercase tracking-tight">Navegación y Diseño</h2>
            </div>
            
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-white/40 uppercase">Breadcrumb</h3>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem><BreadcrumbLink href="/">INICIO</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbLink href="/components">COMPONENTES</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbPage>PRUEBAS</BreadcrumbPage></BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-mono text-white/40 uppercase">Tabs</h3>
                <Tabs defaultValue="visuals">
                  <TabsList className="w-full max-w-sm">
                    <TabsTrigger value="audio">Audio</TabsTrigger>
                    <TabsTrigger value="visuals">Visuales</TabsTrigger>
                    <TabsTrigger value="sys">Sistema</TabsTrigger>
                  </TabsList>
                  <TabsContent value="audio" className="text-sm font-mono text-white/50">Señales de audio activas.</TabsContent>
                  <TabsContent value="visuals" className="text-sm font-mono text-white/50">Corteza visual conectada.</TabsContent>
                  <TabsContent value="sys" className="text-sm font-mono text-white/50">Sistema nominal.</TabsContent>
                </Tabs>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-mono text-white/40 uppercase">Accordion</h3>
                  <Accordion>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿ES ACCESIBLE?</AccordionTrigger>
                      <AccordionContent>Sí. Se adhiere a los más altos estándares Brutalistas manteniendo funcionalidad cruda.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿ESTÁ ANIMADO?</AccordionTrigger>
                      <AccordionContent>Totalmente animado usando Framer Motion para transiciones físicas.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-mono text-white/40 uppercase">Scroll Area</h3>
                  <ScrollArea className="h-[200px] w-full rounded-2xl border border-white/10 bg-white/5 p-4">
                    {Array.from({length: 15}).map((_, i) => (
                      <div key={i} className="py-2 text-sm font-mono text-white/70 border-b border-white border-dashed last:border-0 uppercase tracking-widest">Secuencia de datos {i + 1}</div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </div>
          </section>
          {/* Feedback & Display */}
          <section className="space-y-12">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold uppercase tracking-tight">Feedback y Visualización</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-sm font-mono text-white/40 uppercase">Alerts</h3>
                <Alert variant="default">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>ATENCIÓN</AlertTitle>
                  <AlertDescription>Protocolo de inicialización iniciado correctamente.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>ERROR FATAL</AlertTitle>
                  <AlertDescription>Infracciones de diseño detectadas en el cuadrante alfa.</AlertDescription>
                </Alert>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-mono text-white/40 uppercase">Progress & Loading</h3>
                <Progress value={60} />
                <div className="flex gap-4 items-center mt-6">
                  <Avatar src="/assets/artists/Gervi.jpg" fallback="GE" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <h3 className="text-sm font-mono text-white/40 uppercase mb-4">Cards</h3>
                <Card className="max-w-md">
                  <CardHeader>
                    <CardTitle>MÓDULO DE TRANSMISIÓN</CardTitle>
                    <CardDescription>Conexión segura establecida con la base de datos principal.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    Los componentes ahora están alineados. Brutalismo activado.
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" className="w-full">VER REGISTROS</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>         
          {/* Overlays & Complex */}
          <section className="space-y-12">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold uppercase tracking-tight">Overlays y Módulos Complejos</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-white/40 uppercase">DropdownMenu</h3>
                <DropdownMenu trigger={<Button variant="outline">OPCIONES</Button>}>
                  <DropdownMenuItem>PERFIL</DropdownMenuItem>
                  <DropdownMenuItem>AJUSTES</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 hover:bg-red-500/10">DESCONECTAR</DropdownMenuItem>
                </DropdownMenu>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-mono text-white/40 uppercase">HoverCard</h3>
                <HoverCard content={
                  <div className="space-y-2">
                    <h4 className="font-bold">Next.js</h4>
                    <p className="text-sm text-white/70">App Router, RSC, y server actions integrados por defecto.</p>
                  </div>
                }>
                  <Button variant="ghost">@nextjs</Button>
                </HoverCard>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-mono text-white/40 uppercase">Tooltip</h3>
                <TooltipProvider>
                  <Tooltip content="Módulo de armamento activado">
                    <Button variant="secondary" size="icon">
                      <Terminal className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-mono text-white/40 uppercase">Toast</h3>
                <ToastDemo />
              </div>
            </div>
          </section>

          {/* Complex Composition: Carousel */}
          <section className="space-y-8">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold uppercase tracking-tight">Complex: Carousel</h2>
            </div>
            
            <Carousel 
              items={[1, 2, 3]} 
              renderItem={(item) => (
                <div className="w-full h-64 md:h-96 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-4xl md:text-8xl font-sans font-black tracking-widest uppercase">Slide {item}</span>
                </div>
              )} 
            />
          </section>

          {/* Booking Engine */}
          <section className="space-y-8">
            <div className="border-b-4 border-white pb-4">
              <h2 className="text-3xl font-heading uppercase tracking-widest text-[#FF4D00]">Motor de Reservas (Complex Flow)</h2>
            </div>
            <div className="w-full">
              <BookingModule />
            </div>
          </section>

        </div>
      </PageShell>
    </ToastProvider>
  );
}
