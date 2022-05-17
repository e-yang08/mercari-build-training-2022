import os
import logging
import pathlib
from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
# additionally imported
import sqlite3
import hashlib


# ----config----------------------------
app = FastAPI()
logger = logging.getLogger("uvicorn")
logger.level = logging.INFO
images = pathlib.Path(__file__).parent.resolve() / "images"
origins = [os.environ.get('FRONT_URL', 'http://localhost:3000')]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

json_file = str(pathlib.Path(__file__).parent.resolve() / "items.json")
db_file = str(pathlib.Path(os.path.dirname(__file__)
                           ).parent.resolve() / ".." / "db" / "items.db")
sqlite_file = str(pathlib.Path(os.path.dirname(__file__)
                               ).parent.resolve() / ".." / "db" / "mercari.sqlite3")


# ----endpoints--------------------------
@app.on_event("startup")
def initialize():
    if not os.path.exists(db_file):
        open(db_file, 'w').close()

    if not os.path.exists(sqlite_file):
        open(sqlite_file, 'w').close()

    logger.info("Launching the app...")

    con = sqlite3.connect(sqlite_file)
    cur = con.cursor()

    # update schema
    with open(db_file, encoding='utf-8') as file:
        schema = file.read()
    cur.executescript(f"""{schema}""")
    con.commit()
    con.close()

    return None


@app.get("/")
def root():
    return {"message": "Welcome to Mercari Items Database"}


@app.post("/items")
async def add_item(name: str = Form(...), category: str = Form(...), image: UploadFile = File(...)):
    logger.info(f"Receive item - name:{name}, category:{category}")

    if not image.filename.endswith(".jpg"):
        raise HTTPException(
            status_code=400, detail="Image is not in .jpg format")

    hashes = hashlib.sha256(
        image.filename.split(".")[0].encode('utf-8')).hexdigest() + '.jpg'

    con = sqlite3.connect(sqlite_file)
    cur = con.cursor()

    cur.execute(
        "INSERT OR IGNORE INTO category(category_name) VALUES (?)", (category, ))

    # retrieve category id
    cur.execute(
        "SELECT category_id FROM category WHERE category_name = (?)", (category, ))
    category_id = cur.fetchone()[0]  # fetchone --> return (id,)
    # insert item
    cur.execute("INSERT INTO items(name, category_id, image_filename) VALUES(?,?,?)",
                (name, category_id, hashes))
    con.commit()
    con.close()
    return {f"message: item received: {name} in {category}"}


@app.get("/items")
def get_item():
    logger.info("Get all items")

    con = sqlite3.connect(sqlite_file)
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    # select all items
    cur.execute(
        """SELECT items.name, category.category_name as category, 
        items.image_filename FROM items INNER JOIN category 
        ON category.category_id = items.category_id""")

    lst = cur.fetchall()
    con.close()

    if lst == []:
        raise HTTPException(
            status_code=404, detail="No item to list")

    items_json = {"items": lst}
    return items_json


@app.get("/search")
def search_item(keyword: str):  # query parameter
    logger.info(f"Search item with {keyword}")

    con = sqlite3.connect(sqlite_file)
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    # select item matching keyword
    # cur.execute("SELECT * from items WHERE name LIKE (?)", (f"%{keyword}%", ))
    cur.execute(
        """SELECT items.name, category.category_name as category, 
        items.image_filename FROM items INNER JOIN category ON 
        category.category_id = items.category_id WHERE items.name LIKE (?)""", (f"%{keyword}%", ))

    lst = cur.fetchall()
    con.close()
    if lst == []:
        raise HTTPException(
            status_code=404, detail="No matching item")

    message = {"items": lst}
    return message


@app.get("/items/{items_id}")
def get_item_by_id(items_id):

    logger.info(f"Search item with ID: {items_id}")

    con = sqlite3.connect(sqlite_file)
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    # select item matching keyword
    cur.execute(
        """SELECT items.name, category.category_name as category, 
        items.image_filename FROM items INNER JOIN category 
        ON category.category_id = items.category_id WHERE id=(?)""", (items_id,))
    item = cur.fetchone()
    con.close()
    if item is None:
        raise HTTPException(
            status_code=404, detail="No matching item")
    return item



@app.get("/image/{items_image}")
async def get_image(items_image):
    # Create image path
    image = images / items_image

    if not items_image.endswith(".jpg"):
        raise HTTPException(
            status_code=400, detail="Image path does not end with .jpg")

    if not image.exists():
        logger.info(f"Image not found: {image}")
        image = images / "default.jpg"

    return FileResponse(image)


@app.on_event("shutdown")
def close():
    logger.info("Closing the app...")
