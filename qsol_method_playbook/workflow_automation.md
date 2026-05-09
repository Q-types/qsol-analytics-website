# Workflow Automation Playbook

## Classification
`workflow_automation`

## When to Use
- Repetitive admin tasks consuming skilled staff time
- Manual file handling, renaming, moving
- Data entry from forms or emails
- Copy-paste between systems
- Approval workflows done via email threads
- Scheduled tasks run manually

## When NOT to Use
- Tasks requiring significant human judgment
- Highly variable processes with many exceptions
- Processes that change frequently
- When the cost of automation exceeds manual effort
- Security-sensitive workflows needing human verification

## Data Needed
- Step-by-step process documentation
- Sample inputs and outputs
- Exception handling rules
- Trigger conditions (when does workflow start)
- Integration requirements (systems involved)
- Current time spent on task

## Simple First Implementation
1. **Document current process**: Every click, decision, handoff
2. **Identify automation candidates**: Repetitive, rule-based steps
3. **Define triggers**: What starts the workflow
4. **Build automation script**: Python, n8n, or similar
5. **Add error handling**: What happens when things fail
6. **Test with real examples**: Validate against manual process
7. **Deploy with monitoring**: Log execution, alert on errors

### Common Automation Patterns
- **File processing**: Watch folder → process → archive
- **Email handling**: Receive → parse → route → respond
- **Data sync**: System A → transform → System B
- **Scheduled jobs**: Time trigger → execute → report
- **Approval chains**: Request → notify → approve → execute

### Recommended Tools
- Python for custom scripts
- n8n or Make for visual workflows
- Supabase Edge Functions for event-driven
- Cron for scheduling

## Advanced Implementation
- Human-in-the-loop for edge cases
- Parallel processing for scale
- State machines for complex workflows
- Retry logic and dead-letter queues
- Audit trails and compliance logging
- Self-healing (detect and fix common errors)

## Risks and Mitigations
| Risk | Mitigation |
|------|------------|
| Silent failures go unnoticed | Comprehensive logging, alerts on failure |
| Automation breaks on edge cases | Build exception handling, human fallback |
| Staff lose understanding of process | Document automation logic, training |
| Cascading errors amplify problems | Add validation checkpoints, rollback capability |

## QSol Examples
- Operations: Automatic invoice processing from email
- HR: Onboarding checklist automation
- Finance: Reconciliation workflows

## Typical Timeline
2-6 weeks depending on complexity

## First Step
"Walk us through one repetitive task step-by-step, and we'll identify the automation opportunity."
