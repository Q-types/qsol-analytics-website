# Customer Intelligence Playbook

## Classification
`customer_intelligence`

## When to Use
- Marketing treats all customers the same
- Sales doesn't know who to prioritize
- High-value dormant accounts hidden in the data
- Churn happening without early warning
- Customer understanding based on anecdote not data
- Retention opportunities being missed

## When NOT to Use
- Fewer than 100 customers or transactions
- No transaction history or engagement data
- When simple Pareto analysis (top 20%) would suffice
- B2B with very few high-touch accounts (relationship-based)

## Data Needed
- Customer transaction history (orders, purchases, values)
- Customer identifiers that link across transactions
- Timestamps for recency calculations
- Engagement data if available (logins, interactions)
- Business definition of "high value"

## Simple First Implementation
1. **Build RFM features**: Recency, Frequency, Monetary value
2. **Calculate CLV proxies**: Simple historical value or predictive
3. **Segment customers**: K-means or rule-based tiers
4. **Identify actionable groups**:
   - High value, active → protect
   - High value, dormant → reactivate
   - Low value, high potential → grow
   - At-risk → intervene
5. **Create output lists**: Prioritized accounts for sales/marketing

### Key Metrics
- **Recency**: Days since last purchase
- **Frequency**: Number of orders in period
- **Monetary**: Total or average spend
- **CLV**: Lifetime value (historical or predicted)

### Recommended Tools
- Python (pandas, scikit-learn)
- PostgreSQL for data storage
- Dashboard for visualization
- CRM integration for action

## Advanced Implementation
- Predictive churn models
- Propensity scoring (likelihood to buy product X)
- Lookalike modeling for acquisition
- Real-time scoring integrated into CRM
- A/B testing of segment-specific interventions

## Risks and Mitigations
| Risk | Mitigation |
|------|------------|
| Segments don't align with business reality | Validate with sales/marketing before deploying |
| Static segments become stale | Schedule regular refresh (monthly/quarterly) |
| Over-segmentation creates noise | Start with 4-6 segments maximum |
| Action gap (insights without follow-through) | Build action lists, not just dashboards |

## QSol Examples
- Wholesale distribution: Account prioritization for sales team
- E-commerce: Customer retention and reactivation campaigns
- B2B services: Churn risk identification

## Typical Timeline
4-8 weeks depending on data complexity

## First Step
"Export your customer transaction history and let's identify your most actionable customer segments."
