FROM golang:1.16-alpine

RUN apk update && apk add --no-cache git

RUN go get -u github.com/OWASP/Amass/v3/...

ENTRYPOINT ["amass"]