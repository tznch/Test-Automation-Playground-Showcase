# Test Automation Playground

A comprehensive test automation suite for testing multiple automation playground websites using Playwright and TypeScript.

## 🎯 Target Websites

This test suite automates testing of:
- **[Test Automation Playground](https://play1.automationcamp.ir/)** - Various UI elements and interactions for test automation practice
- **[QA Playground](https://qaplayground.dev/)** - Mini web apps designed for QA engineers to practice automation skills

## 🚀 Features

- **Multi-browser Testing**: Chrome, Firefox, Safari, and mobile browsers
- **Comprehensive Test Coverage**: All major test scenarios from the playground
- **Modern Testing Framework**: Using Playwright with TypeScript support
- **Visual Testing**: Screenshots and videos on failure
- **Detailed Reporting**: HTML reports with artifacts
- **Test Helpers**: Reusable utility functions for common operations

## 📁 Test Structure

```
tests/
├── utils/               # Test helpers and utilities
├── optimized/           # Optimized tests for play1.automationcamp.ir
├── dynamic-table.spec.ts     # QA Playground: Dynamic table tests
├── verify-account.spec.ts    # QA Playground: Account verification tests
├── tags-input.spec.ts        # QA Playground: Tags input tests
├── new-tab.spec.ts           # QA Playground: New tab handling tests
├── sortable-list.spec.ts     # QA Playground: Drag & drop tests
├── popup.spec.ts             # QA Playground: Pop-up window tests
└── multi-level-dropdown.spec.ts # QA Playground: Dropdown navigation tests
```

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Interactive Mode
```bash
npm run test:ui
```

### Run Tests with Browser UI
```bash
npm run test:headed
```

### Debug Tests
```bash
npm run test:debug
```

### View Test Reports
```bash
npm run test:report
```

### Run Specific Test Categories

#### Test Automation Playground (play1.automationcamp.ir)
```bash
# Wait conditions tests
npm run test:wait

# Keyboard actions tests
npm run test:keyboard

# Mouse actions tests
npm run test:mouse

# Popup windows tests
npm run test:popup

# Frames tests
npm run test:frames

# Forms tests
npm run test:forms

# Login tests
npm run test:login

# Advanced UI tests
npm run test:advanced
```

#### QA Playground (qaplayground.dev)
```bash
# Run all QA Playground tests
npm run test:qa

# Run specific app tests
npm run test:qa-dynamic      # Dynamic Table
npm run test:qa-verify       # Account Verification
npm run test:qa-tags         # Tags Input
npm run test:qa-tab          # New Tab
npm run test:qa-sortable     # Sortable List
npm run test:qa-popup        # Pop-up Window
npm run test:qa-dropdown     # Multi-level Dropdown
```

#### Device-Specific Testing (Chrome Only)
```bash
# Run on desktop Chrome only
npm run test:chrome

# Run on mobile Chrome only
npm run test:mobile

# Run on tablet Chrome only
npm run test:tablet

# Run on all device configurations
npm run test:all-devices
```

## 📊 Test Categories

### 1. Home Page Tests
- Validates main heading and navigation
- Checks availability of all test pages
- Verifies external links

### 2. Wait Conditions Tests
- Alert and prompt handling
- Element visibility/invisibility
- Element enable/disable states
- Page title changes
- Text value changes
- Attribute value changes

### 3. Mouse Actions Tests
- Single click, double click, right-click
- Mouse hover interactions
- Drag and drop operations
- Coordinate tracking

### 4. Form Interactions Tests
- Text inputs and textareas
- Checkboxes and radio buttons
- Dropdown selects and multi-selects
- File uploads (single and multiple)
- Form validation
- Disabled and read-only fields
- Non-Unicode text handling

### 5. QA Playground Tests (qaplayground.dev)
- **Dynamic Table**: Find Spider-Man in dynamically changing data
- **Account Verification**: Test code entry and validation workflows
- **Tags Input**: Add/remove tags and verify counts
- **New Tab**: Handle cross-tab navigation and content verification
- **Sortable List**: Test drag and drop reordering functionality
- **Pop-up Windows**: Handle new windows and modal dialogs
- **Multi-level Dropdown**: Navigate nested menu structures

### 6. More Test Categories (play1.automationcamp.ir)
- **Keyboard Actions**: Special keys, key combinations
- **Popup Windows**: Window switching, multiple tabs
- **Frames**: Frame navigation and interaction
- **Login**: Authentication scenarios
- **Advanced UI**: Complex and challenging scenarios

## 🎯 Test Scenarios Covered

### Basic Interactions
- ✅ Click actions (single, double, right-click)
- ✅ Form fills and submissions
- ✅ Dropdown selections
- ✅ Checkbox and radio button interactions
- ✅ File uploads

### Advanced Scenarios
- ✅ Wait conditions and timeouts
- ✅ Alert and prompt handling
- ✅ Mouse hover and drag-drop
- ✅ Frame switching
- ✅ Window/tab management
- ✅ Form validation

### Edge Cases
- ✅ Disabled elements
- ✅ Hidden elements
- ✅ Dynamic content loading
- ✅ Non-Unicode text
- ✅ Error handling

## 📱 Cross-Device Testing

The test suite runs across multiple devices using Chrome:
- **Desktop**: Chrome (1280x720)
- **Mobile**: Chrome Mobile (Pixel 5 - 393x851)
- **Tablet**: Chrome Tablet (iPad Pro - 1024x1366)

## 🔧 Configuration

### Playwright Config
- **Chrome-only testing** for consistency
- Multiple device configurations (desktop, mobile, tablet)
- Headless mode by default
- Video recording on failure
- Screenshots on failure
- Parallel execution
- Retry on failure
- Detailed HTML reporting

### Test Helpers
The `TestHelpers` class provides reusable methods for:
- Navigation
- Element interaction
- Waiting strategies
- Alert handling
- Frame switching
- Screenshot capture

## 📈 Reports

After running tests:
1. Run `npm run test:report` to view HTML reports
2. Check `test-results/` directory for artifacts
3. Screenshots and videos saved on test failures

## 🤝 Contributing

1. Add new tests in appropriate directories
2. Use `TestHelpers` for common operations
3. Follow existing test naming conventions
4. Include assertions for both positive and negative cases
5. Add comments for complex test scenarios

## 📝 Best Practices

- Use descriptive test names
- Include proper waits for dynamic content
- Test both positive and negative scenarios
- Use locators that are resilient to changes
- Take screenshots for debugging
- Group related tests in `describe` blocks

## 🐛 Debugging

- Use `npm run test:debug` for step-by-step execution
- Check HTML reports for detailed failure information
- Review screenshots and videos for visual issues
- Use browser dev tools in headed mode

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Test Automation Playground](https://play1.automationcamp.ir/)
- [Best Practices for Test Automation](https://playwright.dev/docs/best-practices)

---

**Happy Testing! 🎉**