import os
import logging
import pathlib
from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
# additionally imported
import json

# ----config----------------------------
app = FastAPI()
logger = logging.getLogger("uvicorn")
logger.level = logging.INFO
images = pathlib.Path(__file__).parent.resolve() / "image"
origins = [os.environ.get('FRONT_URL', 'http://localhost:3000')]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

json_file = pathlib.Path(__file__).parent.resolve() / "items.json"

# ----endpoints--------------------------


@app.on_event("startup")
def initialize():
    json_file.touch(exist_ok=True)
    logger.info("Created items.json if not initially exist")
    return None

@app.get("/")
def root():
    return {"message": "Welcome to Mercari Items Database"}


@app.post("/items")
def add_item(name: str = Form(...), category: str = Form(...)):
    logger.info(f"Receive item: {name} in {category}")

    # open the json file to record new item defined above
    with open("items.json", "r+", encoding='utf-8') as file:
        # load the existing data
        file_data = json.load(file)

        # define a item to be added
        new_item = {
            "name": name,
            "category": category
        }

        # append new item to the existing items
        file_data["items"].append(new_item)

        # sets file's current position at offset.
        file.seek(0)

        # write updated data to json file
        json.dump(file_data, file, indent=4)

    return {"message": f"item received: {name} in {category}"}


@app.get("/items")
def get_item():
    with open("items.json", "r", encoding='utf-8') as file:
        items = json.load(file)
    return items


@app.get("/image/{items_image}")
async def get_image(items_image):
    # Create image path
    image = images / items_image

    if not items_image.endswith(".jpg"):
        raise HTTPException(
            status_code=400, detail="Image path does not end with .jpg")

    if not image.exists():
        logger.debug(f"Image not found: {image}")
        image = images / "default.jpg"

    return FileResponse(image)
