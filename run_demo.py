#!/usr/bin/env python3
"""
AegisNet Demo Script
Run the full 7-step analysis pipeline on sample scam messages.
"""

import requests
import json
from datetime import datetime

# API base URL
BASE_URL = "http://localhost:8000"

def print_header(text):
    """Print formatted header."""
    print("\n" + "="*80)
    print(f"  {text}")
    print("="*80 + "\n")

def print_section(title, content):
    """Print formatted section."""
    print(f"\n--- {title} ---")
    print(content)

def check_health():
    """Check if API is healthy."""
    print_header("Checking AegisNet API Health")
    
    response = requests.get(f"{BASE_URL}/health")
    data = response.json()
    
    print(f"✅ Status: {data['status']}")
    print(f"✅ Service: {data['service']}")
    print(f"✅ Version: {data['version']}")
    print(f"✅ Demo Mode: {data['demo_mode']}")
    print(f"✅ TraceX Enabled: {data['tracex_enabled']}")
    
    return response.status_code == 200

def run_sample_demo():
    """Run the pre-configured sample demo."""
    print_header("Running Sample Scam Message Analysis")
    
    response = requests.post(f"{BASE_URL}/demo/sample")
    data = response.json()
    
    # Display message
    print_section("📧 INPUT MESSAGE", data['message']['content'][:200] + "...")
    
    # Display signals
    print_section("🔍 STEP 2: SIGNALS EXTRACTED", 
                  f"Found {len(data['signals'])} scam signals:")
    for i, signal in enumerate(data['signals'][:5], 1):
        print(f"  {i}. {signal['signal_type'].upper()} "
              f"(confidence: {signal['confidence_score']:.2f})")
    
    # Display evidence
    print_section("🔗 STEP 3: EVIDENCE CORRELATION (TraceX)", 
                  f"Generated {len(data['evidence'])} evidence points")
    
    # Display campaigns
    print_section("🎯 STEP 4: CAMPAIGN RECONSTRUCTION (TraceX)", 
                  f"Identified {len(data['campaigns'])} potential campaign(s):")
    for i, campaign in enumerate(data['campaigns'], 1):
        print(f"  {i}. {campaign['campaign_type']} "
              f"(confidence: {campaign['confidence_score']:.2f})")
    
    # Display counter-evidence
    print_section("⚖️ STEP 5: COUNTER-EVIDENCE CHECK (TraceX)", 
                  f"Found {len(data.get('evidence', []))} counter-evidence points")
    
    # Display verification results
    print_section("✓ STEP 6: CLAIM VERIFICATION", 
                  f"Verified {len(data['verification_results'])} claims")
    
    # Display Human Review Brief
    brief = data['human_review_brief']
    print_section("📋 STEP 7: HUMAN REVIEW BRIEF", 
                  f"\n{brief['executive_summary']}\n")
    
    print("Key Findings:")
    print(f"  • Confidence Assessment: {brief['confidence_assessment']['overall']:.2f}")
    print(f"  • Signal Confidence: {brief['confidence_assessment']['signals']:.2f}")
    print(f"  • Evidence Confidence: {brief['confidence_assessment']['evidence']:.2f}")
    
    print("\n⚠️  LIMITATIONS:")
    for line in brief['limitations_section'].split('\n')[:3]:
        if line.strip():
            print(f"  {line.strip()}")
    
    print("\n📊 Recommended Actions:")
    for i, action in enumerate(brief['recommended_actions'][:3], 1):
        print(f"  {i}. {action}")
    
    print(f"\n⏱️  Processing Time: {data['processing_time_ms']:.2f}ms")
    
    return data

def run_custom_message():
    """Run analysis on a custom message."""
    print_header("Running Custom Message Analysis")
    
    custom_message = {
        "message": {
            "content": "CONGRATULATIONS! You've won $1,000,000! "
                      "Click here immediately to claim your prize before it expires. "
                      "Limited time only! Act now or lose this incredible opportunity forever!",
            "sender_info": {"email": "winner@lottery-prize.com", "name": "Prize Committee"},
            "receiver_info": {"email": "user@example.com"},
            "channel_type": "email",
            "metadata": {"subject": "YOU'RE A WINNER!!!"}
        },
        "include_synthetic_context": True
    }
    
    print_section("📧 ANALYZING CUSTOM MESSAGE", custom_message['message']['content'])
    
    response = requests.post(f"{BASE_URL}/demo/ingest", json=custom_message)
    data = response.json()
    
    print(f"\n✅ Analysis Complete!")
    print(f"  • {len(data['signals'])} signals detected")
    print(f"  • {len(data['evidence'])} evidence points")
    print(f"  • {len(data['campaigns'])} campaign(s) identified")
    
    brief = data['human_review_brief']
    print(f"\n📋 {brief['executive_summary']}")
    
    return data

def list_scenarios():
    """List available synthetic scenarios."""
    print_header("Available Synthetic Scenarios")
    
    response = requests.get(f"{BASE_URL}/demo/scenarios")
    data = response.json()
    
    print("Synthetic scam scenarios available for testing:\n")
    for i, scenario in enumerate(data['scenarios'], 1):
        print(f"  {i}. {scenario['name']}")
        print(f"     Type: {scenario['type']}")
        print(f"     ID: {scenario['id']}\n")

def main():
    """Main demo function."""
    print("\n" + "🛡️ "*20)
    print("    AegisNet - Evidence-Grounded AI for Scam Network Intelligence")
    print("    Connect the signals. Verify the story. Protect the next victim.")
    print("🛡️ "*20)
    
    try:
        # Check health
        if not check_health():
            print("❌ API is not healthy. Please check if the server is running.")
            return
        
        # List scenarios
        list_scenarios()
        
        # Run sample demo
        run_sample_demo()
        
        # Run custom message
        input("\n\nPress Enter to analyze a custom message...")
        run_custom_message()
        
        print_header("Demo Complete!")
        print("✅ All 7 steps of the AegisNet pipeline executed successfully!")
        print("\n📚 For more information:")
        print("   • API Docs: http://localhost:8000/docs")
        print("   • Health Check: http://localhost:8000/health")
        print("   • README: /Users/antonyjenish/Documents/jen_projects/aegisnet/README.md")
        
        print("\n⚠️  Remember: AegisNet is an assistive intelligence system.")
        print("   It provides evidence-based analysis for human review.")
        print("   It NEVER determines guilt, freezes accounts, or performs enforcement actions.")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Cannot connect to AegisNet API")
        print("   Please ensure the backend server is running:")
        print("   cd /Users/antonyjenish/Documents/jen_projects/aegisnet/backend")
        print("   source venv/bin/activate")
        print("   uvicorn main:app --reload --host 0.0.0.0 --port 8000")
    except Exception as e:
        print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    main()
