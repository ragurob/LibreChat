
# LibreChat Setup Guide for Replit

## Quick Start

1. **Fork this Repl** to your account
2. **Set up MongoDB Atlas** (free tier available)
3. **Add your MongoDB connection string** to Secrets
4. **Add AI provider API keys**
5. **Run the application**

## Required Setup Steps

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Replace `<password>` with your actual password

### 2. Required Secrets in Replit

Go to the "Secrets" tab in your Repl and add these environment variables:

#### Essential Secrets:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/librechat
JWT_SECRET=your-long-random-secret-key-here
JWT_REFRESH_SECRET=your-other-long-random-secret-key-here
```

#### AI Provider API Keys (add the ones you want to use):
```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_KEY=AIza...
```

### 3. Building the Frontend

The frontend needs to be built before the app can serve it. Run these commands in the Shell:

```bash
cd client
npm install
npm run build
cd ..
```

### 4. Starting the Application

Click the **Run** button or use:
```bash
npm start
```

## Available Features

### ✅ Working Features:
- Basic chat interface
- Multiple AI providers (OpenAI, Anthropic, Google)
- User authentication and registration
- Conversation history
- Message editing and regeneration
- Dark/light theme

### ⏸️ Limited Features:
- File uploads (local storage only)
- Search (disabled)
- Advanced plugins

### ❌ Not Available:
- Docker-based services
- MeiliSearch
- RAG (Retrieval Augmented Generation)
- Redis caching (uses in-memory instead)

## Troubleshooting

### App Won't Start
1. Check that `MONGO_URI` is set correctly in Secrets
2. Ensure the database user has proper permissions
3. Build the frontend: `cd client && npm run build`

### Database Connection Issues
1. Verify your MongoDB Atlas cluster is running
2. Check that your IP is whitelisted (use 0.0.0.0/0 for any IP)
3. Ensure the database user exists and has the correct password

### API Key Issues
1. Verify API keys are valid and have credits
2. Check the exact format required by each provider
3. Make sure keys are added to Replit Secrets, not the .env file

## Configuration

### Environment Variables

The app automatically configures itself for Replit, but you can override these in Secrets:

```
HOST=0.0.0.0
PORT=5000
NODE_ENV=production
DOMAIN_CLIENT=https://your-repl-name.your-username.repl.co
DOMAIN_SERVER=https://your-repl-name.your-username.repl.co
```

### Adding More AI Providers

To enable additional providers, add their API keys to Secrets and they'll appear automatically in the interface.

## Performance Tips

1. **Keep the Repl active** - Free Repls go to sleep after inactivity
2. **Use Replit's "Always On"** feature for 24/7 availability (paid feature)
3. **Monitor usage** - Some AI APIs have usage limits

## Security Notes

- Never commit API keys to your code
- Always use Replit's Secrets feature for sensitive data
- The MongoDB connection should use a dedicated database user
- Consider enabling IP whitelisting in MongoDB Atlas for production use

## Getting Help

If you encounter issues:

1. Check the Console tab for error messages
2. Verify all required secrets are set
3. Ensure your MongoDB cluster is accessible
4. Try restarting the Repl

## Limitations

This is a simplified version optimized for Replit. Some advanced features available in the full Docker deployment are not available in this environment due to Replit's constraints.
