"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LearnMoreModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
    icon?: React.ReactNode
}

export function LearnMoreModal({ isOpen, onClose, title, description, icon }: LearnMoreModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-card border-slate-200 dark:border-slate-800">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-4">
                        {icon && (
                            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                {icon}
                            </div>
                        )}
                        <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
                    </div>
                    <ScrollArea className="max-h-[60vh] pr-4">
                        <DialogDescription className="text-base leading-relaxed text-foreground/80">
                            {description}
                        </DialogDescription>
                        <div className="text-base leading-relaxed text-foreground/80 mt-4">
                            At Potopedia, we strive to provide the best tools for photographers and event organizers.
                            This feature is designed to streamline your workflow and enhance the experience for your clients.
                            <br /><br />
                            <strong>Key Benefits:</strong>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Efficiency and speed</li>
                                <li>Professional quality results</li>
                                <li>Seamless integration</li>
                                <li>User-friendly interface</li>
                            </ul>
                        </div>
                    </ScrollArea>
                </DialogHeader>
                <div className="flex justify-end mt-4">
                    <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700 text-white">
                        Got it
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
