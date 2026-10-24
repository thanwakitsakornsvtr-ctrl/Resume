import { create } from 'zustand'

interface PortfolioState {
  menuOpen: boolean
  activeSection: string
  projectView: 'workspace' | 'architecture'
  setMenuOpen: (open: boolean) => void
  setActiveSection: (id: string) => void
  setProjectView: (view: 'workspace' | 'architecture') => void
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  menuOpen: false,
  activeSection: '',
  projectView: 'workspace',
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setProjectView: (projectView) => set({ projectView }),
}))
