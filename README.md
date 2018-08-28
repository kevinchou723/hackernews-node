# GraphQL server with graphql-yoga and Prisma

A lot of comments and notes are still work in progress

This Repo was based on the tutorial from [howtographql](https://www.howtographql.com/graphql-js/0-introduction/)

## List of dependencies to install
Globally

- [prisma](https://www.npmjs.com/package/prisma)
- [graphql-cli](https://www.npmjs.com/package/graphql-cli)


In Project
- [graphql-yoga](https://www.npmjs.com/package/graphql-yoga)
- [prisma-binding](https://www.npmjs.com/package/prisma-binding) **use 2.1.3** as there's an open issue relating to subscription with 2.1.4. [see issue](https://github.com/prisma/prisma-binding/issues/229)

## Basics about GraphQL Server
- Schemas
- TypeDefs
- Resolvers

**Schemas and TypeDefs**

GraphQL requires you to design a *schema* which in turn defines the API of your server.
GraphQL has its own type language that’s used the write GraphQL schemas: The Schema Definition Language (SDL). In its simplest form, GraphQL SDL can be used to define types looking like this:

```
type User {
  id: ID!
  name: String
}
```

There are 3 basic types called [*root types*](https://graphql.org/learn/schema/#the-query-and-mutation-types).  **Query**, **Mutation**, and **Subscription**. These define the *entry points* of the GraphQL API.

**Resolvers**

The *resolver* act as the actual implementation of the GraphQL Schema.
GraphQL has a clear separation of structure and behaviour. The structure of a GraphQL server is its schema, an abstract description of the server’s capabilities. This structure comes to life with a concrete implementation that determines the server’s behaviour. Key components for the implementation are so-called resolver functions.
Below is and example of a resolver.

```
Query: {
  info: () => `This is the API`,
  feed: (root, args, context, info) => {
    return info
  },
}
```

## Root Types
**Query**

**Mutation**

**Subscription**
https://www.prisma.io/docs/reference/prisma-api/subscriptions-aey0vohche/

For more detailed explanation about Schemas and Resolvers, see [here](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e/)

## What is graphql-yoga?

It's a fully-featured GraphQL Server with focus on easy setup, performance & great developer experience.

Based on express, graphql, graphql-playground(GraphQL IDE), and many more.

For more info on graphql-yoga, see [here](https://github.com/prisma/graphql-yoga)

## What is Prisma?

You can think of Prisma as the framework that acts like model.  It's primary job is to interact with database.

It can do much more than that. For more info, see [prisma repo](https://github.com/prisma/prisma).