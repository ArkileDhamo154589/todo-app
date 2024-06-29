from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

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
    status: str

class TaskStatusUpdate(BaseModel):
    status: str

tasks: List[Task] = []

@app.get("/tasks", response_model=List[Task])
def read_tasks():
    return tasks

@app.post("/tasks", response_model=Task)
def create_task(task: Task):
    tasks.append(task)
    return task

@app.delete("/tasks/{task_id}", response_model=Task)
def delete_task(task_id: int):
    task_to_delete = next((task for task in tasks if task.id == task_id), None)
    if task_to_delete is None:
        raise HTTPException(status_code=404, detail="Task not found")
    tasks.remove(task_to_delete)
    return task_to_delete

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, updated_task: Task):
    task_to_update = next((task for task in tasks if task.id == task_id), None)
    if task_to_update is None:
        raise HTTPException(status_code=404, detail="Task not found")
    task_to_update.text = updated_task.text
    task_to_update.status = updated_task.status
    return task_to_update

@app.put("/tasks/{task_id}/status", response_model=Task)
def update_task_status(task_id: int, status_update: TaskStatusUpdate):
    task_to_update = next((task for task in tasks if task.id == task_id), None)
    if task_to_update is None:
        raise HTTPException(status_code=404, detail="Task not found")
    task_to_update.status = status_update.status
    return task_to_update
