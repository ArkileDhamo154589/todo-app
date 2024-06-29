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

# creates an empty array and waits for tasks
tasks: List[Task] = []

# get tasks
@app.get("/tasks")
def read_tasks():
    return tasks

# post tasks
@app.post("/tasks", response_model=Task)  # specify response model to return the created task
def create_task(task: Task):
    tasks.append(task)
    return task  # return the created task

# delete tasks in route with task_id ex /tasks/1
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    task_to_delete = next((task for task in tasks if task.id == task_id), None)
    if task_to_delete is None:
        raise HTTPException(status_code=404, detail="Task not Found")
    tasks.remove(task_to_delete)
    return task_to_delete
