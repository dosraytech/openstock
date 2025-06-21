# OpenStock

An open source inventory management system built with Nuxt 3 and PocketBase. This application provides comprehensive tools for managing inventory, suppliers, contacts, deals, and more.

> **⚠️ Early Version Notice**  
> OpenStock is currently in early development (v0.0.1). While the core features are functional, you may encounter bugs or incomplete features. We recommend using this for testing and development purposes only. Production use is not recommended at this time. Contributions and feedback are welcome!

[![Demo](https://img.shields.io/badge/🌐_Live_Demo-stock.florianargaud.com-blue?style=for-the-badge)](https://streaming.florianargaud.com/)
[![Built with Nuxt](https://img.shields.io/badge/Built_with-Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/folken)

**🚀 Want to deploy this for your organization or create your own MVP?**  
**📧 Contact me at [FlorianArgaud.com](https://FlorianArgaud.com)**

## Features

- 📦 **Inventory Management** - Product catalog and stock tracking
- 📊 **Dashboard** - Overview of key metrics and activities
- 🏢 **Supplier Management** - Vendor relationship management
- 👥 **Contact Management** - Manage customers and prospects
- 💼 **Deal Pipeline** - Track sales opportunities
- ✅ **Task Management** - Todo lists and task tracking
- 📈 **Analytics** - Inventory and sales insights
- 🔐 **Authentication** - Secure user management
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **Backend**: PocketBase
- **Styling**: Tailwind CSS
- **Charts**: ApexCharts
- **State Management**: Pinia
- **Deployment**: Cloudflare Pages

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/) or [bun](https://bun.sh/)
- [PocketBase](https://pocketbase.io/) (latest version)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/florianjs/openstock
cd openstock
```

### 2. Install Dependencies

```bash
# npm
npm install
```

### 3. Setup PocketBase

#### Download and Install PocketBase

1. Download PocketBase from [https://pocketbase.io/docs/](https://pocketbase.io/docs/)
2. Extract the executable to a folder of your choice
3. Navigate to that folder in your terminal

#### Import Database Schema

1. Start PocketBase:

   ```bash
   ./pocketbase serve
   ```

2. Open the PocketBase Admin UI at `http://localhost:8090/_/`

3. Create an admin account when prompted

4. Import the database schema:
   - Go to **Settings** → **Import collections**
   - Upload the `database/pocketbase.json` file from this project
   - Click **Review** and then **Import**

#### Alternative: Command Line Import

You can also import the schema via command line:

```bash
./pocketbase admin create admin@example.com your-password
./pocketbase admin import database/pocketbase.json
./pocketbase serve
```

### 4. Environment Configuration

Create a `.env` file in the root of your project:

```bash
cp .env.example .env
```

Update the environment variables:

```env
BASE_URL=http://localhost:8090
# Add other environment variables as needed
```

### 5. Development Server

Start the development server:

```bash
# npm
npm run dev
```

The application will be available at `http://localhost:3000`

## Database Schema

The PocketBase database includes the following collections:

- **inventory** - Product catalog and stock levels
- **suppliers** - Vendor information
- **categories** - Product categories
- **users** - User authentication and profiles
- **contacts** - Customer and prospect information
- **deals** - Sales opportunities and pipeline
- **todos** - Task management
- **supplier_prices** - Supplier pricing information

## Production Deployment

This application is optimized for deployment on Cloudflare Pages.

### Prerequisites for Deployment

1. [Cloudflare account](https://dash.cloudflare.com/sign-up)
2. [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed globally:
   ```bash
   npm install -g wrangler
   ```

### Deployment Steps

#### 1. Configure Wrangler

Copy the example configuration:

```bash
cp wrangler.toml.example wrangler.toml
```

Update `wrangler.toml` with your project details:

```toml
name = "openstock-app"
compatibility_date = "2023-05-18"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = "dist"

[vars]
BASE_URL = "https://your-pocketbase-url.com"
```

#### 2. Setup PocketBase in Production

You'll need to deploy PocketBase separately. Options include:

- **Railway (One-click)**: Deploy instantly with [Railway's PocketBase template](https://railway.com/deploy/Oasf2M?referralCode=jlaranjo)
- **Self-hosted**: Deploy on a VPS, DigitalOcean, etc.
- **Cloud platforms**: Render, Fly.io, or similar
- **Docker**: Use Docker containers

Make sure your production PocketBase URL is accessible and update the `BASE_URL` in your wrangler.toml.

#### 3. Build the Application

```bash
npm run build
```

This command builds the application with the Cloudflare Pages preset.

#### 4. Deploy to Cloudflare

```bash
npm run deploy
```

This runs `wrangler pages deploy dist` to deploy your built application.

#### 5. Alternative: Automatic Deployment

You can also connect your GitHub repository to Cloudflare Pages for automatic deployments:

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your Git repository
3. Set build command: `npm run build`
4. Set build output directory: `dist`
5. Add environment variables in the Cloudflare dashboard

### Environment Variables for Production

In your Cloudflare Pages dashboard, add these environment variables:

- `BASE_URL` - Your production PocketBase URL
- Any other environment variables your application needs

## Development

### Project Structure

```
openstock/
├── app/
│   ├── components/          # Vue components
│   ├── composables/         # Vue composables
│   ├── layouts/            # Nuxt layouts
│   ├── middleware/         # Route middleware
│   ├── pages/              # Application pages
│   ├── plugins/            # Nuxt plugins
│   └── stores/             # Pinia stores
├── database/
│   └── pocketbase.json     # Database schema
├── server/
│   ├── api/                # Server API routes
│   └── utils/              # Server utilities
└── public/                 # Static assets
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production (Cloudflare Pages)
npm run preview  # Preview production build locally
npm run deploy   # Deploy to Cloudflare Pages
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the problem

## Acknowledgments

- Built with [Nuxt 3](https://nuxt.com/)
- Backend powered by [PocketBase](https://pocketbase.io/)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
