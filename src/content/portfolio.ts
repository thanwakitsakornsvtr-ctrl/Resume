import type {
  CaseStudy,
  FeaturedProject,
  NavigationItem,
  Practice,
  Profile,
  Project,
} from '../types/content'
import { projectAssets } from './project-assets'

// Working copy based on the owner's supplied portfolio brief.
// Unconfirmed ownership, live feature availability, and evidence remain explicit.
export const profile: Profile = {
  contentStatus: 'draft',
  name: 'Thanwa Kitsakorn',
  role: 'Junior Software Engineer',
  email: 'contactkitsakorn@gmail.com',
  headline: ['Practical software.', 'Built for real use.'],
  introduction:
    'I’m Thanwa, a Software Engineering student focused on backend and full-stack development. I work across APIs, data models, and deployment to turn practical problems into usable systems.',
  focus: [
    'Backend & system design',
    'Full-stack development',
    'Docker & deployment',
  ],
  about:
    'I’m studying Software Engineering and developing experience through practical projects. My interests span backend architecture, database design, and the interface between an application and the people using it.',
  interests:
    'BCG Platform brings those interests together: frontend and API work, role-based access, Prisma and PostgreSQL, and deployment with Docker on a VPS. I enjoy following the evidence behind an error and understanding how the layers of a system fit together.',
  principles: [
    'Follow the evidence.',
    'Keep responsibilities clear.',
    'Make delivery repeatable.',
  ],
  education: { field: 'Software Engineering', status: 'Currently studying' },
  copyrightYear: 2026,
  links: [],
  resumeUrl: undefined,
}

export const architectureLayers = [
  {
    number: '01',
    name: 'People & interfaces',
    detail: 'Frontend experiences for four user roles',
    tags: ['Customers', 'Merchants', 'Municipalities', 'Admins'],
  },
  {
    number: '02',
    name: 'Application & domain',
    detail: 'Node.js · TypeScript · Express · Modular monolith',
    tags: ['API', 'Business logic', 'Access control'],
  },
  {
    number: '03',
    name: 'Data & persistence',
    detail: 'Prisma ORM · PostgreSQL',
    tags: ['Schema', 'Relations', 'Migrations'],
  },
]

export const architecture = {
  caption: 'BCG PLATFORM / SYSTEM OVERVIEW',
  connectors: ['API requests & responses', 'Queries & migrations'],
  deployment: ['Cloudflare / HTTPS', 'Apache reverse proxy', 'Docker / VPS'],
  note: 'System overview. Detailed deployment configuration is being documented.',
}

export const navigation: NavigationItem[] = [
  { id: 'featured-project', label: 'Work' },
  { id: 'case-studies', label: 'Thinking' },
  { id: 'practices', label: 'Practices' },
  { id: 'about', label: 'About' },
]

