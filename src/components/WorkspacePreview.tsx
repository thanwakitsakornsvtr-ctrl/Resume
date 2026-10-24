import {
  ArrowDown,
  ArrowRight,
  Landmark,
  Leaf,
  ShieldCheck,
  Store,
  Users,
} from 'lucide-react'
import { useContent } from '../hooks/useContent'

const roleIcons = [Users, Store, Landmark, ShieldCheck]

export function WorkspacePreview() {
  const { workspace } = useContent()
  return (
    <div className="bcg-overview">
      <div className="bcg-overview-heading">
        <span className="bcg-symbol" aria-hidden="true">
          <Leaf size={28} />
        </span>
        <div>
          <p className="bcg-label">{workspace.label}</p>
          <h3>{workspace.name}</h3>
          <p>{workspace.description}</p>
        </div>
      </div>
      <div className="bcg-role-grid">
        {workspace.roles.map((role, index) => {
          const RoleIcon = roleIcons[index] ?? Users
          return (
            <div className="bcg-role" key={role.id}>
              <RoleIcon size={24} aria-hidden="true" />
              <h4>{role.title}</h4>
              <p>{role.description}</p>
            </div>
          )
        })}
      </div>
      <ol className="bcg-flow">
        {workspace.flow.map((step, index) => (
          <li key={step}>
            <span className="bcg-flow-number">0{index + 1}</span>
            <span>{step}</span>
            {index < workspace.flow.length - 1 && (
              <ArrowRight size={18} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      <p className="bcg-overview-note">{workspace.note}</p>
    </div>
  )
}

export function ArchitecturePreview() {
  const { architectureLayers, architecture } = useContent()
  return (
    <div className="architecture-preview">
      <div className="architecture-caption">
        <span className="tiny-dot" />
        {architecture.caption}
      </div>
      <div className="architecture-layers">
        {architectureLayers.map((layer, index) => (
          <div key={layer.number}>
            <div className="architecture-layer">
              <span className="architecture-number">{layer.number}</span>
              <div>
                <h3>{layer.name}</h3>
                <p>{layer.detail}</p>
              </div>
              <div className="architecture-tags">
                {layer.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            {index < architectureLayers.length - 1 && (
              <div className="architecture-connector">
                <ArrowDown size={20} aria-hidden="true" />
                <span>{architecture.connectors[index]}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="deployment-chain">
        {architecture.deployment.map((step, index) => (
          <span key={step}>
            {index > 0 && <ArrowRight size={14} aria-hidden="true" />}
            {step}
          </span>
        ))}
      </div>
      <p className="architecture-note">{architecture.note}</p>
    </div>
  )
}
