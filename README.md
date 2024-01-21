# Development Guide

1. `/app`: directory contains all the pages that are rendered on the screen.
2. `/components/ui/*` : contains all components installed from [Shadcn UI](https://ui.shadcn.com/)
3. `/components/custom/*` : contains all custom created components using Shadcn UI components.
4. `/lib/services/*` : This is the service layer of the application. All the database fetches and mutations are abstracted in the form of functions in this directory.
5. `/lib/actions` : This directory contains all server actions which are used to mutate data in the forms.
6. `/prisma/schema.prisma` : Contains the schema for the application.
