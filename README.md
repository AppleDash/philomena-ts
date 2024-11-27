philomena-ts
============

A procedural TypeScript binding for the public API of the [Philomena](https://github.com/philomena-dev/philomena/) image booru.

This library is relatively low-level, and is intended to be used to build small applications or more complex (eg: object-oriented) bindings that consume the Philomena API.

[Zod](https://zod.dev/) is used for schema validation of API requests and responses, with schemas built based on the official API documentation.

## Examples
### Simple API
The functions that request data from the API are organized into files under `src/requests`, organized by the type of response the endpoints return.

### Streaming API
There also exists a "streaming" API, which exists under `src/requests/streaming`, and provides an AsyncGenerator-based interface to requests that return pages of results.