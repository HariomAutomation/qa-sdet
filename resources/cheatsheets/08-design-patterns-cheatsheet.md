# 📋 Design Patterns in Automation — Quick Cheatsheet

## Creational Patterns
- **Factory**: Object creation encapsulate karo (`BrowserFactory.create("chromium")`)
- **Builder**: Fluent step-by-step test data construction (`new UserBuilder().asAdmin().build()`)
- **Singleton**: Single shared instance (`ConfigManager.getInstance()`)

## Structural Patterns
- **Page Object Model (POM)**: Web pages ko classes mein model karo
- **Decorator**: Methods ko wrap karke additional behavior inject karo (`@Step`, `@Retry`)
- **Facade**: Complex multi-step business journeys ko simple high-level API mein wrap karo

## Behavioral Patterns
- **Strategy**: Pluggable algorithm/reporter interchangeable banaye (`SlackReporter` vs `EmailReporter`)
- **Observer**: Event subscription & lifecycle broadcast (`beforeTest`, `afterTest`)
