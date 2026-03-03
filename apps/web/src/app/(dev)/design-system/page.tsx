import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-12 space-y-16">
      <div className="space-y-4">
        <h1 className="font-heading text-5xl font-bold tracking-tight">Design System</h1>
        <p className="text-muted-foreground text-lg font-sans">
          Centralized specification for Sileo minimalist aesthetic, Elegancia Bento grid, and interactive patterns.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="font-heading text-3xl font-semibold border-b border-border pb-2">Typography & Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BentoCard>
            <h3 className="font-heading text-2xl text-primary mb-2">Heading (round_8four)</h3>
            <p className="font-sans text-muted-foreground">Body/UI Text (Inter/Geist Variable)</p>
          </BentoCard>
          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 rounded-[24px] bg-background border border-white/10 flex items-center justify-center shadow-lg">
              <span className="text-sm font-medium">Midnight</span>
            </div>
            <div className="w-24 h-24 rounded-[32px] bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-sm font-medium text-primary-foreground text-center leading-tight px-2">Tron Orange</span>
            </div>
            <div className="w-24 h-24 rounded-full bg-card border border-white/5 flex items-center justify-center">
              <span className="text-sm font-medium">Card</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-3xl font-semibold border-b border-border pb-2">Interactive Components</h2>
        <div className="flex flex-wrap gap-6 items-end">
          <Button variant="default" size="default">Primary Button</Button>
          <Button variant="secondary" size="lg">Secondary Large</Button>
          <Button variant="outline" size="sm">Outline Small</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-3xl font-semibold border-b border-border pb-2">Forms & Inputs</h2>
        <div className="max-w-md space-y-4">
          <Input placeholder="Enter your email address..." />
          <Input placeholder="Password" type="password" />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-3xl font-semibold border-b border-border pb-2">Modals & Dialogs</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Custom Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">Premium Modal</DialogTitle>
              <DialogDescription className="font-sans text-base">
                This dialog features aggressive border radii [32px], pure dark backgrounds, and subtle borders.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <Input placeholder="Subscribe to newsletter..." />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost">Cancel</Button>
              <Button>Confirm Action</Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
