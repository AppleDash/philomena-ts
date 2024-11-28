philomena-ts
============

A procedural TypeScript binding for the public API of the [Philomena](https://github.com/philomena-dev/philomena/) image booru.

This library is relatively low-level, and is intended to be used to build small applications or more complex (eg: object-oriented) bindings that consume the Philomena API. Currently, every endpoint is implemented except for OEmbed, Image upload, and Image reverse search.

[Zod](https://zod.dev/) is used for schema validation of API requests and responses, with schemas built based on the official API documentation.

## Examples
Every API request function takes a `PhilomenaApiOptions` object which includes the root API endpoint URL and an optional delay to use for successive
streaming requests, to avoid flooding the server with requests and exceeding any server-imposed rate-limits.

### Simple API
The functions that request data from the API are exported under `philomena-ts/requests`.

```ts
import { getImage } from 'philomena-ts/requests';
const API_OPTIONS = { url: 'https://example.com/api/v1/json' };

// Find a particular image.
const firstImage = await getImage(API_OPTIONS, 1);

console.log(firstImage.viewUrl);
```

### Streaming API
There also exists a "streaming" API, which is exported under `requests/streaming`, and provides an AsyncGenerator-based interface to requests that return pages of results.

The streaming API for images attempts to reduce load on the server by means of using search queries that more efficiently look up the requested data, as opposed to pagination which always look up all the data for every page up to and including the requested page. This is a server-side limitation/consideration, rather than a fault of this library.

```ts
import { getImage } from 'philomena-ts/requests/streaming';
const API_OPTIONS = { url: 'https://example.com/api/v1/json', streamingDelay: 1000 };

// Find the first 50 images with the highest aspect ratio.
// This will make 2 API requests in the background, delayed by 1000ms as specified in the streamingDelay API option.
for await (const image of streamingSearchImages(API_OPTIONS, { q: 'safe', sf: 'aspectRatio', sd: 'desc' }, 50)) {
    console.log(image.id, image.aspectRatio);
}
```