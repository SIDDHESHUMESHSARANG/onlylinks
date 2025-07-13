[← Prev: Technical Overview](../documentation/technical-overview.md) | [Next: README →](../README.md)

# Contributing to OnlyLinks

Thank you for your interest in contributing to OnlyLinks! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- pnpm (for frontend dependencies)
- pip (for backend dependencies)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/onlyLinks.git
   cd onlyLinks
   ```

2. **Frontend Setup**
   ```bash
   cd source-code/frontend
   pnpm install
   ```

3. **Backend Setup**
   ```bash
   cd source-code/backend
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   - Create `.env` file in `source-code/frontend/`:
     ```
     VITE_BACKEND_URL=http://127.0.0.1:8000
     ```
   - Create `.env` file in `source-code/backend/`:
     ```
     FRONTEND_URL=http://localhost:5173
     ```

5. **Running the Application**
   ```bash
   # Terminal 1 - Backend
   cd source-code/backend
   uvicorn server:app --reload

   # Terminal 2 - Frontend
   cd source-code/frontend
   pnpm dev
   ```

## 🛠️ Development Guidelines

### Code Style
- **Frontend**: Follow ESLint configuration
- **Backend**: Follow PEP 8 Python style guide
- Use meaningful commit messages
- Write clear, descriptive comments

### Project Structure
```
onlyLinks/
├── source-code/
│   ├── frontend/          # React + Vite application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── ...
│   │   └── ...
│   └── backend/           # FastAPI + yt-dlp server
│       ├── server.py
│       └── ...
├── documentation/         # Project documentation
├── contributions/         # Contribution guidelines
└── ...
```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code patterns
   - Add tests if applicable
   - Update documentation if needed

3. **Test your changes**
   - Ensure frontend builds without errors
   - Test backend endpoints
   - Verify download functionality works

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🐛 Bug Reports

When reporting bugs, please include:
- **Description**: Clear explanation of the issue
- **Steps to reproduce**: Detailed steps to recreate the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, browser, Node.js/Python versions
- **Screenshots**: If applicable

## 💡 Feature Requests

When suggesting features:
- **Description**: Clear explanation of the feature
- **Use case**: Why this feature would be useful
- **Implementation ideas**: If you have any suggestions
- **Mockups**: If applicable

## 📝 Pull Request Guidelines

### Before submitting a PR:
- [ ] Code follows project style guidelines
- [ ] All tests pass (if applicable)
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Feature works as expected

### PR Template:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested locally
- [ ] All existing functionality works
- [ ] New functionality tested

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have made corresponding changes to documentation
```

## 🏷️ Commit Message Convention

Use conventional commit messages:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add download progress indicator
fix: resolve filename extraction issue
docs: update API documentation
```

## 🤝 Code Review Process

1. **Review**: All PRs require at least one review
2. **CI/CD**: Automated checks must pass
3. **Testing**: Manual testing may be required
4. **Approval**: Maintainer approval required for merge

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: Contact maintainers directly for urgent issues

## 🎉 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributor hall of fame

Thank you for contributing to OnlyLinks! 🚀

[← Prev: Technical Overview](../documentation/technical-overview.md) | [Next: README →](../README.md)
