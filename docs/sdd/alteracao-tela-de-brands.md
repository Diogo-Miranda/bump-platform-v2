# Contexto

Alterar tela de listagem de de marcas para buscar do backend

# Step-By-Step

1. Buscar a marca no banco de dados considerando o seguinte CURL:

### Get all brands for authenticated user
GET {{baseUrl}}/api/v1/brands/me
Authorization: Bearer {{token}}

Response:

```
HTTP/1.1 200 OK
date: Sat, 23 May 2026 18:07:17 GMT
server: uvicorn
content-length: 141
content-type: application/json
x-request-id: d656676e-32c1-41ce-a7bd-eae259d86d8e
Connection: close

{
  "data": [
    {
      "updated_at": "2026-01-01T00:00:00+00:00",
      "created_at": "2026-01-01T00:00:00+00:00",
      "name": "Estrella Galicia",
      "created_by": "admin"
    }
  ]
}
```

Observations:

- Trate lista vazia de response
- Trate status code que não sejam 200

Em ambos os casos não mostre erro para o usuário, apenas não mostre a tela

2. Altere a tela de streaming para utilizar sempre o "name" que essa API retorna quando acessar a tela de streaming naquela marca (altere a dependencia do brand_name da tela de streaming para esse novo endpoint)