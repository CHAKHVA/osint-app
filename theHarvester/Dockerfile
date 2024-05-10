FROM python:3.9-slim

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/laramies/theHarvester.git /app/theHarvester

WORKDIR /app/theHarvester

RUN pip install -r requirements.txt

ENTRYPOINT ["python", "theHarvester.py"]