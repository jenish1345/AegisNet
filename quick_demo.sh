#!/bin/bash
# Quick AegisNet Demo Script

echo "🛡️  AegisNet - Evidence-Grounded AI for Scam Network Intelligence"
echo "=========================================================================="
echo ""

echo "✅ Checking Health..."
curl -s http://localhost:8000/health | python3 -m json.tool
echo ""
echo ""

echo "📧 Running Sample Phishing Message Analysis..."
echo "=========================================================================="
curl -s -X POST http://localhost:8000/demo/sample | python3 -c "
import sys, json
data = json.load(sys.stdin)

print(f\"\\n📨 Message Content:\")
print(f\"  {data['message']['content'][:100]}...\")

print(f\"\\n🔍 Signals Extracted: {len(data['signals'])}\")
for sig in data['signals'][:3]:
    print(f\"  • {sig['signal_type']}: {sig['confidence_score']:.2f} confidence\")

print(f\"\\n🔗 Evidence Correlated: {len(data['evidence'])}\")
print(f\"🎯 Campaigns Identified: {len(data['campaigns'])}\")
print(f\"⚖️  Counter-Evidence Points: {len(data['evidence'])}\")
print(f\"✓ Claims Verified: {len(data['verification_results'])}\")

print(f\"\\n📋 Human Review Brief:\")
print(f\"  {data['human_review_brief']['executive_summary']}\")

print(f\"\\n⏱️  Processing Time: {data['processing_time_ms']:.2f}ms\")
print(f\"\\n✅ All 7 steps completed successfully!\")
"

echo ""
echo "=========================================================================="
echo "🎉 Demo Complete!"
echo ""
echo "📚 Available Endpoints:"
echo "  • Health Check: http://localhost:8000/health"
echo "  • API Docs: http://localhost:8000/docs"
echo "  • Sample Demo: POST http://localhost:8000/demo/sample"
echo "  • Custom Ingest: POST http://localhost:8000/demo/ingest"
echo ""
echo "⚠️  Remember: AegisNet provides analysis, not enforcement."
echo "=========================================================================="
