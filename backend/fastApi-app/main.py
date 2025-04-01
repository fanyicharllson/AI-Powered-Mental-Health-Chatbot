from fastapi import FastAPI
from pydantic import BaseModel
from transformers import GPT2LMHeadModel, GPT2Tokenizer, DistilBertTokenizer, DistilBertForSequenceClassification
import torch

app = FastAPI()

# Load models and tokenizers
gpt2_model = GPT2LMHeadModel.from_pretrained('gpt2')
gpt2_tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
distilbert_model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased')
distilbert_tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')

# Set pad_token_id to eos_token_id for GPT-2
gpt2_model.config.pad_token_id = gpt2_model.config.eos_token_id

class TextGenerationRequest(BaseModel):
    prompt: str
    max_length: int = 100

@app.post("/generate")
async def generate_text(request: TextGenerationRequest):
    # Encode the input prompt
    input_ids = gpt2_tokenizer.encode(request.prompt, return_tensors='pt')
    
    # Create attention mask
    attention_mask = torch.ones(input_ids.shape, dtype=torch.long)

    # Generate text with temperature and top_k sampling
    output = gpt2_model.generate(
        input_ids,
        attention_mask=attention_mask,
        max_length=request.max_length,
        temperature=0.7,  # Adjust this value
        top_k=50,         # Adjust this value
        do_sample=True    # Enable sampling
    )
    
    # Decode the generated text
    generated_text = gpt2_tokenizer.decode(output[0], skip_special_tokens=True)
    return {"generated_text": generated_text}
class SentimentAnalysisRequest(BaseModel):
    text: str

@app.post("/analyze")
async def analyze_sentiment(request: SentimentAnalysisRequest):
    inputs = distilbert_tokenizer(request.text, return_tensors='pt')
    outputs = distilbert_model(**inputs)
    prediction = torch.argmax(outputs.logits, dim=1).item()
    return {"sentiment": "positive" if prediction == 1 else "negative"}