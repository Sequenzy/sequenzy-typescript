# Subscribers

Types:

- <code><a href="./src/resources/subscribers/subscribers.ts">Subscriber</a></code>
- <code><a href="./src/resources/subscribers/subscribers.ts">SubscriberCreateResponse</a></code>
- <code><a href="./src/resources/subscribers/subscribers.ts">SubscriberRetrieveResponse</a></code>
- <code><a href="./src/resources/subscribers/subscribers.ts">SubscriberUpdateResponse</a></code>
- <code><a href="./src/resources/subscribers/subscribers.ts">SubscriberListResponse</a></code>
- <code><a href="./src/resources/subscribers/subscribers.ts">SubscriberDeleteResponse</a></code>

Methods:

- <code title="post /subscribers">client.subscribers.<a href="./src/resources/subscribers/subscribers.ts">create</a>({ ...params }) -> SubscriberCreateResponse</code>
- <code title="get /subscribers/{email}">client.subscribers.<a href="./src/resources/subscribers/subscribers.ts">retrieve</a>(email) -> SubscriberRetrieveResponse</code>
- <code title="patch /subscribers/{email}">client.subscribers.<a href="./src/resources/subscribers/subscribers.ts">update</a>(email, { ...params }) -> SubscriberUpdateResponse</code>
- <code title="get /subscribers">client.subscribers.<a href="./src/resources/subscribers/subscribers.ts">list</a>({ ...params }) -> SubscriberListResponse</code>
- <code title="delete /subscribers/{email}">client.subscribers.<a href="./src/resources/subscribers/subscribers.ts">delete</a>(email) -> SubscriberDeleteResponse</code>

## Tags

Types:

- <code><a href="./src/resources/subscribers/tags.ts">TagAddResponse</a></code>
- <code><a href="./src/resources/subscribers/tags.ts">TagAddMultipleResponse</a></code>

Methods:

- <code title="post /subscribers/tags">client.subscribers.tags.<a href="./src/resources/subscribers/tags.ts">add</a>({ ...params }) -> TagAddResponse</code>
- <code title="post /subscribers/tags/bulk">client.subscribers.tags.<a href="./src/resources/subscribers/tags.ts">addMultiple</a>({ ...params }) -> TagAddMultipleResponse</code>

## Events

Types:

- <code><a href="./src/resources/subscribers/events.ts">EventTriggerResponse</a></code>
- <code><a href="./src/resources/subscribers/events.ts">EventTriggerMultipleResponse</a></code>

Methods:

- <code title="post /subscribers/events">client.subscribers.events.<a href="./src/resources/subscribers/events.ts">trigger</a>({ ...params }) -> EventTriggerResponse</code>
- <code title="post /subscribers/events/bulk">client.subscribers.events.<a href="./src/resources/subscribers/events.ts">triggerMultiple</a>({ ...params }) -> EventTriggerMultipleResponse</code>

# Transactional

Types:

- <code><a href="./src/resources/transactional.ts">TransactionalEmail</a></code>
- <code><a href="./src/resources/transactional.ts">TransactionalRetrieveResponse</a></code>
- <code><a href="./src/resources/transactional.ts">TransactionalListResponse</a></code>
- <code><a href="./src/resources/transactional.ts">TransactionalSendResponse</a></code>

Methods:

- <code title="get /transactional/{slug}">client.transactional.<a href="./src/resources/transactional.ts">retrieve</a>(slug) -> TransactionalRetrieveResponse</code>
- <code title="get /transactional">client.transactional.<a href="./src/resources/transactional.ts">list</a>() -> TransactionalListResponse</code>
- <code title="post /transactional/send">client.transactional.<a href="./src/resources/transactional.ts">send</a>({ ...params }) -> TransactionalSendResponse</code>
