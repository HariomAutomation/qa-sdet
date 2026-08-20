# 📊 Data Processor CLI

Production-ready Node.js CLI tool for processing, transforming, and validating CSV/JSON datasets with custom errors, async streams, and unit tests.

## 🚀 Usage

```bash
# Filter and aggregate
node bin/cli.js sample.csv --filter dept=QA --aggregate salary:avg

# Export to JSON
node bin/cli.js sample.csv --filter dept=QA -o output.json

# Group by field
node bin/cli.js sample.csv --group-by city
```

## 🧪 Testing

```bash
npm test
```