export const featuredProject: FeaturedProject = {
  ...projectAssets.bcg,
  title: 'BCG Platform',
  eyebrow: 'Low-carbon choices. Everyday environmental action.',
  description:
    'A platform connecting low-carbon products, eco-friendly actions, point collection, and shop rewards. Customers, merchants, municipalities, and administrators use dedicated interfaces supported by role-based access.',
  contentStatus: 'draft',
  stage: 'Deployed project',
  tags: ['Node.js', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Docker'],
  scope: 'Full-stack project experience',
  problem:
    'Environmental participation involves different people and responsibilities: customers join activities, merchants manage points and transactions, municipalities evaluate activities, and administrators oversee the platform.',
  responsibility:
    'Frontend integration and error states; API and business-logic development; role-based access; Prisma/PostgreSQL schema and migrations; Docker deployment on a VPS with HTTPS and a reverse proxy. Detailed ownership and team contributions are being documented.',
  decisions: [
    {
      title: 'Different roles. Clear boundaries.',
      description:
        'Model customer, merchant, municipality, and admin responsibilities with role-based access.',
    },
    {
      title: 'A backend with structure.',
      description:
        'Organize API and business logic as a TypeScript modular monolith, with Prisma managing the data model.',
    },
    {
      title: 'Beyond the development machine.',
      description:
        'Work through Docker, VPS deployment, HTTPS, reverse-proxy configuration, and logs.',
    },
  ],
  limitations:
    'Screenshots show the current application in the development environment, including some test data. External demo links and a detailed breakdown of individual and team contributions are still being documented.',
}

export const workspace = {
  name: 'BCG Platform',
  description: 'Environmental participation across four user roles.',
  label: 'PROJECT SCOPE / ILLUSTRATIVE OVERVIEW',
  roles: [
    {
      id: 'customers',
      title: 'Customers',
      description: 'Activities & point collection',
    },
    {
      id: 'merchants',
      title: 'Merchants',
      description: 'Transactions & point management',
    },
    {
      id: 'municipalities',
      title: 'Municipalities',
      description: 'Environmental activity evaluation',
    },
    {
      id: 'admins',
      title: 'Administrators',
      description: 'Platform & data management',
    },
  ],
  flow: [
    'Participation',
    'Activities & transactions',
    'Evaluation & oversight',
  ],
  note: 'An illustrative overview of the roles and workflow within the platform.',
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'bcg-blank-screen',
    number: '01',
    category: 'BCG Platform / Debugging',
    icon: 'search',
    title: 'Making a blank screen explain itself.',
    summary:
      'Investigating missing frontend data and replacing an unexplained blank screen with a meaningful state.',
    tags: ['Error handling', 'Data boundaries'],
    recordLabel: 'Project retrospective',
    problem:
      'A BCG screen did not display the expected information when some data was absent or did not match the shape expected by the frontend.',
    constraints:
      'Missing data can represent a legitimate empty result, a response-shape problem, or a failed operation. The interface needs to distinguish these situations instead of hiding all of them behind an empty screen.',
    alternatives:
      'An empty state suits valid but absent data; an error state suits a failed request or invalid response. A generic fallback is simpler but can obscure the cause.',
    decision:
      'Investigate the frontend error and incoming data, handle absent values explicitly, and provide an understandable message instead of leaving the page blank.',
    tradeoff:
      'Defensive rendering prevents a confusing screen, but overly broad defaults can conceal a real defect. Keep valid empty states separate from failures that need attention.',
    validation:
      'Verification plan: compare the original error with the updated behavior for present, missing, and malformed data. The code example and recorded results will be added.',
    lesson:
      'Start with the symptom, inspect the evidence, then make the failure understandable to the person using the system.',
  },
  {
    id: 'bcg-deployment',
    number: '02',
    category: 'BCG Platform / Deployment',
    icon: 'terminal',
    title: 'From localhost to a deployed application.',
    summary:
      'Connecting application containers, a VPS, a reverse proxy, and HTTPS into a working delivery path.',
    tags: ['Docker', 'VPS', 'Reverse proxy'],
    recordLabel: 'Project retrospective',
    problem:
      'The application needed to move from a development environment to a VPS where it could be reached through the intended HTTPS entry point.',
    constraints:
      'The application process, container port mapping, server network, reverse proxy, and TLS-facing service must agree. A failure in one layer can look like an application problem elsewhere.',
    alternatives:
      'A process-based deployment has fewer container concepts; a Docker-based deployment makes the application environment explicit. The project uses Docker with an Apache reverse proxy and Cloudflare-facing HTTPS.',
    decision:
      'Package the application with Docker, deploy it on the VPS, and investigate container status, port mapping, network behavior, and logs when connectivity fails.',
    tradeoff:
      'Containers make the environment more explicit, but introduce network and operational boundaries that need separate checks and documentation.',
    validation:
      'Verification plan: document the deployment diagram, sanitized configuration, container status, HTTP/HTTPS responses, and relevant logs.',
    lesson:
      'Follow the request across each boundary. Verify the route to the application as well as the application itself.',
  },
  {
    id: 'bcg-province-design',
    number: '03',
    category: 'BCG Platform / Data modeling',
    icon: 'layers',
    title: 'Making province context explicit.',
    summary:
      'A design exploration of extending a platform rooted in Nakhon Phanom to support additional provinces.',
    tags: ['Schema design', 'Migrations', 'Backward compatibility'],
    recordLabel: 'Design exploration',
    problem:
      'The platform started with Nakhon Phanom as its original context. Supporting another province, such as Yasothon, requires examining assumptions embedded in both data and application behavior.',
    constraints:
      'Existing records and relationships must remain understandable. New province data can affect migrations, queries, access boundaries, and behavior that previously assumed a single context.',
    alternatives:
      'Province-specific branching is quick for an isolated case but spreads assumptions through the application. A data-driven province model makes the context explicit, with additional migration work.',
    decision:
      'Proposed direction: represent province context in the data model, review affected relationships and queries, and plan how existing records retain their original meaning.',
    tradeoff:
      'A more general model adds migration and compatibility work now, while reducing the need to hard-code another province later.',
    validation:
      'Proposed checks: add another province, confirm the correct records are read, and verify the original province still behaves correctly after migration. Implementation status and results remain to be confirmed.',
    lesson:
      'Growing a system means revisiting its assumptions, not just adding another screen.',
  },
]

