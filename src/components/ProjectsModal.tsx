import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import siteData from '@/data/site.json';

interface Project {
  href: string;
  alt: string;
  image: string;
  title: string;
  description: string;
}

export default function ProjectsModal() {
  const [open, setOpen] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
      return () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          id="view-all-projects-btn"
          className="inline-flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/20 hover:shadow-xl hover:shadow-primary/30"
        >
          View All Projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </Dialog.Trigger>

      {/* Use Transition for fade-in/out animation */}
      <Transition
        show={open}
        as={Fragment}
        className="transition-opacity duration-300 ease-out"
      >
        <Dialog.Portal>
          <Dialog.Overlay
            asChild
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />
          <Dialog.Content asChild>
            <div
              className="fixed inset-0 z-[100] flex min-h-full items-center justify-center p-4 sm:p-6 transition-opacity transition-transform duration-300 ease-out"
            >
              <div className="relative flex max-h-[85dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-[#0e1b2e] shadow-2xl">
                <div className="flex items-center justify-between border-b border-border/50 px-6 py-5 sm:px-8">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                      {modal.badge}
                    </span>
                    <Dialog.Title className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {modal.title}
                    </Dialog.Title>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="Close projects modal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-5"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </Dialog.Close>
                </div>
                <div
                  className="flex-1 overflow-y-auto p-6 sm:p-8"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehavior: 'contain',
                  }}
                >
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {modal.projects.map((project: Project, index: number) => (
                      <a
                        key={index}
                        href={project.href}
                        rel="noopener"
                        target="_blank"
                        className="group block overflow-hidden rounded-xl border border-border bg-[#0b1526] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            alt={project.alt}
                            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={project.image}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1526] via-transparent to-transparent opacity-60"></div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {project.description}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary transition-colors group-hover:text-primary-foreground">
                            View Site
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-3"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Transition>
    </Dialog.Root>
  );
}
