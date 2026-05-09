# Spreadsheet-to-System Playbook

## Classification
`spreadsheet_to_system`

## When to Use
- Critical business logic lives in one person's spreadsheet
- Spreadsheet is acting as database, calculator, and workflow combined
- Version control problems ("which file is current?")
- Formula errors causing costly mistakes
- Spreadsheet too slow or crashes with data volume
- Onboarding new staff to the spreadsheet is painful

## When NOT to Use
- Spreadsheet is genuinely simple and works fine
- Problem is really about training, not the tool
- Requirements change so frequently a system would be obsolete quickly
- When off-the-shelf software already solves the problem

## Data Needed
- The spreadsheet(s) in question
- Written or verbal explanation of how it works
- Examples of inputs and expected outputs
- Business rules that aren't obvious from formulas
- Edge cases and exceptions
- Who uses it and how often

## Simple First Implementation
1. **Audit the spreadsheet**: Map every input, calculation, output
2. **Extract business rules**: Document logic separate from implementation
3. **Design data model**: Normalize into proper tables
4. **Build calculation engine**: Replicate logic with tests
5. **Create simple UI**: Input form → calculation → output display
6. **Validate against spreadsheet**: Run parallel until confident

### Recommended Tools
- TypeScript/Python for calculation logic
- PostgreSQL/Supabase for data storage
- React/Astro for user interface
- Zod for input validation

## Advanced Implementation
- Multi-user access with role-based permissions
- Audit trail of all calculations
- Version history and rollback
- API access for integration with other systems
- Approval workflows for sensitive outputs

## Risks and Mitigations
| Risk | Mitigation |
|------|------------|
| Hidden logic not captured | Multiple review sessions with spreadsheet owner |
| Edge cases missed | Build comprehensive test suite from real examples |
| User resistance to change | Parallel running period, gradual transition |
| Scope creep ("while you're at it...") | Strict MVP scope, documented backlog |

## QSol Examples
- Manufacturing estimator: Quote spreadsheet → web-based estimating tool
- Service business: Pricing calculator → rule-based quoting system
- Operations: Resource allocation spreadsheet → scheduling tool

## Typical Timeline
3-8 weeks depending on complexity

## First Step
"Share the spreadsheet and walk us through one typical use case from start to finish."
