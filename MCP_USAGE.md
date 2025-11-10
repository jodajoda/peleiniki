# MCP Usage Guide - Context7

This project uses **Context7 MCP** to enhance AI assistance with up-to-date documentation for all frameworks and libraries.

## What is Context7?

Context7 is a Model Context Protocol (MCP) server that provides:
- 📚 **Real-time documentation** from official sources
- 🎯 **Version-specific examples** matching your exact dependencies
- 🔄 **Always current** - not limited by AI training cutoff dates
- 🌐 **Framework-agnostic** - works with React, Vite, Tailwind, and 1000+ libraries

## Configuration

The project includes `.mcp.json` in the root directory:

```json
{
  "$schema": "https://schema.claudecode.com/mcp.json",
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"],
      "description": "Up-to-date documentation for React, Vite, Tailwind, and other frameworks"
    }
  }
}
```

This configuration is **checked into version control** so all team members benefit automatically.

## How to Use

### Basic Usage

Include "use context7" in your prompts when you need current documentation:

```
Use context7 to show me React 19 useActionState hook examples
```

### Project-Specific Examples

#### React 19 Features
```
Use context7 to explain React 19's new "use" hook and how I can implement it in Home.jsx
```

#### Vite 7 Configuration
```
Use context7 to show optimal Vite 7 build optimizations for React projects
```

#### Tailwind CSS 3.4
```
Use context7 to find Tailwind 3.4 container queries syntax for Portfolio.jsx responsive layouts
```

#### React Router 7
```
Use context7 to explain React Router 7 data loading patterns and how to implement them
```

#### Playwright Testing
```
Use context7 to show Playwright 1.56 best practices for testing React applications
```

#### EmailJS Integration
```
Use context7 to find EmailJS 4.4 error handling best practices for Contact.jsx
```

## Common Use Cases

### 1. Upgrading Dependencies

When updating package versions:

```bash
# Example: Upgrading React
npm install react@latest react-dom@latest

# Then ask Claude:
"Use context7 to explain breaking changes in React 19.2 and how to migrate from 19.1"
```

### 2. Debugging Framework Issues

When encountering framework-specific errors:

```
I'm getting a Vite build error with dynamic imports.
Use context7 to show current Vite 7 dynamic import syntax and common pitfalls.
```

### 3. Implementing New Features

When adding functionality:

```
I need to add skeleton loading states to LazyImage.jsx.
Use context7 to show modern React patterns for loading states with Suspense.
```

### 4. Performance Optimization

When optimizing code:

```
Use context7 to show React 19 performance optimization techniques for large image galleries
```

### 5. Testing Enhancements

When writing or updating tests:

```
Use context7 to show Playwright 1.56 accessibility testing API with React components
```

## Benefits for This Project

### Exact Version Matching

Our current tech stack:
- React 19.1
- Vite 7.1
- Tailwind CSS 3.4
- React Router 7.9
- Playwright 1.56
- EmailJS 4.4

Context7 fetches documentation **specific to these versions**, avoiding outdated advice.

### Framework Combinations

Context7 understands how frameworks interact:

```
Use context7 to show best practices for using Tailwind CSS with React 19 and Vite 7
```

### Real-World Examples

Get production-ready code examples:

```
Use context7 to show a complete example of React Router 7 with lazy loading and error boundaries
```

## Auto-Activation

Context7 **automatically activates** when Claude detects framework keywords in your prompts:

✅ Automatic activation triggers:
- "React hooks"
- "Vite config"
- "Tailwind utilities"
- "Playwright selectors"
- "React Router routes"

📝 No need to say "use context7" for basic queries - it's smart!

## API Key (Optional)

Basic usage requires **no API key**. For advanced features:

1. Sign up at [context7.com](https://context7.com)
2. Get your API key
3. Update `.mcp.json`:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": [
        "-y",
        "@upstash/context7-mcp@latest",
        "--api-key",
        "YOUR_API_KEY"
      ]
    }
  }
}
```

⚠️ **Never commit API keys!** Use environment variables instead:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"],
      "env": {
        "CONTEXT7_API_KEY": "${CONTEXT7_API_KEY}"
      }
    }
  }
}
```

Then set in your environment:
```bash
export CONTEXT7_API_KEY=your_key_here
```

## Troubleshooting

### Context7 Not Working?

1. **Restart Claude Code** after adding `.mcp.json`
2. **Check MCP status**: Look for Context7 in available tools
3. **Test with explicit invocation**: Use "use context7" in prompt
4. **Verify configuration**:
   ```bash
   cat .mcp.json
   ```

### Slow Response Times?

Context7 fetches live documentation, which can take a few seconds. This is normal for:
- First query after restart
- Obscure or rarely-used APIs
- Multiple framework queries at once

### Getting Generic Answers?

Be specific with versions:
```
❌ "How do I use React hooks?"
✅ "Use context7 for React 19.1 hooks best practices"
```

## Advanced Tips

### 1. Combine Multiple Frameworks

```
Use context7 to show how to integrate Tailwind CSS animations with React 19 transitions
```

### 2. Ask About Patterns

```
Use context7 to explain React 19 recommended patterns for authentication in portfolio sites
```

### 3. Compare Approaches

```
Use context7 to compare React Router 7 route-based code splitting vs manual React.lazy
```

### 4. Migration Guides

```
Use context7 to create a migration guide from GitHub Pages to Firebase Hosting
```

## Resources

- 📖 [Context7 Documentation](https://github.com/upstash/context7)
- 🌐 [MCP Protocol](https://modelcontextprotocol.io/)
- 🎯 [Claude Code MCP Guide](https://docs.claude.com/en/docs/claude-code/mcp)
- 💬 [Context7 GitHub Issues](https://github.com/upstash/context7/issues)

## Support

If Context7 isn't working as expected:

1. Check [GitHub Issues](https://github.com/upstash/context7/issues)
2. Review [Claude Code MCP docs](https://docs.claude.com/en/docs/claude-code/mcp)
3. Verify `.mcp.json` syntax is valid JSON
4. Restart Claude Code after configuration changes

---

**Happy coding with enhanced documentation! 🚀**
