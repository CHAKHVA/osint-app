from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import docker
import json
from datetime import datetime

from app.models import Scan
from app.database import Base, get_db, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/scan")
async def scan(domain: str, tool: str, db: Session = Depends(get_db)):
    client = docker.from_env()
    start_time = datetime.now()

    if tool == "theHarvester":
        container = client.containers.run(
            "domain-enumeration-app_theHarvester",
            f"-d {domain} -b all",
            detach=True,
            remove=True,
        )
        logs = container.logs(stream=True)
        output = "".join([log.decode("utf-8") for log in logs])
    elif tool == "Amass":
        container = client.containers.run(
            "domain-enumeration-app_Amass",
            f"enum -d {domain}",
            detach=True,
            remove=True,
        )
        logs = container.logs(stream=True)
        output = "".join([log.decode("utf-8") for log in logs])
    else:
        return {"error": "Invalid tool selected"}

    end_time = datetime.now()

    scan_result = Scan(
        domain=domain,
        tool=tool,
        start_time=start_time,
        end_time=end_time,
        results=json.dumps(output),
    )
    db.add(scan_result)
    db.commit()
    db.refresh(scan_result)

    return {"result": output}


@app.get("/results")
async def get_scan_results(db: Session = Depends(get_db)):
    scan_results = db.query(Scan).all()
    return {
        "results": [
            {
                "id": result.id,
                "domain": result.domain,
                "tool": result.tool,
                "start_time": result.start_time.isoformat(),
                "end_time": result.end_time.isoformat(),
                "results": json.loads(result.results),
            }
            for result in scan_results
        ]
    }
