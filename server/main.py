from typing import Annotated
import argparse
from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer
import uvicorn

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/items/")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Start the FastAPI server.')
    parser.add_argument('--port', type=int, help='Port to run the server on.', required=True)
    args = parser.parse_args()
    port = args.port
    uvicorn.run('main:app', host='0.0.0.0', port=port, reload=True)
