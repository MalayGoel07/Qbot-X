from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import List
from general import Message, orchestrate
import uvicorn

app = FastAPI(title="Orch-7 API", version="0.0.1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    history: List[Message] = []

@app.get("/")
async def root():
    return {"message": "orch-7 is running!"}

@app.post("/chat")
async def chat(req: ChatRequest):
    return StreamingResponse(orchestrate(req.message, req.history),media_type="text/event-stream")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)