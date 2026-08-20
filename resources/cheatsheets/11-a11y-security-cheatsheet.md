# 📋 Accessibility & Security Testing — Quick Cheatsheet

## Accessibility (`@axe-core/playwright`)
```typescript
import AxeBuilder from "@axe-core/playwright";

const results = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa"])
  .analyze();

expect(results.violations).toEqual([]);
```

## Security (OWASP Top 10)
- **Injection**: Fuzz inputs with `' OR '1'='1` and `<script>alert(1)</script>`
- **Broken Auth**: Test expired tokens, missing Bearer header, privilege escalation
- **Security Headers**: Verify `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Content-Security-Policy`
