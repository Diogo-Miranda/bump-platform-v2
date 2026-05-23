# Contexto

Tela de streaming list da marca:

# Regras de negócio

### Regras de rotemaneto

Roteamento: {{BASE_URL}}/streaming/{{brand}}

### Workflow

1 - Ao entrar nessa tela é necessário ir ao backend e retornar os dados necessários para preencher
a listagem de conteúdos, filtrando pela data atual. Exemplo:

```curl
GET {{baseUrl}}/api/v1/brand-contents/{{brandName}}/{{date}}/signed
Authorization: Bearer {{token}}
```

Exemplo de response:

HTTP/1.1 200 OK
date: Wed, 20 May 2026 15:05:54 GMT
server: uvicorn
content-length: 8612
content-type: application/json
x-request-id: 2fa97671-3967-41d2-afa3-9309beffeecd
Connection: close

```json
{
  "data": {
    "created_at": "2026-01-01T00:00:00+00:00",
    "contents": [
      {
        "content_type": "video",
        "part_of_day": "morning",
        "day_of_week": "sunday",
        "contents_metadata": [
          {
            "statics": [
              "https://storage.googleapis.com/dev-bump-contents/estrella-galicia/2026-05-18/morning/static/part1.avif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bump-project-462722%40appspot.gserviceaccount.com%2F20260520%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260520T150555Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=58ccbc121d898b48ea86cad4e307a67c3d0966d952f88e8912bc309aef765a1f8a3dbd421363992c4be5d0720b0d10125a49e3afa6e835dd1be1cde29857685c863fc709e148deed94c5e12e3beef5169ac3a76e494f8c65ac64c1d8251d8a7149ea995aad8ede9d97a491a1b0ddaab2bdbcf1a9c010e3284083ad6faf74bd4789066bac404eff9df5f783a0649a77ba6537fe8c5d9d3507af50003932f0c2ca35745a597622e7b5302d6d80105599310de8f97b69f7b0acf04eed514fab1846bbd86a8f2237422b48eb82baefd9f52967068168d5bd9befc745f0d3665d739b54415da7774ea0fc5bd10aca146265bd71beb09a10fdf045d3e49c3cfeedfbcb",
              "https://storage.googleapis.com/dev-bump-contents/estrella-galicia/2026-05-18/morning/static/part2.avif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bump-project-462722%40appspot.gserviceaccount.com%2F20260520%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260520T150555Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=5c74591d48e833ed4644957efb06e42bc7ba4614c284b1baf43818e158b40429a48bc32f0036e3dbf19bd340bdbb98e2f7dc302e623b64e2b36994a9c02d2800a064789faff6e0e627720b50b24a8021c4b2aa2b9fef45e7cb1b55ebea89f87e068b750eca849d62b8e5ad1e682b0087e67dadb492b0cdf79aed5c82bff232511dada6fd3e4a87c11d5d145ca4ed1fee4caddc5ebe7831026f5a7957fe9130314cbd1df603dbf36facc2758ac17fe1c0901cf3512453b6d1816889e2091980b2c6c97bdef2a04f45488b8fced892d11c4eb942330bf24a2a5cf5691e120954a89a59f92cc3e1f49c6351fccdc8a587a46ec7e66e8feb60cbdb4ff7c8727e722c"
            ],
            "width": "1920",
            "height": "158",
            "video": "https://storage.googleapis.com/dev-bump-contents/estrella-galicia/2026-05-18/morning/video/slogan.mp4?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bump-project-462722%40appspot.gserviceaccount.com%2F20260520%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260520T150555Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=848de85bb2c67794e134340b629561f250fb5694e5ad2fa557aab725764de12b01da521ffe29696a55baa1251196488b959e2c9cc1e607bd0b015fb6f0c4cea32c98fe621fc1d8c050408dc945be0def3eccbe107cdc2b27ce9651eaa84b1489c4af043aa54f008260dd771629e07ece3705e15ca6b756d81de1d6d7919551da94e7fc154f3223a264cc1f75f59706cdea385c4aed362e178cb19f49ef5f03b19b76cfa9c7089a03850df393f4518951171abcfe167acacc16056f3a2437fea7ac32a280cc1a4a4ba68abbe272a73cf0d0d17e9a43387c758f70dc78623a014047f51484062429caa072d40fb05748b7262db12f0f1397da476170979db52f0c"
          }
        ],
        "localization": "São Paulo, SP",
        "title": "Estrella Galicia — Manhã",
        "weather": "Tarde nublada com chuva 15ºC",
        "status": "active"
      },
      {
        "content_type": "video",
        "part_of_day": "afternoon",
        "day_of_week": "sunday",
        "contents_metadata": [
          {
            "statics": [
              "https://storage.googleapis.com/dev-bump-contents/estrella-galicia/2026-05-18/afternoon/static/part1.avif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bump-project-462722%40appspot.gserviceaccount.com%2F20260520%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260520T150555Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=8b08ab8bcd7f630770a3fdc433224391c08982bc3337c7b95d65200bbc7d693fd35cba95583fa2813329eabedb80e7718ad803cda6f0ed7a15c550cd00c6aee9860724535e13d226aafe90acf0fc876435b48e1d89abec644aaff3aab6e517e62136dcdb1660f152008bf748a8d22fb1f3306acf83f9baa32f56e9a472f1ec16e87da4cd3c0d9725b7a4ca03cb3eecfb6af2927aa77e212c7f0820cea18293941d94532bc0ccd3f6ff7db93174a101ded967d31cdb505035d1055da60e0b057d0eb7611434d1634d35178c4e09f86ec06f8bb33455ffcf360e77f9be469679fecf4900180ab6425b262a2fda434223b41bf3692ac1050c866421edb1fab64727",
              "https://storage.googleapis.com/dev-bump-contents/estrella-galicia/2026-05-18/afternoon/static/part2.avif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bump-project-462722%40appspot.gserviceaccount.com%2F20260520%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260520T150555Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=05ed68461e8c1426c1881cc8579d962f9deebba9456051221b523113633151c2d706d5733b0dd9c3faad51122ad2c03c0e445fd8809344e6e7ab374f31b0896954553ae0c216a8d6f5c77f45af882ef9c66123a7a9b576b1e6f8fdb121b213404fad499b72c57d7162b2065b5285491ff1e35a7e2c301b0cf2ad5d64061bfcf28bb829a658d9185a2c9b1bb1cd7311e565710328165abeac2e6d628a39fb4fb0e59634b6cd27d5ef0cf68c8cc45c0a022f80139568e6af591c9e91ea5add1425016050e1b373023cb185e7b16f2f6579d046e168bf49ebc172ee022972c13fe37f98d468c8f9adeedc3f9571bb7d1f296d25223e9ff72080645dbbb36c3691f2"
            ],
            "width": "1920",
            "height": "158",
            "video": "https://storage.googleapis.com/dev-bump-contents/estrella-galicia/2026-05-18/afternoon/video/slogan.mp4?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bump-project-462722%40appspot.gserviceaccount.com%2F20260520%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260520T150555Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=cdc0d149ebd3f53ebd0f8ce497de6f2af73009a7408778bbb56903246fd1a949fdad4fb6f4b792bd850d695b0b942562bba8fc8f1b28ae96753fc18a68d1f5ec9bfc270d4a8799ae253404170cc334dc92b3cccace15ec599fbb2e1b7883da672f2fdac3cfc294a08cf625491534f5f7352bcb5987f23d7fedd516a8f7434156093134211c15cd8eee946397834c50fd3d2f06d8994702d3288f76123b59a395af35a645cd3f848e2511be8392bc364b5cf52937983a2eaed208cea80649a5bd5516990a6788bdb4b96e67f87d4f35e651d9295e3b134826f24b60add649b513a7ac62fa654ae64fde8a0bfdd4dd68a33cfde524dd9f90043f826fb586727aa4"
          }
        ],
        "localization": "São Paulo, SP",
        "title": "Estrella Galicia — Tarde",
        "weather": "Tarde nublada com chuva 15ºC",
        "status": "active"
      },
      {
        "content_type": "video",
        "part_of_day": "night",
        "day_of_week": "sunday",
        "contents_metadata": [
          {
            "statics": [
              "https://storage.googleapis.com/dev-bump-contents/estrella-galicia/2026-05-18/night/static/part1.avif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bump-project-462722%40appspot.gserviceaccount.com%2F20260520%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260520T150555Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=1a70b0ec214fc1b47f76047c5c3930f1da607dee9387d78fbc4b4d0087bfc2fdef720c095ec7989915587279b62338af103187cb0943e47b66249c71eada4bf425d19f2237f636d07d5e15f96566b5f6b3119ba791685957ac42fc68f084473e09d03cef8c869164420b407da10fe27a34336a23163d4315d7e2b5f3f2fd262fb742a428835b82148ef21198cd3dad3e96b7ad78c106ae554fd8e7f1db8590a6cc4c609b3f2d118864246cb1169dc2e60049f58e493ba3e0dd5cee35a11ac6a3da734b63902a0710fd7dd18a7f8cc244f187b85a87f25a6c5c5f27edcb293ff1c1d7cd716706eb3eb26c5cd5c5f32d66b0cc366fa2924858d79a42e3e929570c",
              "https://storage.googleapis.com/dev-bump-contents/estrella-galicia/2026-05-18/night/static/part2.avif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bump-project-462722%40appspot.gserviceaccount.com%2F20260520%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260520T150555Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=2dd423c8e73ea08d44ab2e920fc7c9d63dbe848446eeab6f39c83824a52a12970012459c8604cd3717d88df3e99d0161222b5599d23cb42f2d0c21beace8cf38eec6b8eb137af8f814b9151f6a130173ad6edd4356163f974f2ec36e474d90d695de5d95ed3688e0e54b2cfb2dbf802b742f7e459511b02ff475828da4653a96213e085c7f11e928381a9cb8378bd450ea62045fdd3942aa0eb2704f8813a941370b4899e9f53ba901145374854646fbe3dafd94f70c84754fc1751017b86a65414e8d339632c66a525784e9f136fe3185be089f6fa93d119f761d811ced0b43412ca8de79414bf47bea75f8bac71d9787916c2418595e19224499b1b86dccc1"
            ],
            "width": "1920",
            "height": "158",
            "video": "https://storage.googleapis.com/dev-bump-contents/estrella-galicia/2026-05-18/night/video/slogan.mp4?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bump-project-462722%40appspot.gserviceaccount.com%2F20260520%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260520T150555Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=599c2fc91fb6f117e44fca517ccf9f0edaf1bdd6325c61ecd6db28c7ad48fc34a453c9aac7237894fa3434be25cfb1eab4405d4f2c28f2954d27a0618e61ae6740151e75b2469d26a14221589c3d5aa8a12b1ae5bfc2741e0813439a6400b3dbe36e3f32e3c134ba5e8cd12222f2b36223f05b17f160f63d2933b3932870b6664e29f077f4e1abc9924fb8cc88b3a3cf09d6be84658f49aa1c62297b25f77c8d7974416d1aaa210ce2b96e271b523aade21525db16f92f643bc000a53231a183f3703f7731b16c908b3cf91632c2dc548baa347ee68f0c2b995e191b3b795091320b8d930f8b6d5b76abfae2e3cf1f200e1d3b39631c0dcc62f62e5a94fefd77"
          }
        ],
        "localization": "São Paulo, SP",
        "title": "Estrella Galicia — Noite",
        "weather": "Tarde nublada com chuva 15ºC",
        "status": "active"
      }
    ],
    "created_by": "admin"
  }
}
```

2 - Depois de retornar dados, preencha cada componente na tela de streaming para mostrar as imagens e os dados necessários

Obs: o que não retornar nesse response, ignore por enquanto.

Obs 2: O dado de date, é possível retornar na página de streaming (onde tem o picker de date)

### Aspects

- Sempre ao entrar nessa tela, faça o fetch da data do dia atual do usuário que está acessando a página
- Altere o título da página também para a marca que estiver acessando:

Ej:
NOW Streaming
/ {{brand}}

