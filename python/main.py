import os
import logging
import pathlib
import json  # additionally imported
from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
# additionally imported
import json
import sqlite3

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

<<<<<<< Updated upstream
=======
# ----endpoints--------------------------


@app.on_event("startup")
def initialize():
    logger.info("Launching the app...")

    con = sqlite3.connect('../db/mercari.sqlite3')
    cur = con.cursor()

    # update schema
    with open("../db/items.db", "r+", encoding='utf-8') as file:
        schema = file.read()
    cur.execute(f"""{schema}""")
    con.commit()
    con.close()

>>>>>>> Stashed changes

@app.get("/")
def root():
    return {"message": "Welcome to Mercari Items Database"}



@app.post("/items")
<<<<<<< Updated upstream
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
=======
def add_item(id: int = Form(...), name: str = Form(...), category: str = Form(...)):
    logger.info(f"Receive item - id: {id}, name:{name}, category:{category}")

    con = sqlite3.connect('../db/mercari.sqlite3')
    cur = con.cursor()

    # insert item
    cur.execute("INSERT INTO items(id, name, category) VALUES(?,?,?)",
                (id, name, category))
    con.commit()
    con.close()

    # For Step 3-3
    # # open the json file to record new item defined above
    # with open("items.json", "r+", encoding='utf-8') as file:
    #     # load the existing data
    #     file_data = json.load(file)

    #     # define a item to be added
    #     new_item = {
    #         "name": name,
    #         "category": category
    #     }

    #     # append new item to the existing items
    #     file_data["items"].append(new_item)

    #     # sets file's current position at offset.
    #     file.seek(0)

    #     # write updated data to json file
    #     json.dump(file_data, file, indent=4)

    return {f"message: item received: ID{id} - {name} in {category}"}
>>>>>>> Stashed changes


@app.get("/items")
def get_item():
<<<<<<< Updated upstream
    with open("items.json", "r", encoding='utf-8') as file:
        items = json.load(file)
    return items
=======
    # with open("items.json", "r", encoding='utf-8') as file:
    #     items = json.load(file)
    logger.info("Get all items")

    con = sqlite3.connect('../db/mercari.sqlite3')
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("SELECT * from items")
    items_json = {"items": cur.fetchall()}
    con.close()
    return items_json
>>>>>>> Stashed changes


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


@app.on_event("shutdown")
def close():
    logger.info("Closing the app...")
