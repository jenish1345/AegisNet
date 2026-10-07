"""Configuration for AegisNet backend."""

import os
from typing import Dict, Any
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    
    # API settings
    api_title: str = "AegisNet API"
    api_description: str = "Evidence-Grounded AI for Scam Network Intelligence"
    api_version: str = "0.1.0"
    
    # Server settings
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = True
    
    # Database settings (for demo, using SQLite)
    database_url: str = "sqlite:///./aegisnet.db"
    
    # NLP model settings
    spacy_model: str = "en_core_web_sm"
    sentence_transformer_model: str = "all-MiniLM-L6-v2"
    
    # TraceX settings (mock for now)
    tracex_enabled: bool = True
    tracex_similarity_threshold: float = 0.7
    tracex_clustering_epsilon: float = 0.5
    tracex_min_samples: int = 2
    
    # Demo settings
    demo_mode: bool = True
    synthetic_data_path: str = "data/synthetic/"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()