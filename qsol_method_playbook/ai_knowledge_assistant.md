# AI Knowledge Assistant Playbook

## Classification
`ai_knowledge_assistant`

## When to Use
- Staff repeatedly searching for same information
- Knowledge trapped in documents, SOPs, manuals
- Onboarding takes too long because documentation is scattered
- "Ask Sarah, she knows where to find it"
- Generic AI tools hallucinate or give wrong answers
- Need grounded, source-cited responses

## When NOT to Use
- Documents are already well-organized and searchable
- Information changes daily (high maintenance burden)
- Regulatory requirements prohibit AI use
- Content is primarily numerical/tabular (use database instead)
- Very small document set (just use search)

## Data Needed
- Document corpus (PDFs, Word docs, SOPs, manuals)
- Clear scope of what's in vs out
- Examples of questions users ask
- Rules about what can/cannot be disclosed
- Human escalation criteria

## Simple First Implementation
1. **Curate document set**: Clean, relevant, approved content
2. **Chunk documents**: Split into retrievable pieces (500-1000 tokens)
3. **Generate embeddings**: Convert chunks to vectors
4. **Build retrieval index**: Store in vector database
5. **Create QA interface**: Question → retrieve → generate answer
6. **Add citations**: Always show source documents

### Architecture
```
User Question
    ↓
Embedding Model (text → vector)
    ↓
Vector Search (find similar chunks)
    ↓
Retrieved Context (top 3-5 chunks)
    ↓
LLM (generate answer with context)
    ↓
Answer + Source Citations
```

### Recommended Tools
- OpenAI embeddings or open-source alternatives
- Pinecone, Qdrant, or pgvector for vector storage
- GPT-4 or Claude for generation
- Simple web UI for queries

## Advanced Implementation
- Hybrid search (semantic + keyword)
- Reranking for better relevance
- Multi-turn conversation with context
- Document update pipeline (auto-reindex)
- Usage analytics and feedback loops
- Role-based access to different document sets

## Risks and Mitigations
| Risk | Mitigation |
|------|------------|
| Hallucination (making things up) | Always ground in retrieved docs, show sources |
| Outdated information | Document versioning, clear update process |
| Confidential info leakage | Strict document scoping, access controls |
| Over-reliance on AI | Clear "escalate to human" pathways |
| Poor retrieval quality | Test with real questions, tune chunking |

## QSol Examples
- Manufacturing: SOP search and procedure guidance
- Professional services: Policy and template retrieval
- Education: Lesson planning assistant grounded in curriculum

## Typical Timeline
3-6 weeks for scoped internal assistant

## First Step
"Share a sample of your most-queried documents and the top 10 questions staff ask about them."
