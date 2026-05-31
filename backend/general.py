from dotenv import load_dotenv
from ollama import AsyncClient
from pydantic import BaseModel
from typing import List, Literal
import asyncio
import json
import re
import os

load_dotenv()

M_ROUTER = os.getenv("A1")
M_RESEARCH = os.getenv("A2")
M_WRITER = os.getenv("A3")
M_CODER = os.getenv("A4")
M_MATH = os.getenv("A1")
M_MERGER = os.getenv("A3")

client = AsyncClient(host="http://localhost:11434")
ollama_semaphore = asyncio.Semaphore(2)

class Message(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str

class BaseWorker:
    def __init__(self, name: str, system_prompt: str, model: str, num_predict: int, temperature: float = 0.3, keep_alive: str = "2m"):
        self.name = name
        self.system_prompt = system_prompt
        self.model = model
        self.num_predict = num_predict
        self.temperature = temperature
        self.keep_alive = keep_alive

    async def run(self, task: str, history: List[Message] = []) -> str:
        messages = ( [{"role": "system", "content": self.system_prompt}] + [m.dict() for m in history] + [{"role": "user", "content": task}])
        async with ollama_semaphore:
            response = await client.chat( model=self.model, messages=messages, options={"temperature": self.temperature, "num_predict": self.num_predict}, keep_alive=self.keep_alive,)
        return response["message"]["content"]

router_worker = BaseWorker("Router",'You are an expert router, according to task choose the worker from: ["Researcher", "Writer", "Coder", "Maths"] wisely. Reply ONLY with a JSON array. No explanation. No prose. Example: ["Maths"] or ["Researcher", "Writer"]', M_ROUTER,50,0.2)
research_worker = BaseWorker("Researcher","You are a factual analyst. Research and reason about the given topic thoroughly.",M_RESEARCH,400,0.5)
writer_worker = BaseWorker("Writer","You are a skilled writer. Produce clear, well-structured output based on provided context.",M_WRITER,500,0.7)
coder_worker = BaseWorker("Coder","You are an expert programmer. Write clean, correct, well-commented code.",M_CODER,800,0.3)
math_worker = BaseWorker("Maths","You are an expert Maths Expert. Solve properly, cleanly and carefully. Reply only with proper answer structure, no extra wording.",M_MATH,400,0.1)
synth_worker = BaseWorker("Merger","Merge specialist outputs into ONE clean, concise final answer. No headers. No repeated content. Plain prose only.", M_MERGER,300,0.5)

WORKER_MAP = {
    "Researcher": research_worker,
    "Writer":writer_worker,
    "Coder": coder_worker,
    "Maths": math_worker,
    "Merger":synth_worker,
}

def parse_router_output(raw: str) -> list:
    cleaned = re.sub(r"```json|```", "", raw).strip()
    matches = re.findall(r'\[.*?\]', cleaned, re.DOTALL)
    for match in matches:
        try:
            parsed = json.loads(match)
            if parsed and all(isinstance(x, str) for x in parsed):
                return parsed
        except json.JSONDecodeError:
            continue
    raise ValueError("No valid string JSON array found")

async def orchestrate(message: str, history: List[Message]):
    yield "data: [Router] : Deciding which specialists to call...\n\n"
    route_raw = await router_worker.run(message, history)
    try:
        needed: List[str] = parse_router_output(route_raw)
        if not isinstance(needed, list):
            raise ValueError()
        needed = [w for w in needed if w in WORKER_MAP]
        if not needed:
            raise ValueError("Empty after filtering")
    except (json.JSONDecodeError, ValueError):
        needed = ["Researcher", "Writer"]

    yield f"data: [Router] : Calling {needed}\n\n"
    tasks = [WORKER_MAP[w].run(message, history) for w in needed]
    results = await asyncio.gather(*tasks)

    worker_outputs = ""
    for name, output in zip(needed, results):
        yield f"data: [{name}] {output}\n\n"
        worker_outputs += f"### {name}:\n{output}\n\n"

    yield "data: [Merger] : Merging outputs...\n\n"
    synth_input = f"User asked: {message}\n\nSpecialist outputs:\n{worker_outputs}"
    final = results[0] if len(needed) == 1 else await synth_worker.run(synth_input)
    yield f"data: [Final] {final}\n\n"
    yield "data: [DONE]\n\n"