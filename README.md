# Derailed "Native" App

Welcome! This is the source code and primary codebase of Derailed's Android, iOS, and Web apps.

## Architecture

This app is a React Native application, built using Expo, on top of the TypeScript linter.
This codebase specifically includes code for:

- Managing state across Derailed
- Storing Derailed authentication tokens
- A user-first API "client" using the `fetch` API
- Derailed's Chat and Posts UIs
- A WebSocket client for Derailed's real-time Gateway
- And many more goodies to make Derailed function properly for users

## Licensing

Derailed's Native App is fully licensed under the Apache-2.0 license. See [./LICENSE](./LICENSE) for more info.