export const projects: Project[] = [
  {
    id: 'mushroom-o',
    ...projectAssets.mushroom,
    title: 'Mushroom-O',
    category: 'Software meets the growing environment',
    preview: 'iot',
    description:
      'An IoT monitoring and control project for an oyster-mushroom greenhouse, connecting environmental readings with fan and misting controls.',
    tags: ['ESP32', 'MicroPython', 'SCD40', 'Node.js'],
    contentStatus: 'draft',
    stage: 'Live website',
    contribution:
      'The project connects environmental telemetry, device/server communication, and automatic equipment control. The public website presents readings, equipment status, history, and control rules; individual firmware and server contributions are being documented.',
    decision:
      'Separate monitoring from actuation: the website explains conditions and control rules while the greenhouse controller handles automatic operation. Display the time and availability of readings alongside their values.',
    limitation:
      'Screenshots document the public monitoring and automation pages at capture time. Sensor values and device availability change; individual and team contributions are still being documented.',
  },
  {
    id: 'lifelong-learning',
    ...projectAssets.lifelong,
    title: 'Lifelong Learning',
    category: 'Course discovery and online learning',
    preview: 'services',
    description:
      'An online learning platform for exploring courses, comparing fees, and reviewing lessons and activities before enrollment. The project includes frontend and backend services with PostgreSQL, Redis, and SeaweedFS.',
    tags: ['Docker Compose', 'PostgreSQL', 'Redis', 'SeaweedFS'],
    contentStatus: 'draft',
    stage: 'Live website',
    contribution:
      'Project experience across course discovery, course-information interfaces, and a multi-service application environment. Exact feature ownership and individual versus team contributions are still being documented.',
    decision:
      'Make course content, fees, dates, and learning activities discoverable before sign-in, while keeping enrollment and classroom access tied to a learner account.',
    limitation:
      'Screenshots cover public course discovery and detail pages. Some course content is marked as an example; authenticated classroom and enrollment workflows were outside this screenshot review.',
  },
  {
    id: 'sisaket-flood',
    ...projectAssets.flood,
    title: 'Sisaket Prompt',
    category: 'Water information and flood readiness',
    preview: 'flood',
    description:
      'A water-information platform for Sisaket with station readings, rainfall and reservoir information, interactive maps, and links to preparedness and assistance resources.',
    tags: ['Water information', 'Interactive maps', 'Data freshness'],
    contentStatus: 'draft',
    stage: 'Live website',
    contribution:
      'The public system brings station readings, map layers, and preparedness information into connected views. Detailed ownership of individual features and data integrations is still being documented.',
    decision:
      'Keep measurement times, data availability, and map legends close to the information they explain. Offer both map-based exploration and a text-oriented water-information page.',
    limitation:
      'The live public pages are documented here. Data freshness and layer availability vary by source; screenshots represent the capture time. Staff workflows and alert delivery were outside this screenshot review.',
  },
]

export const practices: Practice[] = [
  {
    number: '01',
    icon: 'search',
    title: 'Debug with evidence.',
    description:
      'Follow the symptom through errors, logs, and the data crossing each boundary. Make the fix explain the cause rather than just hide the symptom.',
    example:
      'BCG Platform: investigate the frontend error and missing data behind a blank screen, then distinguish an empty result from an actual failure.',
  },
  {
    number: '02',
    icon: 'layers',
    title: 'Give the backend clear responsibilities.',
    description:
      'Keep API handling, business logic, data access, and role-based decisions understandable as the application grows.',
    example:
      'BCG Platform: Node.js, TypeScript, and Express organized as a modular monolith, with role-based access across four kinds of users.',
  },
  {
    number: '03',
    icon: 'code',
    title: 'Treat data changes as system changes.',
    description:
      'Review schema relationships and the meaning of existing records before extending the model. A new requirement can affect more than one query or screen.',
    example:
      'BCG Platform: Prisma and PostgreSQL migrations, with province expansion treated as a design task that must account for existing data.',
  },
  {
    number: '04',
    icon: 'git',
    title: 'Understand the delivery path.',
    description:
      'Be able to trace how a request reaches the application—from the HTTPS entry point through the reverse proxy to the container and its service.',
    example:
      'Project experience with Docker, a VPS, Cloudflare-facing HTTPS, Apache reverse proxy configuration, and container/network log investigation.',
  },
  {
    number: '05',
    icon: 'check',
    title: 'Verify the paths that can fail.',
    description:
      'Prioritize missing data, access boundaries, and post-deployment behavior. Keep the distinction between a proposed check and a recorded test result clear.',
    example:
      'Verification priorities: missing or malformed data, HTTP/HTTPS responses after deployment, and compatibility after schema migrations. Recorded examples will be added.',
  },
]
