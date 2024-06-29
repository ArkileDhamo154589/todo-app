from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    id: int
    text: str

tasks = [
    {"id": 1, "text": "Task 1"},
    {"id": 2, "text": "Task 2"},
]

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/tasks")
def read_tasks():
    return tasks
