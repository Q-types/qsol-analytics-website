# Reporting Automation Playbook

## Classification
`reporting_automation`

## When to Use
- Recurring reports created manually every week/month
- Data pulled from multiple spreadsheets or systems
- Manual copy-paste between tools
- Reports that take hours to compile
- Dashboard feeds that require manual updates
- KPI summaries assembled by hand

## When NOT to Use
- One-off analysis (use ad-hoc analysis instead)
- Reports requiring significant human judgment each time
- When data sources don't exist or are too fragmented
- When the reporting need is likely to change significantly soon

## Data Needed
- Sample current reports (Excel, PDF, etc.)
- Source files or system exports
- Business rules for calculations
- KPI definitions
- Update frequency requirements
- Distribution list and format preferences

## Simple First Implementation
1. **Map current workflow**: Document what happens today
2. **Identify data sources**: List all inputs and their formats
3. **Define output template**: Agree on final report structure
4. **Build extraction scripts**: Automate data pulling
5. **Create transformation pipeline**: Clean, merge, calculate
6. **Schedule and deliver**: Automate timing and distribution

### Recommended Tools
- Python (pandas, openpyxl) for data processing
- Supabase or PostgreSQL for data storage
- Cron or workflow scheduler for timing
- Email/Slack for distribution

## Advanced Implementation
- Real-time dashboards with live data feeds
- Exception-based alerting (only report when thresholds breached)
- Self-service report builders for end users
- Version control for report definitions
- Audit trails for compliance

## Risks and Mitigations
| Risk | Mitigation |
|------|------------|
| Source data format changes | Build validation checks, alert on schema changes |
| Missing data not detected | Add completeness checks before report generation |
| Report logic errors compound | Include spot-check samples, human review cadence |
| Over-automation removes context | Keep summary narratives, don't automate interpretation |

## QSol Examples
- Acoustic consultancy: Weekly site visit reports automated from field data
- Manufacturing: Monthly KPI dashboards from ERP exports
- Distribution: Daily delivery performance from multiple carrier feeds

## Typical Timeline
2-4 weeks for focused reporting automation projects

## First Step
"Send us one example of the report you create most often, and we'll map the automation opportunity."
